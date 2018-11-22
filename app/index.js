'use strict'
const color = require('colors')
const ccxt = require('ccxt');
const crypto = '';
const goalExchanges = require('./Const_EXCHANGES');

(async function () {
    console.log(goalExchanges.length)
    let exchanges = {};

    var loop = {},
    	currentLoop = 0;
    loop = setInterval(function () {
    	if(currentLoop > 1){ clearInterval(loop)}
    	currentLoop +=1;
    },2000)

    function _InitALLExChanges(exs,TargetEx) {
    	for (var i = 0; i < TargetEx.length; i++) {
    	    let currentEx = TargetEx[i];
    	    exs[currentEx] = eval("new ccxt['"+TargetEx[i]+"']()");
	    	// console.time('loadmarkets');
	    	// console.log(exs[currentEx].id)
    	    // console.log(TargetEx[i]);
    	    // console.log(i+' 次执行'.yellow);
	    	// console.timeEnd('loadmarkets');
    	};
    }
    _InitALLExChanges(exchanges,goalExchanges);
    _InitLoadMarkets(exchanges)
    async function _InitLoadMarkets(exs) {
    	console.log(typeof(exs))
    	for(let ex in exs){
    		let xx = await ex.id;
    		console.log(ex)
    		// console.log(xx)
    	}
    }
    // console.log(exchanges)
	function getmarkets(TargetEx) {
    	console.time('init exchanges')
    	for (var i = 0; i < TargetEx.length; i++) {
    	    let currentEx = TargetEx[i];
    	    exchanges[currentEx] = eval("new ccxt['"+TargetEx[i]+"']()");
    	    	console.time('loadmarkets');
    	    	console.log(exchanges[currentEx].id)
    	    // try {
    	    // 	exchanges[currentEx].Markets = await exchanges[currentEx].loadMarkets ();
    	    // 	console.log(exchanges[currentEx].id + ' geting Markets Done'.green);
    	    // 	console.timeEnd('loadmarkets');
    	    // 	// console.log(exchanges.currentEx.Markets);
    	    // }catch{
    	    // 	console.log(exchanges[currentEx].id + ' geting Markets Failed'.red);
    	    // 	console.timeEnd('loadmarkets');
    	    // }
    	    // console.log (exchanges.currentEx.id,await exchanges.currentEx.loadMarkets ());

    	    console.log(TargetEx[i]);
    	    // console.log (exchanges.currentEx.id,await exchanges.currentEx.loadMarkets ());
    	    console.log(i+' 次执行'.yellow);
    	};

    	exchanges.foreach(async function (ex) {
	    	let Markets = await ex.loadMarkets ();

    		console.log( exchanges.ex.Markets);
    	})
    	// console.log(exchanges)
    	// foreach( ex in exchanges){
    	// 	let exchanges[ex].Markets = await exchanges[ex].loadmarkets()
    	// 	console.log(exchanges[ex].Markets)
    	// }
    	console.timeEnd('init exchanges')
    }
// let huobipro = ;
})()
// console.log(ccxt.exchanges)