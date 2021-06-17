import React, { useState, useEffect } from "react";
import ListOutlets from "./ListOutlets";
import ListHotels from "./ListHotels";
import ListCompanies from "./ListCompanies";
import { Link } from "react-router-dom";
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
  //Select,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./CreateUser.css";

function CreateUser() {
  //REACT HOOKS
  const [createUser, setCreateUser] = useState({
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
  });
  //HOOKS FOR ERRORS
  const [userNameError, setUserNameError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailNotificationError, setEmailNotificationError] = useState(false);
  const [accessLevelError, setAccessLevelError] = useState(false);
  //HOOKS FOR ACCESS LEVEL
  const [basicActive, setBasicActive] = useState(false);
  const [adminActive, setAdminActive] = useState(false);
  //HOOKS FOR SCROLL LISTS
  const [outlets, setOutlets] = useState();
  const [hotels, setHotels] = useState();
  const [companies, setCompanies] = useState();

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
      .post("https://localhost:44306/api/Authentication", data)
      .then(({ data }) => {
        console.log(data);
        console.log("successfull post request");
      })
      .catch((err) => console.error(err));
  };

  //FETCH LIST OF OUTLETS FROM API
  const url = "https://localhost:44306/api/Outlets";

  const getOutlets = async (url) => {
    await axios
      .get(url)
      .then((res) => {
        console.log("Outlets ", res.data);
        console.log("successfull get request");
        setOutlets(res.data);
      })
      .catch((err) => {
        // Handle Error Here
        console.log("error with get request for users");
        console.error(err);
      });
  };

  const getHotels = async (url) => {
    await axios
      .get(url)
      .then((res) => {
        console.log("Hotels ", res.data);
        console.log("successfull get request");
        setHotels(res.data);
      })
      .catch((err) => {
        // Handle Error Here
        console.log("error with get request for users");
        console.error(err);
      });
  };
 
  //FETCH LIST OF COMPANIES FROM API
  const urlCompanies = "https://localhost:44306/api/Companies";

  const getCompanies = async (url) => {
    await axios
      .get(url)
      .then((res) => {
        console.log("Companies ", res.data);
        console.log("successfull get request");
        setCompanies(res.data);
      })
      .catch((err) => {
        // Handle Error Here
        console.log("error with get request for users");
        console.log(err);
      });
  };

  //RUN GET REQUESTS ON LOAD
  useEffect(() => {
    getCompanies(urlCompanies);
  }, []);
  useEffect(() => {
    getOutlets(url);
  }, []);

  useEffect(() => {
    getHotels("https://localhost:44306/api/hotels");
  }, []);

  //SUBIT FORM AND SEND IT TO DATABASE AND ERROR HANDLING
  const handleSubmit = (e) => {
    e.preventDefault();
    if (createUser.userName === "") {
      setUserNameError(true);
    }
    if (createUser.firstName === "") {
      setFirstNameError(true);
    }
    if (createUser.lastName === "") {
      setLastNameError(true);
    }
    if (createUser.email === "") {
      setEmailError(true);
    }
    if (createUser.notificationEmail === "") {
      setEmailNotificationError(true);
    }
    if (basicActive === false && adminActive === false) {
      setAccessLevelError(true);
      return;
    }

    sendPostRequest(createUser);
  };

  return (
    <Grid className="createuser-page-container">
      <Grid style={{ paddingTop: "30px", paddingBottom: "30px" }}>
        <Paper className="createuser-paper" elevation={10}>
          <Grid align="center">
            <Avatar style={{ backgroundColor: "#1bbd7e"}}>
              <AccountCircleIcon />
            </Avatar>
            <h2 style={{ marginTop: 20 }}>Create User</h2>
          </Grid>
          <TextField
            onChange={(e) => {
              setCreateUser({ ...createUser, userName: e.target.value });
              setUserNameError(false);
            }}
            value={createUser.userName}
            label="Username"
            placeholder="Enter username"
            style={{ marginTop: "20px" }}
            type="text"
            fullWidth
            error={userNameError}
          />
          <TextField
            onChange={(e) => {
              setCreateUser({ ...createUser, firstName: e.target.value });
              setFirstNameError(false);
            }}
            value={createUser.firstName}
            label="First name"
            placeholder="Enter first name"
            style={{ marginTop: "30px" }}
            type="text"
            fullWidth
            error={firstNameError}
          />
          <TextField
            onChange={(e) => {
              setCreateUser({ ...createUser, lastName: e.target.value });
              setLastNameError(false);
            }}
            value={createUser.lastName}
            label="Last name"
            placeholder="Enter last name"
            style={{ marginTop: "30px" }}
            type="text"
            fullWidth
            error={lastNameError}
          />
          <TextField
            onChange={(e) => {
              setCreateUser({ ...createUser, email: e.target.value });
              setEmailError(false);
            }}
            value={createUser.email}
            label="Email"
            placeholder="Enter email"
            style={{ marginTop: "30px" }}
            type="email"
            error={emailError}
            fullWidth
          />
          <TextField
            onChange={(e) => {
              setCreateUser({
                ...createUser,
                notificationEmail: e.target.value,
              });
              setEmailNotificationError(false)
            }}
            value={createUser.notificationEmail}
            label="Notification email"
            placeholder="Enter email for notification"
            style={{ marginTop: "30px" }}
            type="email"
            error={emailNotificationError}
            fullWidth
          />
          <FormControl
            error={accessLevelError}
            style={{ marginTop: 50 }}
            component="fieldset"
            fullWidth
          >
            <FormLabel component="legend">Choose user access level</FormLabel>
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
          {basicActive && (
            <>
              <FormLabel style={{ marginTop: "30px", textAlign: "start" }}>Outlets</FormLabel>
              <ListOutlets
                setOutlets={(outlets) =>
                  setCreateUser({ ...createUser, outlets: outlets })
                }
                outlets={outlets}
                userOutlets={[]}
              />
              <FormLabel style={{ marginTop: "30px" }}>Hotels</FormLabel>
              <ListHotels
                setHotels={(hotels) =>
                  setCreateUser({ ...createUser, hotels: hotels })
                }
                hotels={hotels}
                userHotels={[]}
              />
            </>
          )}
          {adminActive && (
            <>
              <FormLabel style={{ marginTop: "30px" }}>Companies</FormLabel>
              <ListCompanies
                setCompanies={(companies) =>
                  setCreateUser({ ...createUser, companies: companies })
                }
                companies={companies}
                userCompanies={[]}
              />
            </>
          )}

          <Link to="./report" style={{ textDecoration: "none" }}>
            <Button
              onClick={handleSubmit}
              type="submit"
              color="primary"
              variant="contained"
              style={{ marginTop: "50px" }}
              fullWidth
            >
              Create User
            </Button>
          </Link>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default CreateUser;
