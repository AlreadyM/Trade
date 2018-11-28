'use strict';
const basePath = require('./base_config/path.js').basePath;
const child_process = require('child_process');
const exchanges = require(basePath+'base_config/Const_EXCHANGES');
const ccxt = require('ccxt');
const demandProcess = child_process.fork(basePath +'demand_part/child_demand.js');
// const orderProcess = child_process.fork(basePath +'order_part/child_order.js');
// const banlanceProcess = child_process.fork(basePath +'banlance_part/child_banlance.js');
// const inspectProcess = child_process.fork(basePath +'exchange_part/child_demand.js');

// console.log(demandProcess);
let count = 0;
// for (var i = 0; i <= 500; i++) {
//     let random = 1000
//     setTimeout(function () {
//     	count += 1;
//         console.error('Master 运行第'+count+'次');
//     },random);
// };
// setInterval(function () {
// 	count += 1;
// 	console.log(demandProcess.pid);
// 	console.log(orderProcess.pid);
// 	console.log(banlanceProcess.pid);
// 	console.error('Master 运行第'+count+'次');
// },1000);
let All_Exchanges = {}
function _InitALLExChanges(exs,TargetEx) {
    for (var i = 0; i < TargetEx.length; i++) {
        let currentEx = TargetEx[i];
        exs[currentEx] = eval("new ccxt['"+TargetEx[i]+"']()");
        // console.log(exs[currentEx].id)
    };
};
_InitALLExChanges(All_Exchanges,exchanges)
demandProcess.send(All_Exchanges);
demandProcess.on('message',(data)=>{
	console.log(data)
	console.log('print by master')
})
demandProcess.on('close',()=>{
	console.log('demandprocess ended');
	// global.exit();
})