/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var http = require('http');
var fs = require('fs');
var path = require('path');

var guid = function() {
  var s4 = function() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};

var mimeLookup = { 
  '.js': 'application/javascript', 
  '.html': 'text/html',
  '.css': 'text/css'
}; 

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  // The outgoing status.

  var statusCode;
  // var body = {results: []};
  
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = 'text/plain';

  /************************** Chat Client Messages Handler *******************/
  if (request.url === '/classes/messages') {
    if (request.method === 'OPTIONS') {
      statusCode = 200;
      response.writeHead(statusCode, headers);
      response.end();
    } else if (request.method === 'GET') {

      statusCode = 200;
      
      // body.results = data;
      // response.writeHead(statusCode, headers);
      // response.end(JSON.stringify(body));
      var messages = require('./messages.json');
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(messages));

    } else if (request.method === 'POST') {
      statusCode = 201;

      request.on('data', function(chunk) {

        // var obj = JSON.parse(chunk);
        // obj.objectId = idCounter++;
        // data.unshift(obj);

        var messages = require('./messages.json');
        var newMessage = JSON.parse(chunk);
        newMessage.objectId = guid();

        messages.results.unshift(newMessage);
        messages = JSON.stringify(messages);

        fs.writeFile('./messages.json', messages, (err) => {
          if (err) { throw err; }
          console.log('Saved messages onto server.');
        });

      });
      request.on('end', function(chunk) {
        response.writeHead(statusCode, headers);
        response.end();
      });
    }
    /************************ Webpage Handler (HTML) ***********************/
  } else if (request.method === 'GET') {
    var fileurl;
    if (request.url === '/' || request.url.indexOf('?') !== -1) {
      fileurl = '/index.html';
    } else {
      fileurl = request.url;
    }

    var filepath = path.resolve('../client' + fileurl); 
    var fileExt = path.extname(filepath); 
    var mimeType = mimeLookup[fileExt]; 

    if (mimeType) { 
      fs.exists(filepath, function (exists) {
        if (exists) {
          response.writeHead(200, { 'content-type': mimeType }); 
          fs.createReadStream(filepath).pipe(response);
        }
      });
    }

  } else {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(body));
  }

  // // See the note below about CORS headers.
  // var headers = defaultCorsHeaders;

  // // Tell the client we are sending them plain text.
  // //
  // // You will need to change this if you are sending something
  // // other than plain text, like JSON or HTML.
  // headers['Content-Type'] = 'text/plain';

  // // .writeHead() writes to the request line and headers of the response,
  // // which includes the status and all headers.
  // response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  // response.end(JSON.stringify({results: []}));
};

exports.requestHandler = requestHandler;