import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setConditionValueText,
  setConditionValueNumber,
  setConditionValueArray,
} from '../../../redux/settingsSlice';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormHelperText from '@mui/material/FormHelperText';
import styles from './ValueInput.module.css';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 500,
      width: 300,
    },
  },
};

export const ValueInput = ({ settingId, condition }) => {
  const dispatch = useDispatch();

  const handleTextChange = (event) => {
    dispatch(
      setConditionValueText({
        settingId: settingId,
        conditionId: condition.conditionId,
        value: event.target.value,
      })
    );
  };

  const handleNumberChange = (event) => {
    dispatch(
      setConditionValueNumber({
        settingId: settingId,
        conditionId: condition.conditionId,
        value: event.target.value,
      })
    );
  };

  const handleArrayChange = (event) => {
    dispatch(
      setConditionValueArray({
        settingId: settingId,
        conditionId: condition.conditionId,
        value: event.target.value,
      })
    );
  };

  return (
    <div className={styles.valueInputArea}>
      {condition.field.type === 'SINGLE_LINE_TEXT' && (
        <TextField
          error={condition.valueError}
          id={`valueInputText-${condition.conditionId}`}
          value={condition.value.text}
          onChange={handleTextChange}
          type="text"
          label="値"
          variant="outlined"
          fullWidth
          helperText={condition.valueError && '値を入力してください。'}
        />
      )}
      {(condition.field.type === 'NUMBER' ||
        condition.field.type === 'CALC') && (
        <TextField
          error={condition.valueError}
          id={`valueInputNum-${condition.conditionId}`}
          value={condition.value.number}
          onChange={handleNumberChange}
          type="number"
          label="値"
          variant="outlined"
          fullWidth
          helperText={condition.valueError && '値を入力してください。'}
        />
      )}
      {(condition.field.type === 'RADIO_BUTTON' ||
        condition.field.type === 'DROP_DOWN') && (
        <FormControl fullWidth error={condition.valueError}>
          <InputLabel id={`valueInputSelectLabel-${condition.conditionId}`}>
            値
          </InputLabel>
          <Select
            labelId={`valueInputSelectLabel-${condition.conditionId}`}
            id={`valueInputSelect-${condition.conditionId}`}
            value={condition.value.text}
            label="値"
            onChange={handleTextChange}
          >
            {condition.field.options.map((option, index) => (
              <MenuItem
                key={`valueInputSelectItem-${condition.conditionId}-${index}`}
                value={option}
              >
                {option}
              </MenuItem>
            ))}
          </Select>
          {condition.valueError && (
            <FormHelperText>値を選択してください。</FormHelperText>
          )}
        </FormControl>
      )}
      {(condition.field.type === 'CHECK_BOX' ||
        condition.field.type === 'MULTI_SELECT') && (
        <FormControl fullWidth error={condition.valueError}>
          <InputLabel
            id={`valueInputMultiSelectLabel-${condition.conditionId}`}
          >
            値
          </InputLabel>
          <Select
            labelId={`valueInputMultiSelectLabel-${condition.conditionId}`}
            id={`valueInputMultiSelect-${condition.conditionId}`}
            multiple
            value={condition.value.array}
            onChange={handleArrayChange}
            input={
              <OutlinedInput
                id={`valueInputMultiSelectInput-${condition.conditionId}`}
                label="値"
              />
            }
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {condition.field.options.map((option, index) => (
              <MenuItem
                key={`valueInputMultiSelectItem-${condition.conditionId}-${index}`}
                value={option}
              >
                {option}
              </MenuItem>
            ))}
          </Select>
          {condition.valueError && (
            <FormHelperText>1つ以上の値を選択してください。</FormHelperText>
          )}
        </FormControl>
      )}
    </div>
  );
};
