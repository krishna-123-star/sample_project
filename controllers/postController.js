const db = require('../config/db');
// Import the Post and User models
const Post = db.Post;
const User = db.User;

// Export the functions for creating, retrieving, and deleting posts
module.exports= {
    createPost,
    getPosts,
    getAllPostsUsers,
    deletePostById,
    getPostById
}

//Create post
async function createPost(req, res){
    console.log(req.body.content)
    const {title,content}=req.body;
    const userId = req.userId;
    if(!title || !content){
        return res.sendStatus(400);
    }
    await Post.create({
        title: title, 
        content: content, 
        userId: userId}
    )
    .then(() => res.send({message: 'Post Created'}))
    .catch(error => {
        res.status(500).send({message: error.message});
    });
}

//Get all post of logged-in user
async function getPosts(req, res) {
    await Post.findAll({
      where: {
        userId: req.userId
      }
    }).then(posts => {
        if(!posts){
            return res.status(404).json({ msg: 'No posts found' });
        }
        res.json(posts)
    }).catch(error =>{
        res.status(500).send({message: error.message});
    });
}

//Get all posts with associated user
async function getAllPostsUsers(req, res) {
    await Post.findAll({
        include: [{
            model: User,
            attributes: ['email'],
          },
        ]
    }).then(posts => {
        if(!posts){
            return res.status(404).json({ msg: 'No posts found' });
        }
        res.json(posts)
    }).catch(error =>{
        res.status(500).send({message: error.message});
    });
}


//Delete single post by ID
async function deletePostById(req, res) {
    await Post.findByPk(req.params.postId).then(post => {
        if(!post){
            return res.status(404).json({ msg: 'No posts found' });
        }
        if(post.userId  !== req.userId){
            return res.status(403).json({ message: 'You are not authorized to delete this post' });
        }
        post.destroy().then(() => {
            res.send({message: 'Post deleted!'})
        }).catch(error =>{
                res.status(500).send({message: error.message});
        });
    })
}

//Get a single post by ID
async function getPostById(req, res) {
    await Post.findByPk(req.params.postId).then(post => {
        if(!post){
                return res.status(404).json({ msg: 'No posts found' });
        }    
        res.json(post)    
    }).catch(error =>{
        res.status(500).send({message: error.message});
    });
}