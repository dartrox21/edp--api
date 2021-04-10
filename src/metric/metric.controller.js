const router = require('express').Router();
const MetricService = require('./MetricService');
const Metric = require('./Metric.model');
const { cleanModel, setFilters } = require('../middlewares/util.middlewares');
const { asyncWrapper } = require('../utils/util.functions');
const cleanMiddleware = cleanModel(Metric.schema.paths);
const FILTERS = ['date', 'phrase', 'general_average'];

router.get('/metric/:id',
    asyncWrapper(MetricService.getById));

/**
 * Get pageable all the user metrics
 */
router.get('/metric/user/:userId',
    [setFilters(FILTERS)],
    asyncWrapper(MetricService.getAllPageable));
  
module.exports = router;
