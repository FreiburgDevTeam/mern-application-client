import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProviderWrapper } from './context/auth.context';
import { DataProviderWrapper } from './context/data.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProviderWrapper>
        <DataProviderWrapper>
          <App />
        </DataProviderWrapper>
      </AuthProviderWrapper>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
