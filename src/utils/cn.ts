export function cn(...inputs: (string | number | boolean | null | undefined)[]): string {
  return inputs.filter((v): v is string | number => typeof v === "string" || typeof v === "number").map(String).filter(Boolean).join(" ");
}
