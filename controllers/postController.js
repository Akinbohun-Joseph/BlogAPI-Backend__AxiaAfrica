const postModel = require('../models/postModel');
const userModel = require('../models/userModel')


const createPost = async (req, res) => {

    try {

        const userId = req.user._id;
        const { title, content } = req.body;
        const newPost = new postModel({ title, content, author: userId });
        await newPost.save();
        res.status(200).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error(error);
        res.status(504).json({ message: 'Server error' });

    }
 
}
//Delete a Post

const deletePost = async (req, res) => {

    try {
        const { postId } = req.params;
        const userId = req.user._id;
        const post = await postModel.findById(postId);
        if (!post) {

            return res.status(404).json({ message: 'Post not found' });

        }
        if(post.author.toString !== userId.toString() && req.user.role !== 'admin'){
          return res.status(404).json({message: 'Unauthorized'})
      }

        await postModel.findByIdAndDelete(postId);
        res.status(200).json({ message: 'Post deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(504).json({ message: 'Server error' });

    }

}

//Update a post

const updatePost = async (req, res) => {

  try {

    const { postId } = req.params;
    const userId = req.user._id;
    const { title, content } = req.body;
    const post = await postModel.findById(postId);
    if (!post) {

      return res.status(404).json({ message: 'Post not found' });

    }
    //Authorization
    if (post.author.toString() !== req.user.userId && rq.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });

    }
    const updatedPost = await postModel.findByIdAndUpdate( postId,{ title, content }, { new: true }

    )
    res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' })
  }

}


// Get all Post

const getAllPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const posts = await postModel.find().populate({ author: userId });
    res.status(200).json({ posts })
  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}



//Get a post

const getPost = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const userId = req.user._id
    const post = await postModel.findById(postId).populate('author')
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.author.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    res.status(200).json({ post });
  } catch (error) {
    console.error(error);
    res.status(504).json({ message: 'Server error' });

  }
}

module.exports = {createPost, deletePost, getAllPosts, getPost, updatePost}