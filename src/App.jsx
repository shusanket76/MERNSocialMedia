import React from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome.jsx";
import UserLists from "./components/Users/UserLists.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<Welcome />}></Route>
          <Route path="user" element={<UserLists />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
