var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('carry/carry', {
	  	symbol:'eos-usdt'
	  	,symbolname:'eos'
	  	,basecurreny:'usdt'
	  	,HIGH: {
	  		name: 'okex'
	  		,symbol:'eos'
	  		,make:[
		  		{count:1,mount:11}
		  		,{count:1,mount:11}
		  		,{count:1,mount:11}
		  		,{count:1,mount:11}
		  		,{count:1,mount:11}
		  		,{count:1,mount:11}
	  		]
	  		,take:[
	  			{count:100,mount:10}
	  			,{count:100,mount:10}
	  			,{count:100,mount:10}
	  			,{count:100,mount:10}
	  			,{count:100,mount:10}
	  			,{count:100,mount:10}
	  		]}
		,LOW: {
			name: 'huobi'
			,symbol:'eos'
			,make:[
				{count:1,mount:11}
				,{count:1,mount:11}
				,{count:1,mount:11}
				,{count:1,mount:11}
				,{count:1,mount:11}
				,{count:1,mount:11}]
			,take:[
				{count:100,mount:10}
				,{count:100,mount:10}
				,{count:100,mount:10}
				,{count:100,mount:10}
				,{count:100,mount:10}
				,{count:100,mount:10}
			]
		}
	});
});

module.exports = router;
