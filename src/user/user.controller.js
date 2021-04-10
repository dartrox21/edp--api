const router = require('express').Router();
const UserService = require('./UserService');
const User = require('./User.model');
const { cleanModel, setFilters } = require('../middlewares/util.middlewares');
const { asyncWrapper } = require('../utils/util.functions');

const cleanMiddleware = cleanModel(User.schema.paths);
const FILTERS = ['id', 'email', 'name', 'lastName'];

router.post('/user',
    [cleanMiddleware],
    asyncWrapper(UserService.create));

router.get('/user/all',
    [setFilters(FILTERS)], 
    asyncWrapper(UserService.getAll)
);

router.get('/user',
    [setFilters(FILTERS)],
    asyncWrapper(UserService.getAllPageable));

router.get('/user/:id',
    asyncWrapper(UserService.getById));

router.delete('/user/:id',
    asyncWrapper(UserService.delete));

router.put('/user/:id',
    [cleanMiddleware],
    asyncWrapper(UserService.update));

module.exports = router;
