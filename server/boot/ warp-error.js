require('dotenv').config()


const config = require('../../config')

// modify final response.
module.exports = function (app) {
    
    const remotes = app.remotes();
    remotes.options.rest = remotes.options.rest || {}
    remotes.options.rest.handleErrors = false;

    app.middleware('final', FinalErrorHandler);


    /**
     * FinalErrorHandler 
     * 
     * @param {object} err 
     * @param {object} req
     * @param {object} res
     * @param {function next() {
         
     }} next 
     */
    function FinalErrorHandler(err, req, res, next) {

        let response = {
            error: true,
            message: err.message,
            stack: err.stack,
            data :{}
        }

        // remove stack error on production
        if (config.node_env === 'production') {
            delete response.stack
        }

        // Error hnadeling for 404.
        if (err.hasOwnProperty("statusCode")) {
            if (err.statusCode == 404) {
                response.message = "Method not found Please check your URL for typos and make sure you're using the correct  HTTP method (GET, POST, etc)."
            }
        } 

        // sending response.
        res.status(err.statusCode || 400).send(response).end();
    }
};
