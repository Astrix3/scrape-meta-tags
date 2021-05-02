
const validate = require('../../../libs/validate');
const apiconstants = require('../../config/constants.js');
const constants = require('../../../utils/constants');

describe('Validate Input Parameters', () => {
    test('Should result in successful validation of input URL', () => {
        const info = {
            body: {
                url: apiconstants.URL
            }
        };
        const result = {
            status: constants.STATUS.SUCCESS,
            data: {
                url: apiconstants.URL
            }
        };
        expect(validate.in(info)).toMatchObject(result);
    });

    test('Should result in unsuccessful validation with exception missing URL', () => {
        const info = {
            body: {}
        };
        const error = {
            status: constants.STATUS.MISSING,
            error: constants.ERROR.MISSING_URL
        };
        expect(validate.in(info)).toMatchObject(error);
    });

    test('Should result in unsuccessful validation with exception invalid URL', () => {
        const info = {
            body: {
                url: apiconstants.PARTIAL_URL
            }
        };
        const error = {
            status: constants.STATUS.INVALID,
            error: constants.ERROR.INVALID_URL
        };
        expect(validate.in(info)).toMatchObject(error);
    });

    test('If info is undefined should failed with status failure', () => {
        const info = undefined;
        const result = {
            status: constants.STATUS.FAILURE
        };
        expect(validate.in(info)).toMatchObject(result);
    });
});