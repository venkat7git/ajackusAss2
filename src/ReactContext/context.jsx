
import React from "react";
import User from "../user";

const UserContext = React.createContext({
    apiConstants:"",
    apiStatus:"",
    isEdit:false,
    onAddUser : ()=>{},
    editUser:()=>{},
    deleteUser:()=>{},
    onUpdateUser:()=>{}
});

export default UserContext