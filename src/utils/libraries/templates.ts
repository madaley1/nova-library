export type fieldTypes = "string" | "number" | "date" | "select" | "multiSelect"

export type libraryTemplate = {
  title: string,
  fields: Record<string, fieldTypes>
}