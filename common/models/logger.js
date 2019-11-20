'use strict';

const logger = require('../../utils/logers').logger;

module.exports = (Logger) => {
    Logger.log = logger;
};



