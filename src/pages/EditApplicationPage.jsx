// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Container, Box, Typography, Alert, CircularProgress, Button } from '@mui/material';
// import { ArrowBack } from '@mui/icons-material';
// import CreateApplication from '../components/admin/CreateApplication';
// import { adminService } from '../services/admin';

// const EditApplicationPage = () => {
//   const { appId } = useParams();
//   const navigate = useNavigate();
//   const [application, setApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchApplication();
//   }, [appId]);

//   const fetchApplication = async () => {
//     try {
//       setLoading(true);
//       const data = await adminService.getApplication(appId);
//       setApplication(data);
//     } catch (err) {
//       setError('Failed to load application details');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSuccess = () => {
//     navigate(-1); // Go back to previous page
//   };

//   if (loading) {
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
//       <Box sx={{ py: 4 }}>
//         <Button
//           startIcon={<ArrowBack />}
//           onClick={() => navigate(-1)}
//           sx={{ mb: 3 }}
//         >
//           Back
//         </Button>

//         {error && (
//           <Alert severity="error" sx={{ mb: 3 }}>
//             {error}
//           </Alert>
//         )}

//         {application && (
//           <CreateApplication 
//             application={application}
//             tenantId={application.tenantId}
//             isEditMode={true}
//             onSuccess={handleSuccess}
//           />
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default EditApplicationPage;

// src/pages/EditApplicationPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Alert, CircularProgress, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import CreateApplication from '../components/admin/CreateApplication';
import { adminService } from '../services/admin';

const EditApplicationPage = () => {
  const { appId } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplication();
  }, [appId]);

  const fetchApplication = async () => {
    try {
      setLoading(true);
      const data = await adminService.getApplication(appId);
      setApplication(data);
    } catch (err) {
      setError('Failed to load application details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          Back
        </Button>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {application && (
          <CreateApplication 
            application={application}
            tenantId={application.tenantId}
            isEditMode={true}
            onSuccess={handleSuccess}
          />
        )}
      </Box>
    </Container>
  );
};

export default EditApplicationPage;