import store from '@/resources/store';
import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import {
  AddNewLibraryContext,
  AddNewLibraryContextState,
  initialAddNewLibraryContextValue,
} from '../AddNewLibraryContext';
import StepThree from '../StepThree.component';

describe('StepThree', () => {
  const state: AddNewLibraryContextState = {
    library_title: 'books',
    columns: { id: 'number', title: 'string', release_date: 'date', genre: 'multiSelect', isbn: 'string' },
  };

  it('should render the library details', () => {
    render(
      <Provider store={store}>
        <AddNewLibraryContext.Provider value={[state, jest.fn()]}>
          <StepThree active={true} goBackFunction={jest.fn()} />
        </AddNewLibraryContext.Provider>
      </Provider>,
    );

    expect(screen.getByText('books')).toBeInTheDocument();
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('release_date')).toBeInTheDocument();
  });

  it('should call goBackFunction on back button click', () => {
    const goBackFunction = jest.fn();
    render(
      <Provider store={store}>
        <AddNewLibraryContext.Provider value={[state, jest.fn()]}>
          <StepThree active={true} goBackFunction={goBackFunction} />
        </AddNewLibraryContext.Provider>
      </Provider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(goBackFunction).toHaveBeenCalled();
  });

  it('should submit the library on submit button click', async () => {
    const spy = jest.spyOn(global, 'fetch');
    spy.mockImplementation(() => Promise.resolve({ status: 200 } as Response));

    render(
      <Provider store={store}>
        <AddNewLibraryContext.Provider value={[state, jest.fn()]}>
          <StepThree active={true} goBackFunction={jest.fn()} />
        </AddNewLibraryContext.Provider>
      </Provider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Submit New Library' }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
    });
  });
});
