import React, { FC } from "react";

interface NavbarProps {
  link: string;
}

const Navbar: FC<NavbarProps> = ({ link }) => {
  return (
    <>
      <div className="navbar-container">
        <a href="#">{link}</a>
      </div>
    </>
  );
};

export default Navbar;
