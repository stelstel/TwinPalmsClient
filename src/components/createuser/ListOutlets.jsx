import React, { useState } from "react";
import "./Lists.css";

function ListOutlets(/* { setOutlets, outlets } */ props) {
  // props.userOUtlets can be undefined
  const [outlets, setOutlets] = useState(props.userOutlets || []);

  const handleChange = (id) => {
    //props.setOutlets(id);
    console.log(id);
    if (outlets.includes(id)) {
      setOutlets([...outlets.filter((outlet) => outlet !== id)]);
      props.setOutlets([...outlets.filter((outlet) => outlet !== id)]);
    } else {
      setOutlets([...outlets, id]);
      props.setOutlets([...outlets, id]);
    }
  };

  return (
    <>
      <div className="vertical-menu">
        {props.outlets.map((item) => {
          console.log(item);
          return (
            <div
              onClick={() => handleChange(item.id)}
              key={item.id}
              className="active"
              style={{
                color:
                  outlets.length > 0 && outlets.includes(item.id) ? "blue" : "",
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
