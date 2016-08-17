var express = require('express');

// var http = require('http');
// var fs = require('fs');
// var path = require('path');

// var cache = [];

// var guid = function() {
//   var s4 = function() {
//     return Math.floor((1 + Math.random()) * 0x10000)
//       .toString(16)
//       .substring(1);
//   };
//   return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
//     s4() + '-' + s4() + s4() + s4();
// };

// var headers = {
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'content-type, accept',
//   'access-control-max-age': 10,
//   'Content-Type': 'application/JSON'
// };

var requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
//   var statusCode;
  
// // /************************** Chat Client Messages Handler *******************/

//   if (request.method === 'OPTIONS') {
//     statusCode = 200;
//     response.writeHead(statusCode, headers);
//     response.end();
//   } else if (request.method === 'GET') {

//     statusCode = 200;
//     var messages = require('./messages.json');
//     messages.results = cache.concat(messages.results);
//     response.writeHead(statusCode, headers);
//     response.end(JSON.stringify(messages));

//   } else if (request.method === 'POST') {
//     statusCode = 201;

//     var body = [];
//     request.on('data', function(chunk) {
//       body.push(chunk);
//     });
//     request.on('end', function() {
//       var newMessage = JSON.parse(body.join(''));
//       newMessage.objectId = guid();
//       cache.unshift(newMessage);

//       response.writeHead(statusCode, headers);
//       response.end();
//     });

};

// var saveMessages = function() {
//   var messages = require('./messages.json');

//   cache.forEach(function(element) {
//     messages.results.unshift(element);
//   });

//   cache = [];

//   fs.writeFile('./messages.json', JSON.stringify(messages), (err) => {
//     if (err) { throw err; }
//     console.log('Saved messages onto server.');
//   });
// };

// setInterval(saveMessages, 10000);

exports.requestHandler = requestHandler;