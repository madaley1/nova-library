export const isRecord = (data: unknown): data is Record<any, unknown> => {
  const isData = typeof data !== 'object' || !data;
  const isArray = Array.isArray(data);
  if (isData || isArray) return false;
  const keys = Object.keys(data);
  return keys.length > 0;
};
