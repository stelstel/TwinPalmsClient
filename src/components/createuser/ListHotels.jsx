import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Lists.css";

function ListHotels(/* { setHotels, outlets } */ props) {
  // props.userOUtlets can be undefined
  const [userHotels, setUserHotels] = useState(props.userHotels || []);
  const [hotels, setHotels] = useState([]);

  const handleChange = (id) => {
    //props.setHotels(id);
    console.log(id);
    if (userHotels.includes(id)) {
      setUserHotels([...userHotels.filter((hotel) => hotel !== id)]);
      props.setHotels([...userHotels.filter((hotel) => hotel !== id)]);
    } else {
      setUserHotels([...userHotels, id]);
      props.setHotels([...userHotels, id]);
    }
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

  useEffect(() => {
    getHotels("https://localhost:44306/api/hotels");
  }, []);
  return (
    <>
      <div className="vertical-menu">
        {hotels.map((item) => {

          console.log(item);
          return (
            <div
              onClick={() => handleChange(item.id)}
              key={item.id}
              className="active"
              style={{
                color:
                  userHotels.length > 0 && userHotels.includes(item.id)
                    ? "blue"
                    : "",
              }}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ListHotels;
