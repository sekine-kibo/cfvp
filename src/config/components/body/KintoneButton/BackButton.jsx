import React from 'react';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const BackButton = () => {
  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => history.back()}
        size="large"
      >
        BACK
      </Button>
    </div>
  );
};
