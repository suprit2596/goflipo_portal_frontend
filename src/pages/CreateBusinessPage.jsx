// // import React from 'react';
// // import CreateBusiness from '../components/admin/CreateBusiness';

// // const CreateBusinessPage = () => {
// //   return <CreateBusiness />;
// // };

// // export default CreateBusinessPage;
// // Update your CreateBusinessPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Container, Box, Typography, Alert, CircularProgress, Button } from '@mui/material';
// import { ArrowBack } from '@mui/icons-material';
// import CreateBusiness from '../components/admin/CreateBusiness';
// import { adminService } from '../services/admin';

// const CreateBusinessPage = () => {
//   const { tenantId } = useParams();
//   const navigate = useNavigate();
//   const [business, setBusiness] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const isEditMode = !!tenantId;

//   useEffect(() => {
//     if (isEditMode) {
//       fetchBusiness();
//     }
//   }, [tenantId]);

//   const fetchBusiness = async () => {
//     try {
//       setLoading(true);
//       const data = await adminService.getBusiness(tenantId);
//       setBusiness(data);
//     } catch (err) {
//       setError('Failed to load business details');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSuccess = () => {
//     navigate('/admin/businesses');
//   };

//   if (loading && isEditMode) {
//     return (
//       <Container maxWidth="lg">
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
//           <CircularProgress />
//         </Box>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg">
//       <Box sx={{ py: 0 }}>
//         <Button
//           startIcon={<ArrowBack />}
//           onClick={() => navigate('/admin/businesses')}
//           sx={{ mb: 3 }}
//         >
//           Back to Businesses
//         </Button>

//         <Typography variant="h4" sx={{ mb: 3 }}>
//           {isEditMode ? 'Edit Business' : 'Create New Business'}
//         </Typography>

//         {error && (
//           <Alert severity="error" sx={{ mb: 3 }}>
//             {error}
//           </Alert>
//         )}

//         <CreateBusiness 
//           business={business} 
//           isEditMode={isEditMode}
//           onSuccess={handleSuccess}
//         />
//       </Box>
//     </Container>
//   );
// };

// export default CreateBusinessPage;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Button,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import CreateBusiness from '../components/admin/CreateBusiness';
import { adminService } from '../services/admin';

const CreateBusinessPage = () => {
  const { tenantId } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isEditMode = Boolean(tenantId);

  useEffect(() => {
    if (isEditMode) fetchBusiness();
  }, [tenantId]);

  const fetchBusiness = async () => {
    try {
      setLoading(true);
      const data = await adminService.getBusiness(tenantId);
      setBusiness(data);
    } catch {
      setError('Failed to load business details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 2 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/admin/businesses')}
          sx={{ mb: 1 }}
        >
          Back
        </Button>

        <Typography variant="h5" sx={{ mb: 2 }}>
          {isEditMode ? 'Edit Business' : 'Create Business'}
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        {loading && isEditMode ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <CreateBusiness
            business={business}
            isEditMode={isEditMode}
            onSuccess={() => navigate('/admin/businesses')}
          />
        )}
      </Box>
    </Container>
  );
};

export default CreateBusinessPage;
