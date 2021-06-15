const GenericService = require('../generics/GenericService');
const Phrase = require('./phrase.model');

class PhraseSevice extends GenericService {

    constructor() {
        super(Phrase);
        this.uniqueValidateException = this.uniqueValidateException.bind(this);
    }

    async uniqueValidateException(phrase) { }
}

module.exports = new PhraseSevice();
