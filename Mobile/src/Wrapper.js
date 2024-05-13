import React from "react";
import Router from "./Router";
import { AuthProvider } from "./context/AuthContext";

export default ()=>{
    return(
        <AuthProvider>
            <Router/>
        </AuthProvider>
    )
}