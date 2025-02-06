import * as React from 'react';
import { AppBar, Toolbar, Typography, Avatar, IconButton, Menu, MenuItem, Divider } from '@mui/material';
import { blue } from '@mui/material/colors';
import { IoIosSettings } from "react-icons/io";
import { FaUserPlus } from 'react-icons/fa';
import styles from "./Header.module.css";

interface HeaderProps {
  open: boolean;
  onUserAddClick: () => void; // Function to handle user add action
}

const Header: React.FC<HeaderProps> = ({ open, onUserAddClick }) => {
  // State to manage the menu open/close
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // Handle menu toggle
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${open ? 240 : 30}px)`,
        transition: 'width 0.3s ease',
        backgroundColor: 'white',
        color: 'black',
        boxShadow: "none"
      }}
    >
      <Toolbar sx={{ paddingLeft: "0px", boxShadow: "none" }}>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            paddingLeft: open ? "0px" : "25px",
            transition: 'padding-left 0.3s ease',
          }}
        >
          Inventory Management
        </Typography>

        <IconButton onClick={handleMenuClick}>
          <IoIosSettings />
        </IconButton>

        {/* Menu for settings */}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={Boolean(anchorEl)}  
          onClose={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} 
        >
          <MenuItem onClick={onUserAddClick}> {/* Call the passed function when clicked */}
            <FaUserPlus style={{ marginRight: 10 }} />
            Add User
          </MenuItem>
        </Menu>

        <Avatar className={styles.avatar} sx={{ bgcolor: blue[700] }}>A</Avatar>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
