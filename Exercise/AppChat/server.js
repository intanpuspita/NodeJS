/** 
 * Author : Intan Puspitasari
 * Date : 21 June 2018
 * Note : Create server file using Express and running static content from HTML
 **/

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Load static HTML File
app.use(express.static(__dirname));
// Use parser for body that contain json and URL
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var messages = [];

app.get('/messages', (req, res) => {
    res.send(messages);
});

app.post('/messages', (req, res)=>{
    messages.push(req.body);
    io.emit('message', req.body);
    res.sendStatus(200);
});

io.on("connection", (socket) => {
    console.log('A user connected');
});

// Listen to port 3000
var server = http.listen(3000, () =>{
    console.log("Server is listening on port", server.address().port);
});

