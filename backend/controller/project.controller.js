const mongoose = require('mongoose');
const Project = require('../models/project.model');
const { findProjects } = require('../data/project.data');

module.exports = {
    createProject: async (req, res, next) => {
        try {
            const project = await new Project({ ...req.body }).save();
            res.send({
                status: 201,
                message: 'Project created',
                project
            })
        } catch (error) {
            console.error(error.message);
            if (error instanceof mongoose.Error.ValidationError) {
                return res.send({
                    status: 422,
                    message: error.message
                })
            }
            next(error);
        }
    },
    getProjects: async (req, res, next) => {
        try {
            const projects = await findProjects();
            res.json(projects);
        } catch (error) {
            console.error(error.message);
            next(error);
        }
    }
}