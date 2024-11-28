import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Postform from '../../Components/Postform/Postform';
import "./CreateEditPost.css";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateEditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        summary: "",
    });

    useEffect(() => {
        if (id) {
            const fetchPost = async () => {
                try {
                    const response = await axios.get(`http://localhost:3001/posts/${id}`);
                    setFormData(response.data);
                } catch (err) {
                    console.error(err);
                }
            };
            fetchPost();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`http://localhost:3000/posts/${id}`, formData);
            } else {
                await axios.post("http://localhost:3000/posts", formData);
            }
            navigate("/");
        } catch (err) {
            toast.error('Try again', {
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

    return (
        <div className="createEditPost">
            <h1>{id ? "Edit blog" : "Create new blog"}</h1>
            <Postform
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            <ToastContainer />
        </div>
    );
};

export default CreateEditPost;