const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const projectControllers = require("../Controllers/Project-Controllers");
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
  "/get/all/projects",

  cacheMiddleware,
  projectControllers.getAllProjects
);
router.get(
  "/get/project/byid/:id",

  cacheMiddleware,
  projectControllers.getProjectById
);
router.get(
  "/get/project/bynumber/:number",

  cacheMiddleware,
  projectControllers.getProjectByNumber
);
router.get(
  "/get/projects/byEmail/:email",
  cacheMiddleware,
  projectControllers.getProjectsByEmail
);
router.patch("/apply/:number", cacheMiddleware, projectControllers.apply);
router.post(
  "/create/project",
  imageUpload.any("files"),
  [
    check("title").isLength({ min: 2, max: 255 }),
    check("description").isLength({ min: 2 }),
    check("members").isLength({ min: 2 }).optional(),
    check("deadline").isLength({ min: 2, max: 255 }).optional(),
    check("createdBy").isLength({ min: 2, max: 255 }),
    check("reward").isLength({ min: 2, max: 255 }),
  ],
  projectControllers.createProject
);
router.patch(
  "/update/project/byid/:id",
  imageUpload.any("files"),
  [
    check("title").isLength({ min: 2, max: 255 }),
    check("description").isLength({ min: 2 }),
    check("members").isLength({ min: 2 }).optional(),
    check("deadline").isLength({ min: 2, max: 255 }).optional(),
    check("createdBy").isLength({ min: 2, max: 255 }),
    check("paidFlag").isLength({ min: 2, max: 255 }),
  ],
  projectControllers.updateProjectById
);
router.patch(
  "/add/project/files/byid/:id",
  imageUpload.any("files"),
  projectControllers.addProjectFileById
);
router.patch(
  "/update/projectprogress/byid/:id",
  [check("progress").isLength({ min: 1 })],
  projectControllers.updateProjectProgressById
);
router.delete("/delete/project/byid/:id", projectControllers.deleteProjectById);

module.exports = router;
