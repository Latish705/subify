import {Buddy} from '../models/buddyModel.js';

export const BuddyPaired = async (req, res) => {
  try {
    const {userId, buddyId, platformId} = req.body;
    const buddy = new Buddy({
      user: userId,
      buddy: buddyId,
      platform: platformId,
    });
    if (!buddy) {
      return res.status(400).json({message: 'Buddy not paired'});
    }
    await buddy.save();
    res.status(201).json({message: 'Buddy paired', buddy});
  } catch (error) {
    console.log('Error pairing buddy: ', error);
  }
};
