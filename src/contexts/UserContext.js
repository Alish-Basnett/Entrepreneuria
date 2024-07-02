// UserContext.js
import React, { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userID, setUserID] = useState(null); // Initialize userID state

  const updateUser = (newUserID) => {
    setUserID(newUserID); // Function to update userID
  };

  return (
    <UserContext.Provider value={{ userID, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
