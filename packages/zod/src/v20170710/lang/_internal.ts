import * as z from "zod/mini";
import type * as core from "zod/v4/core";
import type * as locales from "zod/v4/locales";
import { en } from "zod/v4/locales";

/** The names of the locales built into Zod, as exported from `zod/locales` (e.g. `en`, `ja`, `frCA`) */
type ZodLocale = keyof typeof locales;

/** The subset of Zod's built-in locales that this package has custom messages for */
type Locale = Extract<ZodLocale, "en">;

type LocaleFactory = () => { localeError: core.$ZodErrorMap };

const supportedLocales: readonly (readonly [Locale, LocaleFactory])[] = [["en", en]];

/*
N.b. Zod doesn't record which locale was passed to `z.config()`; it only keeps the locale's error map. To figure out
which locale is active, we feed this issue to the configured error map and compare its message against the message
each of our supported locales gives for the same issue.
*/
const probeIssue: core.$ZodRawIssue = { code: "invalid_type", expected: "string", input: 0 };

let fingerprints: ReadonlyMap<string | undefined, Locale> | undefined;
const detectedLocales = new WeakMap<core.$ZodErrorMap, Locale | undefined>();

function getMessage(errorMap: core.$ZodErrorMap): string | undefined {
  const result = errorMap(probeIssue);
  return typeof result === "string" ? result : result?.message;
}

function getFingerprints(): ReadonlyMap<string | undefined, Locale> {
  fingerprints ??= new Map(supportedLocales.map(([locale, factory]) => [getMessage(factory().localeError), locale]));
  return fingerprints;
}

/**
 * Get the locale Zod is currently configured with, if this package has custom messages for it
 *
 * Zod Classic configures the `en` locale by default, while Zod Mini has no locale configured until something like
 * `z.config(z.locales.en())` is run. Detection is done lazily, i.e. when an issue is being finalized, so `z.config()`
 * may be called before or after this package is imported.
 *
 * @returns The configured locale, or `undefined` if no locale is configured or it isn't supported by this package
 */
// @__NO_SIDE_EFFECTS__
function getLocale(): Locale | undefined {
  const { localeError } = z.config();
  if (localeError === undefined) {
    return undefined;
  }
  if (!detectedLocales.has(localeError)) {
    detectedLocales.set(localeError, getFingerprints().get(getMessage(localeError)));
  }
  return detectedLocales.get(localeError);
}

export { getLocale, type Locale };
