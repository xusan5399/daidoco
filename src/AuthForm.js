import React from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";

export default function AuthForm({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  handleSignup,
}) {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Login or Signup
      </Typography>
      <Grid container spacing={2} style={{ marginTop: "1rem" }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={handleSignup}
          >
            Signup
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
