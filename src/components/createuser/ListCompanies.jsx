import React, { useState } from "react";
import "./Lists.css";

function ListCompanies(/* { setCompanies, outlets } */ props) {
  const [companies, setCompanies] = useState([]);

  const handleChange = (id) => {
    //props.setOutlets(id);
    console.log(id);
    if (companies.includes(id)) {
      setCompanies([...companies.filter((company) => company !== id)]);
      props.setCompanies([...companies.filter((company) => company !== id)]);
    } else {
      setCompanies([...companies, id]);
      props.setCompanies([...companies, id]);
    }
  };

  return (
    <>
      <div className="vertical-menu">
        {props.companies.map((item) => {
          console.log(item);
          return (
            <div
              onClick={() => handleChange(item.id)}
              key={item.id}
              className="active"
              style={{ color: companies.includes(item.id) ? "blue" : "" }}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ListCompanies;
