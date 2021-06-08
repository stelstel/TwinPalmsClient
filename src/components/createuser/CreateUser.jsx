import React, { useState, useEffect } from "react";
//import ListOutlets from "./ListOutlets";
//import ListCompanies from "./ListCompanies";
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
  Select,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./CreateUser.css";
//import ListOutlets from "./ListOutlets";
//import ListCompanies from "./ListCompanies";

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
  const [accessLevelError, setAccessLevelError] = useState(false);
  //HOOKS FOR ACCESS LEVEL
  const [basicActive, setBasicActive] = useState(false);
  const [adminActive, setAdminActive] = useState(false);
  //HOOKS FOR SCROLL LISTS
  const [outlets, setOutlets] = useState();
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

  const showSelected = async () => {
    let selected = [];
    [{ ...createUser.companies }].map((c, idx) => {
      let company = companies.find((com) => com.id === c);
      if (company !== "undefined") {
        selected.push(company);
      }
      return selected;
    });
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
    if (basicActive === false && adminActive === false) {
      setAccessLevelError(true);
      return;
    }

    sendPostRequest(createUser);
  };

  return (
    <Grid className="createuser-page-container">
      <Grid style={{ paddingTop: "30px" }}>
        <Paper className="createuser-paper" elevation={10}>
          <Grid align="center">
            <Avatar style={{ backgroundColor: "#1bbd7e", marginTop: "30px" }}>
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
            required
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
            required
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
            required
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
            required
          />
          <TextField
            onChange={(e) => {
              setCreateUser({
                ...createUser,
                notificationEmail: e.target.value,
              });
            }}
            value={createUser.notificationEmail}
            label="Notification email"
            placeholder="Enter email for notification"
            style={{ marginTop: "30px" }}
            type="email"
            fullWidth
          />
          <FormControl
            error={accessLevelError}
            style={{ marginTop: 50 }}
            component="fieldset"
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
          {/* {basicActive && (
            <ListOutlets setOutlets={setOutlets} outlets={outlets} />
          )}
          {adminActive && (
            <ListCompanies setCompanies={setCompanies} companies={companies} />
          )} */}
          {basicActive && (
            <FormControl>
              <Select
                native
                multiple
                onChange={(e) => {
                  //console.log("createUser ", createUser.outlets);
                  console.log("target ", e.target);
                  if (
                    [...createUser.outlets].includes(parseInt(e.target.value))
                  ) {
                    setCreateUser({
                      ...createUser,
                      outlets:
                        createUser.outlets.length > 0
                          ? createUser.outlets.filter(
                              (outlet) => outlet !== parseInt(e.target.value)
                            )
                          : [],
                    });
                  } else {
                    setCreateUser({
                      ...createUser,
                      outlets: [
                        ...createUser.outlets,
                        parseInt(e.target.value),
                      ],
                    });
                  }
                  e.target.value = [];
                }}
              >
                {outlets.map((outlet) => (
                  <option key={outlet.id} value={outlet.id}>
                    {outlet.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          )}
          {adminActive && (
            <FormControl>
              <Select
                native
                multiple
                onChange={(e) => {
                  if (
                    [...createUser.companies].includes(parseInt(e.target.value))
                  ) {
                    setCreateUser({
                      ...createUser,
                      companies:
                        createUser.companies.length > 0
                          ? createUser.companies.filter(
                              (company) => company !== parseInt(e.target.value)
                            )
                          : [],
                    });
                  } else {
                    setCreateUser({
                      ...createUser,
                      companies: [
                        ...createUser.companies,
                        parseInt(e.target.value),
                      ],
                    });
                  }
                  e.target.value = [];
                  [showSelected()].map((s, idx) => <li key={idx}>{s.name}</li>);
                }}
              >
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          )}

          <Link to="./report" style={{ textDecoration: "none" }}>
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
          </Link>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default CreateUser;
