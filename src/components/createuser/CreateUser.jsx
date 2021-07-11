import React, { useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import ListOutlets from "./ListOutlets";
import ListHotels from "./ListHotels";
import ListCompanies from "./ListCompanies";
import axios from "axios";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./CreateUser.css";
import { UserContext } from "../../App";

const BASE_URL = "http://localhost:5000/api";
const notify = (message) => toast(message);
const initialState = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  notificationEmail: "",
  phoneNumber: "",
  role: "",
  outlets: [],
  hotels: [],
  companies: [],
};

function CreateUser() {
  const user = useContext(UserContext);
  //REACT HOOKS
  const [createUser, setCreateUser] = useState(initialState);
  //HOOKS FOR ERRORS
  const [userNameError, setUserNameError] = useState({
    error: false,
    errorText: "",
  });
  const [firstNameError, setFirstNameError] = useState({
    error: false,
    errorText: "",
  });
  const [lastNameError, setLastNameError] = useState({
    error: false,
    errorText: "",
  });
  const [emailError, setEmailError] = useState({
    error: false,
    errorText: "",
  });

  const [accessLevelError, setAccessLevelError] = useState(false);
  //HOOKS FOR ACCESS LEVEL
  const [basicActive, setBasicActive] = useState(false);
  const [adminActive, setAdminActive] = useState(false);
  //HOOKS FOR SCROLL LISTS

  const handleClickBasic = () => {
    setAdminActive(false);
    setBasicActive(true);
    setAccessLevelError(false);
  };
  const handleClickAdmin = () => {
    setBasicActive(false);
    setAdminActive(true);
    setAccessLevelError(false);
  };

  //POST REQUEST'
  const sendPostRequest = async (data) => {
    await axios
      .post(`${BASE_URL}/Authentication`, data)
      .then(({ data }) => {
        notify("User successfully added");
        console.log("User added", data);
        document.getElementById("createUserForm").reset();
        setCreateUser(initialState);
        setBasicActive(false);
        setAdminActive(false);
      })
      .catch((err) => {
        console.log("token", user.token);
        if (err.response.status === 503) {
          console.log("response 503");
          alert(
            "User was created but email could not be sent\n" + err.response.data
          );
          document.getElementById("createUserForm").reset();
          setCreateUser(initialState);
          setBasicActive(false);
          setAdminActive(false);
        } else {
          let errors = Object.values(err.response.data);
          let message = "User was not created due to errors\n";
          errors.forEach((error) => {
            message += error + "\n";
          });
          alert(message);
        }
      });
  };

  //SUBIT FORM AND SEND IT TO DATABASE AND ERROR HANDLING
  const handleSubmit = (e) => {
    e.preventDefault();
    if (createUser.userName === "") {
      setUserNameError({
        ...userNameError,
        error: true,
        errorText: "Username is required",
      });
    }
    if (createUser.firstName === "") {
      setFirstNameError({
        ...firstNameError,
        error: true,
        errorText: "Firstname is required",
      });
    }
    if (createUser.lastName === "") {
      setLastNameError({
        ...lastNameError,
        error: true,
        errorText: "Lastname is required",
      });
    }
    if (createUser.email === "") {
      setEmailError({
        ...emailError,
        error: true,
        errorText: "Email is required",
      });
    }

    if (basicActive === false && adminActive === false) {
      setAccessLevelError(true);
      return;
    }

    sendPostRequest(createUser);
  };

  return (
    <>
      <Toaster />
      <Grid className="createuser-page-container">
        <Grid style={{ paddingTop: "30px", paddingBottom: "30px" }}>
          <Paper className="createuser-paper" elevation={10}>
            <Grid align="center">
              <Avatar style={{ backgroundColor: "#1bbd7e" }}>
                <AccountCircleIcon />
              </Avatar>
              <h2 style={{ marginTop: 20 }}>Create User</h2>
            </Grid>
            <form id="createUserForm">
              <TextField
                onChange={(e) => {
                  setCreateUser({ ...createUser, userName: e.target.value });
                  setUserNameError({
                    ...userNameError,
                    error: false,
                    errorText: "",
                  });
                }}
                value={createUser.userName}
                label="Username"
                placeholder="Enter username"
                style={{ marginTop: "20px" }}
                type="text"
                fullWidth
                error={userNameError.error}
                helperText={userNameError.errorText}
              />
              <TextField
                onChange={(e) => {
                  setCreateUser({ ...createUser, firstName: e.target.value });
                  setFirstNameError({
                    ...firstNameError,
                    error: false,
                    errorText: "",
                  });
                }}
                value={createUser.firstName}
                label="First name"
                placeholder="Enter first name"
                style={{ marginTop: "30px" }}
                type="text"
                fullWidth
                error={firstNameError.error}
                helperText={firstNameError.errorText}
              />
              <TextField
                onChange={(e) => {
                  setCreateUser({ ...createUser, lastName: e.target.value });
                  setLastNameError({
                    ...lastNameError,
                    error: false,
                    errorText: "",
                  });
                }}
                value={createUser.lastName}
                label="Last name"
                placeholder="Enter last name"
                style={{ marginTop: "30px" }}
                type="text"
                fullWidth
                error={lastNameError.error}
                helperText={lastNameError.errorText}
              />
              <TextField
                onChange={(e) => {
                  setCreateUser({ ...createUser, email: e.target.value });
                  setEmailError({
                    ...emailError,
                    error: false,
                    errorText: "",
                  });
                }}
                value={createUser.email}
                label="Email"
                placeholder="Enter email"
                style={{ marginTop: "30px" }}
                type="email"
                error={emailError.error}
                helperText={emailError.errorText}
                fullWidth
              />
              <TextField
                onChange={(e) => {
                  setCreateUser({
                    ...createUser,
                    phoneNumber: e.target.value,
                  });
                }}
                value={createUser.phoneNumber}
                label="Phone number (optional)"
                placeholder="Enter phone number"
                style={{ marginTop: "30px" }}
                type="text"
                fullWidth
              />
              <TextField
                onChange={(e) => {
                  setCreateUser({
                    ...createUser,
                    notificationEmail: e.target.value,
                  });
                }}
                value={createUser.notificationEmail}
                label="Notification email (optional)"
                placeholder="Enter email for notification"
                style={{ marginTop: "30px" }}
                type="email"
                fullWidth
              />
              <FormControl
                error={accessLevelError}
                style={{ marginTop: 50 }}
                component="fieldset"
                fullWidth
              >
                <FormLabel component="legend">
                  Choose user access level
                </FormLabel>
                <RadioGroup row aria-label="holiday" name="holiday">
                  <FormControlLabel
                    onClick={handleClickBasic}
                    onChange={(e) =>
                      setCreateUser({ ...createUser, role: e.target.value })
                    }
                    value="Basic"
                    label="Basic"
                    control={<Radio color="primary" />}
                  />
                  <FormControlLabel
                    onClick={handleClickAdmin}
                    onChange={(e) =>
                      setCreateUser({ ...createUser, role: e.target.value })
                    }
                    value="Admin"
                    label="Admin"
                    control={<Radio color="primary" />}
                  />
                </RadioGroup>
              </FormControl>
              <div>
                {basicActive && (
                  <>
                    <FormLabel style={{ marginTop: "30px" }}>Outlets</FormLabel>
                    <ListOutlets
                      setOutlets={(outlets) =>
                        setCreateUser({ ...createUser, outlets: outlets })
                      }
                      userOutlets={[]}
                    />
                    <FormLabel style={{ marginTop: "30px" }}>Hotels</FormLabel>
                    <ListHotels
                      setHotels={(hotels) =>
                        setCreateUser({ ...createUser, hotels: hotels })
                      }
                      userHotels={[]}
                    />
                  </>
                )}
                {adminActive && (
                  <>
                    <FormLabel style={{ marginTop: "30px" }}>
                      Companies
                    </FormLabel>
                    <ListCompanies
                      setCompanies={(companies) =>
                        setCreateUser({ ...createUser, companies: companies })
                      }
                      userCompanies={[]}
                    />
                  </>
                )}
              </div>
              <Button
                onClick={handleSubmit}
                type="submit"
                color="primary"
                variant="contained"
                style={{ marginTop: "30px" }}
                fullWidth
              >
                Create User
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default CreateUser;
