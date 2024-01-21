import React, { useEffect } from "react";
import { useFirebaseAuth } from "../../hooks/useFirebaseAuth";
const LogoutComponent = () => {
  const { signOutUser } = useFirebaseAuth();
  const handleLogout = async () => {
    try {
      await signOutUser();
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  useEffect(() => {
    handleLogout();
  }, []);

  return null;
};

export default LogoutComponent;
