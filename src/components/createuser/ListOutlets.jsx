import React from "react";
import "./Lists.css";

function ListOutlets(/* { setOutlets, outlets } */ props) {
  const setOutlets = (e) => {
    --props.setOutlets;
  };
  console.log("Propssadf ", props);
  return (
    <>
      <div className="vertical-menu">
        {props.outlets.map((item) => {
          console.log(item);
          return (
            <div onClick={(e) => setOutlets} key={item.id} className="active">
              {item.name}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ListOutlets;
