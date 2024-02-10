import {User} from '../models/userModel';

export const register = async (req, res) => {
  try {
    const {email, password, username} = req.body;
    if ([email, password, username].some(field => field === '')) {
      return res.status(400).json({message: 'All fields are required'});
    }
    const user = await User.findOne({email});
    if (user) {
      return res
        .status(400)
        .json({message: 'User already exists', success: false});
    }
    const newUser = new User({email, password, username});
    await newUser.save();

    res
      .status(201)
      .json({message: 'User created', user: newUser, success: true});
  } catch (error) {
    console.log('Error creating usre: ', error);
  }
};

export const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    if ([email, password].some(field => field === '')) {
      return res.status(400).json({message: 'All fields are required'});
    }
    const user = await User.findOne({email});
    if (!user) {
      return res
        .status(400)
        .json({message: 'Please register first', success: false});
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({message: 'Invalid credentials', success: false});
    }
    return res
      .status(400)
      .json({message: 'Invalid credentials', success: false});
  } catch (error) {
    console.log('Error logging in: ', error);
  }
};
