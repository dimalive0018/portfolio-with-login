const Project = require("../models/project.model")

module.exports = {
    findProjects: async () => {
        return await Project.find({});
    }
}