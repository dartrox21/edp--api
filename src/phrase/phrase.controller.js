const router = require('express').Router();
const PhraseService = require('./phrase.service');
const Phrase = require('./phrase.model');
const { setFilters } = require('../middlewares/util.middlewares');
const { asyncWrapper } = require('../utils/util.functions');
const FILTERS = ['id', 'data'];

router.get('/phrase/all',
    [setFilters(FILTERS)],
    asyncWrapper(PhraseService.getAll));

module.exports = router;
