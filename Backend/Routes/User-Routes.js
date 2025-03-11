const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const userControllers = require("../Controllers/User-Controllers");
const checkAuth = require("../Middleware/check-auth");
const imageUpload = require("../Middleware/image-upload");
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
router.get(
  "/get/all/users",

  cacheMiddleware,
  userControllers.getAllUsers
);
router.get(
  "/get/user/byid/:id",

  cacheMiddleware,
  userControllers.getUserById
);
router.post(
  "/login",

  [check("email").isEmail(), check("password").notEmpty()],
  userControllers.login
);
router.post(
  "/create/user",
  imageUpload.single("image"),
  [
    check("firstName").isLength({ min: 2, max: 255 }),
    check("lastName").isLength({ min: 2, max: 255 }),
    check("email").isLength({ min: 2, max: 255 }),
    check("password").isLength({ min: 2, max: 255 }),
    check("mobile").isLength({ min: 6, max: 10 }).optional(),
    check("role").isLength({ min: 2, max: 10 }),
  ],
  userControllers.createUser
);
router.patch(
  "/update/user/byid/:id",

  imageUpload.single("image"),
  [
    check("firstName").isLength({ min: 2, max: 255 }),
    check("lastName").isLength({ min: 2, max: 255 }),
    check("password").isLength({ min: 2, max: 255 }),
    check("mobile").isLength({ min: 6, max: 10 }).optional(),
    check("role").isLength({ min: 6, max: 10 }),
  ],
  userControllers.updateUserById
);
router.patch(
  "/update/image/byid/:id",

  imageUpload.single("image"),

  userControllers.updateImageById
);
router.patch(
  "/forgotpassword",

  userControllers.forgotPassword
);
router.delete(
  "/delete/user/byid/:id",

  userControllers.deleteUser
);

module.exports = router;
