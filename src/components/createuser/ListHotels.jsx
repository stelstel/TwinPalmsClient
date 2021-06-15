import React, { useState } from "react";
import "./Lists.css";

function ListHotels(/* { setHotels, outlets } */ props) {
  // props.userOUtlets can be undefined
  const [hotels, setHotels] = useState(props.userOutlets || []);

  const handleChange = (id) => {
    //props.setHotels(id);
    console.log(id);
    if (hotels.includes(id)) {
      setHotels([...hotels.filter((outlet) => outlet !== id)]);
      props.setHotels([...hotels.filter((outlet) => outlet !== id)]);
    } else {
      setHotels([...hotels, id]);
      props.setHotels([...hotels, id]);
    }
  };

  return (
    <>
      <div className="vertical-menu">
        {props.hotels.map((item) => {
          console.log(item);
          return (
            <div
              onClick={() => handleChange(item.id)}
              key={item.id}
              className="active"
              style={{
                color:
                  hotels.length > 0 && hotels.includes(item.id) ? "blue" : "",
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
