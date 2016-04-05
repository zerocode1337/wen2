'use strict'
const PORT = 1337;

var finalhandler = require('finalhandler'),
    http         = require('http'),
    serveStatic  =  require('serve-static');

var serve = serveStatic(__dirname + '/dist', {index:['index.html']});

var server = http.createServer(function(req,res){
    var done = finalhandler(req,res);
    serve(req,res,done);
});

server.listen(PORT);

console.log('Server is running on PORT: ' + PORT);

