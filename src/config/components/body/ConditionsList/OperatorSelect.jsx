import React from 'react';
import { useDispatch } from 'react-redux';
import { setConditionOperator } from '../../../redux/settingsSlice';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import styles from './OperatorSelect.module.css';

export const OperatorSelect = ({ settingId, condition }) => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(
      setConditionOperator({
        settingId: settingId,
        conditionId: condition.conditionId,
        value: event.target.value,
      })
    );
  };

  const type = condition.field.type;

  return (
    <div className={styles.operatorSelectArea}>
      {Object.keys(condition.field).length !== 0 && (
        <FormControl fullWidth error={condition.operatorError}>
          <InputLabel id={`operatorSelectLabel-${condition.conditionId}`}>
            条件
          </InputLabel>
          <Select
            labelId={`operatorSelectLabel-${condition.conditionId}`}
            id={`operatorSelect-${condition.conditionId}`}
            value={condition.operator}
            label="条件"
            onChange={handleChange}
          >
            {type === 'SINGLE_LINE_TEXT' && (
              <MenuItem value={'str_='}>=</MenuItem>
            )}
            {type === 'SINGLE_LINE_TEXT' && (
              <MenuItem value={'str_!='}>!=</MenuItem>
            )}
            {type === 'SINGLE_LINE_TEXT' && (
              <MenuItem value={'str_includes'}>次の文字列を含む</MenuItem>
            )}
            {type === 'SINGLE_LINE_TEXT' && (
              <MenuItem value={'str_!includes'}>次の文字列を含まない</MenuItem>
            )}
            {(type === 'NUMBER' || type === 'CALC') && (
              <MenuItem value={'num_='}>=</MenuItem>
            )}
            {(type === 'NUMBER' || type === 'CALC') && (
              <MenuItem value={'num_!='}>!=</MenuItem>
            )}
            {(type === 'NUMBER' || type === 'CALC') && (
              <MenuItem value={'num_<='}>{'<='}</MenuItem>
            )}
            {(type === 'NUMBER' || type === 'CALC') && (
              <MenuItem value={'num_>='}>{'>='}</MenuItem>
            )}
            {(type === 'RADIO_BUTTON' || type === 'DROP_DOWN') && (
              <MenuItem value={'str_='}>=</MenuItem>
            )}
            {(type === 'RADIO_BUTTON' || type === 'DROP_DOWN') && (
              <MenuItem value={'str_!='}>!=</MenuItem>
            )}
            {(type === 'CHECK_BOX' || type === 'MULTI_SELECT') && (
              <MenuItem value={'ary_includes'}>次のいずれかを含む</MenuItem>
            )}
            {(type === 'CHECK_BOX' || type === 'MULTI_SELECT') && (
              <MenuItem value={'ary_!includes'}>
                次のいずれかを含まない
              </MenuItem>
            )}
          </Select>
          {condition.operatorError && (
            <FormHelperText>条件を指定してください。</FormHelperText>
          )}
        </FormControl>
      )}
    </div>
  );
};
