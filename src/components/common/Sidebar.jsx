import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  useTheme,
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
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin, isBusinessUser } = useAuth();

  const adminMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: ROUTES.ADMIN_DASHBOARD },
    { text: 'Businesses', icon: <BusinessIcon />, path: ROUTES.ADMIN_BUSINESSES },
    { text: 'Create Business', icon: <AddBusiness />, path: ROUTES.ADMIN_CREATE_BUSINESS },
    { text: 'Create Application', icon: <AddCircle />, path: ROUTES.ADMIN_CREATE_APPLICATION },
      { text: 'Create Business User', icon: <PersonAddIcon />, path: ROUTES.ADMIN_CREATE_BUSINESS_USER },
    
  ];

  const businessMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: ROUTES.BUSINESS_DASHBOARD  },
    { text: 'Applications', icon: <AppsIcon />, path: ROUTES.BUSINESS_APPLICATIONS },
  ];

  const menuItems = isAdmin ? adminMenuItems : businessMenuItems;

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

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
          boxSizing: 'border-box',
          marginTop: '64px', // Adjust based on your Navbar height
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleNavigation(item.path)}
              sx={{
                backgroundColor: isActive(item.path) 
                  ? theme.palette.action.selected 
                  : 'transparent',
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon sx={{ color: isActive(item.path) ? theme.palette.primary.main : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: isActive(item.path) ? 600 : 400,
                  color: isActive(item.path) ? theme.palette.primary.main : 'inherit',
                }}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default Sidebar;

// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   Box,
//   useTheme,
//   Typography,
//   Avatar,
//   Chip,
// } from '@mui/material';
// import {
//   Dashboard as DashboardIcon,
//   Business as BusinessIcon,
//   Apps as AppsIcon,
//   AddBusiness,
//   AddCircle,
//   TrendingUp,
//   Settings,
// } from '@mui/icons-material';
// import { useAuth } from '../../context/AuthContext';
// import { ROUTES } from '../../utils/constants';

// const drawerWidth = 280;

// const Sidebar = ({ open, onClose }) => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isAdmin, isBusinessUser, user } = useAuth();

//   const adminMenuItems = [
//     { 
//       text: 'Dashboard', 
//       icon: <DashboardIcon />, 
//       path: ROUTES.ADMIN_DASHBOARD,
//       gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     },
//     { 
//       text: 'Businesses', 
//       icon: <BusinessIcon />, 
//       path: ROUTES.ADMIN_BUSINESSES,
//       gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
//     },
//     { 
//       text: 'Create Business', 
//       icon: <AddBusiness />, 
//       path: ROUTES.ADMIN_CREATE_BUSINESS,
//       gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
//     },
//     { 
//       text: 'Create Application', 
//       icon: <AddCircle />, 
//       path: ROUTES.ADMIN_CREATE_APPLICATION,
//       gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
//     },
//   ];

//   const businessMenuItems = [
//     { 
//       text: 'Dashboard', 
//       icon: <DashboardIcon />, 
//       path: ROUTES.BUSINESS_DASHBOARD,
//       gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     },
//     { 
//       text: 'Applications', 
//       icon: <AppsIcon />, 
//       path: ROUTES.BUSINESS_APPLICATIONS,
//       gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
//     },
//   ];

//   const menuItems = isAdmin ? adminMenuItems : businessMenuItems;

//   const handleNavigation = (path) => {
//     navigate(path);
//     if (window.innerWidth < 768) {
//       onClose();
//     }
//   };

//   const isActive = (path) => {
//     return location.pathname === path;
//   };

//   return (
//     <Drawer
//       variant={window.innerWidth >= 768 ? 'permanent' : 'temporary'}
//       open={open}
//       onClose={onClose}
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         '& .MuiDrawer-paper': {
//           width: drawerWidth,
//           boxSizing: 'border-box',
//           marginTop: '64px',
//           background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
//           borderRight: '1px solid #e0e0e0',
//           boxShadow: '4px 0 24px rgba(0, 0, 0, 0.06)',
//         },
//       }}
//     >
//       <Box sx={{ overflow: 'auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
//         {/* User Profile Section */}
//         <Box
//           sx={{
//             p: 3,
//             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//             color: 'white',
//             position: 'relative',
//             overflow: 'hidden',
//           }}
//         >
//           <Box
//             sx={{
//               position: 'absolute',
//               top: -20,
//               right: -20,
//               width: 100,
//               height: 100,
//               borderRadius: '50%',
//               background: 'rgba(255, 255, 255, 0.1)',
//             }}
//           />
//           <Box
//             sx={{
//               position: 'absolute',
//               bottom: -30,
//               left: -30,
//               width: 80,
//               height: 80,
//               borderRadius: '50%',
//               background: 'rgba(255, 255, 255, 0.1)',
//             }}
//           />
          
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, position: 'relative', zIndex: 1 }}>
//             <Avatar
//               sx={{
//                 width: 48,
//                 height: 48,
//                 background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
//                 fontWeight: 600,
//                 fontSize: '1.2rem',
//                 boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
//               }}
//             >
//               {user?.email?.[0]?.toUpperCase() || 'U'}
//             </Avatar>
//             <Box sx={{ flex: 1, minWidth: 0 }}>
//               <Typography variant="subtitle1" fontWeight={600} noWrap>
//                 {user?.email?.split('@')[0] || 'User'}
//               </Typography>
//               <Chip
//                 label={isAdmin ? 'Admin' : 'Business'}
//                 size="small"
//                 sx={{
//                   height: 20,
//                   fontSize: '0.7rem',
//                   backgroundColor: 'rgba(255, 255, 255, 0.2)',
//                   color: 'white',
//                   fontWeight: 600,
//                   mt: 0.5,
//                 }}
//               />
//             </Box>
//           </Box>
//         </Box>

//         {/* Navigation Section */}
//         <Box sx={{ p: 2, flex: 1 }}>
//           <Typography
//             variant="overline"
//             sx={{
//               px: 2,
//               py: 1,
//               color: 'text.secondary',
//               fontWeight: 700,
//               fontSize: '0.7rem',
//               letterSpacing: 1.5,
//             }}
//           >
//             NAVIGATION
//           </Typography>
          
//           <List sx={{ mt: 1 }}>
//             {menuItems.map((item, index) => {
//               const active = isActive(item.path);
//               return (
//                 <ListItem
//                   button
//                   key={item.text}
//                   onClick={() => handleNavigation(item.path)}
//                   sx={{
//                     borderRadius: 2,
//                     mb: 0.5,
//                     mx: 1,
//                     position: 'relative',
//                     overflow: 'hidden',
//                     transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//                     backgroundColor: active ? 'rgba(102, 126, 234, 0.08)' : 'transparent',
//                     '&:hover': {
//                       backgroundColor: active 
//                         ? 'rgba(102, 126, 234, 0.12)' 
//                         : 'rgba(0, 0, 0, 0.04)',
//                       transform: 'translateX(4px)',
//                     },
//                     '&::before': {
//                       content: '""',
//                       position: 'absolute',
//                       left: 0,
//                       top: 0,
//                       bottom: 0,
//                       width: 4,
//                       background: active ? item.gradient : 'transparent',
//                       borderRadius: '0 4px 4px 0',
//                       transition: 'all 0.3s ease',
//                     },
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 42,
//                       color: active ? '#667eea' : 'text.secondary',
//                       transition: 'all 0.3s ease',
//                       '& svg': {
//                         fontSize: '1.4rem',
//                         filter: active ? 'drop-shadow(0 2px 4px rgba(102, 126, 234, 0.3))' : 'none',
//                       },
//                     }}
//                   >
//                     {item.icon}
//                   </ListItemIcon>
//                   <ListItemText
//                     primary={item.text}
//                     primaryTypographyProps={{
//                       fontWeight: active ? 600 : 500,
//                       fontSize: '0.95rem',
//                       color: active ? '#667eea' : 'text.primary',
//                       transition: 'all 0.3s ease',
//                     }}
//                   />
//                   {active && (
//                     <Box
//                       sx={{
//                         width: 8,
//                         height: 8,
//                         borderRadius: '50%',
//                         background: item.gradient,
//                         boxShadow: '0 2px 8px rgba(102, 126, 234, 0.4)',
//                       }}
//                     />
//                   )}
//                 </ListItem>
//               );
//             })}
//           </List>
//         </Box>

//         <Divider sx={{ mx: 2 }} />

//         {/* Stats Section */}
       
//       </Box>
//     </Drawer>
//   );
// };

// export default Sidebar;