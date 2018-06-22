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

To install third party packages run the following script `npm install` or `npm install <package name>`

**2. Create package.json**

To create package.json, run `npm init` and fill the information or `npm init --yes` for the faster way

**3. Install Express**

[Express](http://expressjs.com/) is a web framework for NodeJS. To install Express, run `npm -s express` (using `-s` so it will be saved)

**4. Socket.io**

[Socket.io](https://socket.io/) enables realtime, bidirectional event based communication between client and server.

**5. Install nodemon**

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

From this section, we'll create a messaging application using NodeJS, Express, and Socket.io by following the instruction in Lynda.com online course.

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

Re-run the server, browser will display content inside HTML file.

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



## Notes :

- To execute `AppChat` project, please install Express (execute above script) and Body Parser (`npm install -s body-parser`) 


===

**Reference :** 

Mitrais e-Learning : NodeJS

[Lynda.com online course : Learning Node.js](https://www.lynda.com/Node-js-tutorials/Learning-Node-js/612195-2.html)

https://www.nodebeginner.org/#building-the-application-stack

https://blog.codeship.com/node-js-tutorial/

[NodeJS Documentation](https://nodejs.org/en/docs/)