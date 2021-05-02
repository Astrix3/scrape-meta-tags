
const model = require('../../../libs/model');
const apiconstants = require('../../config/constants.js');
const constants = require('../../../utils/constants');

describe('Fetch and Parse Meta Data from URL', () => {
    test('Should result in successful response with SET OG parameters', async() => {
        const data = {
            url: apiconstants.URL
        };
        const result = {
            status: constants.STATUS.SUCCESS,
            data: {
                title: expect.any(String),
                description: expect.any(String),
            }
        };
        const response = await model(data);
        expect(response).toMatchObject(result);
    });

    test('Should result in successful response with computed OG', async() => {
        const data = {
            url: apiconstants.BASIC_URL
        };
        const result = {
            status: constants.STATUS.SUCCESS,
            data: {
                title: expect.any(String)
            }
        };
        const response = await model(data);
        expect(response).toMatchObject(result);
    });

    test('Should result in unsuccessful API response with exception invalid Data', async() => {
        const data = {
            url: apiconstants.PARTIAL_URL
        };
        const result = {
            status: constants.STATUS.INVALID,
            error: constants.ERROR.INVALID_DATA
        };
        const response = await model(data);
        expect(response).toMatchObject(result);
    });

    test('If info is undefined should failed with status failure', async() => {
        const data = undefined;
        const result = {
            status: constants.STATUS.FAILURE
        };
        const response = await model(data);
        expect(response).toMatchObject(result);
    });
});