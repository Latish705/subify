import {Platform} from '../models/platformModel.js';
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