'use strict';
const child_process = require('child_process');
// var tagg= require('threads_a_gogo');
const basePath  = require('./../base_config/path.js').basePath;
const color 	= require('colors');
const ccxt 		= require('ccxt');
const crypto 	= '';
const goalExchanges = require(basePath+'base_config/Const_EXCHANGES');
const cpuNum    = require('os').cpus().length;
// const cpuNum    = goalExchanges.length;

// init demand process

(() =>{
    console.log(goalExchanges.length);
    let exchanges = {}
        ,load_Markets_process  = {}
;
    var loop = {},
    	currentLoop = 0;
    loop = setInterval(function () {
        console.log(currentLoop)
        if(currentLoop >= 2){ clearInterval(loop);return false;};
        currentLoop +=1;
        // _InitLoadMarkets(exchanges);
    },10);

    function _InitALLExChanges(exs,TargetEx) {
        for (var i = 0; i < TargetEx.length; i++) {
            let currentEx = TargetEx[i];
            exs[currentEx] = eval("new ccxt['"+TargetEx[i]+"']()");
        };
        console.log('壹')
    };
    _InitALLExChanges(exchanges,goalExchanges);
        // console.log(exchanges)
        console.log('贰')
    function init_child_process_byfork(cpuNum,js) {
        for (let i = 0; i < cpuNum; i++) {
            child_process.fork(basePath +'exchange_part/_load_Markets_BY_child_process.js');
        }
        console.log('Master Hello World!')
        for (var i = 0; i < 999999; i++) {
            let random = Math.random()*20000;
            setTimeout(function () {
                console.log('Master Hello World!')
            },random)
        }
    }
    init_child_process_byfork(cpuNum)
        // init_child_process(exchanges);
        console.log('叄')
    function init_child_process(exs) {
        // console.log(exs);
        for(let ex in exs){
            let currentEx = exs[ex];

            console.log(currentEx.id)
        // for (var i = 0; i < exs.length; i++) {
            // let currentEx = exs[ex];
            // console.log(currentEx)
            load_Markets_process[(currentEx.id)] = child_process.spawn('node', [basePath +'exchange_part/_load_Markets_BY_child_process.js', currentEx])
            load_Markets_process[(currentEx.id)].stdout.on('data', function (data) {
                  console.log('stdout: ' + data);
               });
             
               load_Markets_process[(currentEx.id)].stderr.on('data', function (data) {
                  console.log('stderr: ' + data);
               });
             
               load_Markets_process[(currentEx.id)].on('exit', function (code) {
                  console.log( process.getuid()+'子进程已退出，退出码 '+code);
               });
        }
        
    }


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