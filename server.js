const express =  require('express')
const authMiddleware =require('./middleware/authMiddleware')
const jwtConfig = require('./config/jwtConfig')
const connectDB = require('./DBconnection/MongoDBconnect')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const commentRoutes = require ('./routes/commentRoutes')
const authorizeRole = require('./middleware/authorizeRole')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const app = express();
const PORT = process.env.PORT


//DB connection
connectDB();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use('/api', userRoutes)
app.use('/api', postRoutes) 
app.use('/api', commentRoutes)

app.get('/', (req, res)=>{
    res.send ('Blogging API is running!')
})
app.listen(PORT, ()=> console.log('listening on ${PORT}' ))
