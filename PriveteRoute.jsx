import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PriveteRoute = () => {
  // hum jab tak signup nahi kare ge tab tak dusre page par nahi ja sakte iske liye ye cndistation he
  const auth = localStorage.getItem("user");
  return auth ? <Outlet /> : <Navigate to="/signup" />;
};

export default PriveteRoute;
