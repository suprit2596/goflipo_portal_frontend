// // // import React from 'react';
// // // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // // import { AuthProvider } from './context/AuthContext';
// // // import ProtectedRoute from './components/common/ProtectedRoute';
// // // import { USER_ROLES } from './utils/constants';
// // // import CreateBusinessUser from './components/admin/CreateBusinessUser';
// // // // Pages
// // // import Login from './pages/Login';
// // // import AdminLayout from './pages/AdminLayout';
// // // import BusinessLayout from './pages/BusinessLayout';
// // // import AdminDashboardPage from './pages/AdminDashboard';
// // // import BusinessDashboardPage from './pages/BusinessDashboard';
// // // import BusinessesPage from './pages/Businesses';
// // // import CreateBusinessPage from './pages/CreateBusinessPage';
// // // import CreateApplicationPage from './pages/CreateApplicationPage';
// // // import NotFound from './pages/NotFound';
// // // import EditApplicationPage from './pages/EditApplicationPage';
// // // import EditUserPage from './pages/EditUserPage';
// // // // Business User Pages
// // // import ApplicationList from './components/business/ApplicationList';
// // // import EditBusinessPage from './pages/EditBusinessPage';
// // // import BusinessDetailPage from './pages/BusinessDetailPage';
// // // import BusinessUsersPage from './pages/BusinessUsersPage';
// // // function App() {
// // //   return (
// // //     <AuthProvider>
// // //       <Router>
// // //         <Routes>
// // //           {/* Public Routes */}
// // //           <Route path="/login" element={<Login />} />

// // //           {/* Admin Routes */}
// // //           <Route path="/admin" element={
// // //             <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
// // //               <AdminLayout />
// // //             </ProtectedRoute>
// // //           }>
// // //             <Route index element={<Navigate to="dashboard" replace />} />
// // //             <Route path="dashboard" element={<AdminDashboardPage />} />

// // //             {/* Business Routes */}
// // //             <Route path="businesses" element={<BusinessesPage />} />
// // //             <Route path="businesses/create" element={<CreateBusinessPage />} />
// // //             <Route path="businesses/:tenantId" element={<BusinessDetailPage />} /> {/* FIXED */}
// // //             <Route path="businesses/:tenantId/edit" element={<EditBusinessPage />} /> {/* FIXED */}
// // //             <Route path="businesses/:tenantId/users/create" element={<div>Create Business User Page</div>} />
// // //             <Route path="businesses/:tenantId/create-user" element={<CreateBusinessUser />} />
// // //             <Route path="businesses/:tenantId/create-user" element={<CreateBusinessUser />} />
// // //             <Route path="businesses/:tenantId/users" element={<BusinessUsersPage />} />
// // //             <Route path="users/:userId/edit" element={<EditUserPage />} />
// // //             {/* Application Routes */}
// // //             <Route path="business/:tenantId/applications/create" element={<CreateApplicationPage />} />
// // //             <Route path="applications/:appId/edit" element={<EditApplicationPage />} />
// // //             <Route path="applications/create" element={<CreateApplicationPage />} />

// // //             {/* Remove these duplicate routes: */}
// // //             {/* 
// // //             <Route path="businesses/:tenantId" element={<div>Business Detail Page</div>} /> // DUPLICATE
// // //             <Route path="businesses/:tenantId/edit" element={<div>Edit Business Page</div>} /> // DUPLICATE
// // //             */}
// // //           </Route>

// // //           {/* Business User Routes */}
// // //           <Route path="/business" element={
// // //             <ProtectedRoute allowedRoles={[USER_ROLES.BUSINESS_USER]}>
// // //               <BusinessLayout />
// // //             </ProtectedRoute>
// // //           }>
// // //             <Route index element={<Navigate to="dashboard" replace />} />
// // //             <Route path="dashboard" element={<BusinessDashboardPage />} />
// // //             <Route path="applications" element={<ApplicationList />} />
// // //             <Route path="applications/:appId" element={<div>Application Detail Page</div>} />
// // //             <Route path="profile" element={<div>Profile Page</div>} />
// // //           </Route>

