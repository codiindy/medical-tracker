export function initialsFrom(
  name: string | null | undefined,
  max = 2
): string {
  const s = (name ?? "").trim();
  if (!s) return "?";
  return s
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, max)
    .map(w => w[0]!.toUpperCase())
    .join("");
}
