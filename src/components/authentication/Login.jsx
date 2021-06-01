import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import "./Login.css";


function Login() {

  const avatarStyle = { backgroundColor: "#1bbd7e", marginTop: "30px" };

  let [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  //REACT HOOKS FOR ERRORS
  const [userNameError, setUserNameError] = useState({
    error: false,
    errorText: ""
  })
  const [passWordError, setPasswordError] = useState({
    error: false,
    errorText: ""
  })

  const [user, setUser] = useState({
    outlets: [],
    hotels: [],
    token: "",
  });

  function handleChange(e) {
    const value = e.target.value;
    setCredentials({
      ...credentials,
      [e.target.name]: value,
    });
  }


  

  //SUBMIT AND ERROR HANDLING
  const handleSubmit = (e) => {
    e.preventDefault()

    if(state.username === "") {
      setUserNameError({ ...userNameError, error: true, errorText: "Error Message"})
    }
    if(state.password === "") {
      setPasswordError({ ...passWordError, error: true, errorText: "Error Message"})
      return
    }
    const handleLogin = async (e) => {
    e.preventDefault();
    await axios
      .post("https://localhost:44306/api/authentication/login", credentials)
      .then(({ data }) => {
        setUser({
          ...user,
          token: data.token,
          outlets: data.outlets,
          hotels: data.hotels,
        });
        console.log(data);
        console.log("user: ", user);
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };

  }
  

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
          <form>
            <TextField
              onChange={(e) => {
                handleChange(e)
                setUserNameError({ ...userNameError, error: false, errorText: ""})
              }}
              id="username"
              name="username"
              label="Username"
              placeholder="Enter Username"
              style={{ marginTop: "40px" }}
              fullWidth
              helperText={userNameError.errorText}
              error={userNameError.error}
            />
            <TextField
              onChange={(e) => {
                handleChange(e)
                setPasswordError({ ...passWordError, error: false, errorText: ""})
              }}
              id="password"
              name="password"
              label="Password"
              placeholder="Enter Password"
              style={{ marginTop: "40px" }}
              type="password"
              fullWidth
              helperText={passWordError.errorText}
              error={passWordError.error}
            />

            <Button
              onClick={handleSubmit}
              type="submit"
              color="primary"
              variant="contained"
              style={{ marginTop: "60px" }}
              fullWidth
            >
              Login
            </Button>
          </form>
          <Link to="/reset-password" className="forgot-password">
            <div style={{ marginTop: "20px" }}>Forgot Password?</div>
          </Link>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;
