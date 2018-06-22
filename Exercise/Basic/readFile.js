/*
     Author : Intan Puspitasari
     Date : 21 June 2018
     Note : This module demonstrates how to read data from json file
*/

var fs = require('fs');
var data = require('./data.json');

console.log(data.name);

fs.readFile('./data.json', 'utf-8', function(err, data){
    var data = JSON.parse(data);
    console.log(data.name);
});