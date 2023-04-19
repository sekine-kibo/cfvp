import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setHiddenFieldsError,
  setFieldError,
  setOperatorError,
  setValueError,
} from '../../../redux/settingsSlice';
import Button from '@mui/material/Button';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import styles from './SaveButton.module.css';

export const SaveButton = () => {
  const settings = useSelector((state) => state.settings.settings);
  // useSelectorで取得した値は更新できないため、値のみを別の変数に格納する。
  const settingsForAPI = JSON.parse(JSON.stringify(settings));
  const dispatch = useDispatch();
  const handleClick = async () => {
    let isError = false;
    settingsForAPI.forEach((setting) => {
      if (setting.hiddenFields.length === 0) {
        isError = true;
        dispatch(
          setHiddenFieldsError({ settingId: setting.settingId, value: true })
        );
      } else {
        // ADD
        setting.hiddenFieldsError = false;
        dispatch(
          setHiddenFieldsError({ settingId: setting.settingId, value: false })
        );
      }
      setting.conditions.forEach((condition) => {
        // Field の値を確認
        if (Object.keys(condition.field).length === 0) {
          isError = true;
          dispatch(
            setFieldError({
              settingId: setting.settingId,
              conditionId: condition.conditionId,
              value: true,
            })
          );
        } else {
          condition.fieldError = false;
          dispatch(
            setFieldError({
              settingId: setting.settingId,
              conditionId: condition.conditionId,
              value: false,
            })
          );
        }
        // Operator の値を確認
        if (!condition.operator) {
          isError = true;
          dispatch(
            setOperatorError({
              settingId: setting.settingId,
              conditionId: condition.conditionId,
              value: true,
            })
          );
        } else {
          condition.operatorError = false;
          dispatch(
            setOperatorError({
              settingId: setting.settingId,
              conditionId: condition.conditionId,
              value: false,
            })
          );
        }
        if (
          condition.value.text ||
          condition.value.number ||
          condition.value.array.length !== 0
        ) {
          condition.valueError = false;
          dispatch(
            setValueError({
              settingId: setting.settingId,
              conditionId: condition.conditionId,
              value: false,
            })
          );
        } else {
          isError = true;
          dispatch(
            setValueError({
              settingId: setting.settingId,
              conditionId: condition.conditionId,
              value: true,
            })
          );
        }
      });
    });
    if (!isError) {
      await kintone.plugin.app.setConfig({
        settings: JSON.stringify(settingsForAPI),
      });
    }
  };

  return (
    <div className={styles.saveButtonArea}>
      <Button
        variant="contained"
        startIcon={<SaveAltIcon />}
        onClick={handleClick}
        size="large"
      >
        SAVE SETTINGS
      </Button>
    </div>
  );
};
