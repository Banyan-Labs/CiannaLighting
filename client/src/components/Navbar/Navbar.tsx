import React, { FC } from "react";
import * as data from "./links.json";
import "./style/Navbar.scss";
import logo from "../../assets/ciana-lighting-logo.png";
import { FaRegBell, FaChevronDown } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const links = JSON.parse(JSON.stringify(data)).links;

// Interface for Link
type Link = {
  label: string;
  href: string;
};

const Links: FC<{ links: Link[] }> = ({}) => {
  const { user } = useParams();
  return (
    <div className="navbar-links-container">
      {links.map((link: Link) => {
        return (
          <div key={link.href}>
            <Link to={link.href + user} className="navbar-links">
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
          {user[0].toUpperCase() + user.substring(1)}
        </span>
        <br />
        <span className="navbar-user-role">User</span>
      </div>
      <FaChevronDown />
    </div>
  );
};

const Navbar: FC<{ user: any }> = ({ user }) => {
  return (
    <>
      <nav className="navbar-container">
        <div className="logo-container">
          <img src={logo} alt="Ciana Logo" />
        </div>
        <div className="navbar-vertical-divider" />
        <Links links={links} />
        <User user={user} />
      </nav>
    </>
  );
};

export default Navbar;
