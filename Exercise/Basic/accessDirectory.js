/*
     Author : Intan Puspitasari
     Date : 21 June 2018
     Note : This module demonstrates how to read list of contents inside directory
*/

var fs = require('fs');

fs.readdir('c:/', (err, data) => {
    console.log(data);
});