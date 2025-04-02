const HttpError = require("../Middleware/http-error");
const { validationResult } = require("express-validator");
const Message = require("../Models/Message");
const Conversations = require("../Models/Conversation");
const User = require("../Models/User");
const createConversation = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs, please try again", 422);
    return next(error);
  }
  try {
    const { senderId, receiverId } = req.body;
    const newCoversation = new Conversations({
      members: [senderId, receiverId],
    });
    await newCoversation.save();
    res.status(200).send("Conversation created successfully");
  } catch (error) {
    console.log(error, "Error");
  }
};

const getConversationByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const conversations = await Conversations.find({
      members: { $in: [userId] },
    });

    const conversationUserData = await Promise.all(
      conversations.map(async (conversation) => {
        const receiverId = conversation.members.find(
          (member) => member !== userId
        );

        const user = await User.findById(receiverId);
        console.log("ssssss", user);
        if (!user) return null;

        return {
          user: {
            receiverId: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          },
          conversationId: conversation._id,
        };
      })
    );

    // Filter out any null users (in case a user no longer exists)
    res.status(200).json(conversationUserData.filter((conv) => conv !== null));
  } catch (error) {
    next(new HttpError("Fetching conversations failed, please try again", 500));
  }
};

exports.createConversation = createConversation;
exports.getConversationByUserId = getConversationByUserId;
