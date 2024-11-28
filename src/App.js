import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage/HomePage";
import PostPage from "./Pages/Postpage/PostPage";
import CreateEditPost from "./Pages/EditPost/CreateEditPost";
import Header from "./Components/Header/Header";
import './App.css'
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/create" element={<CreateEditPost />} />
        <Route path="/edit/:id" element={<CreateEditPost />} />
      </Routes>
    </Router>
  );
};

export default App;