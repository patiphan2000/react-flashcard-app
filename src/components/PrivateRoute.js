import React from 'react'
import { Navigate } from 'react-router'
import { getAuth } from "firebase/auth";

function PrivateRoute({ children }) {

    const auth = getAuth();
    const user = auth.currentUser;

    return user != null ? children : 
    <Navigate to="/login" />;
}

export default PrivateRoute
