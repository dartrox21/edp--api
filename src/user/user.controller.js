const router = require('express').Router();
const UserService = require('./UserService');
const User = require('./User.model');
const { cleanModel } = require('../middlewares/util.middlewares');
const { asyncWrapper } = require('../utils/util.functions');

const cleanMiddleware = cleanModel(User.schema.paths);
const FILTERS = ['id', 'email', 'name', 'lastName'];

router.post('/user',
    [cleanMiddleware],
    asyncWrapper(UserService.create));

router.get('/user/:id',
    asyncWrapper(UserService.getById));

router.delete('/user/:id',
    asyncWrapper(UserService.delete));

router.put('/user/:id',
    [cleanMiddleware],
    asyncWrapper(UserService.update));

module.exports = router;
