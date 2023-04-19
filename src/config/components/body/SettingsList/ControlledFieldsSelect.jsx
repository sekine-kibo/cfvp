import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHiddenFields } from "../../../redux/settingsSlice";
// import { getLabel } from '../../../redux/kintoneSlice';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import styles from "./ControlledFieldsSelect.module.css";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 500,
      width: 300,
    },
  },
};

export const ControlledFieldsSelect = ({ setting }) => {
  const hideableFields = useSelector((state) => state.kintone.hideableFields);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(
      setHiddenFields({
        settingId: setting.settingId,
        value: event.target.value,
      })
    );
  };

  const checkDisabled = (code) => {
    const result = setting.conditions.filter(
      (condition) => condition.field.code === code
    );
    return result.length === 1 ? true : false;
  };

  return (
    <div className={styles.controlledFieldsSelectArea}>
      <FormControl fullWidth error={setting.hiddenFieldsError}>
        <InputLabel id={`controlledFieldsSelectLabel-${setting.settingId}`}>
          表示するフィールド
        </InputLabel>
        <Select
          id={`controlledFieldsSelect-${setting.settingId}`}
          labelId={`controlledFieldsSelectLabel-${setting.settingId}`}
          multiple
          value={setting.hiddenFields}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label="表示するフィールド"
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((code) => (
                // <Chip key={code} label={dispatch(getLabel(code)).payload} />
                <Chip key={code} label={code} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {hideableFields.map((field) => (
            <MenuItem
              key={`${setting.settingId}-${field.code}`}
              value={field.code}
              disabled={checkDisabled(field.code)}
            >
              <p>
                {field.label}
                <br />
                <span className={styles.codeText}>{field.code}</span>
              </p>
            </MenuItem>
          ))}
        </Select>
        {setting.hiddenFieldsError && (
          <FormHelperText>
            1つ以上のフィールドを選択してください。
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
};
