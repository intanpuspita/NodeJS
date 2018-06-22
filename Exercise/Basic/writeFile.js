/*
     Author : Intan Puspitasari
     Date : 21 June 2018
     Note : This module demonstrates how to create new file and write inside of it
*/

var fs = require('fs');
var data = {
    name: 'Intan Puspita Sari'
}

fs.writeFile("newdata.json", JSON.stringify(data), (err) => {
    console.log("Writing Finished", err);
});