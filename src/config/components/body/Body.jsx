import React from 'react';
import { SaveButton } from './KintoneButton/SaveButton';
import { BackButton } from './KintoneButton/BackButton';
import { SettingsList } from './SettingsList/SettingsList';
import { AddSetingButton } from './SettingsList/AddSetingButton';
import styles from './Body.module.css';

export const Body = () => {
  return (
    <div>
      <div className={styles.buttonArea}>
        <SaveButton />
        <BackButton />
      </div>
      <SettingsList />
      <AddSetingButton />
    </div>
  );
};
