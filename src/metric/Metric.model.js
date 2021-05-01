const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const CustomErrorMessages = require('../exceptionHandler/CustomErrorMessages');
require('../phrase/phrase.model');
require('../metricData/metricData.model');

let Schema = mongoose.Schema;

let Metric = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    phrase: {
        type: Schema.Types.ObjectId,
        required: [true, CustomErrorMessages.FIELD_MAY_NOT_BE_EMPTY],
        ref: 'phrase'
    },
    general_average: {
        type: Schema.Types.Decimal128,
        required: [true, CustomErrorMessages.FIELD_MAY_NOT_BE_EMPTY]
    },
    metrics_data: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'metric_data' 
    }],
    user_id: {
        type: Schema.Types.ObjectId,
        required: [true, CustomErrorMessages.FIELD_MAY_NOT_BE_EMPTY],
        ref: 'user'
    },
}, 
{ 
    collection: 'metric' 
});

Metric.plugin(uniqueValidator, {
    message: CustomErrorMessages.MUST_BE_UNIQUE
});

const autoPopulatePhraseAndMetricsData = function(next) {
    this.populate('phrase');
    this.populate('metrics_data');
    next();
};

const autoPopulatePhrase = function(next) {
    this.populate('phrase');
    next();
};

// Previous a findById & findOne the phrase and metrics data will be populated
Metric.pre('findById', autoPopulatePhraseAndMetricsData)
    .pre('findOne', autoPopulatePhraseAndMetricsData)
    .pre('find', autoPopulatePhrase);

/**
 * Cast the general average to float this to avoid the following response:
 * BEFORE
 * "general_average": {"$numberDecimal": "83.322"}
 * NOW
 * "general_average": 83.322
 * 
 */
Metric.set('toJSON', {
  transform: (doc, ret) => {
    ret.general_average = parseFloat(ret.general_average);
    return ret;
  },
});

module.exports = mongoose.model('metric', Metric);
