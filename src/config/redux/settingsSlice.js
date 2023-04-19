import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const getConfig = createAsyncThunk(
  'settings/getConfig',
  async (pluginId) => {
    return await kintone.plugin.app.getConfig(pluginId);
  }
);

export const setConfig = createAsyncThunk('settings/setConfig', async () => {
  kintone.plugin.app.setConfig(settings);
});

const initialState = {
  settings: [
    {
      settingId: uuidv4(),
      settingOperator: '&&',
      hiddenFields: [],
      hiddenFieldsError: false,
      conditions: [
        {
          conditionId: uuidv4(),
          field: {},
          fieldError: false,
          operator: '',
          operatorError: false,
          value: {
            text: '',
            number: 0,
            array: [],
          },
          valueError: false,
        },
      ],
    },
  ],
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    addSetting: (state) => {
      state.settings = [
        ...state.settings,
        {
          settingId: uuidv4(),
          settingOperator: '&&',
          hiddenFields: [],
          hiddenFieldsError: false,
          conditions: [
            {
              conditionId: uuidv4(),
              field: {},
              fieldError: false,
              operator: '',
              operatorError: false,
              value: {
                text: '',
                number: 0,
                array: [],
              },
              valueError: false,
            },
          ],
        },
      ];
    },
    deleteSetting: (state, action) => {
      state.settings = state.settings.filter(
        (setting) => setting.settingId !== action.payload
      );
    },
    switchSettings: (state, action) => {
      if (action.payload.destination) {
        const removedSetting = state.settings.splice(
          action.payload.source.index,
          1
        );
        state.settings.splice(
          action.payload.destination.index,
          0,
          removedSetting[0]
        );
      }
    },
    setSettingOperator: (state, action) => {
      state.settings.map((setting) => {
        if (setting.settingId === action.payload.settingId)
          setting.settingOperator = action.payload.value;
      });
    },
    setHiddenFields: (state, action) => {
      state.settings.map((setting) => {
        if (setting.settingId === action.payload.settingId)
          setting.hiddenFields = action.payload.value;
      });
    },
    addCondition: (state, action) => {
      state.settings.map((setting) => {
        if (setting.settingId === action.payload)
          setting.conditions = [
            ...setting.conditions,
            {
              conditionId: uuidv4(),
              field: {},
              fieldError: false,
              operator: '',
              operatorError: false,
              value: {
                text: '',
                number: 0,
                array: [],
              },
              valueError: false,
            },
          ];
      });
    },
    deleteCondition: (state, action) => {
      state.settings.map((setting) => {
        if (setting.settingId === action.payload.settingId)
          setting.conditions = setting.conditions.filter(
            (condition) => condition.conditionId !== action.payload.conditionId
          );
      });
    },
    setConditionField: (state, action) => {
      state.settings.map((setting) => {
        if (setting.settingId === action.payload.settingId) {
          setting.conditions.map((condition) => {
            if (condition.conditionId === action.payload.conditionId) {
              condition.field = action.payload.value;
              condition.operator = '';
              condition.fieldError = false;
              condition.value = {
                text: '',
                number: 0,
                array: [],
              };
              condition.valueError = false;
            }
          });
        }
      });
    },
    setConditionOperator: (state, action) => {
      state.settings.map((setting) => {
        if (setting.settingId === action.payload.settingId) {
          setting.conditions.map((condition) => {
            if (condition.conditionId === action.payload.conditionId)
              condition.operator = action.payload.value;
          });
        }
      });
    },
    setConditionValueText: (state, action) => {
      state.settings.map((setting) => {
        if (setting.settingId === action.payload.settingId) {
          setting.conditions.map((condition) => {
            if (condition.conditionId === action.payload.conditionId)
              condition.value.text = action.payload.value;
          });
        }
      });
    },
    setConditionValueNumber: (state, action) => {
      state.settings.map((setting) => {
        if (setting.settingId === action.payload.settingId) {
          setting.conditions.map((condition) => {
            if (condition.conditionId === action.payload.conditionId)
              condition.value.number = action.payload.value;
          });
        }
      });
    },
    setConditionValueArray: (state, action) => {
      state.settings.map((setting) => {
        if (setting.settingId === action.payload.settingId) {
          setting.conditions.map((condition) => {
            if (condition.conditionId === action.payload.conditionId)
              condition.value.array = action.payload.value;
          });
        }
      });
    },
    setHiddenFieldsError: (state, action) => {
      state.settings.map((setting) => {
        if (setting.settingId === action.payload.settingId)
          setting.hiddenFieldsError = action.payload.value;
      });
    },
    setFieldError: (state, action) => {
      state.settings.map((setting) => {
        if (setting.settingId === action.payload.settingId) {
          setting.conditions.map((condition) => {
            if (condition.conditionId === action.payload.conditionId)
              condition.fieldError = action.payload.value;
          });
        }
      });
    },
    setOperatorError: (state, action) => {
      state.settings.map((setting) => {
        if (setting.settingId === action.payload.settingId) {
          setting.conditions.map((condition) => {
            if (condition.conditionId === action.payload.conditionId)
              condition.operatorError = action.payload.value;
          });
        }
      });
    },
    setValueError: (state, action) => {
      state.settings.map((setting) => {
        if (setting.settingId === action.payload.settingId) {
          setting.conditions.map((condition) => {
            if (condition.conditionId === action.payload.conditionId)
              condition.valueError = action.payload.value;
          });
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getConfig.fulfilled, (state, action) => {
      if (Object.keys(action.payload).length !== 0)
        state.settings = JSON.parse(action.payload.settings);
    });
  },
});

export const {
  addSetting,
  deleteSetting,
  switchSettings,
  setSettingOperator,
  setHiddenFields,
  addCondition,
  deleteCondition,
  setConditionField,
  setConditionOperator,
  setConditionValueText,
  setConditionValueNumber,
  setConditionValueArray,
  setHiddenFieldsError,
  setFieldError,
  setOperatorError,
  setValueError,
} = settingsSlice.actions;

export default settingsSlice.reducer;
