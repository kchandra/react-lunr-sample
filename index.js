'use strict';

var fs = require('fs');
var path = require('path');
var mime = require('mime-types')

exports.get = function(event, context, callback) {
  console.log(JSON.stringify(event));
  console.log(JSON.stringify(context));
  console.log(JSON.stringify(callback));
  var result = {
    statusCode: 404
  }
  
  if(event.resource === "/") {
    const contents = fs.readFileSync(`build${path.sep}index.html`);
    result = {
      statusCode: 200,
      body: contents.toString(),
      headers: {'content-type': 'text/html'}
    };
  }
  
  if(event.resource == "{/proxy+}") {
    const contents = fs.readFileSync(`build${event.path}`);
    result = {
      statusCode: 200,
      body: contents.toString(),
      headers: {'content-type': mime.lookup(event.path)}
    };
  }


  callback(null, result);
};