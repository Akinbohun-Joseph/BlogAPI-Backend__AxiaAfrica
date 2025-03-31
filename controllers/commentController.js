const commentModel = require('../models/commentModel')
const postModel = ('../models/postModel')
//Create a new comment
const createComment = async (req, res) =>{
    try {
        const {content, postId} = req.body
        const author = req.user.userId
        //check if the post exists
        const post = await   postModel.findById(postId)
        if(!post) {
            return res.status(404).json({messaage: 'Post not found'})
        }
        const newComment = new Comment ({content, author, post: postId});
        await newComment.save() 
        res.status(200).json({messaage: 'Comment created successfully', comment: newComment})
    } catch (error) {
        console.error(error);
        res.status(504).json({ Mesaage:'Server Error'})        
        
    }
}

//Update comment
const updateComment = async (req, res)=> {
    try {
        const {commentId, postId} = req.params
        const userId = req.user._id
        const {content, post} = req.body
        //Authorization check
        const updatedComment = await commentModel.findOne({_id: commentId, post: postId}).populate('author').populate('post');
        if(!updatedComment){
            return sres.status(404).json({message: 'Comment not found'})
        }
        //Check if the user is the comment author, post auhor, or an admin.

        if(comment.author.toString() !== userId.toString() && comment.post.author.toString() !== userId.toString() && req.user.role  !== 'admin'){
       return res.status(404).json({message: 'Unauthorized'}) }
       updatedComment.content = content;
       await updatedComment.save()
       res.status(200).json({messaage: 'Comment updated successfully', updatedComment})

    } catch (error) {
        console.log('Error updating comment:' , error)
        return res.status(400).json({message: 'Server error'})
    }
}
    


//Get all comment for a post

const getAllComments = async (req, res)=> {
    try {
        const postId = req.params.postId;
        const comments = await commentModel.find({post: postId}).populate('author', 'username');
        res.json(comments);
    } catch (error) {
        console.error(error)
        res.status(404).json({message: 'Server error'})
        
    }
}  
//Get a single comment for a post
const getaSingleComment = async (req, res) => {
    try {
        const {commentId, postId}= req.params
        const comment = await commentModel.Post.findOne({_id:commentId, post: postId}).populate('author', 'username')
        if(!comment){
            return res.json({Mesaage: 'Comment not found'})
        }
        //Authorization check
        if(comment.author.toString !== userId.toString() && comment.post.author.toString() !== userId.toString() && req.user.role  !== 'admin'){
            return res.status(404).json({message: 'Unauthorized'})
        }
    } catch (error) {
         
    }
}
    
    //Delete comment

    const deleteComment = async (req, res) =>{
        try {
            const {commentId, postId} = req.params
            const userId  = req.user._id
            const deletedComment = await commentModel.findOne({_id: CommentId, post: postId}).populate('author').populate('post');

            if(!deletedComment) {
                return res.status(400).json({message: 'Comment not found'})
            }
            if(comment.author.toString !== userId.toString() && comment.post.author.toString() !== userId.toString() && req.user.role  !== 'admin'){
                return res.status(404).json({message: 'Unauthorized'})
            }
        
        } catch (error) {
            console.log(error)
            res.status(404).json({message: 'Server error' })
        }
    }

module.exports = {deleteComment, createComment, getAllComments, getaSingleComment, updateComment}