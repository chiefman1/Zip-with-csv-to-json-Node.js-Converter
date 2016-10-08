
//Unzipping and creating Stream
	var createStream = require('./components/unzip-stream.js');
	console.log ('Unzipping and creating Stream...DONE');
	
//Parsing CSV
	
	var parse = require('csv-parse');
	var parser = parse({columns: true, delimiter: '||'});
	var stream = createStream(process.argv[2]);
	console.log ('Parsing CSV...DONE');

//Restructuring Stream
	var restructure = require('./components/restructute.js');
	var transform = require('stream-transform');
	var transformer = transform(restructure);
	console.log ('Restructuring Stream...DONE');
	
//Stream to JSON
	var JSONStreamer = require ('JSONStream').stringify();
	console.log ('Streaming to JSON...DONE');
	
//Saving to file
	var fs = require('fs');
	var result = fs.createWriteStream('./result.json');
	
//Stream	
stream.pipe(parser)
	.pipe(transformer)
	.pipe(JSONStreamer)
	.pipe(result)

//Done Message
.on('end', ()=> {
		console.log ('DONE! Zip was unzipped and csv files converted to result.json file');
	});
	
//Deleting temp files
var deleteTemp = require('./components/deletetemp.js');
var pathtemp = './temp/';
console.log ('Deleting temp files...DONE');
deleteTemp(pathtemp);


