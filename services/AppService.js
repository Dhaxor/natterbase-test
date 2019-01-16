const util = require('../libraries/Utility');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

let COUNTRIES = [];


const AppService = {
    loginUser: function (request, callback) {
        let body = request.body;

        if (body.username !== config.username || body.password !== config.password){
            return callback(util.handleResponse({err: true, message: "Username/Password is not correct", data:null}, 401), 401);
        }

        let token = jwt.sign({username: "admin"}, config.SECRET);

        return callback(util.handleResponse({err: false, message: "Login is successful", data:token}, 200), 200);

    },

    getAllCountries: function (callback) {
        return callback(util.handleResponse({err: false, message: "All countries found", data:COUNTRIES}, 200), 200);
    },

    addACountry: function (request, callback) {
        let body = request.body;

        COUNTRIES.push(body.country);

        return callback(util.handleResponse({err: false, message: "Country has been added", data:COUNTRIES}, 200), 200);


    },

    deleteACountry: function (request, callback) {
        let body = request.body;

        let index = COUNTRIES.indexOf(body.country);
        if (index > -1){
            COUNTRIES.splice(index, 1);
            return callback(util.handleResponse({err: false, message: "Country has been removed", data:COUNTRIES}, 200), 200);
        }else {
            return callback(util.handleResponse({err: false, message: "Country cannot be removed as it is not found", data:COUNTRIES}, 200), 200);
        }

    }

};

module.exports = AppService;
