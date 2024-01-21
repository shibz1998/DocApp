import { createContext, useContext, useState } from "react";
const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(null);
  const [userID, setUserID] = useState(null);
  const setUserTypeContext = (type) => {
    setUserType(type);
  };
  const setUserIDContext = (id) => {
    setUserID(id);
  };
  return (
    <UserContext.Provider
      value={{
        userType,
        setUserTypeContext,
        userID,
        setUserIDContext,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => {
  return useContext(UserContext);
};
