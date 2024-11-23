import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import React from "react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Button size="small" onClick={() => logout()} variant="outlined">
        Sign Out
      </Button>
    )
  );
};

export default LogoutButton;
