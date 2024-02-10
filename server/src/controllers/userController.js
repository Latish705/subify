import {User} from '../models/userModel.js';
import {Platform} from '../models/platformModel.js';
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
//     const user = await User.findById(userId).populate('interestedPlatforms'); // Populate the interestedPlatforms field
//     if (!user) {
//       return res.status(404).json({message: 'User not found'});
//     }

//     const interestedPlatforms = user.interestedPlatforms;

//     // Fetch all platforms that are in the user's interestedPlatforms list
//     const platforms = await Platform.find({_id: {$in: interestedPlatforms}});

//     // Extract categories of platforms
//     const categories = platforms.map(platform => platform.category);

//     // Find other users who are interested in the same categories
//     const usersWithMatchingCategories = await User.find({
//       _id: {$ne: user._id}, // Exclude the current user
//       'interestedPlatforms.category': {$in: categories}, // Match the category of interestedPlatforms
//     }).populate('interestedPlatforms');

//     const similarPlatforms = {};

//     // Iterate over users with matching categories
//     for (const otherUser of usersWithMatchingCategories) {
//       for (const platform of otherUser.interestedPlatforms) {
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

export const getUserTimeSpentInSimilarCategoryPlatforms = async userId => {
  try {
    const user = await User.findById(userId).populate('interestedPlatforms'); // Populate the interestedPlatforms field
    if (!user) {
      throw new Error('User not found');
    }

    const interestedPlatforms = user.interestedPlatforms;

    const categorySet = new Set(); // Set to store categories of interested platforms
    interestedPlatforms.forEach(platform => categorySet.add(platform.category));

    let totalTimeSpent = 0;

    for (const category of categorySet) {
      // Find platforms in the same category and sum up their timeSpent
      const platformsInCategory = user.interestedPlatforms.filter(
        platform => platform.category === category,
      );
      const timeSpentInCategory = platformsInCategory.reduce(
        (acc, curr) => acc + curr.timeSpent,
        0,
      );
      totalTimeSpent += timeSpentInCategory;
    }

    return totalTimeSpent;
  } catch (error) {
    console.error(
      'Error in getUserTimeSpentInSimilarCategoryPlatforms:',
      error,
    );
    throw error;
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
      platform => platform.platform === platformId,
    );
    if (!platform) {
      return res.status(404).json({message: 'Platform not found'});
    }
    platform.timeSpent += timeSpent; // Update the timeSpent for the platform
    await user.save();

    return res.status(200).json({message: 'Time added', success: true});
  } catch (error) {
    console.error('Error in addPlatformTime:', error);
    return res.status(500).json({message: 'Internal server error'});
  }
};

export const enrollInPlatform = async (req, res) => {
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
