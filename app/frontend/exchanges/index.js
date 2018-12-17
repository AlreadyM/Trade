'use strict';
const basePath = require('./base_config/path.js').exchangesPath;
const color = require('colors');
const child_process = require('child_process');
const exchanges = require(basePath + 'base_config/Const_EXCHANGES');
// const ccxt = require('ccxt');
const demandProcess = child_process.fork(basePath + 'demand_part/child_demand.js');

demandProcess.send('wake up');
demandProcess.on('message', (child_message) => {
    var exchange = child_message
    let cur_exchange_markets = exchange
    console.log(cur_exchange_markets.id)
    if (cur_exchange_markets.has['fetchTicker']) { // 如果存在fetchTicker
        // console.log('存在fetchTicker+++++++')
        // console.log(cursymbol.symbol)
        // console.log(cursymbol.id)
        // console.log(cursymbol.maker)
        // console.log(cursymbol.taker)
    } else {
        var wrong_msg = exchanges[cur_exchange_markets.id] + 'is wrong'
        console.log(cur_exchange_markets)
        console.log('不存在fetchTicker----------')
    }
    // for (var market in cur_exchange_markets) {
    //     var cursymbol = cur_exchange_markets

    //     console.log(cursymbol)

    //     console.log('market------------------------')
    // }
    console.log('get msg from child print by master')
})
demandProcess.on('close', () => {
    console.log('demandprocess ended');
    process.exit();
})