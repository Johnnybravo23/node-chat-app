var moment = require('moment');

//var date = new Date();
//var months = ['Jan', 'Feb']
//calling a methode
//console.log(date.getMonth());
new Date().getTime()
var someTimestamp = moment().valueOf();
console.log(someTimestamp)

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'))