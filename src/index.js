import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import store from './Redux/store';
import App from './components/App/App';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
const el = (
  <React.StrictMode>
    <Provider der store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
root.render(el);
