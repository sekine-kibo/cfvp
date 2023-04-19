import React from 'react';
import styles from './Condition.module.css';
import { FieldSelect } from './FieldSelect';
import { OperatorSelect } from './OperatorSelect';
import { ValueInput } from './ValueInput';
import { DeleteConditionButton } from './DeleteConditionButton';

export const Condition = ({ setting, condition }) => {
  return (
    <div className={styles.conditionArea}>
      <FieldSelect setting={setting} condition={condition} />
      <OperatorSelect settingId={setting.settingId} condition={condition} />
      <ValueInput settingId={setting.settingId} condition={condition} />
      <DeleteConditionButton
        settingId={setting.settingId}
        conditionId={condition.conditionId}
      />
    </div>
  );
};
