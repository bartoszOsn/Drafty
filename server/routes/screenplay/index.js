/**
 * Module for all routes about screenplay
 */

var express = require('express');
var router = express.Router();

require('./view')(router);

module.exports = router;