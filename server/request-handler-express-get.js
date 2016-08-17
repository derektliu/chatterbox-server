var express = require('express');
var fs = require('fs');

var requestHandlerGET = function(req, res) {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  fs.readFile('./server/messages.json', 'utf8', (err, data) => {
    if (err) { throw err; }
    // data = JSON.parse(data);
    res.status(200).send(data);
    console.log('Client received messages');
  });
};

exports.requestHandlerGET = requestHandlerGET;