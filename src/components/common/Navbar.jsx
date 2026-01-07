// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   IconButton,
//   Menu,
//   MenuItem,
//   Avatar,
//   Box,
//   useTheme,
// } from '@mui/material';
// import {
//   Menu as MenuIcon,
//   AccountCircle,
//   Dashboard,
//   Business,
//   Apps,
//   ExitToApp,
// } from '@mui/icons-material';
// import { useAuth } from '../../context/AuthContext';
// import { ROUTES } from '../../utils/constants';

// const Navbar = ({ onMenuClick }) => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     logout();
//     navigate(ROUTES.LOGIN);
//     handleClose();
//   };

//   const handleProfile = () => {
//     navigate('/profile');
//     handleClose();
//   };

//   const getInitials = () => {
//     if (!user?.fullName) return user?.email?.charAt(0).toUpperCase() || 'U';
//     return user.fullName
//       .split(' ')
//       .map(name => name.charAt(0))
//       .join('')
//       .toUpperCase();
//   };

//   return (
//     <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
//       <Toolbar>
//         <IconButton
//           color="inherit"
//           aria-label="open drawer"
//           onClick={onMenuClick}
//           edge="start"
//           sx={{ mr: 2 }}
//         >
//           <MenuIcon />
//         </IconButton>
        
//         <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
//         Pinnacle CDP Business Onboarding Platform
//         </Typography>
        
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
//             {user?.fullName || user?.email}
//           </Typography>
          
//           <IconButton
//             size="large"
//             aria-label="account of current user"
//             aria-controls="menu-appbar"
//             aria-haspopup="true"
//             onClick={handleMenu}
//             color="inherit"
//           >
//             <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
//               {getInitials()}
//             </Avatar>
//           </IconButton>
          
//           <Menu
//             id="menu-appbar"
//             anchorEl={anchorEl}
//             anchorOrigin={{
//               vertical: 'bottom',
//               horizontal: 'right',
//             }}
//             keepMounted
//             transformOrigin={{
//               vertical: 'top',
//               horizontal: 'right',
//             }}
//             open={Boolean(anchorEl)}
//             onClose={handleClose}
//           >
//             <MenuItem onClick={handleProfile}>
//               <AccountCircle sx={{ mr: 1 }} /> Profile
//             </MenuItem>
//             <MenuItem onClick={handleLogout}>
//               <ExitToApp sx={{ mr: 1 }} /> Logout
//             </MenuItem>
//           </Menu>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/pinnale.jpg';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  useTheme,
  Badge,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Dashboard,
  Business,
  Apps,
  ExitToApp,
  Notifications,
  Settings,
  Person,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../utils/constants';

