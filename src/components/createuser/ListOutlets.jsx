import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Lists.css";

function ListOutlets(/* { setOutlets, outlets } */ props) {
  // props.userOUtlets can be undefined
  const [userOutlets, setUserOutlets] = useState(props.userOutlets || []);
  const [outlets, setOutlets] = useState([]);
  const handleChange = (id) => {
    //props.setOutlets(id);
    console.log(id);
    if (userOutlets.includes(id)) {
      setUserOutlets([...userOutlets.filter((outlet) => outlet !== id)]);
      props.setOutlets([...userOutlets.filter((outlet) => outlet !== id)]);
    } else {
      setUserOutlets([...userOutlets, id]);
      props.setOutlets([...userOutlets, id]);
    }
  };
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
  useEffect(() => {
    getOutlets("https://localhost:44306/api/Outlets");
  }, []);
  return (
    <>
      <div className="vertical-menu">
        {outlets.map((item) => {
          console.log(item);
          return (
            <div
              onClick={() => handleChange(item.id)}
              key={item.id}
              className="active"
              style={{
                color:
                  userOutlets.length > 0 && userOutlets.includes(item.id)
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

export default ListOutlets;
