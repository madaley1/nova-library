import { existingTemplates, standardTemplates } from '@/pages/api/libraries/create/mocks/GET.mock';
import libraryData, { setTemplates } from '@/resources/libraryData';
import store from '@/resources/store';
import { beforeAll, describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { AddNewLibraryContext, AddNewLibraryContextState } from '../AddNewLibraryContext';
import StepOne from '../StepOne.component';

// function mockHandler(url: string | URL | Request): Promise<Response> {
//   const path = (url as string).split(`${process.env.NEXT_PUBLIC_API_URL}/`)[1];
//   if (path === 'api/libraries/create') {
//     return existingTemplates(standardTemplates);
//   }
//   return existingTemplates(standardTemplates);
// }

// const fetchResponse = jest.spyOn(global, 'fetch');
// fetchResponse.mockImplementation(mockHandler);

describe('StepOne', () => {
  const state: AddNewLibraryContextState = {
    title: '',
    fields: {},
  };
  beforeAll(() => {
    store.dispatch(
      setTemplates([
        {
          title: 'books',
          fields: {
            id: 'number',
            title: 'string',
            release_date: 'date',
            genre: 'multiSelect',
            isbn: 'string',
          },
        },
        {
          title: 'movies',
          fields: {
            id: 'number',
            title: 'string',
            release_date: 'date',
            genre: 'multiSelect',
            rating: 'string',
          },
        },
        {
          title: 'tv shows',
          fields: {
            id: 'number',
            title: 'string',
            release_date: 'date',
            genre: 'multiSelect',
            rating: 'string',
          },
        },
        {
          title: 'video games',
          fields: {
            id: 'number',
            title: 'string',
            release_date: 'date',
            genre: 'multiSelect',
            rating: 'string',
          },
        },
        {
          title: 'custom',
          fields: {
            id: 'number',
            title: 'string',
            release_date: 'date',
            genre: 'multiSelect',
          },
        },
      ]),
    );
  });

  it('should render the templates', () => {
    render(
      <Provider store={store}>
        <AddNewLibraryContext.Provider value={[state, jest.fn()]}>
          <StepOne active={true} continueFunction={jest.fn()} />
        </AddNewLibraryContext.Provider>
      </Provider>,
    );

    expect(screen.getByText('Select Desired Template')).toBeInTheDocument();
    standardTemplates.forEach((template) => {
      expect(screen.getByText(`${template.title} Library`)).toBeInTheDocument();
    });
  });

  it('should call continueFunction on continue button click', () => {
    const continueFunction = jest.fn();
    render(
      <Provider store={store}>
        <AddNewLibraryContext.Provider value={[state, jest.fn()]}>
          <StepOne active={true} continueFunction={continueFunction} />
        </AddNewLibraryContext.Provider>
      </Provider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(continueFunction).toHaveBeenCalled();
  });
});
