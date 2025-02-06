import * as React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Sidebar from './SideBar';
import Header from './Header';
import SettingsTable from '../components/SettingsTable';
import ProductTable from '../components/Product';

function HomePage() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [showTable, setShowTable] = React.useState(false); 
  const [productpage, setProductPage] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleUserAddClick = () => {
    setProductPage(false);
    setShowTable(true); // Show the settings table when "Add User" is clicked
  };

  const handleProductPage = () => {
    setShowTable(false);
    setProductPage(true); // Show the product table when needed
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar
        open={open}
        onToggle={handleDrawerToggle}
        onSettingsClick={handleUserAddClick} // Optionally pass this function to Sidebar as well if needed
        onProductPage={handleProductPage}
      />
      <Header open={open} onUserAddClick={handleUserAddClick} /> {/* Pass the function here */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 0,
          marginTop: theme.spacing(8),
        }}
      >
        {showTable && <SettingsTable />}
        {productpage && <ProductTable />}
      </Box>
    </Box>
  );
}

export default HomePage;
