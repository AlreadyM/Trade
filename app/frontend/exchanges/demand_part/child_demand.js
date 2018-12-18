'use strict';
const color = require('colors');
const ccxt = require('ccxt');
const exchanges_Path = require('./../base_config/path.js').exchangesPath;
const golExchanges = require(exchanges_Path + 'base_config/Const_EXCHANGES');

var All_Exchanges = {};
const pid = process.pid;
const delay = 2000;
process.on('message', (exchanges) => {
    console.log(pid)
    console.log(exchanges)
    console.log('get message from master print by child')
        // loadMarkets(exchanges);
});

function _InitALLExChanges(exs, TargetEx) {
    for (var i = 0; i < TargetEx.length; i++) {
        let curTag = TargetEx[i];
        exs[curTag] = eval("new ccxt['" + TargetEx[i] + "']()");
    };
};
async function loadMarkets(currentEx) {
    try {
        currentEx.Markets = await currentEx.loadMarkets();
        process.send(currentEx)
    } catch (e) {
        console.log(e)
        process.send(currentEx)
    };
};

function Register_Demand(exs, offsetTime) {
    setInterval(function() {
        for (let ex in exs) {
            let currentEx = exs[ex];
            loadMarkets(currentEx);
        }
    }, offsetTime)
}
_InitALLExChanges(All_Exchanges, golExchanges);
Register_Demand(All_Exchanges, delay)