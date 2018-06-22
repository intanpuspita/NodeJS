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
var mongoose = require('mongoose');

// Load static HTML File
app.use(express.static(__dirname));
// Use parser for body that contain json and URL
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// URL from mLab sandbox database
var dbUrl = "mongodb://admin:admin1234@ds115971.mlab.com:15971/intanlearn-node";

var message = mongoose.model("Message", {
   name: String,
   message: String 
});

//var messages = [];

app.get('/messages', (req, res) => {
    message.find({}, (err, messages) => {
        res.send(messages);
    });
});

app.post('/messages', (req, res)=>{
    var msg = new message(req.body);
    msg.save((err) => {
        if(err)
            sendStatus(500);

        //messages.push(req.body);
        io.emit('message', req.body);
        res.sendStatus(200);
    });
});

io.on("connection", (socket) => {
    console.log('A user connected');
});

// Connect to MongoDB
mongoose.connect(dbUrl, (err) => {
    console.log("Mongo DB Connection", err);
});

// Listen to port 3000
var server = http.listen(3000, () =>{
    console.log("Server is listening on port", server.address().port);
});

