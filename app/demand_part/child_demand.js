'use strict';
const basePath = require('./../base_config/path.js').basePath;
const exchanges = require(basePath+'base_config/Const_EXCHANGES');
// console.log(exchanges);
console.log(process.pid);
let count = 0,
	pid = process.pid;

process.on('message',(m)=>{
	console.log(m+' print by child')
});
for (var i = 0; i <= 60; i++) {
	let random = Math.random()*300000
	setTimeout(function () {
	    count +=1;
	        console.error('demand '+pid+'运行第'+count+'次');
			process.send('message from child_demand ')
	        process.send({exchange:{
	        	id:'hbpro',
	        	ohlcv:[1,2,3]
	        }})
	    if(count === 5000){
	        return false;
	    }
	},random)
}