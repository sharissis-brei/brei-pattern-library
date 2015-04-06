var fs = require('fs');
var path = require('path');
var nodeDir = require('node-dir');
var collection = [
	{
		'name': 'patterns',
		'searchName': 'patterns',
		'dir': './views/patterns'
	}
];

var buildScss = function() {
	collection.forEach(function(data) {
		nodeDir.files(data.dir, function(err, files) {
			var names = [];
			var finalScssFile = '';
			var finalPath = './public/stylesheets/' + data.name + '.scss';

			console.log('Updating Pattern sass...');

			if (err) {
				throw err;
			}

			files.forEach(function(entry) {
				if (path.extname(entry) === '.hbs') {
		      // Add names to be added to .scss file
		      var regex = new RegExp('^.+' + data.searchName + '/');
		      var name = path.basename(entry, '.hbs');

		      if (!/^_+/.test(name) && data.name !== 'templates') {
		      	name = '_' + name;
		      }

		      entry = entry.replace(regex, '');
		      entry = entry.split('/');
		      entry[entry.length - 1] = name;

					if (data.name === 'templates') {
						if (entry.length === 1 && entry[0] !== 'index') {
							names.push(entry);
							writeMissingFiles(data, entry);
						}
					} else {
						entry = entry.join('/');
						names.push(entry);
						writeMissingFiles(data, entry);
					}
		    }
		  });

		  names.forEach(function(name) {
		  	var importPath = '@import "../../views/patterns/';

	      importPath = importPath + name;
	      finalScssFile = finalScssFile + importPath + '";\n';
		  });

		  fs.writeFile(finalPath, finalScssFile, function(err) {
		  	if (err) { throw err; }

		  	console.log('Done! ' + data.name + ' updated!');
		  	return;
		  });
		});
	});
};

// Check to see if same name .scss file exists. If not, create one
var writeMissingFiles = function(data, entry) {
	var name = entry.split('/')
	var readPath = './views/patterns/' + entry +'.scss';

	name = name[name.length - 1].replace('_', '');
	fs.readFile(readPath, 'utf8', function(err, file) {
		if (err) {
			console.log('\nA .' + name + ' SCSS file doesnt exist.\n"I can fix it!" - Fix-it-Felix jr.')
		}

		if (!file) {
			var writePath = readPath;
			var content = '.' + name + ' {\n\n}';

			if (name.length > 2) {
				fs.writeFile(writePath, content, function(err) {
					if (err) { throw err; }

					console.log('\nI just wrote ' + name + ' for you!\n');
				});
			}

		}
	});
};

module.exports = buildScss;