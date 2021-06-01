import React, { useState } from "react";

//import axios from "axios";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import "./Login.css";

async function loginUser(credentials) {
  return fetch("https://localhost:44306/api/authentication/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

function Login({ setToken }) {
  const avatarStyle = { backgroundColor: "#1bbd7e", marginTop: "30px" };

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await loginUser({ username, password });
    setToken(resp.token);
  };

  return (
    <Grid className="login-page-container">
      <Grid style={{ paddingTop: "60px" }}>
        <Paper className="login-paper" elevation={10}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2 style={{ marginTop: 30 }}>Login</h2>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
              placeholder="Enter Username"
              style={{ marginTop: "40px" }}
              fullWidth
              required
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Enter Password"
              style={{ marginTop: "40px" }}
              type="password"
              fullWidth
              required
            />

            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={{ marginTop: "60px" }}
              fullWidth
            >
              Login
            </Button>
          </form>

          <div style={{ marginTop: "20px" }}>Forgot Password?</div>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;
