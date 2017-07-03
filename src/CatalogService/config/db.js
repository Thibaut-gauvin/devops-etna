'use strict';

/**
 * Set the URL for the database connection
 */
module.exports = {
    url : 'mongodb://mongo/' + process.env.CATALOG_SERVICE_DATABASE
};
