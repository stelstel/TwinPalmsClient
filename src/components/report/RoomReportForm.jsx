import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import {
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  RadioGroup,
  Radio,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";

import { UserContext } from "../../App";

const BASE_URL = "http://localhost:5000/api";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 100,
  },
}));

function RoomReportForm(props) {
  const user = useContext(UserContext);
  console.log("User from RoomReport ", props.user);
  const classes = useStyles();
  const initialErrors = {
    roomTypeId: false,
    newRoomNights: false,
    otherRevenue: false,
    isPublicHoliday: false,
    todaysRevenuePickup: false,
  };
  const [error, setError] = useState(initialErrors);

  const [localEvents, setLocalEvents] = useState([]);
  //
  const [submitted, setSubmitted] = useState(false);

  const [roomReport, setRoomReport] = useState({
    newRoomNights: "",
    todaysRevenuePickup: "",
    otherRevenue: "",
    isPublicHoliday: null,
    notes: "",
    date: "2012-03-12",
    loggerId: user.id,
    roomTypeId: "",
    localEventId: "",
  });

  //const validateNotZero = []
  const submitRoomReport = async (e) => {
    e.preventDefault();
    //Object.values(error).map((e) => (e.value = false));

    /* setError({
      ...initialErrors,
      
    }); */
    for (let item of Object.keys(error)) {
      console.log("kehs hsh ", item);
      if (roomReport[item] === "" || roomReport[item] === null) {
        setError({
          ...error,
          [item]: true,
        });
      } else {
        setError({ ...error, [item]: false });
      }
    }

    if (!Object.values(error).filter((err) => err === true).length > 0) {
      const formData = new FormData(e.target);

      Object.entries(roomReport).map((rr) => {
        return formData.append(rr[0], rr[1]);
      });
      console.log(formData);
      await axios
        .post(`${BASE_URL}/roomreports`, formData)
        .then(({ data }) => {
          setSubmitted(true);
          console.log(data);
          console.log("roomReport ", roomReport);
        })
        .catch((err) => console.log("Error ", err));
    }
  };
  const getEvents = async (url) => {
    await axios
      .get(url)
      .then(({ data }) => {
        setLocalEvents(data);
      })
      .catch((err) => console.log("Error ", err));
  };

  useEffect(() => {
    let url = `${BASE_URL}/LocalEvent`;
    getEvents(url);
  }, []);

  return (
    <>
      {!submitted ? (
        <Grid className="report-grid-container">
          <Grid>
            <Paper className="createuser-paper" elevation={10}>
              <Grid align="center">
                <h3 style={{ marginBottom: "25px" }}>New Room Report</h3>
              </Grid>
              <form onSubmit={(e) => submitRoomReport(e)} id="roomReportForm">
                <TextField
                  style={{ marginTop: "40px" }}
                  placeholder="Enter number of new room nigths"
                  label="New Room Nights"
                  type="number"
                  onChange={(e) =>
                    setRoomReport({
                      ...roomReport,
                      newRoomNights: e.target.value,
                    })
                  }
                  error={error.newRoomNights}
                  helperText={
                    error.newRoomNights ? "Must be a positive number" : ""
                  }
                  fullWidth
                />
                <TextField
                  style={{ marginTop: "40px" }}
                  placeholder="Enter todays revenue pickup"
                  label="Todays Revenue Pickup"
                  type="number"
                  onChange={(e) =>
                    setRoomReport({
                      ...roomReport,
                      todaysRevenuePickup: e.target.value,
                    })
                  }
                  error={error.todaysRevenuePickup}
                  helperText={
                    error.todaysRevenuePickup ? "Must be a positive number" : ""
                  }
                  fullWidth
                />
                <TextField
                  style={{ marginTop: "40px" }}
                  placeholder="Enter other revenue total"
                  label="Other Revenue"
                  type="number"
                  onChange={(e) =>
                    setRoomReport({
                      ...roomReport,
                      otherRevenue: e.target.value,
                    })
                  }
                  error={error.otherRevenue}
                  helperText={
                    error.otherRevenue ? "Must be a positive number" : ""
                  }
                  fullWidth
                />
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel style={{ maginTop: "40px" }}>
                    Choose Room type
                  </InputLabel>
                  <Select
                    id="roomType"
                    labelId="roomType"
                    error={error.roomTypeId}
                    helperText={
                      error.roomTypeId ? "You must choose a room type" : ""
                    }
                    onChange={(e) =>
                      setRoomReport({
                        ...roomReport,
                        roomTypeId: e.target.value,
                      })
                    }
                  >
                    {user.hotels.map((h) =>
                      h.roomTypes.map((r) => (
                        <MenuItem key={r.id} value={r.id}>
                          {r.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
                <FormControl style={{ marginTop: 45 }} component="fieldset">
                  <FormLabel component="legend">
                    Is it a public holiday?
                  </FormLabel>
                  <RadioGroup row aria-label="holiday" name="holiday">
                    <FormControlLabel
                      control={
                        <Radio
                          checked={roomReport.isPublicHoliday === true}
                          onClick={() => {
                            setRoomReport({
                              ...roomReport,
                              isPublicHoliday: true,
                            });
                          }}
                          color="primary"
                        />
                      }
                      label="Yes"
                    />
                    <FormControlLabel
                      control={
                        <Radio
                          checked={roomReport.isPublicHoliday === false}
                          onClick={() => {
                            setRoomReport({
                              ...roomReport,
                              isPublicHoliday: false,
                            });
                          }}
                          color="primary"
                        />
                      }
                      label="No"
                    />
                  </RadioGroup>
                  <FormHelperText>
                    {error.isPublicHoliday === null
                      ? "You must choose type of day"
                      : ""}
                  </FormHelperText>
                </FormControl>

                {/* Local Events */}
                <FormControl style={{ marginTop: 10 }} fullWidth>
                  <InputLabel>Any local events?</InputLabel>
                  <Select
                    labelId="localevents"
                    id="localevents"
                    defaultValue=""
                    onChange={(e) =>
                      setRoomReport({
                        ...roomReport,
                        localEventId: e.target.value,
                      })
                    }
                  >
                    {localEvents &&
                      localEvents
                        .filter((item) => {
                          if (item.active === true) {
                            return item;
                          }
                          return null;
                        })
                        .map((item, key) => {
                          return (
                            <MenuItem key={key} value={item.id}>
                              {item.event}
                            </MenuItem>
                          );
                        })}
                  </Select>
                </FormControl>
                <FormControl style={{ marginTop: 45 }} fullWidth>
                  <TextareaAutosize
                    rowsMin={3}
                    rowsMax={3}
                    aria-label="maximum height"
                    placeholder="Additional information about local events"
                    defaultValue=""
                  />
                </FormControl>
                <Grid>
                  <InputLabel style={{ marginTop: "60px" }}>
                    Add a picture on your cash registry
                  </InputLabel>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    name="file"
                    id="file"
                  />
                  <label
                    style={{
                      marginTop: "20px",
                      padding: "5px 0px",
                      width: "95px",
                      height: "36px",
                      textAlign: "center",
                      border: "1px solid #494949",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    htmlFor="file"
                  >
                    Select file
                  </label>
                  <label style={{ marginLeft: "10px", color: "#494949" }}>
                    {roomReport.file ? roomReport.file : "No file chosen"}
                  </label>
                </Grid>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={{ marginTop: "30px" }}
                  fullWidth
                >
                  Create Report
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <h1>submitted</h1>
      )}
    </>
  );
}

export default RoomReportForm;
