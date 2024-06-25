import { existingTemplates, standardTemplates } from '@/pages/api/libraries/create/mocks/GET.mock';
import store from '@/resources/store';
import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { AddNewLibraryModal } from '../AddNewLibrary.component';

function mockHandler(url: string | URL | Request): Promise<Response> {
  const path = (url as string).split(`${process.env.NEXT_PUBLIC_URL}/`)[1];
  if (path === 'api/libraries/create') {
    return existingTemplates(standardTemplates);
  }
  return existingTemplates(standardTemplates);
}

const fetchResponse = jest.spyOn(global, 'fetch');
fetchResponse.mockImplementation(mockHandler);

describe('AddNewLibraryModal', () => {
  it('should render the modal with the first step active', () => {
    render(
      <Provider store={store}>
        <AddNewLibraryModal open={true} closeModal={jest.fn()} />
      </Provider>,
    );

    expect(screen.getByText('Add New Library - Select Template')).toBeInTheDocument();
  });

  it('should transition from step one to step two', async () => {
    render(
      <Provider store={store}>
        <AddNewLibraryModal open={true} closeModal={jest.fn()} />
      </Provider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

    await waitFor(() => {
      expect(screen.getByText('Add New Library - Customize Library')).toBeInTheDocument();
    });
  });

  it('should transition from step two to step three', async () => {
    render(
      <Provider store={store}>
        <AddNewLibraryModal open={true} closeModal={jest.fn()} />
      </Provider>,
    );

    // Step one to step two
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

    // Step two to step three
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

    await waitFor(() => {
      expect(screen.getByText('Add New Library - Confirm Library')).toBeInTheDocument();
    });
  });

  it('should fetch templates on mount', async () => {
    render(
      <Provider store={store}>
        <AddNewLibraryModal open={true} closeModal={jest.fn()} />
      </Provider>,
    );

    await waitFor(() => {
      expect(store.getState().libraryData.templates).toBeTruthy();
    });
  });
});
