import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar, useTheme, useMediaQuery } from '@mui/material';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import { useAuth } from '../context/AuthContext';
import { USER_ROLES } from '../utils/constants';
const AdminLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Only render if user is admin
  // if (!user || user.role !== 'ADMIN') {
  //   return null;
  // }
  if (!user || user.role !== USER_ROLES.ADMIN) {
  return null;
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar onMenuClick={handleDrawerToggle} />
      
      <Sidebar 
        open={mobileOpen} 
        onClose={() => setMobileOpen(false)} 
      />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${240}px)` },
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        <Toolbar /> {/* Spacer for fixed AppBar */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;