import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Lists.css";

const BASE_URL = "http://localhost:5000/api";

function ListCompanies(/* { setCompanies, outlets } */ props) {
  const [userCompanies, setUserCompanies] = useState(props.userCompanies || []);
  const [companies, setCompanies] = useState([]);

  const handleChange = (id) => {
    //props.setOutlets(id);
    console.log(id);
    if (userCompanies.includes(id)) {
      setUserCompanies([...userCompanies.filter((company) => company !== id)]);
      props.setCompanies([
        ...userCompanies.filter((company) => company !== id),
      ]);
    } else {
      setUserCompanies([...userCompanies, id]);
      props.setCompanies([...userCompanies, id]);
    }
  };
  const getCompanies = async (url) => {
    await axios
      .get(url)
      .then((res) => {
        console.log("Companies ", res.data);
        console.log("successfull get request");
        setCompanies(res.data);
      })
      .catch((err) => {
        // Handle Error Here
        console.log("error with get request for users");
        console.log(err);
      });
  };

  //RUN GET REQUESTS ON LOAD
  useEffect(() => {
    getCompanies(`${BASE_URL}/Companies`);
  }, []);

  return (
    <>
      <div className="vertical-menu">
        {companies.map((item) => {
          console.log(item);
          return (
            <div
              onClick={() => handleChange(item.id)}
              key={item.id}
              className="active"
              style={{ color: userCompanies.includes(item.id) ? "blue" : "" }}
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
