'use strict';
	// console.log('-------------')
	// console.log(process.argv[2])
	// console.log('-------------')
async function _InitLoadMarkets(ex) {
	// for(let ex in exs){
		// let currentEx = exs[ex];
        console.time('loadmarkets');
        try{
            ex.Markets = await ex.loadMarkets();
            console.log(ex.id+' geting Markets Done'.green);
            console.timeEnd('loadmarkets');
        }catch{
            console.log(ex.id + ' geting Markets Failed'.red);
            console.timeEnd('loadmarkets');
        };
	// };
};
_InitLoadMarkets(process.argv[2])