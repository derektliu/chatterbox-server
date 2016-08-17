var express = require('express');
var fs = require('fs');

var requestHandlerGET = function(req, res) {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  // var messages = require('../server/messages.json');
  var messages = JSON.parse(fs.readFileSync('./server/messages.json', 'utf8'));
  res.status(200).send(messages);
};

exports.requestHandlerGET = requestHandlerGET;