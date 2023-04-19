import React from 'react';
import { useDispatch } from 'react-redux';
import { setSettingOperator } from '../../../redux/settingsSlice';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export const SettingOperatorSelect = ({ setting }) => {
  const dispatch = useDispatch();
  const handleChange = (event) =>
    dispatch(
      setSettingOperator({
        settingId: setting.settingId,
        value: event.target.value,
      })
    );

  return (
    <div>
      <FormControl size="small">
        <Select
          id={`settingsOperatorSelect-${setting.settingId}`}
          value={setting.settingOperator}
          onChange={handleChange}
        >
          <MenuItem value={'&&'}>全ての条件を満たす</MenuItem>
          <MenuItem value={'||'}>いずれかの条件を満たす</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
