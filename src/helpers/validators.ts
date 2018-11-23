type MaybeString = string | null | void;
type MaybeNumber = string | null | void;
type MaybeFile = File | null | void;

export function normalizeString(value: MaybeString) {
  if (value) {
    return value.trim();
  }
}
