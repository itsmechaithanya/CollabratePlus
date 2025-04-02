const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const messageControllers = require("../Controllers/Message-Controllers");
// const checkAuth = require("../Middleware/check-auth");

const redisClient = require("./redisClient");
const fileUpload = require("../Middleware/image-upload");
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
router.get(
  "/get/all/messages/byid/:conversationId",
  // checkAuth(["CEO", "HR", "DeptHead", "Employee"]),
  cacheMiddleware,
  messageControllers.getMessage
);

router.post(
  "/send/message",
  // checkAuth(["CEO", "HR", "DeptHead", "Employee"]),

  [
    check("conversationId").isLength({ min: 2 }),
    check("senderId").isLength({ min: 2 }),
    check("message").isLength({ min: 2 }),
  ],
  messageControllers.sendMessage
);

module.exports = router;
