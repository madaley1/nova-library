export interface genericLibrary {
  title: string;
  dateReleased: Date;
  genre: string[];
  [key: string]: any;
}

export interface bookLibrary extends genericLibrary {
  isbn: string;
}
export interface movieLibrary extends genericLibrary {
  rating: string;
}
export interface tvShowLibrary extends genericLibrary {
  rating: string;
}
export interface videoGameibrary extends genericLibrary {
  rating: string;
}

export const createNewLibrary = () => {
  return;
};
