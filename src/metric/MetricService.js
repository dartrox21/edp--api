const GenericService = require('../generics/GenericService');
const CustomValidateException = require('../exceptionHandler/CustomValidateException');
const CustomErrorMessages = require('../exceptionHandler/CustomErrorMessages');
const HttpStatus = require('http-status-codes');
const MetricRepository = require('./MetricRepository');
const Metric = require('./Metric.model');
const metricProjection = require('./projections/metric.projection');

class MetricSevice extends GenericService {

    constructor() {
        super(Metric);
        this.uniqueValidateException = this.uniqueValidateException.bind(this);
        this.getAllPageable = this.getAllPageable.bind(this);
        this.getById = this.getById.bind(this);
        this.findByIdAndValidate = this.findByIdAndValidate.bind(this);
    }

    async uniqueValidateException(metric) {}
    
    /**
     * Service to get the pageable list of all the metrics with the metric projection
     * @param req Request object
     * @param res Response object
     * @returns 200 OK if the list is not empty.
     * @returns 204 NO CONTENT if the list is empty.
    */
    async getAllPageable(req, res, next) {
        await super.getAllPageable(req, res, next, metricProjection);
    }

    /**
     * Service used to find a metric by id
     * @param req Request object
     * @param res Response object
     * @returns 404 NOT FOUND if the metric is not found
     * @returns 200 OK If the metric is found
     */
    async getById(req, res) {
        const metric = await this.findByIdAndValidate(req.params.id);
        res.status(HttpStatus.OK).json(metric);
    }

    /**
     * Service used to find an metric by id
     * @param req Request object
     * @param id 
     * @returns Metric found
     * @throws CustomValidateException 404 NOT FOUND if the metric is not found
     */
    async findByIdAndValidate(id) {
        const metric = await MetricRepository.getById(id);
        if(!metric) {
            throw CustomValidateException.notFound().build();
        }
        return metric;
    }
}

module.exports = new MetricSevice();