const Navbar = ({ onMenuClick }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
    handleClose();
  };

  const handleProfile = () => {
    navigate('/profile');
    handleClose();
  };

  const handleSettings = () => {
    navigate('/settings');
    handleClose();
  };

  const getInitials = () => {
    if (!user?.fullName) return user?.email?.charAt(0).toUpperCase() || 'U';
    return user.fullName
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: theme.zIndex.drawer + 1,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 4px 24px rgba(102, 126, 234, 0.25)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Toolbar sx={{ minHeight: '64px !important' }}>
        {/* Menu Button */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onMenuClick}
          edge="start"
          sx={{ 
            mr: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <MenuIcon />
        </IconButton>
        
        {/* Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
        
         <Box
           onClick={() => navigate(ROUTES.DASHBOARD)}
  sx={{
    width: 44,
    height: 44,
    borderRadius: 2,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
  }}
>
  <Box
    component="img"
    src={Logo}
    alt="Pinnacle Logo"
    sx={{
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      p: 0.5,
    }}
  />
</Box>
          <Box>
            <Typography 
              variant="h6" 
              noWrap 
              component="div" 
              sx={{ 
                fontWeight: 700,
                letterSpacing: 0.5,
                display: { xs: 'none', md: 'block' },
              }}
            >
              Pinnacle CDP
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                opacity: 0.9,
                display: { xs: 'none', lg: 'block' },
                fontSize: '0.7rem',
                letterSpacing: 0.5,
              }}
            >
              Business Onboarding Platform
            </Typography>
          </Box>
        </Box>
        



        {/* Right Side Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Role Badge */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              px: 2,
              py: 0.5,
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              mr: 1,
            }}
          >
            <Typography variant="caption" fontWeight={600} sx={{ fontSize: '0.75rem' }}>
              {isAdmin ? '👑 Admin' : '💼 Business User'}
            </Typography>
          </Box>

          {/* Notifications */}
          <IconButton 
            color="inherit"
            onClick={handleNotificationClick}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          {/* User Info */}
          <Box 
            sx={{ 
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 1.5,
              ml: 1,
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.2 }}>
                {user?.fullName || user?.email?.split('@')[0] || 'User'}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.7rem' }}>
                {user?.email}
              </Typography>
            </Box>
          </Box>
          
          {/* Profile Button */}
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{
              p: 0.5,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <Avatar 
              sx={{ 
                width: 38, 
                height: 38, 
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                fontWeight: 700,
                fontSize: '1rem',
                boxShadow: '0 4px 12px rgba(56, 249, 215, 0.3)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              {getInitials()}
            </Avatar>
          </IconButton>
        </Box>

        {/* Profile Menu */}
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{
            mt: 1.5,
            '& .MuiPaper-root': {
              borderRadius: 2,
              minWidth: 220,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            },
          }}
        >
          {/* User Info in Menu */}
          <Box sx={{ px: 2, py: 1.5, mb: 1 }}>
            <Typography variant="subtitle2" fontWeight={600}>
              {user?.fullName || 'User'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
          
          <Divider />

          <MenuItem 
            onClick={handleProfile}
            sx={{
              py: 1.5,
              '&:hover': {
                backgroundColor: 'rgba(102, 126, 234, 0.08)',
              },
            }}
          >
            <ListItemIcon>
              <Person fontSize="small" sx={{ color: '#667eea' }} />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2" fontWeight={500}>Profile</Typography>
            </ListItemText>
          </MenuItem>

          <MenuItem 
            onClick={handleSettings}
            sx={{
              py: 1.5,
              '&:hover': {
                backgroundColor: 'rgba(102, 126, 234, 0.08)',
              },
            }}
          >
            <ListItemIcon>
              <Settings fontSize="small" sx={{ color: '#4facfe' }} />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2" fontWeight={500}>Settings</Typography>
            </ListItemText>
          </MenuItem>

          <Divider sx={{ my: 1 }} />

          <MenuItem 
            onClick={handleLogout}
            sx={{
              py: 1.5,
              color: '#f5576c',
              '&:hover': {
                backgroundColor: 'rgba(245, 87, 108, 0.08)',
              },
            }}
          >
            <ListItemIcon>
              <ExitToApp fontSize="small" sx={{ color: '#f5576c' }} />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2" fontWeight={600}>Logout</Typography>
            </ListItemText>
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{
            mt: 1.5,
            '& .MuiPaper-root': {
              borderRadius: 2,
              minWidth: 320,
              maxWidth: 400,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            },
          }}
        >
          <Box sx={{ px: 2, py: 1.5, mb: 1 }}>
            <Typography variant="subtitle2" fontWeight={700}>
              Notifications
            </Typography>
          </Box>
          
          <Divider />

          <MenuItem 
            sx={{
              py: 2,
              px: 2,
              '&:hover': {
                backgroundColor: 'rgba(102, 126, 234, 0.08)',
              },
            }}
          >
            <Box>
              <Typography variant="body2" fontWeight={600}>
                New business created
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Acme Corp was added to the platform
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                2 hours ago
              </Typography>
            </Box>
          </MenuItem>

          <Divider />

          <MenuItem 
            sx={{
              py: 2,
              px: 2,
              '&:hover': {
                backgroundColor: 'rgba(102, 126, 234, 0.08)',
              },
            }}
          >
            <Box>
              <Typography variant="body2" fontWeight={600}>
                Application configured
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Salesforce integration is now active
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                5 hours ago
              </Typography>
            </Box>
          </MenuItem>

          <Divider />

          <MenuItem 
            sx={{
              py: 2,
              px: 2,
              '&:hover': {
                backgroundColor: 'rgba(102, 126, 234, 0.08)',
              },
            }}
          >
            <Box>
              <Typography variant="body2" fontWeight={600}>
                System update available
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Version 2.1.0 is ready to install
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                1 day ago
              </Typography>
            </Box>
          </MenuItem>

          <Divider />

          <MenuItem 
            sx={{ 
              justifyContent: 'center',
              py: 1.5,
              color: '#667eea',
              fontWeight: 600,
            }}
          >
            View All Notifications
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;