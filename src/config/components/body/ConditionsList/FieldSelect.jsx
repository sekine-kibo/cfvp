import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setConditionField } from '../../../redux/settingsSlice';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import styles from './FieldSelect.module.css';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 500,
      width: 300,
    },
  },
};

export const FieldSelect = ({ setting, condition }) => {
  const selectableFields = useSelector(
    (state) => state.kintone.selectableFields
  );

  const dispatch = useDispatch();
  const handleChange = (event) => {
    const SelectedField = selectableFields.filter(
      (field) => field.code === event.target.value
    );
    dispatch(
      setConditionField({
        settingId: setting.settingId,
        conditionId: condition.conditionId,
        value: SelectedField[0],
      })
    );
  };

  return (
    <div className={styles.fieldSelectArea}>
      <FormControl fullWidth error={condition.fieldError}>
        <InputLabel id={`fieldSelectLabel-${condition.conditionId}`}>
          フィールド
        </InputLabel>
        <Select
          labelId={`fieldSelectLabel-${condition.conditionId}`}
          id={`fieldSelect-${condition.conditionId}`}
          value={condition.field.code}
          onChange={handleChange}
          label="フィールド"
          MenuProps={MenuProps}
        >
          {selectableFields.map((field) => (
            <MenuItem
              key={`${condition.conditionId}-${field.code}`}
              value={field.code}
              disabled={setting.hiddenFields.includes(field.code)}
            >
              <p>
                {field.label}
                <br />
                <span className={styles.codeText}>{field.code}</span>
              </p>
            </MenuItem>
          ))}
        </Select>
        {condition.fieldError && (
          <FormHelperText>フィールドを選択してください。</FormHelperText>
        )}
      </FormControl>
    </div>
  );
};
