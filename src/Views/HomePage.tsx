import * as React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Sidebar from './SideBar';
import Header from './Header';

function HomePage() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Sidebar open={open} onToggle={handleDrawerToggle} />
      <Header open={open} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 0,
          marginTop: theme.spacing(8),
        }}
      >
        <h1>Here are some of the product details</h1>
      </Box>
    </Box>
  );
}

export default HomePage;
