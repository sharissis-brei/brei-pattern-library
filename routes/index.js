var express = require('express');
var router = express.Router();
var patterns = require('../patterns.json');
var fs = require('fs');
var path = require('path');


router.get('*', function(req, res, next) {
	patterns = fs.readFileSync(path.join(__dirname, '../patterns.json'));
	patterns =  JSON.parse(patterns);
	req.patterns = patterns;
	return next();
});

// Home Page
router.get('/', function(req, res, next) {
	res.render('index', req.patterns);
});

// Pattern Collection Page
router.get('/:pattern', function(req, res, next) {
	var thisPattern = req.params.pattern;
	var patterns = req.patterns;

	patterns.pattern = thisPattern;
	res.render('pattern', patterns);
});

router.get('/:pattern/:name', function(req, res, next) {
	var thisPattern = req.params.pattern;
	var name = req.params.name;
	var patterns = req.patterns;
	var path = 'patterns/' + thisPattern + '/' + name;

	if (thisPattern === 'modules') {
		path += '/_' + name;
	} else {
		path += '/' + name;
	}


	patterns.pattern = thisPattern;
	res.render(path, patterns);
});


module.exports = router;
