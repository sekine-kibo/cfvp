import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ConditionsList } from '../ConditionsList/ConditionsList';
import { ControlledFieldsSelect } from './ControlledFieldsSelect';
import { DeleteSettingButton } from './DeleteSettingButton';
import styles from './Setting.module.css';
import { SettingOperatorSelect } from './SettingOperatorSelect';

export const Setting = ({ setting, index }) => {
  return (
    <Draggable
      key={setting.settingId}
      index={index}
      draggableId={`draggable-${setting.settingId}`}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.settingArea}
        >
          <div className={styles.settingRow1}>
            <SettingOperatorSelect setting={setting} />
            <DeleteSettingButton settingId={setting.settingId} />
          </div>
          <div className={styles.settingRow2}>
            <ConditionsList setting={setting} />
            <hr className={styles.separator} />
            <ControlledFieldsSelect setting={setting} />
          </div>
        </div>
      )}
    </Draggable>
  );
};
