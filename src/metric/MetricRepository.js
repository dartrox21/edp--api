const Metric = require('./Metric.model');
const GenericRepository = require('../generics/GenericRepository');

/**
 * Class used to manage all the Metric requests to the DB
 */
class MetricRepository extends GenericRepository {

    constructor() {
        super(Metric);
    }

    /**
     * Gets an active metric by id 
     * @param id 
     * @param projection object. Can be null
     */
    async getById(id) {
        return Metric.findById(id);
    }
}

module.exports = new MetricRepository();
