const router = require('express').Router();
const MetricService = require('./metric.service');
const Metric = require('./Metric.model');
const { setFilters } = require('../middlewares/util.middlewares');
const { asyncWrapper } = require('../utils/util.functions');
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
