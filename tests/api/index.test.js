
const index = require('../../index');
const apiconstants = require('../config/constants.js');

describe('Fetch and Parse Meta Data from URL', () => {
    test('Should result in successful response with SET OG parameters', async() => {
        const body = JSON.stringify({url: apiconstants.URL});
        const response = await index.scrapeMetaData({body});
        expect(response.statusCode).toBe(apiconstants.STATUS_CODES.SUCCESS);
    });

    test('Should result in successful response with computed OG', async() => {
        const body = JSON.stringify({url: apiconstants.BASIC_URL});
        const response = await index.scrapeMetaData({body});
        expect(response.statusCode).toBe(apiconstants.STATUS_CODES.SUCCESS);
    });

    test('Should result in unsuccessful validation with status code 400', async() => {
        const body = JSON.stringify({url: apiconstants.PARTIAL_URL});
        const response = await index.scrapeMetaData({body});
        expect(response.statusCode).toBe(apiconstants.STATUS_CODES.INVALID);
    });

    test('If info is undefined should failed with status code 404', async() => {
        const body = JSON.stringify({});
        const response = await index.scrapeMetaData({body});
        expect(response.statusCode).toBe(apiconstants.STATUS_CODES.MISSING);
    });
});