// // //           {/* Default Route */}
// // //           <Route path="/" element={
// // //             <ProtectedRoute>
// // //               <NavigateToDashboard />
// // //             </ProtectedRoute>
// // //           } />

// // //           {/* 404 Route */}
// // //           <Route path="*" element={<NotFound />} />
// // //         </Routes>
// // //       </Router>
// // //     </AuthProvider>
// // //   );
// // // }
// // // const NavigateToDashboard = () => {
// // //   const user = JSON.parse(localStorage.getItem('user'));

// // //   if (user?.role === USER_ROLES.ADMIN) {
// // //     return <Navigate to="/admin/dashboard" replace />;
// // //   } else if (user?.role === USER_ROLES.BUSINESS_USER) {
// // //     return <Navigate to="/business/dashboard" replace />;
// // //   }

// // //   return <Navigate to="/login" replace />;
// // // };

// // // export default App;

// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import { AuthProvider } from './context/AuthContext';
// // import ProtectedRoute from './components/common/ProtectedRoute';
// // import { USER_ROLES } from './utils/constants';
// // import CreateBusinessUser from './components/admin/CreateBusinessUser';

// // // Pages
// // import Login from './pages/Login';
// // import AdminLayout from './pages/AdminLayout';
// // import BusinessLayout from './pages/BusinessLayout';
// // import AdminDashboardPage from './pages/AdminDashboard';
// // import BusinessDashboardPage from './pages/BusinessDashboard';
// // import BusinessesPage from './pages/Businesses';
// // import CreateBusinessPage from './pages/CreateBusinessPage';
// // import CreateApplicationPage from './pages/CreateApplicationPage';
// // import NotFound from './pages/NotFound';
// // import EditApplicationPage from './pages/EditApplicationPage';
// // import EditUserPage from './pages/EditUserPage';

// // // Business User Pages
// // import ApplicationList from './components/business/ApplicationList';
// // import EditBusinessPage from './pages/EditBusinessPage';
// // import BusinessDetailPage from './pages/BusinessDetailPage';
// // import BusinessUsersPage from './pages/BusinessUsersPage';

// // function App() {
// //   return (
// //     <AuthProvider>
// //       <Router>
// //         <Routes>

// //           {/* ✅ DEFAULT: Always open login */}
// //           <Route path="/" element={<Navigate to="/login" replace />} />

// //           {/* Public Routes */}
// //           <Route path="/login" element={<Login />} />

// //           {/* ================= ADMIN ROUTES ================= */}
// //           <Route
// //             path="/admin"
// //             element={
// //               <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
// //                 <AdminLayout />
// //               </ProtectedRoute>
// //             }
// //           >
// //             <Route index element={<Navigate to="dashboard" replace />} />
// //             <Route path="dashboard" element={<AdminDashboardPage />} />

// //             {/* Business Management */}
// //             <Route path="businesses" element={<BusinessesPage />} />
// //             <Route path="businesses/create" element={<CreateBusinessPage />} />
// //             <Route path="businesses/:tenantId" element={<BusinessDetailPage />} />
// //             <Route path="businesses/:tenantId/edit" element={<EditBusinessPage />} />
// //             <Route path="businesses/:tenantId/create-user" element={<CreateBusinessUser />} />
// //             <Route path="businesses/:tenantId/users" element={<BusinessUsersPage />} />

// //             {/* User & Application Management */}
// //             <Route path="users/:userId/edit" element={<EditUserPage />} />
// //             <Route path="business/:tenantId/applications/create" element={<CreateApplicationPage />} />
// //             <Route path="applications/:appId/edit" element={<EditApplicationPage />} />
// //             <Route path="applications/create" element={<CreateApplicationPage />} />
// //           </Route>

