//Imports
const express = require('express');
const { verifyToken } = require('../middlewares/authJWT');
const { postValidationRules, validate } = require('../validator/postValidator')
const { createPost, getPosts, getAllPostsUsers, deletePostById, getPostById } = require('../controllers/postController');
const postRouter = express.Router();

//Handle Header
postRouter.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

// Create posts
postRouter.post('/', postValidationRules(), validate, verifyToken, createPost);

//Get my posts
postRouter.get('/my_posts', verifyToken, getPosts);

// Get All posts
postRouter.get('/all_posts', verifyToken, getAllPostsUsers);

//Get single post
postRouter.delete('/:postId', verifyToken, getPostById);

//Delete single post
postRouter.delete('/:postId', verifyToken, deletePostById);



module.exports = postRouter;
