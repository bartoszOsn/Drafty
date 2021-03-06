/**
 * This module exports router for API calls.
 */


var express = require('express');
var router = express.Router();

require('./account_validate')(router);
require('./screenplay')(router);
require('./export')(router);

module.exports = router;