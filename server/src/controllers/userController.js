import {User} from '../models/userModel.js';
import {Platform} from '../models/platformModel.js';
import mongoose from 'mongoose';
export const register = async (req, res) => {
  try {
    const {email, password, username} = req.body;
    console.log(email, password, username);
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
    console.log(email, password)

    if (!email && !password) {
      console.log("email")
      return res.status(400).json({ message: "email or password not found"});
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
      .status(200)
      .json({message: 'Successfully login', user, success: true});
  } catch (error) {
    console.log('Error logging in: ', error);
  }
};

// import {User} from './userModel'; // Import the User model
// import {Platform} from './platformModel'; // Import the Platform model

// export const getCatagory = async (req, res) => {
//   try {
//     const {userId} = req.body;
//     const user = await User.findById(userId).populate('enrolledPlatforms'); // Populate the enrolledPlatforms field
//     if (!user) {
//       return res.status(404).json({message: 'User not found'});
//     }

//     const enrolledPlatforms = user.enrolledPlatforms;

//     // Fetch all platforms that are in the user's enrolledPlatforms list
//     const platforms = await Platform.find({_id: {$in: enrolledPlatforms}});

//     // Extract categories of platforms
//     const categories = platforms.map(platform => platform.category);

//     // Find other users who are interested in the same categories
//     const usersWithMatchingCategories = await User.find({
//       _id: {$ne: user._id}, // Exclude the current user
//       'enrolledPlatforms.category': {$in: categories}, // Match the category of enrolledPlatforms
//     }).populate('enrolledPlatforms');

//     const similarPlatforms = {};

//     // Iterate over users with matching categories
//     for (const otherUser of usersWithMatchingCategories) {
//       for (const platform of otherUser.enrolledPlatforms) {
//         if (categories.includes(platform.category)) {
//           // If the platform category matches, add to similarPlatforms and calculate total time spent
//           if (!similarPlatforms[platform._id]) {
//             similarPlatforms[platform._id] = {
//               platform: platform,
//               totalSpentTime: platform.timeSpent,
//             };
//           } else {
//             similarPlatforms[platform._id].totalSpentTime += platform.timeSpent;
//           }
//         }
//       }
//     }

//     // Convert object to array and sort by totalSpentTime
//     const similarPlatformsArray = Object.values(similarPlatforms).sort(
//       (a, b) => b.totalSpentTime - a.totalSpentTime,
//     );

//     res.status(200).json(similarPlatformsArray);
//   } catch (error) {
//     console.error('Error in getCatagory:', error);
//     res.status(500).json({message: 'Internal server error'});
//   }
// };
/*
const categories = ['Entertainment', 'Music'];

export const getUserTimeSpentInSimilarCategoryPlatforms = async (req, res) => {
  try {
    const {userId} = req.body;
    const user = await User.findById(userId).populate(
      'enrolledPlatforms.platform',
    );
    if (!user) {
      throw new Error('User not found');
    }

    const enrolledPlatforms = user.enrolledPlatforms.filter(
      ({platform}) => categories.includes(platform.category), // Filter platforms based on categories
    );

    console.log('Filtered Platforms:', enrolledPlatforms); // Add this logging statement

    const categoryMap = {};

    for (const platform of enrolledPlatforms) {
      const {category, timeSpent} = platform;
      if (!categoryMap[category]) {
        categoryMap[category] = timeSpent;
      } else {
        categoryMap[category] += timeSpent;
      }
    }

    console.log('Category Map:', categoryMap); // Add this logging statement

    return res.status(200).json({totalTimeSpent: categoryMap});
  } catch (error) {
    console.error(
      'Error in getUserTimeSpentInSimilarCategoryPlatforms:',
      error,
    );
    return res.status(500).json({error: 'Internal server error'});
  }
};
*/

export const getUserTimeSpentInSimilarCategoryPlatforms = async (req, res) => {
  try {
    const { userId, categories } = req.body;
    const user = await User.findById(userId).populate('enrolledPlatforms.platform');
    
    if (!user) {
      throw new Error('User not found');
    }

    // If no categories are provided, default to all categories
    const filterCategories = categories || ['Entertainment', 'Music'];

    const enrolledPlatforms = user.enrolledPlatforms.filter(({ platform }) =>
      filterCategories.includes(platform.category)
    );

    console.log('Filtered Platforms:', enrolledPlatforms);

    const categoryMap = {};

    for (const platform of enrolledPlatforms) {
      const { category, timeSpent } = platform;
      if (!categoryMap[category]) {
        categoryMap[category] = timeSpent;
      } else {
        categoryMap[category] += timeSpent;
      }
    }

    console.log('Category Map:', categoryMap);

    return res.status(200).json({ totalTimeSpent: categoryMap });
  } catch (error) {
    console.error('Error in getUserTimeSpentInSimilarCategoryPlatforms:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



export const addPlatformTime = async (req, res) => {
  try {
    const {userId, platformId, timeSpent} = req.body;
    if ([userId, platformId, timeSpent].some(field => field === '')) {
      return res.status(400).json({message: 'All fields are required'});
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    const platform = user.enrolledPlatforms.find(
      platform => platform.platform.toString() === platformId,
    );

    if (!platform) {
      return res.status(404).json({message: 'Platform not found'});
    }
    platform.timeSpent += timeSpent;
    user.markModified('enrolledPlatforms');
    await user.save();

    return res.status(200).json({message: 'Time added', success: true});
  } catch (error) {
    console.error('Error in addPlatformTime:', error);
    return res.status(500).json({message: 'Internal server error'});
  }
};

export const enrolledPlatforms = async (req, res) => {
  try {
    const {userId, platformId} = req.body;
    if ([userId, platformId].some(field => field === '')) {
      return res.status(400).json({message: 'All fields are required'});
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    const platform = await Platform.findById(platformId);
    if (!platform) {
      return res.status(404).json({message: 'Platform not found'});
    }
    user.enrolledPlatforms.push({platform: platformId});
    await user.save({validateBeforeSave: false});

    return res.status(200).json({message: 'Enrolled', success: true});
  } catch (error) {
    console.log('Error enrolling in platform: ', error);
  }
};

export const addinterestedPlatforms = async (req, res) => {
  const { userId, platformId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Convert platformId to ObjectId
    const platformObjectId = platformId;
    user.interestedPlatforms.push(platformObjectId);
    await user.save({ validateBeforeSave: false });
    return res.status(200).json({ message: "Interested", success: true });
  } catch (error) {
    console.log('Error in interested in platform: ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserInterestedPlatforms = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the user by userId and populate the interestedPlatforms field
    const user = await User.findById(userId).populate('interestedPlatforms');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract interested platforms from the user object
    const interestedPlatforms = user.interestedPlatforms;

    return res.status(200).json({ interestedPlatforms });
  } catch (error) {
    console.error('Error in getUserInterestedPlatforms:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


export const percentageTimeSpentByCategory = async (req, res) => {
  try {
    const {userId} = req.body;

    // Find the user by ID
    const user = await User.findById(userId).populate('enrolledPlatforms.platform');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Initialize an object to store the total time spent on each category
    const totalTimeByCategory = {
      'Entertainment': 0,
      'Music': 0,
      'Education': 0,
      'Dating': 0,
      'Productivity': 0,
    };

    // Calculate the total time spent on each category
    user.enrolledPlatforms.forEach(platform => {
      const category = platform.platform.category;
      totalTimeByCategory[category] += platform.timeSpent;
    });

    // Calculate the total time spent by the user
    const totalTimeSpent = Object.values(totalTimeByCategory).reduce((total, time) => total + time, 0);

    // Calculate the percentage of time spent on each category
    const percentageByCategory = {};
    for (const category in totalTimeByCategory) {
      percentageByCategory[category] = (totalTimeByCategory[category] / totalTimeSpent) * 100;
    }

    // Return the result
    res.json({ percentageByCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

import { User } from './userModel';
import { Platform } from './platformModel';

export const getTopPlatformsByTime = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming userId is passed in the request parameters

    // Aggregate to calculate total time spent on each platform by the user
    const topPlatforms = await User.aggregate([
      { $match: { _id: userId } }, // Match the user by userId
      { $unwind: '$enrolledPlatforms' }, // Unwind the enrolledPlatforms array
      {
        $group: {
          _id: '$enrolledPlatforms.platform', // Group by platform
          totalTime: { $sum: '$enrolledPlatforms.timeSpent' }, // Calculate total time spent on each platform
        },
      },
      { $sort: { totalTime: -1 } }, // Sort by totalTime in descending order
      { $limit: 5 }, // Limit to the top 5 platforms
    ]);

    // Fetch platform details for the top platforms
    const platformDetails = await Platform.find({ _id: { $in: topPlatforms.map(p => p._id) } });

    // Create response with platform details including logos
    const response = topPlatforms.map(platform => {
      const platformDetail = platformDetails.find(p => p._id.toString() === platform._id.toString());
      return {
        platformId: platform._id,
        name: platformDetail.name,
        logoImage: platformDetail.logoImage,
        totalTime: platform.totalTime,
      };
    });

    res.status(200).json(response);
  } catch (error) {
    console.error('Error getting top platforms:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
