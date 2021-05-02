"use strict";

const {STATUS, ERROR, URL, URL_REGEX} = require("../utils/constants");

// Validate Input parameters.
const _in = (info) => {
    let response = {
        status: STATUS.SUCCESS,
        data: {}
    };
    try {
        if (!Object.keys(info.body).includes(URL)){
            response = {
                status : STATUS.MISSING,
                error : ERROR.MISSING_URL
            };
        }
        else if(info.body.url.match(URL_REGEX) && typeof(info.body.url) === "string"){
            response.data.url = info.body.url;
        }
        else {
            response = {
                status: STATUS.INVALID,
                error: ERROR.INVALID_URL
            };
        }
    }
    catch (error) {
        response = {
            status : STATUS.FAILURE,
            error : error
        };
    }
    finally {
        return response;
    }
};
module.exports.in = _in;