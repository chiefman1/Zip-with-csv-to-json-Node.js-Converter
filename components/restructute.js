	// Restructute csv
var dt = require ('datetimejs');
module.exports = function (csvrow) {
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