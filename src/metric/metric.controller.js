const router = require('express').Router();
const MetricService = require('./MetricService');
const Metric = require('./Metric.model');
const { cleanModel, setFilters, preAuthorize } = require('../middlewares/util.middlewares');
const { asyncWrapper } = require('../utils/util.functions');

const cleanMiddleware = cleanModel(Metric.schema.paths);
const FILTERS = ['date', 'phrase', 'general_average'];

router.get('/metric/user/:id',
    [setFilters(FILTERS)],
    asyncWrapper(MetricService.getAllPageable));

router.get('/metric/:id',
    asyncWrapper(MetricService.getById));

module.exports = router;
