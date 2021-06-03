import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./Navbar.css";

function Navbar(user) {
  console.log("User ", user);
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img
              className="navbar-logo-img"
              src="./images/TPHR.jpg"
              alt="error loading img"
            />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/home" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
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
              <li className="nav-item">
                <Link
                  to="/report"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Daily report
                </Link>
              </li>
            )}
          </ul>
          <Link to="/login">
            <Button
              onClick={() => (window.location.href = "/")}
              buttonStyle="btn--outline"
            >
              LOGOUT
            </Button>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
