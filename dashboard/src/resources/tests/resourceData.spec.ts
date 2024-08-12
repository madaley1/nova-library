import { describe, expect, it } from '@jest/globals';
import resourceData, { setColumnData, setResourceData } from '../resourceData';

describe('resourceData', () => {
  const starterData = {
    currentData: Array<Record<string, any>>(),
    columnNames: Array<string>(),
    editModalData: <Record<string, any>>{},
  };
  it('should update columnNames', () => {
    const valueArray = ['test', 'test1'];
    const valuesData = {
      currentData: Array<Record<string, any>>(),
      columnNames: valueArray,
      editModalData: <Record<string, any>>{},
    };

    expect(resourceData(starterData, setColumnData(valueArray))).toEqual(valuesData);
  });
  it('should update currentData', () => {
    const replacementValues = { test: 'test' };
    const valuesData = {
      currentData: replacementValues,
      columnNames: Array<string>(),
      editModalData: <Record<string, any>>{},
    };
    expect(resourceData(starterData, setResourceData(replacementValues))).toEqual(valuesData);
  });
});
