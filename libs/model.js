'use-strict';

const fetchMetaData = require("meta-fetcher");
const {OPEN_GRAPH_TAG, PROPERTY_SEPERATOR, STATUS, ERROR} = require('../utils/constants');

const fetchOgData = async (url) => {
    try {
        const result = await fetchMetaData(url);

        if (result !== undefined) {
            if (Object.keys(result.opengraph).length > 0)
                return { 
                    status: STATUS.SUCCESS,
                    data: result.opengraph
                };
            return { 
                status: STATUS.MISSING,
                data: result.basic_metadata
            };
        }
        return { 
            status: STATUS.INVALID,
            error: ERROR.INVALID_DATA
        };
    }
    catch (error) {
        console.log('error occured in fetchOgData', error);

        return { 
            status: STATUS.FAILURE,
            error: error
        };
    }
};

const formatOgData = (data) => {
    const result = {};
    const keys = data ? Object.keys(data) : [];

    keys.forEach(item => {
        const key = item.split(OPEN_GRAPH_TAG)[1];

        if (item.includes(OPEN_GRAPH_TAG) && item.split(PROPERTY_SEPERATOR).length <= 2) {
            result[key] = data[item];
        }
    });

    if (Object.keys(result).length > 0)
        return {
            status: STATUS.SUCCESS,
            data: result
        };

    return { 
        status: STATUS.MISSING,
        error: ERROR.MISSING_DATA
    };
};

const dispatch = async (data) => {
    try {
        let result = await fetchOgData(data.url);

        if (result.status === STATUS.SUCCESS)
            result = formatOgData(result.data);
        else if (result.status === STATUS.MISSING)
            result.status = STATUS.SUCCESS;
        return result;   
    } catch (error) {
        console.log('Error occured in dispatch', error);
        return {
            status : STATUS.FAILURE,
            error : error
        };
    }
};

module.exports = dispatch;