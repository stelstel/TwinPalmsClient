import React, { useState } from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import "./Login.css";
import axios from "axios";

function ResetPassword() {
  let credentials,
    setPassword = useState({
      password: "",
      confirmPassword: "",
      email: "",
      token: "",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://localhost:44306/api/reset-password",
        credentials
      );

      console.log(res.data);
      console.log("successfull post request");
    } catch (err) {
      // Handle Error Here
      console.error(err);
      console.log("error with post request");
    }
  };
  let handleChange = (e) => {
    credentials = {
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
      email: e.target.email.value,
    };

    setPassword(credentials);
  };
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
              id="password"
              onChange={handleChange}
              label="Password"
              placeholder="New Password"
              style={{ marginTop: "40px" }}
              fullWidth
              required
            />
            <TextField
              name="confirmPassword"
              onChange={handleChange}
              label="ConfirmPassword"
              placeholder="Confirm Password"
              style={{ marginTop: "40px" }}
              type="password"
              fullWidth
              required
            />
            <TextField
              name="email"
              onChange={handleChange}
              label="Email"
              placeholder="Confirm Email"
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
              Reset password
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
export default ResetPassword;
