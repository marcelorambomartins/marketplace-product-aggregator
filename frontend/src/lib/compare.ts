export const MIN_COMPARE = 2;
export const MAX_COMPARE = 4;

export function buildCompareHref(ids: string[]): string {
  return `/compare?ids=${ids.join(',')}`;
}

export function parseCompareIds(
  param: string | string[] | undefined,
): string[] {
  const raw = typeof param === 'string' ? param : '';
  return raw
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);
}
