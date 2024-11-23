import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import UserContextProvider from './components/ContextAPI';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = process.env.REACT_APP_AUTH0_DOMAIN,
  clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider domain={domain} clientId={clientId} authorizationParams={{
      redirect_uri: window.location.origin
    }} >
      <UserContextProvider >
        <Router>
          <App />
        </Router>
      </UserContextProvider>
    </Auth0Provider >

  </React.StrictMode >
);
