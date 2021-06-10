import React, { useState, useEffect } from "react";
import ListOutlets from "../createuser/ListOutlets";
import ListCompanies from "../createuser/ListCompanies";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  FormLabel,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "../createuser/CreateUser.css";

function EditUser() {
  const { id } = useParams();

  //REACT HOOKS
  const [user, setUser] = useState({
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
  //const [accessLevelError, setAccessLevelError] = useState(false);

  //HOOKS FOR SCROLL LISTS
  const [outlets, setOutlets] = useState();
  const [companies, setCompanies] = useState();

  /* const handleClickBasic = () => {
    setUser({ ...user, role: "Basic" });

    setAccessLevelError(false);
  };
  const handleClickAdmin = () => {
    setUser({ ...user, role: "Admin" });
    setAccessLevelError(false);
  };
  */

  //POST REQUEST'
  const sendPutRequest = async (data) => {
    await axios
      .put(`https://localhost:44306/api/users/${id}`, data)
      .then(({ data }) => {
        console.log(data);
        console.log("successfull put request");
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
        console.log("error with get request for users ", err);
      });
  };

  const getUser = async () => {
    await axios
      .get(`https://localhost:44306/api/users/${id}`)
      .then(({ data }) => {
        console.log("User ", data);
        console.log("successfull get request");
        data.role = !data.roles.includes("Admin") ? "Basic" : "Admin";
        data.role === "Admin"
          ? (data.companies = data.companies.map((c) => c.id))
          : (data.outlets = data.outlets.map((c) => c.id));

        setUser(data);
      })
      .catch((err) => {
        // Handle Error Here
        console.log("error with get request for user");
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
    getUser();
    // eslint-disable-next-line
  }, []);

  //SUBIT FORM AND SEND IT TO DATABASE AND ERROR HANDLING
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.userName === "") {
      setUserNameError(true);
    }
    if (user.firstName === "") {
      setFirstNameError(true);
    }
    if (user.lastName === "") {
      setLastNameError(true);
    }
    if (user.email === "") {
      setEmailError(true);
    }

    sendPutRequest(user);
  };

  return (
    <Grid className="createuser-page-container">
      <Grid style={{ paddingTop: "30px" }}>
        <Paper className="createuser-paper" elevation={10}>
          <Grid align="center">
            <Avatar style={{ backgroundColor: "#1bbd7e", marginTop: "30px" }}>
              <AccountCircleIcon />
            </Avatar>
            <h2 style={{ marginTop: 20 }}>Update User</h2>
          </Grid>
          <TextField
            onChange={(e) => {
              setUser({ ...user, userName: e.target.value });
              setUserNameError(false);
            }}
            value={user.userName}
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
              setUser({ ...user, firstName: e.target.value });
              setFirstNameError(false);
            }}
            value={user.firstName}
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
              setUser({ ...user, lastName: e.target.value });
              setLastNameError(false);
            }}
            value={user.lastName}
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
              setUser({ ...user, email: e.target.value });
              setEmailError(false);
            }}
            value={user.email}
            label="Email"
            placeholder="Enter email"
            style={{ marginTop: "30px" }}
            type="email"
            error={emailError}
            fullWidth
            required
          />

          {user.role === "Basic" && (
            <>
              <FormLabel style={{ marginTop: "30px" }}> Outlets</FormLabel>
              <ListOutlets
                setOutlets={(outlets) => setUser({ ...user, outlets: outlets })}
                outlets={outlets}
                userOutlets={user.outlets}
              />
            </>
          )}
          {user.role === "Admin" && (
            <>
              <FormLabel style={{ marginTop: "30px" }}>Companies</FormLabel>
              <ListCompanies
                setCompanies={(companies) =>
                  setUser({ ...user, companies: companies })
                }
                companies={companies}
                userCompanies={user.companies}
              />
            </>
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
              Update User
            </Button>
          </Link>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default EditUser;
