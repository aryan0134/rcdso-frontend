import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthContextProvider } from './context/AuthContext';
import { PracticesContextProvider } from './context/PracticesContext'
import { ClientsContextProvider } from './context/ClientsContext'
import { CounterContextProvider } from './context/CounterContext'
import { BlogsContextProvider } from './context/BlogsContext'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PracticesContextProvider>
        <CounterContextProvider>
          <ClientsContextProvider>
            <BlogsContextProvider>
              <App />
            </BlogsContextProvider>
          </ClientsContextProvider>
        </CounterContextProvider>
      </PracticesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
