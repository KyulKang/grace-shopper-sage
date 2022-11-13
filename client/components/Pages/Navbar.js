import React from "react";

const Navbar = () => {
  return (
    <nav className={"navbar navbar-expand-lg navbar-light bg-light"}>
      <NavbarLogo />
      <div className={"collapse navbar-collapse"} id="navbarNavDropdown">
        <NavbarNav />
      </div>
      <div className="inline">
        <NavbarNav />
      </div>
    </nav>
  );
};
const NavbarLogo = () => {
  return (
    <React.Fragment>
      <a className={"navbar-brand"} href=".">
        Navbar
      </a>
      <button
        className={"navbar-toggler"}
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className={"navbar-toggler-icon"}></span>
      </button>
    </React.Fragment>
  );
};
const NavbarNav = () => {
  return (
    <ul className={"navbar-nav mr-auto mt-2 mt-lg-0"}>
      <NavLink link="Home" />
      <NavLink link="Products" />
      <NavLink link="Pricing" />
    </ul>
  );
};

const NavLink = (props) => {
  return (
    <li className={"nav-item active"}>
      <a className={"nav-link"} href=".">
        {props.link}
      </a>
    </li>
  );
};

export default Navbar;
