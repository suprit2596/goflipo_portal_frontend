import React, { useState } from 'react';
import {
  Typography,
  IconButton,
  Tooltip,
  Box,
} from '@mui/material';
import {
  Visibility as ShowIcon,
  VisibilityOff as HideIcon,
  ContentCopy as CopyIcon,
} from '@mui/icons-material';
import { maskSensitiveData } from '../../utils/formatters';

const MaskedText = ({ 
  value, 
  type = 'default', 
  showCopy = true,
  showToggle = true,
  label,
  fullWidth = false 
}) => {
  const [visible, setVisible] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    // You could add a toast notification here
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const displayValue = visible ? value : maskSensitiveData(value, type);

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 1,
      width: fullWidth ? '100%' : 'auto'
    }}>
      {label && (
        <Typography variant="body2" color="textSecondary" sx={{ minWidth: 100 }}>
          {label}:
        </Typography>
      )}
      
      <Typography
        variant="body1"
        sx={{
          fontFamily: 'monospace',
          backgroundColor: 'action.hover',
          padding: '4px 8px',
          borderRadius: 1,
          flexGrow: fullWidth ? 1 : 0,
          minWidth: 100,
        }}
      >
        {displayValue}
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        {showToggle && (
          <Tooltip title={visible ? "Hide" : "Show"}>
            <IconButton size="small" onClick={toggleVisibility}>
              {visible ? <HideIcon fontSize="small" /> : <ShowIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
        )}
        
        {showCopy && value && (
          <Tooltip title="Copy to clipboard">
            <IconButton size="small" onClick={handleCopy}>
              <CopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export default MaskedText;