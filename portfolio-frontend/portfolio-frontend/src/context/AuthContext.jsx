import { createContext, useState, useEffect } from "react";

//Create the authentication context
export const AuthContext = createContext();

//Provider component to wrap the application and provide authentication state and functions
export const AuthProvider = ({ children }) => {


    //Load stored values from localStorage or initialize to null when app starts
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [role, setRole] = useState(localStorage.getItem("role") || null);
    const [email, setEmail] = useState(localStorage.getItem("email") || null);

    //Determine if the user is authenticated based on the presence of a token
    const isAuthenticated = !!token;

    /**
    * Called after successful login
    * Saves auth data in localStorage + updates state
    */
    const login = (authData) =>
    {
        localStorage.setItem("token", authData.token);
        localStorage.setItem("role", authData.role);
        localStorage.setItem("email", authData.email);

        setToken(authData.token);
        setRole(authData.role);
        setEmail(authData.email);
    };

    /**
    * Clears authentication state
    */
    const logout = () =>
    {
        localStorage.clear();
        setToken(null);
        setRole(null);
        setEmail(null);
    };

    // Provide values (token, role, email, isAuthenticated, login, logout) to entire application
    return (
        <AuthContext.Provider
            value={{
                token,
                role,
                email,
                isAuthenticated,
                login,
                logout
            }}
        >
        {children}
        </AuthContext.Provider>
    );

};

/*
Any component wrapped in the AuthProvider can access the authentication context and know
if a user is logged in, their role, and email. 
They can also call the login and logout functions.

What is local storage?: Local storage is a web storage mechanism 
that allows websites to store data in the user's browser. 
It provides a way to save key-value pairs in a persistent manner,
meaning the data remains even after the browser is closed. 
Local storage is commonly used to store user preferences, 
authentication tokens, and other data that needs to persist across sessions. 
In this code, local storage is used to save the authentication token, user role, 
and email so that the user remains logged in even after refreshing the page or 
closing and reopening the browser.
*/

