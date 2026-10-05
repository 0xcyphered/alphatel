import { fa } from "./dictionaries/fa";

export type Dictionary = typeof fa;

const dictionaries = {
  fa,
};

export function getDictionary(): Dictionary {
  return dictionaries.fa;
}

export function translate(
  template: string,
  vars: Record<string, string | number> = {},
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in vars ? String(vars[key]) : `{${key}}`,
  );
}
