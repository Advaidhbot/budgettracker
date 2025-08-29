import { UserContext } from "../Context";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utilis/axiosInstance";

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // if (user) return;

  //   // let isMounted = true;

  //   const fetchUserInfo = async () => {
  //     try {
  //       const response = await axiosInstance.get("/api/users/getUser", {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       });
  //       console.log("res-user", response);

  //       if (response.data) {
  //         updateUser(response.data);
  //       } else {
  //         throw new Error("No user found");
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch user info:", error);
  //       // if (isMounted) {
  //       //   clearUser();
  //       //   navigate("/login");
  //       // }
  //     }
  //   };
  //   fetchUserInfo();
  //   // return () => {
  //   //     isMounted = false;
  //   // };
  // }, [updateUser]);

  useEffect(() => {
  if (user) return;

  const fetchUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/api/users/getUser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("response",response.data);
      
      if (response.data) {
        updateUser(response.data);
      } else {
        throw new Error("No user found");
      }
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      clearUser();
      navigate("/login");
    }
  };

  fetchUserInfo();
}, [user, updateUser]);

};
