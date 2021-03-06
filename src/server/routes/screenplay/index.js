/**
 * Module for all routes about screenplay
 */

var express = require('express');
var router = express.Router();

require('./view')(router);
require('./new')(router);
require('./delete')(router);
require('./edit')(router);

module.exports = router;