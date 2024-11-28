import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostPage from "../../Components/Postcard/PostPage";

const Homepage = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/posts");
                setPosts(response.data);
            } catch (err) {
                toast.error('An error occured', {
                    position: 'top-right',
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'light',
                    transition: Slide,
                  });
                console.error(err);
            }
        };
        fetchPosts();
    }, []);

    return (
        <>
            <div className="homepage">
                <h1>Blog Posts</h1>
                <div className="blogcontainer">
                    {posts.map((post) => (
                        <PostPage key={post._id} post={post}  className="post-card-container"/>
                    ))}
                </div>
            </div>
            <div className="createblog">
                <button onClick={()=>navigate(`/create`)}>Create Blog</button>
            </div>
            <ToastContainer/>
        </>
    );
};

export default Homepage;