var nodeDir = require('node-dir');
var fs = require('fs');
var json = {
	partials: [],
	modules: [],
	templates: []
};

var includes = function(array, ele) {
	return (array.indexOf(ele) != -1);
}

nodeDir.files('./', function(err, files) {
	if (err) { throw err; }

	files.forEach(function(pattern) {
		if (/modules|partials|templates/.test(pattern) && !/node_modules/.test(pattern) && !/\/\..+/g.test(pattern)) {
			var path = pattern.split('/');
			var type = path[0];
			var name = path[1];

			if (!includes(json[type], name) && !/test-pattern/g.test(name)) {
				json[type].push(name);
			}

		}
	});

	json = JSON.stringify(json);

	fs.writeFile('./patterns.json', json, function(err) {
		if (err) { throw err; }
		console.log('Patterns.json is updated!');
	})
});

