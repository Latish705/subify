import {Platform} from '../models/platformModel.js';
import {User} from '../models/userModel.js';
export const addPlatform = async (req, res) => {
  try {
    const {category, name, plans, logo} = req.body;
    if ([category, name, plans].some(field => field === '')) {
      return res.status(400).json({message: 'All fields are required'});
    }
    const platform = await Platform.findOne({name});
    if (platform) {
      return res
        .status(400)
        .json({message: 'Platform already exists', success: false});
    }
    const newPlatform = Platform.create({
      category,
      name,
      plans,
      logoImage: logo,
    });

    res.status(201).json({
      message: 'Platform created',
      platform: newPlatform,
      success: true,
    });
  } catch (error) {
    console.log('Error creating platform: ', error);
  }
};

export const addPlatfromInterest = async (req, res) => {
  try {
    const {userId, platform} = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    user.platformInterested.push(platform);
    await user.save({validateBeforeSave: false});
    return res
      .status(201)
      .json({message: 'Platform added to interested', user});
  } catch (error) {
    console.log('Error adding platform to interested: ', error);
  }
};
