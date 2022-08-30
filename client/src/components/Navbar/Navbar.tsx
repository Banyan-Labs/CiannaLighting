import React, { FC } from "react";
import * as data from "./links.json";
import "./style/Navbar.scss";
import logo from "../../assets/ciana-lighting-logo.png";
import { FaRegBell, FaChevronDown } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AppProps } from "../../App";
import axios from "../../api/axios";

const links = JSON.parse(JSON.stringify(data)).links;

// Interface for Link
type Link = {
  label: string;
  href: string;
};

const Links: FC<{ links: Link[]; user: any }> = ({ user }) => {
  // const { user } = useParams();
  return (
    <div className="navbar-links-container">
      {links.map((link: Link) => {
        return (
          <div key={link.href}>
            <Link to={link.href + user.name} className="navbar-links">
              {link.label}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

const User: FC<{ user: any }> = ({ user }) => {
  return (
    <div className="navbar-user-container">
      <FaRegBell />
      <div>
        <span className="navbar-user-hi">Hi, </span>
        <span className="navbar-user-name">
          {user?.name?.split(" ")[0]?.toUpperCase() || "Test"}!
        </span>
        <br />
        <span className="navbar-user-role">User</span>
      </div>
      <FaChevronDown />
    </div>
  );
};

const Navbar: FC<AppProps> = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async (e: any) => {
    // console.log(user, "USER");
    try {
      e.preventDefault();
      const response = await axios.post("/users/log_out/user", {
        email: user.email,
      });

      // console.log(response?.data, "response");
      setUser({});
      // console.log(user, "POST=>post");
      navigate("/login");
    } catch (err) {
      console.log(err, "ERRORRRRR");
    }
  };
  return (
    <>
      <nav className="navbar-container">
        <div className="logo-container">
          <img src={logo} alt="Ciana Logo" />
        </div>
        <button onClick={(e) => handleLogout(e)}>logout</button>
        <div className="navbar-vertical-divider" />
        <Links user={user} links={links} />
        <User user={user} />
      </nav>
    </>
  );
};

export default Navbar;
