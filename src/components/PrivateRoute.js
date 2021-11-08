import React from 'react'
import { Navigate } from 'react-router'


function PrivateRoute({ children , authState}) {
const auth = authState.currentUser != null;
return auth ? children : <Navigate to="/login" />;
}

export default PrivateRoute
