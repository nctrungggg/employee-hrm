import { NavLink } from "react-router-dom";

import { ListItemButton } from "@mui/material";
import { navBarLinks } from "../../contexts/navBarLink";

const Sidebar = () => {
  return (
    <div className="px-8 pt-[92px] text-2xl font-medium h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {navBarLinks.map((item, index) => (
        <div key={index}>
          <h1
            className={`text-textPrimary text-2xl font-medium mb-[10px] ${
              item.title === "General" ? "!text-textBlue" : ""
            }`}
          >
            {item.title}
          </h1>

          {item.links.map((link, index) => (
            <NavLink
              to={`/${link.nameLink}`}
              key={index}
              className={({ isActive }) =>
                isActive ? "active-link" : "normal-link"
              }
            >
              <ListItemButton className="text- gap-[10px] !py-2 !px-[10px] !rounded-lg">
                <div
                  className={`rounded-full bg-bgrGray w-9 h-9 p-2
                  `}
                >
                  <img
                    src={link.icon}
                    className="w-full h-full object-cover"
                    alt="navbar-icon"
                  />
                </div>
                <p className=" text-16 font-normal text-textPrimary tracking-wide ">
                  {link.name}
                </p>
              </ListItemButton>
            </NavLink>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
