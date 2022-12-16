import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">
            plusnor
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="services">
            Services
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="partners">
            Partners
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="contact">
            Contact
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
