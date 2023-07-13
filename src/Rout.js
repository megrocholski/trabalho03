import React, { useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Listagem from "./pages/listagem";
import Item from "./pages/item";
import Cart from "./pages/cart";
import Login from "./pages/login";
import { ProtectedRoute } from "./components/ProtectRoute";
import History from "./pages/history";
import Profile from "./pages/profile";
import SignUp from "./pages/signup";

function Rout() {
  const [user, setUser] = useState();
  return (
    <Routes>
      {/* <Route exact path="/" element={<Login />} /> */}

      <Route exact path="/" element={<Login setUser={setUser} />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route
        exact
        path="/list"
        element={
          <ProtectedRoute>
            <Listagem />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/item/:productId"
        element={
          <ProtectedRoute>
            <Item />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Rout;
