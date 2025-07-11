import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Register/Login/Login";
import Register from "./Register/Login/Register";
import Income from "./DASHBOARD/Income";
import Expense from "./DASHBOARD/Expense";
import  UserProvider  from "./Context";
import Home from "./DASHBOARD/Home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        toastOptions={{
        className:"",
        style:{
          fontSize:"13px"
        },
      }}
      />
    </UserProvider>
  );
}

export default App;