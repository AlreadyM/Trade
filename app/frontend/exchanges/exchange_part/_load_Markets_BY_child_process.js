'use strict';
	// console.log('-------------')
	// console.log(process.argv[2])
	// console.log('-------------')
    let pid = process.pid;
    let count = 0;
function _InitLoadMarkets(ex) {
        // let currentEx = exs[ex];
        // console.time('loadmarkets');
        // try{
        //     ex.Markets = await ex.loadMarkets();
        //     console.log(ex.id+' geting Markets Done'.green);
        //     console.timeEnd('loadmarkets');
        // }catch{
        //     ex.Markets = {};
        //     console.log(ex.id + ' geting Markets Failed'.red);
        //     console.timeEnd('loadmarkets');
        // };
        
        for (var i = 0; i <= 60000; i++) {
            let random = Math.random()*10000
            setTimeout(function () {
                count +=1;
                    console.error('worker'+pid+'运行第'+count+'次');
                if(count === 50000){
                    return false;
                }
            },random)
        }
        console.log('worker'+pid+':hello World!')
        // console.time('loadmarkets');

        // return ex.Markets;
	// };
};
_InitLoadMarkets(process.argv[2])