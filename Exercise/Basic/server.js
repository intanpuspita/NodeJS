/** 
 * Author : Intan Puspitasari
 * Date : 21 June 2018
 * Note : Below code is exercise code to create basic HTTP Server module.
 *        To run this module, execute 'node server.js' from terminal
 *        and try to access http://localhost:8888 from browser
 * Source : https://www.nodebeginner.org/#building-the-application-stack
 *          https://blog.codeship.com/node-js-tutorial/
 **/

var http = require("http");

http.createServer(function(request, response){
    response.writeHead(200, {"Content-Type" : "text/plain"});
    response.write("Hello World");
    response.end();
}).listen(8888);