
const express = require('express')
const router = express.Router()

const postController = require('../controllers/postController')

const authMiddleware = require('../middleware/authMiddleware')
const authorizeRole = require('../middleware/authorizeRole')

const {createPost,updatePost, getAllPosts, deletePost,getPost} = require('../controllers/postController')

router.post('/', authMiddleware, createPost )
router.put('/:postId', authMiddleware,authorizeRole('author', 'admin'), updatePost);
router.get('/posts', getAllPosts);
router.get('/post/:postId',authMiddleware, authorizeRole('author', 'admin'), getPost)
router.delete('/post/:postId', authMiddleware,authorizeRole('author', 'admin'), deletePost)

module.exports = router;