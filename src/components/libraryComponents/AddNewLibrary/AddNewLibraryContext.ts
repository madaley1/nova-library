import { createContext } from "react";
type AddNewLibraryContext = {
  libraryType: string,
  fields: Record<string, any>
}
const contextValue: AddNewLibraryContext = {
  libraryType: "",
  fields: {}
}
export const AddNewLibraryContext = createContext(contextValue)