const spaceTokens = new Set([
  "0", "0-5", "0.5", "1", "1-5", "1.5", "2", "2-5", "2.5",
  "3", "3-5", "3.5", "4", "5", "6", "8", "10", "12", "16", "20", "24",
]);

const radiusTokens = new Set([
  "none", "sm", "md", "lg", "xl", "2xl", "full",
]);

const bgTokens = new Set([
  "page", "surface", "surface-raised", "surface-muted",
  "surface-brand", "surface-brand-light", "overlay",
]);

function isCSSValue(v: string): boolean {
  return v.includes("var(") || v.includes("px") || v.includes("rem") || v.includes("%") || v.includes("calc(") || v.includes("rgb") || v.includes("#");
}

export function resolveSpace(value: string | undefined): string | undefined {
  if (!value) return undefined;
  if (isCSSValue(value)) return value;
  const normalized = value.replace(".", "-");
  if (spaceTokens.has(normalized)) return `var(--space-${normalized})`;
  return value;
}

export function resolveRadius(value: string | undefined): string | undefined {
  if (!value) return undefined;
  if (isCSSValue(value)) return value;
  if (radiusTokens.has(value)) return `var(--radius-${value})`;
  return value;
}

export function resolveBg(value: string | undefined): string | undefined {
  if (!value) return undefined;
  if (isCSSValue(value)) return value;
  if (bgTokens.has(value)) return `var(--bg-${value})`;
  return value;
}
