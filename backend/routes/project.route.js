const express = require('express');
const { signIn, admin } = require('../middleware/auth.middleware');
const { createProject, getProjects } = require('../controller/project.controller');

const router = express.Router();

router.post('/create', signIn, admin, createProject);

router.get('/get', getProjects);

module.exports = router;