// //           {/* ================= BUSINESS USER ROUTES ================= */}
// //           <Route
// //             path="/business"
// //             element={
// //               <ProtectedRoute allowedRoles={[USER_ROLES.BUSINESS_USER]}>
// //                 <BusinessLayout />
// //               </ProtectedRoute>
// //             }
// //           >
// //             <Route index element={<Navigate to="dashboard" replace />} />
// //             <Route path="dashboard" element={<BusinessDashboardPage />} />
// //             <Route path="applications" element={<ApplicationList />} />
// //             <Route path="applications/:appId" element={<div>Application Detail Page</div>} />
// //             <Route path="profile" element={<div>Profile Page</div>} />
// //           </Route>

// //           {/* 404 */}
// //           <Route path="*" element={<NotFound />} />

// //         </Routes>
// //       </Router>
// //     </AuthProvider>
// //   );
// // }

// // export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './components/common/ProtectedRoute';
// import { USER_ROLES } from './utils/constants';
// import CreateBusinessUser from './components/admin/CreateBusinessUser';

// // Pages
// import Login from './pages/Login';
// import ChangePassword from './pages/ChangePassword'; // NEW
// import AdminLayout from './pages/AdminLayout';
// import BusinessLayout from './pages/BusinessLayout';
// import AdminDashboardPage from './pages/AdminDashboard';
// import BusinessDashboardPage from './pages/BusinessDashboard';
// import BusinessesPage from './pages/Businesses';
// import CreateBusinessPage from './pages/CreateBusinessPage';
// import CreateApplicationPage from './pages/CreateApplicationPage';
// import NotFound from './pages/NotFound';
// import EditApplicationPage from './pages/EditApplicationPage';
// import EditUserPage from './pages/EditUserPage';

// // Business User Pages
// import ApplicationList from './components/business/ApplicationList';
// import EditBusinessPage from './pages/EditBusinessPage';
// import BusinessDetailPage from './pages/BusinessDetailPage';
// import BusinessUsersPage from './pages/BusinessUsersPage';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>

//           {/* ✅ DEFAULT: Always open login */}
//           <Route path="/" element={<Navigate to="/login" replace />} />

//           {/* Public Routes */}
//           <Route path="/login" element={<Login />} />

//           {/* Password Change Route (Public for first login) */}
//           <Route path="/change-password" element={<ChangePassword />} />

//           {/* ================= ADMIN ROUTES ================= */}
//           <Route
//             path="/admin"
//             element={
//               <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
//                 <AdminLayout />
//               </ProtectedRoute>
//             }
//           >
//             <Route index element={<Navigate to="dashboard" replace />} />
//             <Route path="dashboard" element={<AdminDashboardPage />} />

//             {/* Business Management */}
//             <Route path="businesses" element={<BusinessesPage />} />
//             <Route path="businesses/create" element={<CreateBusinessPage />} />
//             <Route path="businesses/:tenantId" element={<BusinessDetailPage />} />
//             <Route path="businesses/:tenantId/edit" element={<EditBusinessPage />} />
//             <Route path="businesses/:tenantId/create-user" element={<CreateBusinessUser />} />
//             <Route path="businesses/:tenantId/users" element={<BusinessUsersPage />} />

//             {/* User & Application Management */}
//             <Route path="users/:userId/edit" element={<EditUserPage />} />
//             <Route path="business/:tenantId/applications/create" element={<CreateApplicationPage />} />
//             <Route path="applications/:appId/edit" element={<EditApplicationPage />} />
//             <Route path="applications/create" element={<CreateApplicationPage />} />
//           </Route>

//           {/* ================= BUSINESS USER ROUTES ================= */}
//           <Route
//             path="/business"
//             element={
//               <ProtectedRoute allowedRoles={[USER_ROLES.BUSINESS_USER]}>
//                 <BusinessLayout />
//               </ProtectedRoute>
//             }
//           >
//             <Route index element={<Navigate to="dashboard" replace />} />
//             {/* <Route path="/business/dashboard" element={<BusinessDashboardPage />} /> */}
//             <Route path="dashboard" element={<BusinessDashboardPage />} />
//             <Route path="applications" element={<ApplicationList />} />
//             <Route path="applications/:appId" element={<div>Application Detail Page</div>} />
//             <Route path="profile" element={<div>Profile Page</div>} />
//             <Route path="change-password" element={<ChangePassword />} />
//           </Route>

