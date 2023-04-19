import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { App } from './App';

((PLUGIN_ID) => {
  const Index = () => {
    return (
      <Provider store={store}>
        <App pluginId={PLUGIN_ID} />
      </Provider>
    );
  };
  render(<Index />, document.getElementById('config-root'));
})(kintone.$PLUGIN_ID);
