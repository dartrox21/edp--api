const router = require('express').Router();
const PhraseService = require('./phrase.service');
const Phrase = require('./phrase.model');
const { setFilters } = require('../middlewares/util.middlewares');
const { asyncWrapper } = require('../utils/util.functions');
const FILTERS = ['id', 'data'];

router.get('/phrase/:id',
    asyncWrapper(PhraseService.getById));

router.get('/phrase/all',
    asyncWrapper(PhraseService.getAll));

module.exports = router;
