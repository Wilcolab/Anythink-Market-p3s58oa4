/**
 * Express router for handling comment-related API endpoints
 * @type {Express.Router}
 */

/**
 * Retrieves all comments from the database
 * @async
 * @function GET /api/comments
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @returns {Promise<void>} JSON array of comments with populated author usernames
 * @throws {Error} Returns 500 status with error message if fetch fails
 */

/**
 * Creates a new comment in the database
 * @async
 * @function POST /api/comments
 * @param {Express.Request} req - Express request object
 * @param {string} req.body.content - The content of the comment
 * @param {string} req.body.authorId - The ID of the comment author
 * @param {Express.Response} res - Express response object
 * @returns {Promise<void>} 201 status with newly created comment object
 * @throws {Error} Returns 500 status with error message if creation fails
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

// GET /api/comments - Get all comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find().populate("author", "username");
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// POST /api/comments - Create a new comment
router.post("/", async (req, res) => {
    try {
        const { content, authorId } = req.body;
        const newComment = new Comment({ content, author: authorId });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json({ error: "Failed to create comment" });
    }
});

module.exports = router;
