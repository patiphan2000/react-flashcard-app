import React from 'react'
import { Navigate } from 'react-router'
import { getAuth } from "firebase/auth";
import { app } from '../firebase';

const auth = getAuth(app);

const checkUser = async () => {
    const user = await auth.currentUser;
    return user != null;
}

function PrivateRoute({ children }) {

    return checkUser ? children : 
    <Navigate to="/login" />;
}

export default PrivateRoute
