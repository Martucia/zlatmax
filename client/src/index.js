import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.sass';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { store } from "./reducers";
import { Provider } from "react-redux";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
