const HttpError = require("../Middleware/http-error");
const { validationResult } = require("express-validator");
const Project = require("../Models/Projects");
const mongoose = require("mongoose");

const fs = require("fs");
const createProject = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs, please try again", 422);
    return next(error);
  }
  const { title, description, createdBy, reward, deadline, members, category } =
    req.body;
  let existingProject;
  try {
    existingProject = await Project.findOne({
      title: title,
    });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong while fetching the data, please try again",
      500
    );
    return next(error);
  }
  if (existingProject) {
    const error = new HttpError(
      "Project already exists, please try again",
      500
    );
    return next(error);
  }
  const filePaths = req.files.map((file) => file.path);
  const createdProject = new Project({
    title,
    description,
    createdBy,
    reward,
    deadline,
    members,
    filePaths,
    category,
  });
  try {
    await createdProject.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something went wrong while saving the data, please try again",
      500
    );
    return next(error);
  }
  res.status(201).json({ createdProject: createdProject });
};
const getAllProjects = async (req, res, next) => {
  let projects;
  try {
    projects = await Project.find({});
  } catch (err) {
    const error = new HttpError(
      "Something went wrong while fetching the data, please try again",
      500
    );
    return next(error);
  }
  res.status(200).json({ projects: projects });
};
const getProjectById = async (req, res, next) => {
  const id = req.params.id;
  let project;
  try {
    project = await Project.findOne({ _id: id });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong while fetching the data, please try again",
      500
    );
    return next(error);
  }
  res.status(200).json({ project: project });
};
const getProjectByNumber = async (req, res, next) => {
  const number = req.params.number;
  let project;
  try {
    project = await Project.findOne({ number: number });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong while fetching the data, please try again",
      500
    );
    return next(error);
  }
  res.status(200).json({ project: project });
};
const getProjectsByEmail = async (req, res, next) => {
  const email = req.params.email;
  let projects;
  try {
    projects = await Project.find({ members: email });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong while fetching the data, please try again",
      500
    );
    return next(error);
  }
  res.status(200).json({ projects: projects });
};

const updateProjectById = async (req, res, next) => {
  const id = req.params.id;
  let project;
  const { title, description, createdBy, reward, deadline, members, category } =
    req.body;
  try {
    project = await Project.findOne({ _id: id });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong while fetching the data, please try again",
      500
    );
    return next(error);
  }
  if (!project) {
    const error = new HttpError("Project not found, please try again", 500);
    return next(error);
  }
  if (req.files) {
    const filePaths = req.files.map((file) => file.path);
    project.files.push(...filePaths);
  }

  project.title = title ? title : project.title;
  project.description = description ? description : project.description;
  project.members = members ? members : project.members;
  project.deadline = deadline ? deadline : project.deadline;
  project.createdBy = createdBy ? createdBy : project.createdBy;
  project.progress = progress ? progress : project.progress;
  project.reward = reward ? reward : project.reward;
  project.category = category ? category : project.category;

  try {
    project.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong while saving the data, please try again",
      500
    );
    return next(error);
  }
  res.status(201).json({ project: project });
};

const apply = async (req, res, next) => {
  const number = req.params.number;
  let project;
  let { applications } = req.body;

  try {
    project = await Project.findOne({ number: number });
  } catch (err) {
    return next(new HttpError("Error fetching project", 500));
  }

  if (!project) {
    return next(new HttpError("Project not found", 404));
  }

  // Ensure applications is an array of ObjectIds
  if (!Array.isArray(applications)) {
    applications = [applications]; // Convert single string to array
  }

  applications = applications.map(
    (appId) => new mongoose.Types.ObjectId(appId)
  );

  // Append new applications while avoiding duplicates
  project.applications = [
    ...new Set([...project.applications, ...applications]),
  ];

  try {
    await project.save();
  } catch (err) {
    return next(new HttpError("Error saving application", 500));
  }

  res.status(201).json({ project });
};

const addProjectFileById = async (req, res, next) => {
  const id = req.params.id;
  let project;

  try {
    project = await Project.findOne({ _id: id });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong while fetching the data, please try again",
      500
    );
    return next(error);
  }
  if (!project) {
    const error = new HttpError("Project not found, please try again", 500);
    return next(error);
  }

  project.files.push(...req.files);

  try {
    project.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong while saving the data, please try again",
      500
    );
    return next(error);
  }
  res.status(201).json({ task: task });
};
const updateProjectProgressById = async (req, res, next) => {
  const id = req.params.id;
  let project;
  const { progress } = req.body;
  try {
    project = await Project.findOne({ _id: id });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong while fetching the data, please try again",
      500
    );
    return next(error);
  }
  if (!project) {
    const error = new HttpError("Project not found, please try again", 500);
    return next(error);
  }

  project.progress = progress ? progress : project.progress;

  try {
    project.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong while saving the data, please try again",
      500
    );
    return next(error);
  }
  res.status(201).json({ project: project });
};
const deleteProjectById = async (req, res, next) => {
  const id = req.params.id;
  let project;
  try {
    project = await Project.findOne({ _id: id });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong while saving the data, please try again",
      500
    );
    return next(error);
  }
  if (!project) {
    const error = new HttpError("Project not found, please try again", 500);
    return next(error);
  }
  const filePaths = project.files;
  try {
    await Project.deleteOne();
    filePaths.forEach((filePath) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log("File deleted successfully:", filePath);
        }
      });
    });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong while deleting the data, please try again",
      500
    );
    return next(error);
  }
  res.status(200).json({ message: "Project deleted successfully" });
};
exports.createProject = createProject;
exports.apply = apply;
exports.addProjectFileById = addProjectFileById;
exports.getAllProjects = getAllProjects;
exports.getProjectById = getProjectById;
exports.getProjectByNumber = getProjectByNumber;
exports.getProjectsByEmail = getProjectsByEmail;
exports.updateProjectById = updateProjectById;
exports.updateProjectProgressById = updateProjectProgressById;
exports.deleteProjectById = deleteProjectById;
