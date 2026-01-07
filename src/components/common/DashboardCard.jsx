import React from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { TrendingUp, TrendingDown, Equalizer } from '@mui/icons-material';

const DashboardCard = ({ title, value, subtitle, icon, trend, trendValue }) => {
  const theme = useTheme();

  const getTrendIcon = () => {
    if (trend === 'up') {
      return <TrendingUp sx={{ color: theme.palette.success.main }} />;
    } else if (trend === 'down') {
      return <TrendingDown sx={{ color: theme.palette.error.main }} />;
    }
    return <Equalizer sx={{ color: theme.palette.info.main }} />;
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography color="textSecondary" variant="body2" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="textSecondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box sx={{ color: theme.palette.primary.main }}>
            {icon}
          </Box>
        </Box>
        
        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            {getTrendIcon()}
            <Typography
              variant="body2"
              sx={{
                ml: 1,
                color: trend === 'up' ? theme.palette.success.main : theme.palette.error.main,
              }}
            >
              {trendValue} {trend === 'up' ? 'increase' : 'decrease'} from last month
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;