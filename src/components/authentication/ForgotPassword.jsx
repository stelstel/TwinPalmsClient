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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendEmail({ email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        label="Send email to "
        placeholder="Email address"
        style={{ marginTop: "40px" }}
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
        Send email
      </Button>
    </form>
  );
}

export default ForgotPassword;
