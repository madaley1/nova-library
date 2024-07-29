import store from '@/resources/store';
import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { AddNewLibraryContext, AddNewLibraryContextState } from '../AddNewLibraryContext';
import StepTwo from '../StepTwo.component';

describe('StepTwo', () => {
  const state: AddNewLibraryContextState = {
    title: 'books',
    fields: { id: 'number', title: 'string', release_date: 'date', genre: 'multiSelect', isbn: 'string' },
  };

  it('should render the library fields', () => {
    render(
      <Provider store={store}>
        <AddNewLibraryContext.Provider value={[state, jest.fn()]}>
          <StepTwo active={true} continueFunction={jest.fn()} goBackFunction={jest.fn()} />
        </AddNewLibraryContext.Provider>
      </Provider>,
    );

    expect(screen.getAllByLabelText('Field Name').length).toBeGreaterThan(0);
  });

  it('should call continueFunction on continue button click', () => {
    const continueFunction = jest.fn();
    render(
      <Provider store={store}>
        <AddNewLibraryContext.Provider value={[state, jest.fn()]}>
          <StepTwo active={true} continueFunction={continueFunction} goBackFunction={jest.fn()} />
        </AddNewLibraryContext.Provider>
      </Provider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(continueFunction).toHaveBeenCalled();
  });

  it('should call goBackFunction on back button click', () => {
    const goBackFunction = jest.fn();
    render(
      <Provider store={store}>
        <AddNewLibraryContext.Provider value={[state, jest.fn()]}>
          <StepTwo active={true} continueFunction={jest.fn()} goBackFunction={goBackFunction} />
        </AddNewLibraryContext.Provider>
      </Provider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(goBackFunction).toHaveBeenCalled();
  });
});
