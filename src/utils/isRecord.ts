export const isRecord = (data: unknown): data is Record<any, unknown> => {
  if (typeof data !== 'object' || !data) return false;
  if (Array.isArray(data)) return false;

  const keys = Object.keys(data);
  return keys.length <= 0;
};
