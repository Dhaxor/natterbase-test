const RESP = function(res,data,next,code){
    res.status(code).json(data);
    return next();
};
const util = require('../libraries/Utility');
const config = require('../config/config');
const AppService =  require('../services/AppService');

const AppController = {
    login: function (req, res, next) {
        let errors = util.checkRequestBody(req.body, ['username', 'password']);
        if(errors){
            RESP(res, util.handleResponse({err: true, message: "Invalid Parameters", data: errors}, 404), next, 404)
        }else{
            AppService.loginUser(req, function(response, code){
                RESP(res,response, next, code);
            });
        }
    },

    getCountries: function (req, res, next) {
        AppService.getAllCountries(function(response, code){
            RESP(res,response, next, code);
        });
    },

    addCountry: function (req, res, next) {
        let errors = util.checkRequestBody(req.body, ['country']);
        if(errors){
            RESP(res, util.handleResponse({err: true, message: "Invalid Parameters", data: errors}, 404), next, 404)
        }else{
            AppService.addACountry(req, function(response, code){
                RESP(res,response, next, code);
            });
        }
    },

    deleteCountry: function (req, res, next) {
        let errors = util.checkRequestBody(req.body, ['country']);
        if(errors){
            RESP(res, util.handleResponse({err: true, message: "Invalid Parameters", data: errors}, 404), next, 404)
        }else{
            AppService.deleteACountry(req, function(response, code){
                RESP(res,response, next, code);
            });
        }
    },

};

module.exports = AppController;
