import store from '@/resources/store';
import { toggleDarkMode } from '@/resources/userSettings';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Settings from '@mui/icons-material/Settings';
import { Box, Button, Container, Link, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import style from './Navbar.module.scss';

const Navbar = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const toggleMenu = () => setSettingsOpen(!settingsOpen);
  const openMenu = () => setSettingsOpen(true);
  const closeMenu = () => setSettingsOpen(false);

  const dispatch = useDispatch();

  return (
    <Container className={style.Navbar}>
      <Box className={style.LinkBox}>
        <Link href="/">Home</Link>
        <Link href="/books">Books</Link>
      </Box>

      <Box>
        <Menu open={settingsOpen} onClose={closeMenu}>
          <MenuItem onClick={() => dispatch(toggleDarkMode())}>
            <ListItemIcon>
              <Brightness4Icon />
            </ListItemIcon>
            {store.getState().userSettings.darkMode ? 'Dark Mode' : 'Light Mode'}
          </MenuItem>
        </Menu>
        <Button className="options-button" onClick={toggleMenu}>
          <Settings />
        </Button>
      </Box>
    </Container>
  );
};

export default Navbar;
