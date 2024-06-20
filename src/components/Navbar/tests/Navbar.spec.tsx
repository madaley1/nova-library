import { existingTemplates, standardTemplates } from '@/pages/api/libraries/create/mocks/GET.mock';
import { emptyNavValues, existingNavValues } from '@/pages/api/nav/mocks/index.mock';
import { setNavData } from '@/resources/navData';
import store from '@/resources/store';
import { toggleDarkMode } from '@/resources/userSettings';
import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RequestInit } from 'next/dist/server/web/spec-extension/request';
import React from 'react';
import { Provider } from 'react-redux';
import Navbar from '../Navbar.component';

const fetchResponse = jest.spyOn(global, 'fetch');
let navContainsValues = false;
const navValues = [
  {
    table_name: 'books',
  },
  {
    table_name: 'movies',
  },
];
function mockHandler(url: string | URL | Request): Promise<Response> {
  const path = (url as string).split(`${process.env.NEXT_PUBLIC_URL}/`)[1];
  if (path === 'api/nav') {
    return navContainsValues ? existingNavValues(navValues) : emptyNavValues;
  } else if (path === 'api/libraries/create') {
    return existingTemplates(standardTemplates);
  }
  return emptyNavValues;
}

fetchResponse.mockImplementation(mockHandler);

describe('Navbar', () => {
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

    console.info('starting test');

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

    const settingsButton = document.querySelector('[data-testid="SettingsIcon"]')?.parentElement;
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
