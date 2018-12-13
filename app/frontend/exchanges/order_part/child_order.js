'use strict';
const basePath = require('./../base_config/path.js').basePath;
const exchanges = require(basePath+'base_config/Const_EXCHANGES');
// console.log(exchanges);
console.log(process.pid);
let count = 0,
	pid = process.pid;
for (var i = 0; i <= 40; i++) {
	let random = Math.random()*300000
	setTimeout(function () {
	    count +=1;
	        console.error('order '+pid+'运行第'+count+'次');
	    if(count === 5000){
	        return false;
	    }
	},random)
}