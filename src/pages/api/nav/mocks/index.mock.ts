export const emptyNavValues = Promise.resolve({ status: 200, json: () => Promise.resolve([]) } as Response);
export const existingNavValues = (navLinkObject: Array<Record<string, string>>) =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve(navLinkObject),
  } as Response);
