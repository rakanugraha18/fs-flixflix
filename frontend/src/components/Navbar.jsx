import React, { useState } from "react";
import { HiHome, HiPlayCircle, HiStar, HiTv } from "react-icons/hi2";
import NavbarItem from "./NavbarItem";
import * as FaIcons from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import image from "../assets/FlixflixPNG2.png";

// import profile from "./../assets/bony.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [toggle, setToggle] = useState(false);
  const [toggleAccount, setToggleAccount] = useState(false);

  const menu = [
    {
      name: "HOME",
      icon: HiHome,
      path: "/",
    },
    {
      name: "UPCOMING",
      icon: FaIcons.FaBullhorn,
      path: "/Upcoming",
    },
    {
      name: "TOP RATE",
      icon: HiStar,
      path: "/TopRate",
    },
    {
      name: "SERIES",
      icon: HiTv,
      path: "/Series",
    },
  ];

  const account = [
    {
      name: "LOGIN",
      icon: FaIcons.FaUser,
      path: "/Login",
    },
    {
      name: "REGISTER",
      icon: FaIcons.FaUser,
      path: "/Register",
    },
  ];

  return (
    <>
      <nav className="fixed bg-orange-500 w-full z-[999999]">
        {/* Header */}
        <div className="flex items-center justify-between py-2">
          <div className="flex gap-8 items-center pr-4 md:pr-10 text-white">
            <div className="w-[115px]">
              <a href="/">
                <img
                  src={image}
                  className="pl-5 p-2 w-[110px] object-cover"
                ></img>
                {/* <h1 className="font-bold text-3xl px-7 text-white">flixflix</h1> */}
              </a>
            </div>
            <div className="hidden md:flex gap-8 mt-4">
              {menu.map((item, index) => (
                <Link key={index} to={item.path}>
                  <NavbarItem
                    name={item.name}
                    Icon={item.icon}
                    classname={` nav ${
                      location.pathname === `${item.path}`
                        ? "underline underline-offset-8 decoration-4"
                        : "no-underline opacity-70"
                    }`}
                  />
                </Link>
              ))}
            </div>
            <div className="flex md:hidden gap-6 mt-2 pr-0">
              {menu.map(
                (item, index) =>
                  index < 3 && (
                    <Link key={index} to={item.path}>
                      <NavbarItem key={index} name={" "} Icon={item.icon} />
                    </Link>
                  )
              )}
            </div>
            <div
              className="md:hidden mt-2 relative"
              onClick={() => setToggle(!toggle)}
            >
              <NavbarItem name={" "} Icon={FaIcons.FaBars} />
              {toggle ? (
                <div className="absolute mt-4 right-[-50px] bg-orange-500 p-3 py-2">
                  {menu.map(
                    (item, index) =>
                      index > -4 && (
                        <Link key={index} to={item.path}>
                          <NavbarItem
                            name={item.name}
                            Icon={item.icon}
                            classname={` nav ${
                              location.pathname === `${item.path}`
                                ? "underline underline-offset-8 decoration-4"
                                : "no-underline opacity-70"
                            }`}
                          />
                        </Link>
                      )
                  )}
                </div>
              ) : null}
            </div>
          </div>
          <div
            className=" mt-2 relative pr-4"
            onClick={() => setToggleAccount(!toggleAccount)}
          >
            <NavbarItem name={" "} Icon={FaIcons.FaUser} />
            {toggleAccount ? (
              <div className="absolute mt-4 right-0 bg-orange-500 p-3 py-2 md:pr-5">
                {account.map(
                  (item, index) =>
                    index > -4 && (
                      <Link key={index} to={item.path}>
                        <NavbarItem
                          name={item.name}
                          Icon={item.icon}
                          classname={` ${
                            location.pathname === `${item.path}`
                              ? "underline underline-offset-8 decoration-4"
                              : "no-underline opacity-70"
                          }`}
                        />
                      </Link>
                    )
                )}
              </div>
            ) : null}
          </div>
        </div>
        {/* Header end */}
      </nav>
    </>
  );
};

export default Navbar;
