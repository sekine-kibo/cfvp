import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Body } from './components/body/Body';
import { Header } from './components/header/Header';
import { setPluginId, getProperties } from './redux/kintoneSlice';
import { getConfig } from './redux/settingsSlice';

export const App = ({ pluginId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPluginId(pluginId));
    dispatch(getProperties());
    dispatch(getConfig(pluginId));
  }, []);

  return (
    <div>
      <Header />
      <Body />
    </div>
  );
};
