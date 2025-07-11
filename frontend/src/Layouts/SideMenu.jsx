import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../utilis/data";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context";
import "./Design/SideMenu.css"

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  const handleClick = (route) => {
    console.log(route);
    
    if (route === "/logout") {
      return handleLogout();;
    } else {
      navigate(route);
    }
  };

  return (
    <div className="side-menu">
      <h3 className="side-menu-user">
        {user?.fullName || ""}
      </h3>
      {SIDE_MENU_DATA.map((item, index) => {
  const Icon = item.icon;
  return (
    <button
      key={`menu-item-${index}`}
      className={`side-menu-item${activeMenu === item.label ? " active" : ""}`}
      onClick={() => handleClick(item.route)}
    >
      <Icon className="side-menu-icon" />
      {item.label}
    </button>
  );
})}
    </div>
  );
};

export default SideMenu;