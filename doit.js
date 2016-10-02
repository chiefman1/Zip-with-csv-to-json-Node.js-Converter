var dt = require ('datetimejs')

var reducer = function (csvrow) {
	if (csvrow.first_name !== 'first_name') {

	 	return {
			name: csvrow.last_name + ' ' + csvrow.first_name,
			phone: csvrow.phone.replace (/\D/g, ''),
			person: {
				firstName: csvrow.first_name,
				lastName: csvrow.last_name
			},
			amount: parseFloat(csvrow.amount, 10).toFixed(2),
			date: dt.reformat(csvrow.date, '%D/%n/%Y', '%Y-%m-%d'),
			costCenterNum: csvrow.cc.replace(/\D/g, '')
		}
	}
}

var ss = require('stream-stream');
var AdmZip = require('adm-zip');
var stream = ss();
var fs = require ('fs');

var createStream = function(zipExtract){
	var zip = new AdmZip(zipExtract);
	var fileNames = zip.getEntries().map((entry) => entry.entryName);
	zip.extractAllTo ('./temp/', true);
	fileNames.forEach((f) => {
		stream.write(fs.createReadStream('./temp/' + f))
	});
	stream.end();
	return stream	
}

var fs = require('fs');
var pathtemp = './temp/';
var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
	  //fs.rmdirSync(path); delete empty temp folder. Not working in Windows
  }
};

var transform = require('stream-transform');
var fs = require('fs');
var parse = require('csv-parse');
var transformer = transform(reducer);
var JSONStreamer = require ('JSONStream').stringify();

var parser = parse({columns: true, delimiter: '||'});
var output = fs.createWriteStream('./result.json');
var stream = createStream(process.argv[2]);

stream
.pipe(parser)
.pipe(transformer)
.pipe(JSONStreamer)

.on('end', ()=> {
	console.log ('DONE! Zip was unzipped and csv files converted to result.json file')
})
.pipe(output)
deleteFolderRecursive(pathtemp);
