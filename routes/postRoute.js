//Imports
const express = require('express');
const { verifyToken } = require('../middlewares/authJWT');
const { postValidationRules, validate } = require('../validator/userValidator')
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

postRouter.use(verifyToken)

// Create posts
postRouter.post('/', postValidationRules(), validate, createPost);

//Get my posts
postRouter.get('/my_posts',  getPosts);

// Get All posts
postRouter.get('/all_posts',  getAllPostsUsers);

//Get single post
postRouter.delete('/:postId',  getPostById);

//Delete single post
postRouter.delete('/:postId',  deletePostById);



module.exports = postRouter;
