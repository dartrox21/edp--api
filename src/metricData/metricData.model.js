const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const CustomErrorMessages = require('../exceptionHandler/CustomErrorMessages');

let Schema = mongoose.Schema;

let MetricData = new Schema({
    letter: {
        type: String,
        required: [true, CustomErrorMessages.FIELD_MAY_NOT_BE_EMPTY],
        unique: true
    },
    average: {
        type: Schema.Types.Decimal128,
        required: [true, CustomErrorMessages.FIELD_MAY_NOT_BE_EMPTY]
    },
}, 
{ 
    collection: 'metric_data' 
});

MetricData.plugin(uniqueValidator, {
    message: CustomErrorMessages.MUST_BE_UNIQUE
});

/**
 * Cast the average to float this to avoid the following response:
 * BEFORE
 * "average": {"$numberDecimal": "83.322"}
 * NOW
 * "average": 83.322
 * 
 */
MetricData.set('toJSON', {
  transform: (doc, ret) => {
    ret.average = parseFloat(ret.average);
    return ret;
  },
});

module.exports = mongoose.model('metric_data', MetricData);
