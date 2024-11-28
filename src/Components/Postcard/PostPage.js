import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import './PostPage.css'
const PostPage = ({post}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/posts/${post._id}`);
    };
    return (
        <div className="post-card" onClick={handleClick}>
            <h2>{post.title}</h2>
            <p>{post.summary || "No summary available"}</p>
            <p>
                <small>{new Date(post.publishedDate).toLocaleDateString()}</small>
            </p>
        </div>
    );
}

export default PostPage