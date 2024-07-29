export const fieldTypes = ['string', 'number', 'date', 'select', 'multiSelect'] as const;
export type FieldType = (typeof fieldTypes)[number];

export type libraryTemplate = {
  title: string;
  fields: Record<string, FieldType>;
};

export const isFieldType = (type: any): type is FieldType => fieldTypes.includes(type);
