import React from 'react';
import { AddConditionButton } from './AddConditionButton';
import { Condition } from './Condition';
import styles from './ConditionsList.module.css';

export const ConditionsList = ({ setting }) => {
  return (
    <div className={styles.conditionsListArea}>
      {setting.conditions.map((condition) => (
        <Condition setting={setting} condition={condition} />
      ))}
      <AddConditionButton settingId={setting.settingId} />
    </div>
  );
};
