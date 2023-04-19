import React from 'react';
import { useDispatch } from 'react-redux';
import { addCondition } from '../../../redux/settingsSlice';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const AddConditionButton = ({ settingId }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <IconButton onClick={() => dispatch(addCondition(settingId))}>
        <AddCircleOutlineIcon />
      </IconButton>
    </div>
  );
};
