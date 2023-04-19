import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteSetting } from '../../../redux/settingsSlice';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export const DeleteSettingButton = ({ settingId }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={() => dispatch(deleteSetting(settingId))}
      >
        DELETE SETTING
      </Button>
    </div>
  );
};
