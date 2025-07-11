// import React, { useContext } from "react";
// import { UserContext } from "../Context";
// import Navbar from "../Layouts/Navbar";
// import SideMenu from "../Layouts/SideMenu";
// import "./Design/DashboardLayout.css"

// const DashboardLayout = ({ children, activeMenu }) => {
//   const { user } = useContext(UserContext);
//   return (
//     <div>
//       <Navbar activeMenu={activeMenu} />
//       {user && (
//         <div className="dashboard-main">
//           <div className="dashboard-sidebar">
//             <SideMenu activeMenu={activeMenu} />
//           </div>
//           <div className="dashboard-content">{children}</div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default DashboardLayout;


import React, { useContext } from "react";
import { UserContext } from "../Context";
import Navbar from "../Layouts/Navbar";
// ❌ Remove: import SideMenu from "../Layouts/SideMenu";
import "./Design/DashboardLayout.css";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className="dashboard-main">
          {/* ❌ Remove permanent sidebar */}
          {/* <div className="dashboard-sidebar">
            <SideMenu activeMenu={activeMenu} />
          </div> */}
          <div className="dashboard-content">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
