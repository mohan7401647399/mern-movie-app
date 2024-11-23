import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <div className=" bg-no-repeat bg-center bg-cover bg-[url('/src/Assets/bg.jpg')] h-screen p-10">
        <Button
          size="small"
          onClick={() => loginWithRedirect()}
          variant="contained"
        >
          Sign In
        </Button>
      </div>
    )
  );
};

export default LoginButton;