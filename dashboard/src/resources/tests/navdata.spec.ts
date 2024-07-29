import { describe, expect, it } from '@jest/globals';
import navData, { addNewLink, setNavData } from '../navData';

// Define the NavLink type
interface NavLink {
  href: string;
  title: string;
}

// Define the NavData type
interface NavData {
  navLinks: NavLink[];
}

// Sample data
const sampleLink1: NavLink = { href: '/home', title: 'Home' };
const sampleLink2: NavLink = { href: '/about', title: 'About' };
const sampleLink3: NavLink = { href: '/contact', title: 'Contact' };

describe('navData', () => {
  const initialState: NavData = {
    navLinks: [],
  };

  it('should update navLinks with setNavData', () => {
    const newNavLinks: NavLink[] = [sampleLink1, sampleLink2];
    const expectedState: NavData = { navLinks: newNavLinks };

    expect(navData(initialState, setNavData(newNavLinks))).toEqual(expectedState);
  });

  it('should add a new link with addNewLink', () => {
    const newLink: NavLink = sampleLink3;
    const currentState: NavData = { navLinks: [sampleLink1] };
    const expectedState: NavData = { navLinks: [sampleLink1, newLink] };

    expect(navData(currentState, addNewLink(newLink))).toEqual(expectedState);
  });

  it('should preserve existing links when adding a new one with addNewLink', () => {
    const currentState: NavData = { navLinks: [sampleLink1, sampleLink2] };
    const newLink: NavLink = sampleLink3;
    const expectedState: NavData = { navLinks: [...currentState.navLinks, newLink] };

    expect(navData(currentState, addNewLink(newLink))).toEqual(expectedState);
  });
});
