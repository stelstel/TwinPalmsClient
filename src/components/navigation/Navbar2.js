import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./Navbar.css";

function Navbar(user) {
  console.log("User ", user);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(false)

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const handleLogout = async () => {
    await (window.location.href = "/");
  };


  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo" onClick={closeMobileMenu}>
            <img
              className="navbar-logo-img"
              src="./images/TPHR.jpg"
              alt="error loading img"
            />
          </div>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {user.roles.includes("SuperAdmin") ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/admin"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Admin
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/createuser"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Create user
                  </Link>
                </li>
              </>
            ) : user.roles.includes("Admin") ? (
              <li className="nav-item">
                <Link
                  to="/datareports"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Data reports
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/report"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Daily report
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link
                to="/change-password"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Settings
              </Link>
              <li className="nav-item">
              <div
                className="nav-links-mobile"
                onClick={() => handleLogout()}
              >
                LOGOUT
              </div>
            </li>
            </li>
          </ul>
            {button && <Button onClick={() => handleLogout()} buttonStyle="btn--outline">LOGOUT</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
