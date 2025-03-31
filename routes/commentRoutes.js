const express = require('express')
const router = express.Router()
const {createComment, getAllComments, getaSingleComment, updateComment, deleteComment} = require('../controllers/commentController')
const authMiddleware = require('../middleware/authMiddleware')
const authorizeRole = require('../middleware/authorizeRole')

router.post('/', authMiddleware, createComment) // create comment (user auth)
router.put('/comment/:commentId', authMiddleware, updateComment)
router.get('/comments', getAllComments);
router.get('/comment/:commentId', authMiddleware, getaSingleComment);
router.delete('/comment/:commentId', authMiddleware, deleteComment);

module.exports = router