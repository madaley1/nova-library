import { libraryTemplate } from '@/utils/libraries/templates';
import { describe, expect, it } from '@jest/globals';
import libraryData, { addTemplate, setTemplates } from '../libraryData';

// Define the initial state type
interface LibraryDataState {
  templates: libraryTemplate[];
}

// Define sample data conforming to the libraryTemplate type
const sampleTemplate1: libraryTemplate = {
  title: 'Template 1',
  fields: {
    field1: 'string',
    field2: 'number',
    field3: 'date',
  },
};

const sampleTemplate2: libraryTemplate = {
  title: 'Template 2',
  fields: {
    field1: 'select',
    field2: 'multiSelect',
  },
};

const sampleTemplate3: libraryTemplate = {
  title: 'Template 3',
  fields: {
    field1: 'string',
    field2: 'date',
    field3: 'number',
  },
};

describe('libraryData', () => {
  const starterData: LibraryDataState = {
    templates: [],
  };

  it('should update templates with setTemplates', () => {
    const newTemplates: libraryTemplate[] = [sampleTemplate1, sampleTemplate2];
    const expectedState = { templates: newTemplates };

    expect(libraryData(starterData, setTemplates(newTemplates))).toEqual(expectedState);
  });

  it('should add a new template with addTemplate', () => {
    const newTemplate = sampleTemplate3;
    const initialState = { templates: [sampleTemplate1] };
    const expectedState = { templates: [sampleTemplate1, newTemplate] };

    expect(libraryData(initialState, addTemplate(newTemplate))).toEqual(expectedState);
  });

  it('should handle empty payload for setTemplates', () => {
    const emptyTemplates: libraryTemplate[] = [];
    const expectedState = { templates: emptyTemplates };

    expect(libraryData(starterData, setTemplates(emptyTemplates))).toEqual(expectedState);
  });

  it('should add template to an empty state with addTemplate', () => {
    const newTemplate = sampleTemplate1;
    const expectedState = { templates: [newTemplate] };

    expect(libraryData(starterData, addTemplate(newTemplate))).toEqual(expectedState);
  });

  it('should preserve existing templates when adding a new one with addTemplate', () => {
    const initialState = { templates: [sampleTemplate1, sampleTemplate2] };
    const newTemplate = sampleTemplate3;
    const expectedState = { templates: [...initialState.templates, newTemplate] };

    expect(libraryData(initialState, addTemplate(newTemplate))).toEqual(expectedState);
  });
});
