'use strict';
const color = require('colors');
const basePath = require('./../base_config/path.js').basePath;
// console.log(exchanges);
let count = 0,
	pid = process.pid;

process.on('message',(exchanges)=>{
	console.log(pid)
	// console.log(exchanges)
	console.log(' print by child')
	loadMarkets(exchanges);
});
let Markets = {}
async function loadMarkets(exs) {
	console.log('111')
	        console.time('loadmarkets');
		for(let ex in exs){
			let currentEx = exs[ex];
	            // currentEx.Markets = await currentEx.loadMarkets();
	            console.log(currentEx)
	        // try{
	        //     // console.log(currentEx.id+' geting Markets Done'.green);
	        //     // console.timeEnd('loadmarkets');
	        //     process.send(currentEx.id);
	        //     console.log(currentEx.id +'loaded'.green)
	        // }catch{
	        //     console.log(currentEx.id + ' geting Markets Failed'.red);
	        // };
		};
	            console.timeEnd('loadmarkets');
};
(function retrunDataFromChild() {
	let loopTimes = 60;
	for (var i = 0; i <= loopTimes; i++) {
		let random = Math.random()*2000 +1000
		setTimeout(function () {
		    count +=1;
		        console.error('demand '+pid+'运行第'+count+'次');
				process.send('message from child_demand ')
		        process.send({exchange:{
		        	id:'hbpro',
		        	ohlcv:[1,2,3]
		        }})
		    if(count === loopTimes * 0.9){
		        process.exit();
		        console.log('process ended')
		    }
		},random)
	}
})