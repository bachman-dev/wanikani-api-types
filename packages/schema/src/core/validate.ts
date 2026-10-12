import { indexRevision, messagesOf, referencesOf, walkSchema } from "./analysis.js";
import type { Module, Revision } from "./revision.js";
import type { Definition } from "./schema.js";

function findCycle(graph: ReadonlyMap<string, ReadonlySet<string>>): string[] | undefined {
  const visiting: string[] = [];
  const visited = new Set<string>();
  const visit = (node: string): string[] | undefined => {
    const index = visiting.indexOf(node);
    if (index !== -1) {
      return [...visiting.slice(index), node];
    }
    if (visited.has(node)) {
      return undefined;
    }
    visiting.push(node);
    for (const next of graph.get(node) ?? []) {
      const cycle = visit(next);
      if (cycle !== undefined) {
        return cycle;
      }
    }
    visiting.pop();
    visited.add(node);
    return undefined;
  };
  for (const node of graph.keys()) {
    const cycle = visit(node);
    if (cycle !== undefined) {
      return cycle;
    }
  }
  return undefined;
}

function validateSchema(definition: Definition, problems: string[]): void {
  if (definition.kind !== "definition") {
    return;
  }
  walkSchema(definition.schema, (schema) => {
    if (schema.kind === "string" && schema.brand === true && schema !== definition.schema) {
      problems.push(`${definition.name} has a branded string that isn't its top-level schema`);
    }
    if (schema.kind === "variant") {
      for (const option of schema.options) {
        if (option.entries[schema.key]?.schema.kind !== "literal") {
          problems.push(`${definition.name} has a variant option without a literal "${schema.key}" entry`);
        }
      }
    }
  });
}

/**
 * Checks that a revision's definitions can be generated: names are unique, references are part of the revision and
 * defined before use, modules don't depend on each other in a cycle, and messages exist.
 *
 * @param revision The revision
 * @returns A list of problems; empty if the revision is valid
 */
export default function validateRevision(revision: Pick<Revision, "messages" | "modules">): string[] {
  const problems: string[] = [];
  const index = indexRevision(revision);
  const names = new Set<string>();
  const moduleGraph = new Map<string, Set<string>>();

  for (const module of revision.modules) {
    const dependencies = new Set<string>();
    moduleGraph.set(module.name, dependencies);
    for (const [position, definition] of module.definitions.entries()) {
      if (names.has(definition.name)) {
        problems.push(`${definition.name} is defined more than once`);
      }
      names.add(definition.name);
      validateSchema(definition, problems);

      for (const message of messagesOf(definition)) {
        if (!Object.hasOwn(revision.messages, message)) {
          problems.push(`${definition.name} uses the message "${message}", which isn't in the revision's messages`);
        }
      }

      for (const reference of referencesOf(definition)) {
        const referencedModule: Module | undefined = index.findModule(reference);
        if (referencedModule === undefined) {
          problems.push(`${definition.name} references ${reference.name}, which isn't part of any module`);
        } else if (referencedModule !== module) {
          dependencies.add(referencedModule.name);
        } else if (module.definitions.indexOf(reference) >= position) {
          problems.push(`${definition.name} references ${reference.name} before it's defined in ${module.name}`);
        }
      }
    }
  }

  const cycle = findCycle(moduleGraph);
  if (cycle !== undefined) {
    problems.push(`Modules depend on each other in a cycle: ${cycle.join(" -> ")}`);
  }

  return problems;
}
