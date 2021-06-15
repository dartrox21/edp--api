const GenericService = require('../generics/GenericService');
const Metric = require('./Metric.model');
const metricProjection = require('./projections/metric.projection');
const UserService = require('../user/user.service');

class MetricSevice extends GenericService {

    constructor() {
        super(Metric);
        this.uniqueValidateException = this.uniqueValidateException.bind(this);
        this.getAllPageable = this.getAllPageable.bind(this);
    }

    async uniqueValidateException(metric) { }
    
    /**
     * Service to get the pageable list of all the metrics with the metric projection
     * @param req Request object
     * @param res Response object
     * @returns 200 OK if the list is not empty.
     * @returns 204 NO CONTENT if the list is empty.
    */
    async getAllPageable(req, res, next) {
        console.log('getAllPageable MetricSevice');
        const userId = req.params.userId;
        await UserService.findByIdAndValidate(userId);
        req.query.filters['user_id'] = userId;
        await super.getAllPageable(req, res, next, metricProjection);
    }
}

module.exports = new MetricSevice();
