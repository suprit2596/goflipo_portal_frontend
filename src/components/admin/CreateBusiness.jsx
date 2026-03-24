import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { adminService } from '../../services/admin';
import { BUSINESS_STATUS } from '../../utils/constants';

/* ---------------- VALIDATION ---------------- */
const validationSchema = Yup.object({
  businessName: Yup.string().required().min(2).max(100),
  industry: Yup.string().required(),
  contactEmail: Yup.string().email().required(),
  emergencyContactNo: Yup.string().matches(/^[0-9]+$/).min(7).max(15).required(),
  websiteUrl: Yup.string().url().required(),
  accountStatus: Yup.string().required(),
  authType: Yup.string().oneOf(['IN_APP', 'TOTP']).required('Auth Type is required'),
});

const CreateBusiness = ({ business, isEditMode = false, onSuccess }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const formik = useFormik({
    initialValues: {
      businessName: '',
      industry: '',
      contactEmail: '',
      emergencyContactNo: '',
      websiteUrl: '',
      accountStatus: BUSINESS_STATUS.ACTIVE,
      authType: 'IN_APP',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError('');
        setSuccess('');

        if (isEditMode) {
          await adminService.updateBusiness(business._id, values);
        } else {
          await adminService.createBusiness(values);
        }

        setSuccess(isEditMode ? 'Business updated successfully!' : 'Business created successfully!');
        setTimeout(() => onSuccess?.(), 1200);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    },
  });

  // ✅ Populate form when in edit mode and business data is available
  useEffect(() => {
    if (isEditMode && business) {
      formik.setValues({
        businessName: business.businessName || '',
        industry: business.industry || '',
        contactEmail: business.contactEmail || '',
        emergencyContactNo: business.emergencyContactNo || '',
        websiteUrl: business.websiteUrl || '',
        accountStatus: business.accountStatus || BUSINESS_STATUS.ACTIVE,
        authType: business.authType || 'IN_APP',
      });
    }
  }, [isEditMode, business]); // Only runs when these props change

  const industries = [
    'Technology', 'Finance', 'Healthcare', 'Retail',
    'Education', 'Manufacturing', 'Real Estate',
    'Hospitality', 'Transportation', 'Other',
  ];

  const inputStyle = {
    width: '100%',
    marginTop: 6,
    padding: '9px 12px',
    fontSize: 14,
    borderRadius: 6,
    border: '1px solid #e2e8f0',
    background: '#f8fafc',
    transition: 'all 0.2s ease',
  };

  return (
    <div
      style={{
        minHeight: '100%',
        background: 'linear-gradient(135deg, #f8fbff 0%, #eef5ff 45%, #e6f0ff 100%)',
        fontFamily: "'Inter','Segoe UI',sans-serif",
        paddingTop: '24px'
      }}
    >
      <div
        style={{
          display: 'flex-start',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: 16 }}>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              margin: 3,
              marginRight: 5,
              background: 'linear-gradient(90deg, #1a365d, #3182ce)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {isEditMode ? 'Edit Business' : 'Create New Business'}
          </h1>
          <p style={{ fontSize: 13, marginTop: 4,marginLeft: 2, color: '#4a5568' }}>
            {isEditMode ? 'Update business information' : 'Add a new business'}
          </p>
        </div>

        {/* CARD */}
        <div
          style={{
            width: '100%',
            background: 'linear-gradient(180deg, #ffffff 0%, #f9fbff 100%)',
            borderRadius: 14,
            border: '1px solid rgba(49,130,206,0.15)',
            boxShadow: `
              0 10px 25px rgba(49,130,206,0.08),
              0 4px 10px rgba(0,0,0,0.04)
            `,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {(error || success) && (
            <div style={{ padding: '12px 24px' }}>
              {error && <div style={{ color: '#c53030', fontSize: 13 }}>{error}</div>}
              {success && <div style={{ color: '#276749', fontSize: 13 }}>{success}</div>}
            </div>
          )}

          {/* FORM */}
          <div style={{ padding: '16px 24px' }}>
            <form onSubmit={formik.handleSubmit}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '18px 24px',
                }}
              >
                {[
                  ['Business Name', 'businessName', 'text'],
                  ['Contact Email', 'contactEmail', 'email'],
                  ['Emergency Contact', 'emergencyContactNo', 'text'],
                  ['Website URL', 'websiteUrl', 'url'],
                ].map(([label, name, type]) => (
                  <div key={name}>
                    <label style={{ fontSize: 13, fontWeight: 600 }}>{label}</label>
                    <input
                      type={type}
                      name={name}
                      value={formik.values[name]}
                      onChange={formik.handleChange}
                      onBlur={(e) => {
                        e.target.style.boxShadow = 'none';
                        formik.handleBlur(e);
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#3182ce';
                        e.target.style.boxShadow = '0 0 0 2px rgba(49,130,206,0.15)';
                      }}
                      style={inputStyle}
                    />
                    {formik.touched[name] && formik.errors[name] && (
                      <div style={{ fontSize: 12, color: '#e53e3e', marginTop: 4 }}>
                        {formik.errors[name]}
                      </div>
                    )}
                  </div>
                ))}

                {/* INDUSTRY */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600 }}>Industry</label>
                  <select
                    name="industry"
                    value={formik.values.industry}
                    onChange={formik.handleChange}
                    style={inputStyle}
                  >
                    <option value="">Select</option>
                    {industries.map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </select>
                </div>

                {/* STATUS */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600 }}>Account Status</label>
                  <select
                    name="accountStatus"
                    value={formik.values.accountStatus}
                    onChange={formik.handleChange}
                    style={inputStyle}
                  >
                    {Object.values(BUSINESS_STATUS).map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                

              </div>
            </form>
          </div>

          {/* FOOTER */}
          <div
            style={{
              padding: '22px 30px',
              borderTop: '1px solid #e2e8f0',
              background: 'linear-gradient(90deg, #f8fafc, #edf2f7)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: 14, color: '#718096' }}>
              {isEditMode ? 'Update business details' : 'Create a new business account'}
            </div>

            <div style={{ display: 'flex', gap: 16 }}>
              <button
                type="button"
                onClick={() => navigate('/admin/businesses')}
                disabled={loading}
                style={{
                  padding: '12px 28px',
                  background: '#fff',
                  border: '1px solid #cbd5e0',
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={formik.handleSubmit}
                disabled={loading || !formik.isValid}
                style={{
                  padding: '12px 32px',
                  background: 'linear-gradient(135deg, #3182ce, #2b6cb0)',
                  border: 'none',
                  borderRadius: 8,
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 6px 14px rgba(49,130,206,0.3)',
                }}
              >
                {loading ? 'Processing...' : isEditMode ? 'Update Business' : 'Create Business'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBusiness;