'use strict';
module.exports = (Helper) => {

    Helper.GenerateError = (message = 'Somthing went wrong', status = 500) => {
        let error = new Error(message);
        error.status = status;
        return error;
    }
};
