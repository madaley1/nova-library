interface genericLibrary {
  title: string;
  dateReleased: Date;
  genre: string[];
  [key: string]: any;
}

interface bookLibrary extends genericLibrary {
  isbn: string;
}
interface movieLibrary extends genericLibrary {
  rating: string;
}
interface tvShowLibrary extends genericLibrary {
  rating: string;
}
interface videoGameLibrary extends genericLibrary {
  rating: string;
}

export type { bookLibrary, genericLibrary, movieLibrary, tvShowLibrary, videoGameLibrary };


// const createNewLibrary = () => {
//   return;
// };

