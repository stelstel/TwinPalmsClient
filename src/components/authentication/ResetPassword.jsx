import React, { useState } from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import "./Login.css";
import axios from "axios";

function ResetPassword() {
  const urlParam = new URLSearchParams(window.location.search).toString();
  //const reset_token = encodeURIComponent(urlParam.get("token"));
  /*  const url = new URL(
    "https://localhost:44306/api/authentication/reset-password?token=" +
      reset_token
  ); */

  //const queryString = urlParam.replace(/\+/g, "");
  var fromQuery = window.location.href.split("=")[1];
  var reset_token = encodeURIComponent(fromQuery);
  //console.log("Token: ", reset_token);
  //console.log("url: ", url);
  console.log("urlParam: ", encodeURIComponent(urlParam));
  console.log("reset_token: ", encodeURIComponent(fromQuery));
  console.log("fromQuery: ", fromQuery);
  //  console.log("urlParam escaped: ", escape(urlParam.get("token")));

  let [state, setState] = useState({
    password: "",
    confirmPassword: "",
    email: "",
    //token: reset_token, // grab from url
  });

  //HOOKS ERRORS
  const [passwordErrors, setPasswordErrors] = useState({
    error: false,
    errorText: ""
  })
  const [confirmPasswordErrors, setConfirmPasswordErrors] = useState({
    error: false,
    errorText: ""
  })
  const [emailErrors, setEmailErrors] = useState({
    error: false,
    errorText: ""
  })



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(state)
    if(state.password === "") {
      setPasswordErrors({ ...passwordErrors, error: true, errorText: "Error message"})
    }
    if(state.confirmPassword === "") {
      setConfirmPasswordErrors({ ...confirmPasswordErrors, error: true, errorText: "Error message"})
    }
    if(state.email === "") {
      setEmailErrors({ ...emailErrors, error: true, errorText: "Error message"})
    }

    try {
      const res = await axios.post(
        "https://localhost:44306/api/authentication/reset-password?token=" +
          reset_token,
        state
      );
      console.log(res.data);
      console.log("successfull post request");
    } catch (err) {
      // Handle Error Here
      console.error("Error: ", err);
    }
  };

  function handleChange(e) {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  }

  
  // const paperStyle = {padding: 20, height: '700px', width: 480, margin: '20px auto'};
  const avatarStyle = { backgroundColor: "#1bbd7e", marginTop: "30px" };

  return (
    <Grid className="login-page-container">
      <Grid style={{ paddingTop: "60px" }}>
        <Paper className="login-paper" elevation={10}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2 style={{ marginTop: 30 }}>Reset password</h2>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              name="password"
              onChange={(e) => {
                handleChange(e)
                setPasswordErrors({ ...passwordErrors, error: false, errorText: ""})
              }}
              label="Password"
              placeholder="New Password"
              style={{ marginTop: "40px" }}
              fullWidth
              helperText={passwordErrors.errorText}
              error={passwordErrors.error}
            />
            <TextField
              name="confirmPassword"
              onChange={(e) => {
                handleChange(e)
                setConfirmPasswordErrors({ ...confirmPasswordErrors, error: false, errorText: ""})
              }}
              label="ConfirmPassword"
              placeholder="Confirm Password"
              style={{ marginTop: "40px" }}
              type="password"
              fullWidth
              helperText={confirmPasswordErrors.errorText}
              error={confirmPasswordErrors.error}
            />
            <TextField
              name="email"
              onChange={(e) => {
                handleChange(e)
                setEmailErrors({ ...emailErrors, error: false, errorText: ""})
              }}
              label="Email"
              placeholder="Confirm Email"
              style={{ marginTop: "40px" }}
              type="text"
              fullWidth
              helperText={emailErrors.errorText}
              error={emailErrors.error}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={{ marginTop: "60px" }}
              fullWidth
            >
              Reset password
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
export default ResetPassword;
