import { AddNewLibraryModal } from '@/components/libraryComponents/AddNewLibrary';
import { NavLink, setNavData } from '@/resources/navData';
import store, { IRootState } from '@/resources/store';
import { toggleDarkMode } from '@/resources/userSettings';
import AddIcon from '@mui/icons-material/Add';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Settings from '@mui/icons-material/Settings';
import { Box, Button, Container, Link, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './Navbar.module.scss';

const Navbar = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const toggleSettings = () => setSettingsOpen(!settingsOpen);
  // const openSettings = () => setSettingsOpen(true);
  const closeSettings = () => setSettingsOpen(false);

  const [addNewLibraryOpen, setNewLibraryOpen] = useState(false);
  // const toggleAddNewLibrary = () => setNewLibraryOpen(!addNewLibraryOpen);
  const openAddNewLibrary = () => setNewLibraryOpen(true);
  const closeAddNewLibrary = () => setNewLibraryOpen(false);

  const dispatch = useDispatch();
  const navList: NavLink[] = useSelector((state: IRootState) => {
    return state.navData.navLinks;
  });

  const getNavList = async () => {
    const getTableList = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/nav`);
    if (getTableList.status !== 200) return;
    const processTableList = await getTableList.json();
    const newNavList = processTableList.map((data: Record<string, string>) => {
      if (!data.table_name) return {};
      return {
        href: data.table_name,
        title: data.table_name.split('_').join(' '),
      };
    });
    navList === newNavList ? null : dispatch(setNavData(newNavList));
  };

  useEffect(() => {
    getNavList();
  }, []);

  return (
    <Container className={style.Navbar}>
      <Box className={style.LinkBox}>
        <Link href="/" sx={{ textTransform: 'capitalize' }}>
          Home
        </Link>
        {navList.length > 0 ?
          <>
            {navList.map((link) => {
              return (
                <Link key={link.href} href={link.href} sx={{ textTransform: 'capitalize' }}>
                  {link.title}
                </Link>
              );
            })}
          </>
        : <Typography>No Libraries Available</Typography> || <Typography>Loading...</Typography>}
        <Button
          sx={{ display: 'flex', flexFlow: 'row nowrap', textWrap: 'nowrap', width: 'max-content' }}
          onClick={openAddNewLibrary}
        >
          <AddIcon /> Create New Library
        </Button>
        <AddNewLibraryModal open={addNewLibraryOpen} closeModal={closeAddNewLibrary} />
      </Box>

      <Box>
        <Menu open={settingsOpen} onClose={closeSettings}>
          <MenuItem
            onClick={() => {
              dispatch(toggleDarkMode());
            }}
          >
            <ListItemIcon>
              <Brightness4Icon />
            </ListItemIcon>
            {store.getState().userSettings.darkMode ? 'Dark Mode' : 'Light Mode'}
          </MenuItem>
        </Menu>
        <Button className="options-button" onClick={toggleSettings}>
          <Settings />
        </Button>
      </Box>
    </Container>
  );
};

export default Navbar;
