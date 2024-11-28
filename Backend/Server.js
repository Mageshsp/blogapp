const bodyParser = require('body-parser');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Post = require('./models/Post');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

mongoose
    .connect("mongodb://localhost:27017/Blog")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB:", err));

app.post("/posts", async (req, res) => {
    try {
        const { title, content, summary } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required." });
        }
        const newPost = new Post({ title, content, summary });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating the post." });
    }
});

app.put("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, summary } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required." });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, content, summary },
            { new: true } 
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found." });
        }

        res.json(updatedPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating the post." });
    }
});

app.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching posts." });
    }
});

app.get("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        res.json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching the post." });
    }
});

app.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found." });
        }

        res.json({ message: "Post deleted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting the post." });
    }
});
app.listen(3000, () => {
    console.log("Server is running successfully on port 3000");
});