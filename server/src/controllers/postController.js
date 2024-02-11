import {User} from '../models/userModel.js';
import {Post} from '../models/PostModel.js';
import {Buddy} from '../models/buddyModel.js';
export const addPost = async (req, res) => {
  try {
    const {userId, title, price} = req.body;
    if ([userId, title, price].some(field => field === '')) {
      return res.status(400).json({message: 'All fields are required'});
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    const newPost = new Post({post: title, price, user: userId});
    if (!newPost) {
      return res.status(400).json({message: 'Post not created'});
    }
    await newPost.save();
    return res.status(201).json({message: 'Post created', post: newPost});
  } catch (error) {
    console.log('Error creating post: ', error);
  }
};

export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts) {
      return res.status(404).json({message: 'No posts found'});
    }
    return res.status(200).json({message: 'All Posts found', posts});
  } catch (error) {
    console.log('Error getting posts: ', error);
  }
};
