// import React, { useState } from "react";
// import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
// import SideMenu from "./SideMenu";
// import "./Design/Navbar.css"

// const Navbar = ({ activeMenu }) => {
//   const [openSideMenu, setOpenSideMenu] = useState(false);
//   return (
//     <nav className="navbar">
//       <button
//         className="navbar__menu-btn"
//         onClick={() => setOpenSideMenu(!openSideMenu)}
//         aria-label={openSideMenu ? "Close menu" : "Open menu"}
//       >
//         {openSideMenu ? (
//           <HiOutlineX />
//         ) : (
//           <HiOutlineMenu />
//         )}
//       </button>
//       <h2 className="navbar__title">Budget Tracker</h2>

//       {openSideMenu && (
//         <div className="navbar__sidemenu-overlay" onClick={() => setOpenSideMenu(false)}>
//           <div className="navbar__sidemenu" onClick={e => e.stopPropagation()}>
//             <SideMenu activeMenu={activeMenu} />
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };
// export default Navbar;



import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import "./Design/Navbar1.css";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <>
      <nav className="navbar">
        <button
          className="navbar__menu-btn"
          onClick={() => setOpenSideMenu(!openSideMenu)}
          aria-label={openSideMenu ? "Close menu" : "Open menu"}
        >
          {openSideMenu ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
        <h2 className="navbar__title">Budget Tracker</h2>
      </nav>

      {openSideMenu && (
        <div
          className="navbar__sidemenu-overlay"
          onClick={() => setOpenSideMenu(false)}
        >
          <div
            className="navbar__sidemenu"
            onClick={(e) => e.stopPropagation()}
          >
            <SideMenu activeMenu={activeMenu} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
