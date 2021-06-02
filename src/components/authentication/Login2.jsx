import React, { useState } from "react";
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

function Login({ setUser }) {
  const avatarStyle = { backgroundColor: "#1bbd7e", marginTop: "30px" };

  let [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  //REACT HOOKS FOR ERRORS
  const [userNameError, setUserNameError] = useState({
    error: false,
    errorText: "",
  });
  const [passWordError, setPasswordError] = useState({
    error: false,
    errorText: "",
  });
  /* const [username, setUsername] = useState();
  const [password, setPassword] = useState(); */

  const handleChange = (e) => {
    const value = e.target.value;
    setCredentials({
      ...credentials,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await loginUser({ ...credentials });
    setUser(resp);
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
              name="username"
              onChange={(e) => {
                handleChange(e);
                setUserNameError({
                  ...userNameError,
                  error: false,
                  errorText: "",
                });
              }}
              label="Username"
              placeholder="Enter Username"
              style={{ marginTop: "40px" }}
              fullWidth
              required
            />
            <TextField
              name="password"
              onChange={(e) => {
                handleChange(e);
                setPasswordError({
                  ...passWordError,
                  error: false,
                  errorText: "",
                });
              }}
              label="Password"
              placeholder="Enter Password"
              style={{ marginTop: "40px" }}
              type="text"
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
