export const standardTemplates = [
  {
    id: 1,
    title: 'books',
    fields: '{"id":"number","title":"string","release_date":"date","genre":"multiSelect","isbn":"string"}',
  },
  {
    id: 2,
    title: 'movies',
    fields: '{"id":"number","title":"string","release_date":"date","genre":"multiSelect","rating":"string"}',
  },
  {
    id: 3,
    title: 'tv shows',
    fields: '{"id":"number","title":"string","release_date":"date","genre":"multiSelect","rating":"string"}',
  },
  {
    id: 4,
    title: 'video games',
    fields: '{"id":"number","title":"string","release_date":"date","genre":"multiSelect","rating":"string"}',
  },
  {
    id: 5,
    title: 'custom',
    fields: '{"id":"number","title":"string","release_date":"date","genre":"multiSelect"}',
  },
];

export const emptyTemplates = Promise.resolve({ status: 200, json: () => Promise.resolve([]) } as Response);
export const existingTemplates = (templateArray: Array<Record<string, any>>) =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve(templateArray),
  } as Response);
