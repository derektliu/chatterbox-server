var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

// var http = require('http');
// var path = require('path');

var cache = [];

var guid = function() {
  var s4 = function() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};

var requestHandler = function(req, res) {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  
/************************* Chat Client Messages Handler ******************/
  var statusCode = 201;

  fs.readFile('./server/messages.json', 'utf8', (err, data) => {
    if (err) { throw err; }
    var messages = JSON.parse(data);

    req.body.objectId = guid();
    messages.results.unshift(req.body);
    
    fs.writeFile('./server/messages.json', JSON.stringify(messages), (err) => {
      if (err) { throw err; }
      console.log('Saved messages onto server.');
    });

  });

};


exports.requestHandler = requestHandler;