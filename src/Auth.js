import React, { useState } from "react";
import { signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";
import { Box, Button, Typography, Paper, Container } from "@mui/material";

export default function Auth() {
  const [user, setUser] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "2rem", marginTop: "2rem" }}>
        {user ? (
          <Box>
            <Typography variant="h5" gutterBottom>
              Welcome, {user.displayName || user.email}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              style={{ marginTop: "1rem" }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box textAlign="center">
            <Typography variant="h6" gutterBottom>
              Please log in with Google
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGoogleLogin}
            >
              Login with Google
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
