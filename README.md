# NodeJS
Self learning about NodeJS technology

## Prequisites:

- JavaScript
- ES6
- CommandLine
- Git

**1. Install NodeJS**

Download the installer from https://nodejs.org/en/download/.

To check version of NodeJS run `Node -v` in cmd.

**2. Create package.json**

To create package.json, run `npm init` and fill the information or `npm init --yes` for the faster way

**3. Install Express**

[Express](http://expressjs.com/) is a web framework for NodeJS. To install Express, run `npm -s express` (using `-s` so it will be saved)

**4. Socket.io**

[Socket.io](https://socket.io/) enables realtime, bidirectional event based communication between client and server. The idea of using socket.io is client or browser are able to send requests to Node, but there is no way to do it in reverse. To install socket.io in Node, run the following script `npm install -s socket.io`.

**5. Install MongoDB**

MongoDB could be downloaded and installed locally, but when publishing the app it needs to be host seperately or find a third party host for it. For this exercise we'll create free sandbox database in [mLab](https://mlab.com/).

**6. Instal Mongoose**

[Mongoose](http://mongoosejs.com/) is Object Document Mapper (ODM) library for MongoDB and NodeJS. It used to translate documents in MongoDB database to objects in code. To install mongoose, run the following script `npm install -s mongoose`.

**7. Install nodemon**

Nodemon is utility to monitor any changes in source code and automatically restart the server. 
Run the following script to install nodemon `npm install -g nodemon` (using `-g` so it will be installed globally. 

## Exercise

### 1. Create basic HTTP server module

Create file *server.js* in root directory of project and fill with the following code

```
var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8888);
```

Run the following script `node server.js` or `nodemon server.js`. Run `http://localhost:8888` in the browser, it will display the "Hello World" message.

### 2. Using File System module

To interact with file system in NodeJS we use `fs` module. To use this module, add the following code :

`const fs = require('fs');`

For more file system operation that can be done by this module, please check [File System Documentation](https://nodejs.org/api/fs.html)

### 3. Create Server File with Express

From this section, we'll create a messaging application using NodeJS, Express, and Socket.io by following the instruction in Lynda.com online course. For complete code, please refer to folder *Exercise/AppChat*.

In previous section, we created basic server module. In this section we create server file using Express. First create a package.json file using `npm init`. Once it is created, install Express in root project folder using above script. 

Create new *server.js* file and fill with the following code :

```
var express = require('express');
var app = express();

var server = app.listen(8888);
```

Run the following script `node server.js` or `nodemon server.js`. Run `http://localhost:8888` in the browser. Since there is no content added to our code, then it will be display an error message. 

Create new *index.html* file in root project folder. We'll create the UI using Bootstrap, fill the HTML file with the following code

```
<!DOCTYPE HTML>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.3.1.min.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<div class="container col-12">
    <br>
    <div class="jumbotron">
        <h1 class="display-4">Messaging App</h1>
        <br>
        <input id = "name" class="form-control" placeholder"Your Name">
        <br>
        <textarea id = "message" class="form-control" placeholder"Your Message"></textarea>
        <br>
        <button id="send-btn" class="btn btn-success"><span class="fa fa-send" style="margin-right:5px;"></span>Send</button>
    </div>

    <div id="messages">

    </div>
<div>
```

To load *index.html* static file, add the following code before `app.listen` block : `app.use(express.static(__dirname));`

Restart the server, browser will display content inside HTML file.

### 4. Using routing (GET) in Express

Routing refers to how an application's endpoints (URIs) respond to client requests. In this exercise, routing used to display messages in `AppChat` project. 

In the same *server.js* file as point no 3, we'll add code to get list of messages. We won't using database until the next exercise, so list of messages will be stored in an array named `messages`. Create the array and fill with dummy data

```
var messages = [
    {name: 'Benedict', message:'Hi there!'},
    {name: 'Cumberbatch', message:'Hello, how are you?'}
]
```

We will display data in `messages` array once GET request is made from *index.html*. The following code is example how to send respond when GET request is made.

```
app.get('/messages', (req, res) => {
    res.send(messages);
});
```

In above code, `messages` array will be send as response. It could be tested from Postman (or other tools) by accessing URL `http://localhost:8888/messages`. It should be display array that we created before. After make sure that the back-end code works, we'll call it from our front-end. Open *index.html* that we created before, and add following code :

```
<script>
    $(() => {
        getMessages();
    });

    function addMessage(message){
        $("#messages").append(`<h4>${message.name}</h4> <p>${message.message}</p>`);
    }

    function getMessages(){
        $.get('http://localhost:8888/messages', (data) =>{
            data.forEach(addMessage);
        });
    }
</script>
```

The first block of code is loaded once document is ready. When page is loaded, it will call `getMessages` function. In `getMessages` function, there is a jQuery http GET request with URL of endpoint that we created before. Since it will retrieve data in an array, we'll use `forEach` to loop the data in callback action. To display the data from array, we create a function called `addMessage`, it will append the `div` with message data. Save the changes and reload our app in browser, it should be display the list of dummy messages.

### 5. Using routing (POST) in Express

We have successfully display list of dummy messages. Now, we'll add functionality to message form that we created, so we're able to send message through the form. First, add the following code to handle POST request in *server.js*

```
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/messages', (req, res)=>{
    messages.push(req.body);
    res.sendStatus(200);
});
```

Express has no built-in support to parse the body, so we'll use a package that will do that task called body-parser. Install body-parser using this script `npm install -s body-parser`. It could be tested from Postman before we modify *index.html*. In *index.html* add the following function:

```
  $(() => {
      $("#send-btn").click(() =>{
          var message = {name : $('#name').val(), message : $('#message').val()};
          postMessage(message);
          clearVal();
      });
      getMessages();
  });

  function clearVal(){
      $('#name').val('');
      $('#message').val('');
  }

  function postMessage(message){
      $.post('http://localhost:3000/messages', message, addMessage(message));
  }
```

In our initial document ready block, we add new event `onclick` for `send` button. Once it is clicked, it will call `postMessage` function that will send POST request. After message posted, we set the callback to `addMessage` function, so the list of messages will be refresh. `clearVal` function is used to reset form into empty after message successfully posted. Reload our app in browser to check if it works.

### 6. Connect to Socket.io

As mentioned before, we can make server send request to client by using only Node. In this messaging app, we want to make our list of messages refresh if there is another sent a message. With Socket.io, we will be able to notify clients when another user has sent a chat message. Install socket.io by using above script. After installed, open *server.js* file and add the following code :

```
var http = require('http').Server(app);
var io = require('socket.io')(http);
```

Now we setup socket.io in front-end. Add the following script tag in *index.html*

```
<script src="/socket.io/socket.io.js"></script>
```

To initialize socket.io in front-end add the following code inside the javascript script tag

```
var socket = io();
```

In *server.js* add the following code on top of `app.listen` code to check connection to socket io

```
io.on("connection", (socket) => {
    console.log('A user connected');
});
```

Since we want to make Express and socket.io running at the same time, we will use `http.listen` instead of `app.listen`. The code will be like this

```
var server = http.listen(3000, () =>{
    console.log("Server is listening on port", server.address().port);
});
```

Restart the server and reload the web browser. If it works, the console log will display "A user connected" message.

### 7. Create Socket.io event

We'll add socket.io event when posting a message. Open the *server.js* add the following code inside `app.post` block

```
io.emit('message', req.body);
```

The code will be like this

```
app.post('/messages', (req, res)=>{
    messages.push(req.body);
    io.emit('message', req.body);
    res.sendStatus(200);
});
```

Now we create event listener in front-end, so once socket.io detect any new message we'll append new message into list of messages. Open *index.html* and add the following code under document ready block

```
socket.on('message', addMessage);
```

Restart the server and reload our app in web browser. Try to post a message in two different tab or browser. If a client post a message, it should be instantly shows up in other client.

### 8. Connect to MongoDB

For this example, we create MongoDB database in mLab. Create a database and install mongoose in the project. After mongoose installed, add it in *server.js* file with the following code :

```
var mongoose = require('mongoose');

var dbUrl = "mongodb://admin:admin1234@ds115971.mlab.com:15971/intanlearn-node";

mongoose.connect(dbUrl, (err) => {
    console.log("Mongo DB Connection", err);
});
```

`dbUrl` is a connection string of our database. It should be saved in hidden configuration file, but for now we'll just put it in *server.js*. Restart the server, if it works then the console log will display the message without an error.

### 9. Save data to MongoDB

We have successfully created connection to MongoDB using mongoose. Now we modify the existing get and post message so it will be stored in database. First, add new model using mongoose that will represent message. Add the following code 

```
var message = mongoose.model("Message", {
   name: String,
   message: String 
});
```

Modify post message block code into the following code

```
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
```

`messages.push(req.body)` is commented because it won't be used anymore. `messages` array also can be deleted. Restart the server and reload our app in browser. Try to add new message data and check the database, the data should be stored in database.

Now we move to get message. Modify get message block code into the following code

```
app.get('/messages', (req, res) => {
    message.find({}, (err, messages) => {
        res.send(messages);
    });
});
```

Restart the server and reload our app in browser. The previous message that we created before should be appear when the page loaded. Since the data stored in database, messages won't disappear everytime we restart the server.


## SQL vs NoSQL

SQL :

- Structured Query Language, the data stored inside it is structured.

- There is a lot of up-front design work

- Sometimes performance and query benefits

- Sometimes performance hits from overhead of this design

NoSQL :

- Just collections of any data

- Less up-front desgin work

- Possible performance increases


===

**Reference :** 

Mitrais e-Learning : NodeJS

[Lynda.com online course : Learning Node.js](https://www.lynda.com/Node-js-tutorials/Learning-Node-js/612195-2.html)

https://www.nodebeginner.org/#building-the-application-stack

https://blog.codeship.com/node-js-tutorial/

https://medium.freecodecamp.org/introduction-to-mongoose-for-mongodb-d2a7aa593c57

https://medium.com/chingu/an-overview-of-mongodb-mongoose-b980858a8994

[NodeJS Documentation](https://nodejs.org/en/docs/)