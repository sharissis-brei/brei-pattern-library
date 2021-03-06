var nodeDir = require('node-dir');
var fs = require('fs');
var childProcess = require('child_process').exec;
var json = {
	partials: [],
	modules: [],
	templates: []
};

var includes = function(array, ele) {
	return (array.indexOf(ele) != -1);
};

var command = 'git add --all && ' +
							'git commit -am \'updated patterns.json\'';


// Read the old patterns.json
fs.readFile('patterns.json', 'utf8', function(err, oldJSON) {

	// Read all the files and add them to the json object
	nodeDir.files('./', function(err, files) {
		if (err) { throw err; }

		files.forEach(function(pattern) {
			if (/modules|partials|templates/.test(pattern) && !/node_modules/.test(pattern) && !/\/\..+/g.test(pattern)) {
				var path = pattern.split('/');
				var type = path[0];
				var name = path[1];

				// Include test-patterns for now
				// if (!includes(json[type], name) && !/test-pattern/g.test(name)) {
				if (!includes(json[type], name)) {
					json[type].push(name);
				}

			}
		});

		json = JSON.stringify(json);

		// If json does not match the old json, than we redo a commit.
		// This helps keep the pre-commit function from an infinite loop
		if (json !== oldJSON) {
			console.log('Wriging new patterns!')

			fs.writeFile('./patterns.json', json, function(err) {
				if (err) { throw err; }
				console.log('Patterns.json is updated!');

				childProcess(command, function(error, stdout, stderr) {
			    if (error !== null) {
			      console.log('Child Process Execute Error - .lib/buildJSON.js - : ' + error);
			    }
				});
			});

		}	else {
			console.log('Patterns.json is already updated. No need for an extra commit!')
		}
	});
});
