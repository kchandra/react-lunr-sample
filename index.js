'use strict';

var fs = require('fs');
var path = require('path');

exports.get = function(event, context, callback) {
  JSON.stringify(event);
  JSON.stringify(context);
  JSON.stringify(callback);
  
  var contents = fs.readFileSync(`build${path.sep}index.html`);
  var result = {
    statusCode: 200,
    body: contents.toString(),
    headers: {'content-type': 'text/html'}
  };

  callback(null, result);
};
