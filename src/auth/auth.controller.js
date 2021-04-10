const router = require('express').Router();
const { validateAuthUser } = require('./auth.middleware');
const AuthService = require('./AuthService');
const { asyncWrapper } = require('../utils/util.functions');

router.post('/auth/login', validateAuthUser, asyncWrapper(AuthService.login));

router.post('/auth/logout', asyncWrapper(AuthService.logout));

module.exports = router;
