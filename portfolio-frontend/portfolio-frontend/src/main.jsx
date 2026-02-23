
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

//Root component
import App from './App.jsx'

//React Core
import React from "react";
import ReactDOM from "react-dom/client";

//Router for page navigation
import { BrowserRouter } from "react-router-dom";

//Authentication context provider
import { AuthProvider } from "./context/AuthContext";

//Create root and render the application
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>

      <AuthProvider>
        <App />
      </AuthProvider>

    </BrowserRouter>
  </React.StrictMode>
)


/*
The entire application is wrapped in the AuthProvider component
which provides the authentication context to all components 
within the application. This allows any component to access the 
authentication state and functions provided by the AuthContext, 
enabling features such as user login, logout, and access control 
throughout the app.

eveyrhting inside can now acess the auth context, which is used for login/logout and access control.
*/