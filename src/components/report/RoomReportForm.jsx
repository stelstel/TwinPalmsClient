import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  RadioGroup,
  Radio,
  FormLabel,
  FormControlLabel,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";

import { UserContext } from "../../App";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 100,
  },
}));

function RoomReportForm(props) {
  const user = useContext(UserContext);
  console.log("User from rRoomReport ", props.user);
  const classes = useStyles();
  const [localEvents, setLocalEvents] = useState([]);
  //const [file, setFile] = useState({});
  const [roomReport, setRoomReport] = useState({
    newRoomNights: 0,
    todaysRevenuePickup: 0,
    otherRevenue: 0,
    isPublicHoliday: 0,
    notes: "",
    date: "2012-03-12",
    loggerId: user.id,
    roomTypeId: 0,
    localEventId: 0,
  });
  const submitRoomReport = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    Object.entries(roomReport).map((rr) => {
      return formData.append(rr[0], rr[1]);
    });
    console.log(formData)
    await axios
      .post("https://localhost:44306/api/roomreports", formData)
      .then(({ data }) => {
        console.log(formData)
        console.log(data);
        console.log("roomReport ", roomReport);
      })
      .catch((err) => console.log("Error ", err));
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
    let url = "https://localhost:44306/api/LocalEvent";
    getEvents(url);
  }, []);

  return (
    <Grid className="report-grid-container">
      <Grid>
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
              setRoomReport({ ...roomReport, newRoomNights: e.target.value })
            }
            defaultValue
            error
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
            defaultValue
            error
            fullWidth
          />
          <TextField
            style={{ marginTop: "40px" }}
            placeholder="Enter other revenue total"
            label="Other Revenue"
            type="number"
            onChange={(e) =>
              setRoomReport({ ...roomReport, otherRevenue: e.target.value })
            }
            defaultValue
            error
            fullWidth
          />
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel>Choose Room type</InputLabel>
            <Select
              id="roomType"
              labelId="roomType"
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
            <FormLabel component="legend">Is it a public holiday?</FormLabel>
            <RadioGroup row aria-label="holiday" name="holiday">
              <FormControlLabel
                control={
                  <Radio
                    checked={roomReport.isPublicHoliday === true ? true : false}
                    onClick={() => {
                      setRoomReport({ ...roomReport, isPublicHoliday: true });
                    }}
                    color="primary"
                  />
                }
                label="Yes"
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={
                      roomReport.isPublicHoliday === false ? true : false
                    }
                    onClick={() => {
                      setRoomReport({ ...roomReport, isPublicHoliday: false });
                    }}
                    color="primary"
                  />
                }
                label="No"
              />
            </RadioGroup>
          </FormControl>

          {/* Local Events */}
          <FormControl style={{ marginTop: 10 }} fullWidth required>
            <InputLabel>Any local events?</InputLabel>
            <Select
              labelId="localevents"
              id="localevents"
              defaultValue=""
              onChange={(e) =>
                setRoomReport({ ...roomReport, localEventId: e.target.value })
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
          <FormControl style={{ marginTop: 45 }} fullWidth required>
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
              {roomReport.imagePath ? roomReport.imagePath : "No file chosen"}
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
      </Grid>
    </Grid>
  );
}

export default RoomReportForm;
