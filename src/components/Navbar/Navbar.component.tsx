import { NavLink, setNavData } from '@/resources/navData';
import store, { IRootState } from '@/resources/store';
import { toggleDarkMode } from '@/resources/userSettings';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Settings from '@mui/icons-material/Settings';
import { Box, Button, Container, Link, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './Navbar.module.scss';

const Navbar = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const toggleMenu = () => setSettingsOpen(!settingsOpen);
  const openMenu = () => setSettingsOpen(true);
  const closeMenu = () => setSettingsOpen(false);
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
        {navList.length > 0 ?
          <>
            <Link href="/" sx={{ textTransform: 'capitalize' }}>
              Home
            </Link>
            {navList.map((link) => {
              return (
                <Link key={link.href} href={link.href} sx={{ textTransform: 'capitalize' }}>
                  {link.title}
                </Link>
              );
            })}
          </>
        : <Typography>Loading...</Typography>}
      </Box>

      <Box>
        <Menu open={settingsOpen} onClose={closeMenu}>
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
        <Button className="options-button" onClick={toggleMenu}>
          <Settings />
        </Button>
      </Box>
    </Container>
  );
};

export default Navbar;
