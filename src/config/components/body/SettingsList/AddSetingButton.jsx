import React from 'react';
import { useDispatch } from 'react-redux';
import { addSetting } from '../../../redux/settingsSlice';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';

export const AddSetingButton = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <Button
        variant="contained"
        startIcon={<AddBoxIcon />}
        onClick={() => dispatch(addSetting())}
      >
        ADD NEW SETTING
      </Button>
    </div>
  );
};
