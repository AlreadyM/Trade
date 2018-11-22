'use strict'
const ccxt = require('ccxt');
const crypto = '';
const TargetEx = require('./Const_EXCHANGES');
const ex = require('./exchange');

(async function () {
    console.log(TargetEx.length)
    let exchanges = {};
    for (var i = 0; i < TargetEx.length; i++) {
        let currentEx = TargetEx[i];
        exchanges.currentEx = eval("new ccxt['"+TargetEx[i]+"']()");
        // console.log(TargetEx[i])
        console.log (exchanges.currentEx.id,await exchanges.currentEx.loadMarkets ());
    }
// let huobipro = ;
})()
// console.log(ccxt.exchanges)