import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProperties = createAsyncThunk(
  "kintone/getProperties",
  async () => {
    return await kintone.api("/k/v1/form.json", "GET", {
      app: kintone.app.getId(),
    });
  }
);

const initialState = {
  pluginId: "",
  hideableFields: [],
  selectableFields: [],
};

export const kintoneSlice = createSlice({
  name: "kintone",
  initialState: initialState,
  reducers: {
    setPluginId: (state, action) => {
      state.pluginId = action.payload;
    },
    getLabel: (state, action) => {
      const target = state.hideableFields.filter(
        (field) => field.code === action.payload
      );
      return target.length === 0 ? action.payload : target[0].label;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProperties.fulfilled, (state, action) => {
      const unhidableTypes = ["LABEL", "SUBTABLE", "HR", "SPACER"];
      state.hideableFields = action.payload.properties.filter(
        (property) => !unhidableTypes.includes(property.type)
      );
      const selectableTypes = [
        "SINGLE_LINE_TEXT",
        "NUMBER",
        "CALC",
        "RADIO_BUTTON",
        "CHECK_BOX",
        "MULTI_SELECT",
        "DROP_DOWN",
      ];
      state.selectableFields = action.payload.properties.filter((property) =>
        selectableTypes.includes(property.type)
      );
    });
  },
});

export const { setPluginId, getLabel } = kintoneSlice.actions;

export default kintoneSlice.reducer;
