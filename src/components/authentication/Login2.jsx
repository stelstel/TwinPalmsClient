/* eslint-disable no-undef */
import React, { useState } from "react";
import axios from "axios";
import ForgotPassword from "./ForgotPassword";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import "./Login.css";
const BASE_URL = "http://localhost:5000/api";

async function loginUser(credentials) {
  return axios
    .post(`${BASE_URL}/authentication/login`, credentials)
    .then(({ data }) => data)
    .catch((err) => console.log("ERROR", err));
}

function Login(props) {
  const avatarStyle = { backgroundColor: "#1bbd7e", marginTop: "30px" };

  let [forgotPassword, setForgotPassword] = useState(false);
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
  //const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const value = e.target.value;
    setCredentials({
      ...credentials,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.username === "") {
      setUserNameError({
        ...userNameError,
        error: true,
        errorText: "Username is required",
      });
    }
    if (credentials.password === "") {
      setPasswordError({
        ...passWordError,
        error: true,
        errorText: "Password is required",
      });
    }

    const resp = await loginUser({ ...credentials });
    props.setUser(resp);
    //axios.defaults.headers.common["Authorization"] = `Bearer ${resp.token}`;
  };

  return (
    <Grid className="login-page-container">
      <Grid style={{ paddingTop: "30px" }}>
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
              error={userNameError.error}
              helperText={userNameError.errorText}
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
              type="password"
              fullWidth
              error={passWordError.error}
              helperText={passWordError.errorText}
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
          <Button
            className="forgot-password-btn"
            onClick={() => setForgotPassword(!forgotPassword)}
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Forgot Password?
          </Button>

          {forgotPassword ? <ForgotPassword /> : ""}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;
