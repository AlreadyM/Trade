'use strict';
const color = require('colors');
const ccxt = require('ccxt');
const exchanges_Path = require('./../base_config/path.js').exchangesPath;
const golExchanges = require(exchanges_Path+'base_config/Const_EXCHANGES');
// console.log(exchanges);
let count = 0,
	pid = process.pid;

process.on('message',(exchanges)=>{
	console.log(pid)
	// console.log(exchanges)
	console.log('get message from master print by child')
	// loadMarkets(exchanges);
});

let All_Exchanges = {};
function _InitALLExChanges(exs,TargetEx) {
    for (var i = 0; i < TargetEx.length; i++) {
        let curTag = TargetEx[i];
        exs[curTag] = eval("new ccxt['"+TargetEx[i]+"']()");
        console.log(exs[curTag].id)
    };
    return exs;
};
_InitALLExChanges(All_Exchanges,golExchanges);
// console.log(All_Exchanges)
	// loadMarkets(All_Exchanges);
let Markets = {};
async function loadMarkets(exs) {
		// console.log(exs.length); 
		// console.log('111');

		for(let ex in exs){
			let currentEx = exs[ex];
	        // console.time(currentEx.id);
	        // console.log('--------');
	        // console.time('loadmarkets');
	        // console.log(currentEx.loadMarkets)
	        try{
	            currentEx.Markets = await currentEx.loadMarkets();
	            console.log(currentEx.id+' geting Markets Done'.green);
	            console.timeEnd('loadmarkets');
	            process.send(currentEx)
	        }catch(e){
	        	console.log(e.message)
	            console.log(currentEx.id + ' geting Markets Failed'.red);
	            console.timeEnd('loadmarkets');
	        };
		};
};
function loopCircle() {
	setInterval(function () {
		loadMarkets(All_Exchanges);
	},500)
};
loopCircle();
function retrunDataFromChild() {
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
}