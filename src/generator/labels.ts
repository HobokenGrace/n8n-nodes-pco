export function titleCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_\-/.{}]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function normalizeIdentifierDisplayLabel(label: string): string {
  return label.replace(/\bIds\b/g, 'IDs').replace(/\bId\b/g, 'ID');
}

export function displayLabel(value: string): string {
  return normalizeIdentifierDisplayLabel(titleCase(value));
}
