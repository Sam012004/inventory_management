import * as React from 'react';
import { AppBar, Toolbar, Typography, Avatar } from '@mui/material';
import { blue } from '@mui/material/colors';

interface HeaderProps {
  open: boolean;
}



const Header: React.FC<HeaderProps> = ({ open }) => {
  
  React.useEffect(() => {
    console.log("open=====>>>>", open);

  }, [open])
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${open ? 240 : 30}px)`,
        transition: 'width 0.3s ease',
        backgroundColor: 'white',
        color: 'black',
        boxShadow:"none"
      }}
    >
      <Toolbar sx={{ paddingLeft: "0px", boxShadow:"none"}}>
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
        <Avatar sx={{ bgcolor: blue[700] }}>A</Avatar>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
