import React, { useState } from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import "./Login.css";

function ChangePassword(props) {
  const avatarStyle = { backgroundColor: "#1bbd7e", marginTop: "30px" };

  let [state, setState] = useState({
    currentPassword: "",
    newPassword: "",
  });

  function handleChange(e) {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  }

  return (
    <Grid className="login-page-container">
      <Grid style={{ paddingTop: "30px" }}>
        <Paper className="login-paper" elevation={10}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2 style={{ marginTop: 30 }}>Change password</h2>
          </Grid>
          <form onSubmit={(e) => props.onSubmitFunction(e, state)}>
            <TextField
              onChange={handleChange}
              id="currentPassword"
              name="currentPassword"
              label="Current Password"
              placeholder="Enter password"
              style={{ marginTop: "40px" }}
              fullWidth
              required
            />
            <TextField
              onChange={handleChange}
              id="newPassword"
              name="newPassword"
              label="New Password"
              placeholder="Enter password"
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
              Change password
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ChangePassword;
