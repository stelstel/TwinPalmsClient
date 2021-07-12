import React, { useState, useEffect } from "react";
import ListOutlets from "../createuser/ListOutlets";
import ListHotels from "../createuser/ListHotels";
import ListCompanies from "../createuser/ListCompanies";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
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
  const history = useHistory();
  const BASE_URL = "http://localhost:5000";

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

  //POST REQUEST'
  const sendPutRequest = async (data) => {
    await axios
      .put(`${BASE_URL}/api/users/${id}`, data)
      .then(({ data }) => {
        console.log(data);
        toast.success("Successfully updated!");
      })
      .then(setTimeout(() => history.goBack(), 2000))
      .catch((err) => {
        toast.error("Update failed!");
        console.error(err);
      });
  };

  //FETCH LIST OF OUTLETS FROM API

  const getUser = async () => {
    await axios
      .get(`${BASE_URL}/api/users/${id}`)
      .then(({ data }) => {
        console.log("User ", data);
        console.log("successfull get request");
        data.role = !data.roles.includes("Admin") ? "Basic" : "Admin";
        if (data.role === "Admin") {
          data.companies = data.companies.map((c) => c.id);
        } else {
          data.outlets = data.outlets.map((c) => c.id);
          data.hotels = data.hotels.map((c) => c.id);
        }

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
    <>
      <Toaster />
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
                  setOutlets={(outlets) =>
                    setUser({ ...user, outlets: outlets })
                  }
                  userOutlets={user.outlets}
                />
                <FormLabel style={{ marginTop: "30px" }}>Hotels</FormLabel>
                <ListHotels
                  setHotels={(hotels) => setUser({ ...user, hotels: hotels })}
                  userHotels={user.hotels}
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
              >
                Update User
              </Button>
              <Button
                onClick={() => history.goBack()}
                color="secondary"
                variant="contained"
                style={{ marginTop: "30px" }}
              >
                Cancel
              </Button>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default EditUser;
