import React, { useState, useEffect } from "react";
import { Button, TextField, Paper, Grid } from "@material-ui/core";
import axios from "axios";
import "./Events.css";

function Events() {
  //REACT HOOKS

  //const [event, setEvent] = useState();
  const [events, setEvents] = useState();

  //GET REQUEST
  const getEvents = async () => {
    try {
      const res = await axios.get("https://localhost:44306/api/LocalEvent");
      console.log("successfull get request");
      console.log(res.data);
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  //POST REQUEST, NEW EVENT
  const sendPostRequest = async (data) => {
    try {
      //console.log(e.target);

      const res = await axios.post(
        "https://localhost:44306/api/LocalEvent",
        data
      );
      console.log(data);
      console.log(res.data);
      console.log("successfull post request");
    } catch (err) {
      console.error(err);
      console.log("error with post request");
    }
  };
  //PUT REQUEST, EDIT EVENT
  const sendPutRequest = async (id, data) => {
    try {
      const res = await axios.put(
        `https://localhost:44306/api/LocalEvent/${id}`,
        data
      );
      console.log(res.data);
      console.log("edit name");
      console.log("successfull put request");
    } catch (err) {
      console.error(err);
      console.log("error with put request");
    }
  };
  //PUT REQUEST, EDIT ACTIVE
  const sendDeleteRequest = async (id) => {
    try {
      const res = await axios.delete(
        `https://localhost:44306/api/LocalEvent/${id}`
      );
      console.log(res.data);
      console.log("active");
      console.log("successfull put request");
    } catch (err) {
      console.error(err);
      console.log("error with put request");
    }
  };

  //RENDER AGAIN AFTER GET REQUEST
  useEffect(() => {
    getEvents();
  }, []);

  //EDIT EVENT
  const handleEdit = (e, event) => {
    const data = {
      event:
        e.target.parentElement.parentElement.parentElement.firstChild.lastChild
          .firstChild.value,
      active: true,
    };
    console.log({ data });
    sendPutRequest(event.id, data);
  };

  const handlePost = (e) => {
    console.log(e.target);
    const data = {
      event:
        e.target.parentElement.parentElement.firstChild.lastChild.firstChild
          .value,
      active: true,
    };
    console.log({ data });
    sendPostRequest(data);
  };
  //DELETE EVENT
  const handleDelete = (id) => {
    sendDeleteRequest(id);
  };

  return (
    <>
      <Grid
        style={{
          backgroundColor: "#494949",
          height: "calc(100vh - 120px)",
          paddingTop: "60px",
        }}
      >
        <Paper className="events-paper" elevation={10}>
          <Grid
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1 className="events-title">Manage Events</h1>
            <Grid
              style={{
                display: "flex",
                flexDirection: "column",
                color: "#fff",
              }}
            >
              {events &&
                events
                  .filter((val) => {
                    if (val.active === true) {
                      return val;
                    }
                    return null;
                  })
                  .map((item) => {
                    return (
                      <Grid className="event-container" key={item.id}>
                        {console.log("event", item.event)}
                        <TextField
                          className="event-input"
                          name="event"
                          placeholder={item.event}
                          label="Event"
                          defaultValue={item.event}
                          required
                        />
                        <Grid className="event-buttons">
                          <span onClick={(e) => handleEdit(e, item)}>
                            <i className="fas fa-edit"></i>
                          </span>
                          <span onClick={() => handleDelete(item.id)}>
                            <i className="fas fa-trash-alt"></i>
                          </span>
                        </Grid>
                      </Grid>
                    );
                  })}
            </Grid>
            <Grid className="add-event-container">
              <TextField
                className="event-input"
                label="Add Event"
                variant="outlined"
              />
              <Button
                onClick={(e) => handlePost(e)}
                className="add-event-btn"
                color="primary"
                variant="contained"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default Events;
