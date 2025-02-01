import * as React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Sidebar from './SideBar';
import Header from './Header';
import SettingsTable from '../components/SettingsTable';

function HomePage() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [showTable, setShowTable] = React.useState(false); 

  const handleDrawerToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleSettingsClick = () => {
    setShowTable((prevState) => !prevState); 
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar open={open} onToggle={handleDrawerToggle} onSettingsClick={handleSettingsClick} />
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

        {showTable && <SettingsTable />}
      </Box>
    </Box>
  );
}

export default HomePage;
