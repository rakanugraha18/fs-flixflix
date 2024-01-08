import React from "react";

function NavbarItem({ name, Icon, classname }) {
  return (
    <div
      className={`${classname} text-white flex items-center gap-3 text-[14px]  font-semibold cursor-pointer mb-3 relative `}
    >
      <Icon />
      <h2>{name}</h2>
    </div>
  );
}

export default NavbarItem;
