const {Router} = require('express')
const {register,createUser, userLogin, deleteUser, profileUpdate, getUser } = require('../controllers/userController')
const Jwtconfig = require('../config/jwtConfig')
const userModel = require ('../models/userModel')
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizeRole')
const { createPost } = require('../controllers/postController');
//const {createKYC} = require('../controller/Kyc_Controller')
const router = Router()
router.post('/signup', createUser);
router.post('/login',userLogin )

router.put('/:userId', authMiddleware, profileUpdate);
router.get('/:userId', getUser); 
//router.post('/posts', authMiddleware, createPost); // Create post

module.exports = router