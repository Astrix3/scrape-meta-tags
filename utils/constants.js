"use strict";

const openGraphTag = 'og:';
const propertySperator = ':';
const url = 'url';
const url_regex = /^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-*": "*",
    "Access-Control-Allow-Headers": "*",
    "node-cache": "Missed node-cache",
    "Content-Type": "application/json"
};

const statusType  = {
    SUCCESS: 'success',
    FAILURE: 'failure',
    INVALID: 'invalid',
    MISSING: 'missing'
};

const error = {
    NO_RECORD : 'no record found',
    INVALID_URL : 'invalid [url] received.',
    MISSING_URL : 'missing [url] parameter from request',
    MISSING_DATA : 'missing [OG] metaDate from URL',
    INVALID_DATA : 'invalid [url], no meta-tags found.',
};

module.exports.HEADERS = headers;
module.exports.URL_REGEX = url_regex;
module.exports.URL = url;
module.exports.STATUS = statusType;
module.exports.ERROR = error;
module.exports.OPEN_GRAPH_TAG = openGraphTag;
module.exports.PROPERTY_SEPERATOR = propertySperator;
