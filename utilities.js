function dateDDMMMYYYY(ipDate) {
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var dd = ipDate.getDate() < 10 ? '0' + ipDate.getDate() : ipDate.getDate();
	var mmm = months[ipDate.getMonth()];
	var yyyy = ipDate.getFullYear();
	return ''.concat(dd).concat('-').concat(mmm).concat('-').concat(yyyy);
}

function dateDD_MM_YYYY(ipDate) {
	var dd = ipDate.getDate() < 10 ? '0' + ipDate.getDate() : ipDate.getDate();
	var mm = ipDate.getMonth() + 1 < 10 ? '0' + (ipDate.getMonth() + 1) : ipDate.getMonth() + 1;
	var yyyy = ipDate.getFullYear();
	return ''.concat(dd).concat('/').concat(mm).concat('/').concat(ipDate.getFullYear());
}

function dateDD_MM(ipDate) {
	var dd = ipDate.getDate() < 10 ? '0' + ipDate.getDate() : ipDate.getDate();
	var mm = ipDate.getMonth() + 1 < 10 ? '0' + (ipDate.getMonth() + 1) : ipDate.getMonth() + 1;
	return ''.concat(dd).concat('/').concat(mm);
}

function dateDiffInDays(stDate, endDate) {
	var timeDiff = Math.abs(endDate.getTime() - stDate.getTime());
	var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
	return daysDiff;
}

function convertTableToArray(tblId) {
	var tblData = '';
	var tblArr = new Array();
	var tblLength;
	var currRowCols;
	tblLength = document.getElementById(tblId).rows.length; //get number of rows;
	for (var i = 0; i < tblLength; i++) {
		tblData = '';
		currRowCols = document.getElementById(tblId).rows[i].cells.length; //get number of columns;
		for (var j = 1; j < currRowCols; j++) {
			tblData += document.getElementById(tblId).rows[i].cells[j].innerHTML + ',';
		}
		tblData = tblData.substring(0, tblData.length - 1); //remove last ','
		if (i > 0) {
			// convert the data elements to numbers apart from the header row
			tblArr.push(tblData.split(',').map(Number));
		} else {
			tblArr.push(tblData.split(','));
		}
	}
	return tblArr;
}

function convertDIVTableToArrayNumeric(divId) {
	var tblRowString = '';
	var tblArr = new Array();
	var tblLength;
	var tblCurrRow;
	trItems = document.getElementById(divId).getElementsByTagName('tr');
	for (var i = 0; i < trItems.length; i++) {
		tblRowString = '';
		if (i == 0) {
			// if header row
			tblCurrRow = trItems[i].getElementsByTagName('th');
		} else {
			tblCurrRow = trItems[i].getElementsByTagName('td');
		}
		for (var j = 1; j < tblCurrRow.length; j++) {
			//parse through all the cells starting from 2nd column
			tblRowString += tblCurrRow[j].innerHTML + ',';
		}
		tblRowString = tblRowString.substring(0, tblRowString.length - 1); //remove last ','
		if (i > 0) {
			// convert the data elements to numbers apart from the header row
			tblArr.push(tblRowString.split(',').map(Number));
		} else {
			tblArr.push(tblRowString.split(','));
		}
	}
	return tblArr;
}

function convertArrayColToRows(ipArray) {
	var opArray = [];
	if (ipArray.length == 0) return opArray;
	var cols = ipArray[0].length;
	for (var i = 0; i < ipArray[0].length; i++) {
		var colDataArray = ipArray.map(function (val) {
			return val[i];
		}); //get the column data
		opArray.push(colDataArray);
	}
	return opArray;
}

function convertDIVTableToArray(divId) {
	var tblRowString = '';
	var tblArr = new Array();
	var tblLength;
	var tblCurrRow;
	trItems = document.getElementById(divId).getElementsByTagName('tr');
	for (var i = 0; i < trItems.length; i++) {
		tblRowString = '';
		if (i == 0) {
			// header row
			tblCurrRow = trItems[i].getElementsByTagName('th');
		} else {
			tblCurrRow = trItems[i].getElementsByTagName('td');
		}
		for (var j = 0; j < tblCurrRow.length; j++) {
			//parse through all the cells
			tblRowString += tblCurrRow[j].innerHTML + ',';
		}
		tblRowString = tblRowString.substring(0, tblRowString.length - 1); //remove last ','
		tblArr.push(tblRowString.split(','));
	}
	return tblArr;
}
