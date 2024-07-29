import { describe, expect, it } from '@jest/globals';

import userSettings, { setDarkMode, toggleDarkMode } from '../userSettings';

describe('userSettings', () => {
  it('toggleDarkMode', () => {
    expect(userSettings({ darkMode: false }, toggleDarkMode())).toEqual({ darkMode: true });
    expect(userSettings({ darkMode: true }, toggleDarkMode())).toEqual({ darkMode: false });
  });
  it('setDarkMode', () => {
    expect(userSettings({ darkMode: false }, setDarkMode(true))).toEqual({ darkMode: true });
    expect(userSettings({ darkMode: true }, setDarkMode(false))).toEqual({ darkMode: false });
  });
});
