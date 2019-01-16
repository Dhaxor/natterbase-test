const _ = require('lodash');
const Utility = {
    handleResponse: function (returnData, code) {
        let status = false, data = null;
        if(returnData.err) status = true;
        if(returnData.data) data = returnData.data;
        return {
            'error': status,
            'message': returnData.message,
            'response': data,
            'code': code
        };
    },

    checkRequestBody: function (params, requiredFields) {
        let errors = {};
        for (let i = 0; i < requiredFields.length; i++) {
            if (!params[requiredFields[i]]) {
                errors[requiredFields[i]] = 'is required';
            }
        }
        if(_.isEmpty(errors)) {
            return null;
        }
        else {
            return errors;
        }

    }
};

module.exports = Utility;
