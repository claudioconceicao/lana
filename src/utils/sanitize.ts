/**
 * Recursively converts all `null` values in an object to `undefined`.
 * Works with nested objects and arrays.
 */
export function sanitizeNulls<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeNulls(item)) as unknown as T;
  }

  if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, v === null ? undefined : sanitizeNulls(v)])
    ) as T;
  }

  return obj;
}