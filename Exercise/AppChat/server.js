/** 
 * Author : Intan Puspitasari
 * Date : 21 June 2018
 * Note : Create server file using Express and running static content from HTML
 **/

var express = require('express');
var app = express();

// Load static HTML File
app.use(express.static(__dirname));

var messages = [
    {name: 'Benedict', message:'Hi'},
    {name: 'Cumberbatch', message:'Hello'}
]

app.get('/messages', (req, res) => {
    res.send(messages);
});

// Listen to port 3123
var server = app.listen(3123, () =>{
    console.log("Server is listening on port", server.address().port);
});

