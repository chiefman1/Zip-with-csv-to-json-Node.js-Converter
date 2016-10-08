// Unzipping and Stream
var ss = require('stream-stream');
var UnZip = require('adm-zip');
var stream = ss();
var fs = require ('fs');

module.exports = function(zipExtract){
	var zip = new UnZip(zipExtract);
	var fileNames = zip.getEntries().map((entry) => entry.entryName);
	zip.extractAllTo('./temp/', true);
	fileNames.forEach((f) => {
		stream.write(fs.createReadStream('./temp/' + f))
	});
	stream.end();
	return stream	
}