//           {/* 404 */}
//           <Route path="*" element={<NotFound />} />

//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import { USER_ROLES } from './utils/constants';
import CreateBusinessUser from './components/admin/CreateBusinessUser';

// Pages
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import AdminLayout from './pages/AdminLayout';
import BusinessLayout from './pages/BusinessLayout';
import AdminDashboardPage from './pages/AdminDashboard';
import BusinessDashboardPage from './pages/BusinessDashboard';
import BusinessesPage from './pages/Businesses';
import CreateBusinessPage from './pages/CreateBusinessPage';
import CreateApplicationPage from './pages/CreateApplicationPage';
import NotFound from './pages/NotFound';
import EditApplicationPage from './pages/EditApplicationPage';
import EditUserPage from './pages/EditUserPage';
import AdminSubscribers from './pages/AdminSubscribers';
// Business User Pages
import ApplicationList from './components/business/ApplicationList';
import EditBusinessPage from './pages/EditBusinessPage';
import BusinessDetailPage from './pages/BusinessDetailPage';
import BusinessUsersPage from './pages/BusinessUsersPage';
import BusinessTransactions from './pages/BusinessTransactions';
import AdminAuditLogs from './pages/AdminAuditLogs';   // ✅ import new page
import BusinessAuditLogs from './pages/BusinessAuditLogs';
import BusinessUsers from './pages/BusinessUsers';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ✅ DEFAULT: Always open login */}
          <Route path="/" element={<Navigate to="/admin-login" replace />} />

          {/* Public Routes */}
          <Route path="/admin-login" element={<Login user="ADMIN"/>} />
          <Route path="/business-login" element={<Login user="BUSINESS_USER"/>} />
          <Route path="/change-password" element={<ChangePassword />} />

          {/* ================= ADMIN ROUTES ================= */}
          <Route
            path="/admin" //route path fixed
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                {/* what to render */}
                <AdminLayout />   
              </ProtectedRoute>
            }
          >
            {/* child routes are relative to "/admin"  */}
            <Route index element={<Navigate to="dashboard" replace />} />
            {/* //by default if /admin is it  go to dashboard or admin/dashboard  */}
            
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="businesses" element={<BusinessesPage />} />
            <Route path="businesses/create" element={<CreateBusinessPage />} />
            <Route path="businesses/:tenantId" element={<BusinessDetailPage />} />
            <Route path="businesses/:tenantId/edit" element={<EditBusinessPage />} />
            <Route path="businesses/:tenantId/create-user" element={<CreateBusinessUser />} />
            <Route path="businesses/:tenantId/users" element={<BusinessUsers />} />
            <Route path="users/:userId/edit" element={<EditUserPage />} />
            <Route path="business/:tenantId/applications/create" element={<CreateApplicationPage />} />
            <Route path="applications/:appId/edit" element={<EditApplicationPage />} />
            <Route path="applications/create" element={<CreateApplicationPage />} />
            <Route path="subscribers" element={<AdminSubscribers />} />
            <Route path="logs" element={<AdminAuditLogs />} />
           
          </Route>

          {/* ================= BUSINESS USER ROUTES ================= */}
          <Route
            path="/business"
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.BUSINESS_USER]}>
                <BusinessLayout />
              </ProtectedRoute>
            }
          >
            {/* FIXED: All child routes are relative to "/business" */}
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<BusinessDashboardPage />} />
            <Route path="applications" element={<ApplicationList />} />
            <Route path="applications/:appId" element={<div>Application Detail Page</div>} />
            <Route path="profile" element={<div>Profile Page</div>} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="transactions" element={<BusinessTransactions />} />
            <Route path="subscribers" element={<AdminSubscribers />} />
            <Route path="audit-logs" element={<AdminAuditLogs />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;