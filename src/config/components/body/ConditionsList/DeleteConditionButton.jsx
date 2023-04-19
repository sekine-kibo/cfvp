import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCondition } from '../../../redux/settingsSlice';
import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export const DeleteConditionButton = ({ settingId, conditionId }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <IconButton
        onClick={() =>
          dispatch(
            deleteCondition({ settingId: settingId, conditionId: conditionId })
          )
        }
      >
        <RemoveCircleOutlineIcon />
      </IconButton>
    </div>
  );
};
