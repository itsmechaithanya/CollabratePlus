const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const chatControllers = require("../Controllers/Conversation-Controllers");
const checkAuth = require("../Middleware/check-auth");
const redisClient = require("./redisClient");
// Middleware function to cache responses for GET requests
const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl; // Using the request URL as the cache key
  redisClient.get(key, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      // If data exists in cache, return it
      res.send(JSON.parse(data));
    } else {
      // If data doesn't exist in cache, proceed to the route handler
      next();
    }
  });
};

router.post(
  "/create/conversation",

  [
    check("senderId").isLength({ min: 2 }),
    check("receiverId").isLength({ min: 2 }),
  ],
  chatControllers.createConversation
);

router.get(
  "/get/conversation/:userId",
  cacheMiddleware,
  [check("userId").isLength({ min: 2 })],
  chatControllers.getConversationByUserId
);

module.exports = router;
