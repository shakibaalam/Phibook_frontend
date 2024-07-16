import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./layout/Layout";
import NotFound from "./pages/NotFound/NotFound";
import Registration from "./pages/Authentication/Registration";
import Login from "./pages/Authentication/login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import LikedPost from "./components/Dashboard/LikedPost";
import CommentsPost from "./components/Dashboard/CommentsPost";
import MyPost from "./components/Dashboard/MyPost";
import AddPost from "./components/Dashboard/AddPost";
import PostDetails from "./components/PostCard/PostDetails";
import EditPost from "./components/PostCard/EditPost";
import CreatePost from "./components/PostCard/CreatePost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        <Route path="/home" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="liked_post" element={<LikedPost />} />
          <Route path="comment_post" element={<CommentsPost />} />
          <Route path="post_details/:id" element={<PostDetails />} />
          <Route path="edit_post/:id" element={<EditPost />} />
          <Route path="my_post" element={<MyPost />} />
          <Route path="add_post" element={<CreatePost />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
