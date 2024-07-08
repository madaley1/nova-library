export const parseMultiSelect = (multiSelectString: string) => {
  return multiSelectString.split(', ');
};

export const compileMultiSelect = (multiSelectArray: string[]) => {
  return multiSelectArray.join(', ');
};
