'use strict';
const color 	= require('colors');
const ccxt 		= require('ccxt');
const crypto 	= '';
const goalExchanges = require('./Const_EXCHANGES');

(() =>{
    console.log(goalExchanges.length);
    let exchanges = {}
;
    var loop = {},
    	currentLoop = 0;
    loop = setInterval(function () {
    	if(currentLoop > 50000){ clearInterval(loop)};
    	currentLoop +=1;
        _InitLoadMarkets(exchanges);
    },1000);

    function _InitALLExChanges(exs,TargetEx) {
        for (var i = 0; i < TargetEx.length; i++) {
            let currentEx = TargetEx[i];
            exs[currentEx] = eval("new ccxt['"+TargetEx[i]+"']()");
        };
    };
    _InitALLExChanges(exchanges,goalExchanges);
    async function _InitLoadMarkets(exs) {
    	for(let ex in exs){
    		let currentEx = exs[ex];
            console.time('loadmarkets');
            try{
                currentEx.Markets = await currentEx.loadMarkets();
                console.log(currentEx.id+' geting Markets Done'.green);
                console.timeEnd('loadmarkets');
            }catch{
                console.log(currentEx.id + ' geting Markets Failed'.red);
                console.timeEnd('loadmarkets');
            };
    	};
    };

})();


// exchanges =>
// demand => log =>
// order => log =>
// banlande =>