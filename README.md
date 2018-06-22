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

To install Express, run `npm -s express` (using `-s` so it will be saved)

**4. Install nodemon**

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

In previous section, we created basic server module. In this section we create server file using Express. First create a package.json file using `npm init`. Once it is created, install Express in root project folder using above script. 

Create new *server.js* file and fill with the following code :

```
var express = require('express');
var app = express();

var server = app.listen(8888);
```

Run the following script `node server.js` or `nodemon server.js`. Run `http://localhost:8888` in the browser. Since there is no content added to our code, then it will be display an error message. 

To add dummy content, create new *index.html* file in root project folder. Fill the HTML file with any dummy content. And add below code before `app.listen` code

`app.use(express.static(__dirname));`

Re-run the server, browser will display content inside HTML file.

===

**Reference :** 

Mitrais e-Learning : NodeJS

[Lynda.com online course : Learning Node.js](https://www.lynda.com/Node-js-tutorials/Learning-Node-js/612195-2.html)

https://www.nodebeginner.org/#building-the-application-stack

https://blog.codeship.com/node-js-tutorial/

[NodeJS Documentation](https://nodejs.org/en/docs/)