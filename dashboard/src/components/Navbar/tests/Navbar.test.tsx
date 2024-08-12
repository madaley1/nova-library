import { existingTemplates, standardTemplates } from '@/pages/api/libraries/create/mocks/GET.mock';
import { emptyNavValues, existingNavValues } from '@/pages/api/nav/mocks/index.mock';
import store from '@/resources/store';
import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import Navbar from '../Navbar.component';

let navContainsValues = false;
const navValues = [{ table_name: 'books' }, { table_name: 'movies' }];

function mockHandler(url: string | URL | Request): Promise<Response> {
  const path = (url as string).split(`${process.env.NEXT_PUBLIC_API_URL}/`)[1];
  if (path === 'api/nav') {
    return navContainsValues ? existingNavValues(navValues) : emptyNavValues;
  } else if (path === 'api/libraries/create') {
    return existingTemplates(standardTemplates);
  }
  return emptyNavValues;
}

const fetchResponse = jest.spyOn(global, 'fetch');
fetchResponse.mockImplementation(mockHandler);

describe('Navbar Component Tests', () => {
  afterEach(() => {
    fetchResponse.mockClear();
  });

  it('should render the Navbar', async () => {
    navContainsValues = false;
    render(
      <Provider store={store}>
        <Navbar />
      </Provider>,
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should display "No Libraries Available" when there are no nav links', async () => {
    navContainsValues = false;
    render(
      <Provider store={store}>
        <Navbar />
      </Provider>,
    );
    await waitFor(() => expect(screen.getByText('No Libraries Available')).toBeInTheDocument());
  });

  it('should display navigation links when data is fetched', async () => {
    navContainsValues = true;
    render(
      <Provider store={store}>
        <Navbar />
      </Provider>,
    );
    await waitFor(() => {
      expect(screen.getByText('Books')).toBeInTheDocument();
      expect(screen.getByText('Movies')).toBeInTheDocument();
    });
  });

  it('should open and close the AddNewLibraryModal', async () => {
    render(
      <Provider store={store}>
        <Navbar />
      </Provider>,
    );

    const addButton = screen.getByRole('button', { name: /create new library/i });
    fireEvent.click(addButton);
    expect(screen.getByText('Create New Library')).toBeInTheDocument();
  });

  it('should toggle dark mode', async () => {
    render(
      <Provider store={store}>
        <Navbar />
      </Provider>,
    );

    const settingsButton = screen.getByTestId('SettingsIcon').parentElement;
    if (!settingsButton) throw new Error('button not found');
    fireEvent.click(settingsButton);
    await waitFor(() => expect(screen.getByText(/dark mode|light mode/i)).toBeInTheDocument());

    const darkModeToggle = screen.getByText(/dark mode|light mode/i);
    const currentDarkModeState = store.getState().userSettings.darkMode;
    fireEvent.click(darkModeToggle);
    await waitFor(() => {
      const state = store.getState();
      expect(state.userSettings.darkMode).toBe(!currentDarkModeState);
    });
  });

  it('should update the nav list when fetching data', async () => {
    render(
      <Provider store={store}>
        <Navbar />
      </Provider>,
    );

    await waitFor(() => {
      expect(store.getState().navData.navLinks).toEqual([
        { href: 'books', title: 'Books' },
        { href: 'movies', title: 'Movies' },
      ]);
    });
  });
});
