import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

import "./Login.css";

async function sendEmail(email) {
  return fetch("https://localhost:44306/api/authentication/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  }).then((data) => data.json());
}

function ForgotPassword() {
  let [email, setEmail] = useState({ email: "" });
  const [emailError, setEmailError] = useState({
    error: false,
    errorText: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email.value === undefined || "") {
      setEmailError({ error: true, errorText: "Please enter your email"})
    }
    await sendEmail({ email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="email"
        onChange={(e) => {
          setEmail(e.target.value)
          setEmailError({
            ...emailError,
            error: false,
            errorText: "",
          });
        }}
        label="Send email to "
        placeholder="Email address"
        style={{ marginTop: "40px" }}
        fullWidth
        error={emailError.error}
        helperText={emailError.errorText}
      />

      <Button
        type="submit"
        color="primary"
        variant="contained"
        style={{ marginTop: "60px" }}
        fullWidth
      >
        Send email
      </Button>
    </form>
  );
}

export default ForgotPassword;
