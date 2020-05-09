import React from "react";
import UserManagement from "./User/UserManagement";
import {USER_URL} from "../services/baseUrl";

const getUsers = () => {
  fetch(USER_URL).then(res => res.json().then(result => console.log(result)));
};

const Second = () => {
  getUsers();

  return <UserManagement />;
};

export default Second;
