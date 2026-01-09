import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Business as BusinessIcon,
  Apps as AppsIcon,
  AddBusiness,
  AddCircle,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../utils/constants';

const drawerWidth = 240;

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin } = useAuth();

  const adminMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: ROUTES.ADMIN_DASHBOARD },
    { text: 'Businesses', icon: <BusinessIcon />, path: ROUTES.ADMIN_BUSINESSES },
    { text: 'Create Business', icon: <AddBusiness />, path: ROUTES.ADMIN_CREATE_BUSINESS },
    { text: 'Create Application', icon: <AddCircle />, path: ROUTES.ADMIN_CREATE_APPLICATION },
    { text: 'Create Business User', icon: <PersonAddIcon />, path: ROUTES.ADMIN_CREATE_BUSINESS_USER },
  ];

  const businessMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: ROUTES.BUSINESS_DASHBOARD },
    { text: 'Applications', icon: <AppsIcon />, path: ROUTES.BUSINESS_APPLICATIONS },
  ];

  const menuItems = isAdmin ? adminMenuItems : businessMenuItems;

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 768) onClose();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Drawer
      variant={window.innerWidth >= 768 ? 'permanent' : 'temporary'}
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          marginTop: '64px',
          boxSizing: 'border-box',
          borderRight: 'none',
          background:
            'linear-gradient(180deg, #f8fbff 0%, #eef5ff 60%, #e6f0ff 100%)',
          boxShadow: '4px 0 20px rgba(49,130,206,0.08)',
        },
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* BRAND / SECTION HEADER */}
        <Box sx={{ px: 3, pt: 3, pb: 2 }}>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#4a5568',
              textTransform: 'uppercase',
            }}
          >
            Navigation
          </Typography>
        </Box>

        <List sx={{ px: 1 }}>
          {menuItems.map((item) => {
            const active = isActive(item.path);

            return (
              <ListItemButton
                key={item.text}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  mb: 0.5,
                  borderRadius: '10px',
                  px: 2,
                  py: 1.2,
                  position: 'relative',
                  overflow: 'hidden',

                  /* Active Indicator Strip */
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 6,
                    bottom: 6,
                    width: '4px',
                    borderRadius: '0 4px 4px 0',
                    backgroundColor: active ? '#3182ce' : 'transparent',
                    transition: 'all 0.25s ease',
                  },

                  background: active
                    ? 'linear-gradient(90deg, rgba(49,130,206,0.12), rgba(49,130,206,0.04))'
                    : 'transparent',

                  '&:hover': {
                    background:
                      'linear-gradient(90deg, rgba(49,130,206,0.10), rgba(49,130,206,0.02))',
                    transform: 'translateX(2px)',
                  },

                  transition: 'all 0.25s ease',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: 'inherit', // 👈 keep default icon colors
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: active ? 600 : 500,
                    fontFamily: "'Inter','Segoe UI',sans-serif",
                    color: active ? '#1a365d' : '#2d3748',
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>

        <Divider sx={{ my: 2, mx: 2 }} />

        {/* FOOTER (optional future use) */}
        <Box sx={{ mt: 'auto', px: 3, pb: 2 }}>
          <Typography
            sx={{
              fontSize: 11,
              color: '#4b8ff6ff',
              textAlign: 'center',
            }}
          >
            © Pinnacle Admin
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
