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
     * Method used to get all the active metrics from the db with params
     * such as limit & page
     * @param limit limit
     * @param page page
     * @param filters filters object
     * @param projection. Can be null
     * @returns List of metrics
     */
    async getAllPageable(limit, page, filters, projection) {
        return super.getAllPageable(limit, page, filters, projection);
    }

    /**
     * Method used to count all the active metrics in the db
     */
    async countDocuments() {
        return Metric.countDocuments()
        .where('active').equals('true');
    }

    /**
     * Gets an active metric by id 
     * @param id 
     * @param projection object. Can be null
     */
    async getById(id) {
      console.log(id);
        return Metric.findById(id);
    }
}

module.exports = new MetricRepository();
