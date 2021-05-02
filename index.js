'use-strict';

const responses = require("./utils/responses");
const {STATUS} = require("./utils/constants");
const model = require("./libs/model");
const validate = require("./libs/validate");

const handle = async (event) => {
    try {
        let result = null;
        const {body} = event;
        let request = { body: JSON.parse(body)};
        
        // Validate request parameters
        result = validate.in(request);
        if (result.status !== STATUS.SUCCESS) {
            throw ({
                status: result.status,
                message: result.error
            });
        }

        // validated request parameters are passed to model for data fetching and processing
        result = await model(result.data);

        if (result.status !== STATUS.SUCCESS) {
            throw ({
                status: result.status,
                message: result.error
            });
        }

        return responses.success(result.data);

    } catch (error) {
        console.log("----- handle error ----", error);
        if (error.status === STATUS.MISSING) {
            return responses.missing(error.message);
        }
        else if (error.status === STATUS.INVALID) {
            return responses.invalid(error.message);
        }
        else {
            return responses.failure(error.message);
        }
    }
};

module.exports.scrapeMetaData = async (event, context, callback) => {
    try {
        return await handle(event);
    }
    catch (error) {
        console.log("-----postMetaData error ----", error);
        return responses.failure(error);
    }
};

(async () => {
    console.time('api');
    let a = await handle({body:JSON.stringify({url:"https://www.google.com"})});
    console.timeEnd('api');
    console.log(a);
})();