import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { FaHome, FaStore, FaBoxes } from 'react-icons/fa';
import { FaUserPlus } from 'react-icons/fa';
import { BsPersonWorkspace } from 'react-icons/bs';
import styles from "./Sidebar.module.css"

const drawerWidth = 240;

const icons = [
  <FaHome />,
  <FaStore />,
  <BsPersonWorkspace />,
  <FaBoxes />,
];

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    backgroundColor: 'rgb(156, 156, 233)',
    ...(open
      ? {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': {
            ...openedMixin(theme),
            backgroundColor: 'rgb(156, 156, 233)',
          },
        }
      : {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': {
            ...closedMixin(theme),
            backgroundColor: 'rgb(156, 156, 233)',
          },
        }),
  })
);

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
  onSettingsClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onToggle, onSettingsClick }) => {
  const userRole = localStorage.getItem('userRole');
  
  const drawerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
   
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
       
        onToggle();
      }
    };

    
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onToggle]);

  return (
    <Drawer variant="permanent" open={open} ref={drawerRef}>
      <DrawerHeader>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onToggle}
          edge="start"
          sx={{ marginLeft: 0.5 }}
        >
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </DrawerHeader>

      <List>
        {['Home', 'Vendor', 'Employees', 'Products'].map((text, index) => (
          <Tooltip key={text} title={text} arrow>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton 
                sx={[{
                  minHeight: 48,
                  px: 2.5,
                }, open ? { justifyContent: 'initial' } : { justifyContent: 'center' }]}
              >
                <ListItemIcon
                  sx={[{ minWidth: 0, justifyContent: 'center', fontSize: 'large' }, open ? { mr: 3 } : { mr: 'auto' }]}
                >
                  {icons[index]}
                </ListItemIcon>
                {open && <ListItemText primary={text} />}
              </ListItemButton>
            </ListItem>
          </Tooltip>
        ))}

        {userRole === 'admin' && (
          <Tooltip title="Settings" arrow>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={[{ minHeight: 48, px: 2.5 }, open ? { justifyContent: 'initial' } : { justifyContent: 'center' }]}
                onClick={onSettingsClick}
              >
                <ListItemIcon
                  sx={[{ minWidth: 0, justifyContent: 'center', fontSize: 'large' }, open ? { mr: 3 } : { mr: 'auto' }]}
                >
                  <FaUserPlus />
                </ListItemIcon>
                {open && <ListItemText primary="Settings" />}
              </ListItemButton>
            </ListItem>
          </Tooltip>
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
