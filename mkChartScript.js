//     var sampleBurndownData = [
//       ["Sp1",  627,    "627",          true,    null,   null,   27,     "27",   27,     "27",   null,   null,           null,   null,           null,   null],
//       ["Sp2",  660,    "660",          true,    null,   null,   33,     "33",   60,     "60",   null,   null,           null,   null,           null,   null],
//       ["Sp3",  779,    "779",          true,    null,   null,   54,     "54",   114,    "114",  null,   null,           null,   null,           null,   null],
//       ["Sp4",  766,    "766",          true,    null,   null,   52,     "52",   166,    "166",  null,   null,           null,   null,           null,   null],
//       ["Sp5",  884,    "884",          true,    null,   null,   59,     "59",   225,    "225",  null,   null,           null,   null,           null,   null],
//       ["Sp6",  953,    "953",          true,    null,   null,   69,     "69",   294,    "294",  null,   null,           null,   null,           null,   null],
//       ["Sp7",  953,    null,           false,   null,   null,   null,   null,   null,   null,   331,    null,           343,    null,           354,    null],
//       ["Sp8",  953,    null,           false,   null,   null,   null,   null,   null,   null,   368,    null,           392,    null,           414,    null],
//       ["Sp9",  953,    null,           false,   null,   null,   null,   null,   null,   null,   405,    null,           441,    null,           474,    null],
//       ["Sp10", 953,    null,           false,   null,   null,   null,   null,   null,   null,   442,    null,           490,    null,           534,    null],
//       ["Sp11", 953,    null,           false,   null,   null,   null,   null,   null,   null,   479,    null,           539,    null,           594,    null],
//       ["Sp12", 953,    null,           false,   null,   null,   null,   null,   null,   null,   516,    null,           588,    null,           654,    null],
//       ["Sp13", 953,    null,           false,   null,   null,   null,   null,   null,   null,   553,    null,           637,    null,           714,    null],
//       ["Sp14", 953,    null,           false,   null,   null,   null,   null,   null,   null,   590,    null,           686,    null,           774,    null],
//       ["Sp15", 953,    "30-Aug-2018",  false,   0,      953,    null,   null,   null,   null,   627,    null,           735,    null,           834,    null],
//       ["Sp16", 953,    null,           false,   null,   null,   null,   null,   null,   null,   664,    null,           784,    null,           894,    null],
//       ["Sp17", 953,    null,           false,   null,   null,   null,   null,   null,   null,   701,    null,           833,    null,           953,    "10-Oct-2018"],
//       ["Sp18", 953,    null,           false,   null,   null,   null,   null,   null,   null,   738,    null,           882,    null,           null,   null],
//       ["Sp19", 953,    null,           false,   null,   null,   null,   null,   null,   null,   775,    null,           931,    null,           null,   null],
//       ["Sp20", 953,    null,           false,   null,   null,   null,   null,   null,   null,   812,    null,           953,    "21-Nov-2018",  null,   null],
//       ["Sp21", 953,    null,           false,   null,   null,   null,   null,   null,   null,   849,    null,           null,   null,           null,   null],
//       ["Sp22", 953,    null,           false,   null,   null,   null,   null,   null,   null,   886,    null,           null,   null,           null,   null],
//       ["Sp23", 953,    null,           false,   null,   null,   null,   null,   null,   null,   923,    null,           null,   null,           null,   null],
//       ["Sp24", 953,    null,           false,   null,   null,   null,   null,   null,   null,   953,    "16-Jan-2019",  null,   null,           null,   null]
// ];
//********************** INPUT DATA ***********************************************//

var inputData = [
	//'Sprint Number', 'Pending Story Points', 'Sprint Velocity'
	['Sp1', 227, 0],
	['Sp2', 247, 36],
	['Sp3', 227, 37],
	['Sp4', 216, 71],
	['Sp5', 159, 105],
	['Sp6', 153, 65],
	['Sp7', 63, 91],
	['Sp8', 153, 92],
	['Sp9', 95, 84],
	['Sp10', 63, 87],
	['Sp11', 63, 94],
	['Sp12', 695, 76]
];
var spStartDate = new Date('2018-11-22'); // Year Month Day
var deadlineDate = new Date('2019-08-07'); // Deadline
//***************************** UTILITY FUNCTIONS ***********************************//
Date.prototype.AddDays = function (noOfDays) {
	this.setTime(this.getTime() + noOfDays * (1000 * 60 * 60 * 24));
	return this;
};

//**************************** GLOBAL VARIABLES ************************************//
var lowAvgVelocity;
var midAvgVelocity;
var highAvgVelocity;
var totalBacklog;
var doneBacklog;
var chartOptions = {
	title: 'BurnUp chart',
	vAxis: {
		title: 'Story Points'
	},
	hAxis: {
		title: 'Sprint End Dates',
		slantedText: true,
		slantedTextAngle: 90
	},
	chartArea: {
		width: '85%',
		height: '65%'
	},
	// animation: {startup: true, duration: 100},
	colors: ['black', 'blue', 'purple', 'red', 'orange', 'green'],
	fontSize: 12,
	legend: {
		position: 'bottom',
		alignment: 'center'
	},
	intervals: {
		style: 'boxes',
		color: '#D3362D',
		lineWidth: 0.5
	},
	series: {
		0: {
			//Total Backlog
			type: 'line',
			pointSize: 5
		},
		1: {
			//Sprint velocity
			type: 'bars',
			annotations: {
				textStyle: {
					fontSize: 10,
					color: 'blue'
				}
			}
		},
		2: {
			//Cumulative Velocity Done
			type: 'line',
			pointSize: 4
		},
		3: {
			//LowForecast
			type: 'line',
			pointSize: 3,
			lineDashStyle: [10, 2],
			annotations: {
				textStyle: {
					fontSize: 15,
					bold: true,
					color: 'red'
				},
				stem: {
					color: 'red',
					length: 20
				},
				boxStyle: {
					stroke: '#888',
					strokeWidth: 3
				}
			}
		},
		4: {
			//MidForecast
			type: 'line',
			pointSize: 3,
			lineDashStyle: [10, 2],
			annotations: {
				textStyle: {
					fontSize: 15,
					bold: true,
					color: 'orange'
				},
				stem: {
					color: 'orange',
					length: 30
				},
				boxStyle: {
					stroke: 'orange',
					strokeWidth: 1,
					rx: 5,
					ry: 5
				}
			}
		},
		5: {
			//HighForecast
			type: 'line',
			pointSize: 3,
			lineDashStyle: [10, 2],
			annotations: {
				textStyle: {
					fontSize: 15,
					bold: true,
					color: 'green'
				},
				stem: {
					color: 'green',
					length: 15
				},
				boxStyle: {
					stroke: 'green',
					strokeWidth: 1,
					rx: 5,
					ry: 5
				}
			}
		}
	}
};
//********************** GENERAL RETURN FUNCTIONS **********************************//
function deadlineSprint(spStDate, endDate) {
	return Math.ceil(dateDiffInDays(spStDate, endDate) / 14) - 1;
}

function getCumulativeVelocityArray(dataArray) {
	//Get 3rd Column of the dataArray.
	var spVelocity = dataArray.map(function (value) {
		return value[2];
	});
	var cumulativeVelocity = 0;
	for (var i = 0; i < spVelocity.length; i++) {
		cumulativeVelocity += spVelocity[i];
		spVelocity[i] = cumulativeVelocity;
	}
	return spVelocity;
}

function getHighAvgVelocity(dataArray, previousSprints) {
	//Get the 3rd column of the dataArray passed
	var spVelocity = dataArray.map(function (value) {
		return value[2];
	});
	var sumVelocity = 0;
	if (previousSprints > spVelocity.length) {
		previousSprints = spVelocity.length;
	}
	for (var i = previousSprints; i > 0; i--) {
		sumVelocity += spVelocity.pop();
	}
	return Math.ceil(sumVelocity / previousSprints);
}

function getAvgVelocity(dataArray) {
	//Get the 3rd column of the dataArray passed
	var spVelocity = dataArray.map(function (value) {
		return value[2];
	});
	var sumVelocity = 0;
	for (var i = 0; i < spVelocity.length; i++) {
		sumVelocity += spVelocity[i];
	}
	return Math.ceil(sumVelocity / spVelocity.length);
}

function generateTotalBacklogArray(dataArray) {
	//Get the 2nd Column of dataArray.
	var pendingPoints = dataArray.map(function (value) {
		return value[1];
	});
	//Get the 3rd Column of dataArray.
	var spVelocity = dataArray.map(function (value) {
		return value[2];
	});
	var tempCumulativeVelocity = 0;
	for (var i = 0; i < dataArray.length; i++) {
		tempCumulativeVelocity += spVelocity[i];
		pendingPoints[i] += tempCumulativeVelocity;
	}
	return pendingPoints;
}

function generateAvgVelocityArray(totalStoryPoints, avgVelocity, completedStoryPoints) {
	var avgVelocityArray = [];
	//Fill the array with Null for the completed sprint rows.
	for (var i = 0; i < inputData.length; i++) {
		avgVelocityArray.push(i == inputData.length - 1 ? completedStoryPoints : null);
	}
	//Add the array with the forcast value rows.
	while (completedStoryPoints < totalStoryPoints) {
		completedStoryPoints += avgVelocity;
		if (completedStoryPoints > totalStoryPoints) {
			completedStoryPoints = totalStoryPoints;
		}
		avgVelocityArray.push(completedStoryPoints);
	}
	return avgVelocityArray;
}

function generateSprintNameArray(startSprintNum, numberOfSprints) {
	var sprintNames = [];
	var currSpEndDate = new Date(spStartDate);
	currSpEndDate.AddDays(13);
	for (var i = 0; i < numberOfSprints; i++) {
		var spNameAxisLbl = startSprintNum < 10 ? 'S0' + startSprintNum : 'S' + startSprintNum;
		startSprintNum += 1;
		spNameAxisLbl += '-' + dateDD_MM(currSpEndDate);
		sprintNames.push(spNameAxisLbl);
		currSpEndDate.AddDays(14);
	}
	return sprintNames;
}

function generateSprintEndDatesArray(numberOfSprints) {
	var spEndDates = [];
	var currentSpEndDate = new Date(spStartDate);
	currentSpEndDate.AddDays(13);
	for (var i = 0; i < numberOfSprints; i++) {
		spEndDates.push('' + dateDDMMMYYYY(currentSpEndDate));
		currentSpEndDate.AddDays(14);
	}
	return spEndDates;
}

function increaseArrayWithValue(ipArray, requiredArrayLength, defaultValue) {
	while (ipArray.length < requiredArrayLength) {
		ipArray.push(defaultValue);
	}
	return ipArray;
}

function createBacklogDetailHTML(tpoints, dPoints, pPoints) {
	var tHeaders = ['Total Backlog ', 'Delivered Points ', 'Pending Points '];
	var tblHtml = "<table class='table'>";
	for (var i = 0; i < arguments.length; i++) {
		tblHtml += "<tr><th align='left'>" + tHeaders[i] + '</th><td>' + arguments[i] + '</td></tr>';
	}
	tblHtml += '<table>';
	return tblHtml;
}
//Function return HTML table with the 3-point estimations passed as input.
function createAvgVelocityHTML(lAvgVelocity, mAvgVelocity, hAvgVelocity) {
	var tHeaders = ['Worst Case', 'Most likely', 'Best Case'];
	var tblHtml = "<table class='aui'><thead><tr>";
	for (var i = 0; i < tHeaders.length; i++) {
		tblHtml += '<th>' + tHeaders[i] + '</th>';
	}
	tblHtml += '</tr></thead>';
	tblHtml += '<tbody><tr>';
	for (i = 0; i < arguments.length; i++) {
		tblHtml += '<td>' + arguments[i] + '</td>';
	}
	tblHtml += '</tr></tbody></table>';
	return tblHtml;
}
//********************** MAIN FUNCTIONS **************************************//
google.charts.load('current', {
	packages: ['corechart']
});
google.charts.setOnLoadCallback(drawVisualization);

function drawVisualization() {
	// inputData = convertArrayColToRows(convertTableToArray('inputSprintTbl'));
	$.ajax({
		url: 'https://reqres.in/api/users?page=1',
		type: 'GET',
		dataType: 'json',
		success: function (data) {
			alert('Total pages: ' + JSON.stringify(data.total));
		},
		error: function (request, error) {
			alert('error: ' + new Date().toDateString + JSON.stringify(error));
		}
	});
	// // inputData = convertArrayColToRows(convertDIVTableToArrayNumeric('SprintDetails'));
	// ipDateArray = convertDIVTableToArray('DateInput'); //Start Dates & Compliance Date
	// spStartDate = new Date(ipDateArray[1][0]); // Year Month Day
	// if (isNaN(spStartDate)) {
	// 	alert('Invalid Sprint start date!');
	// 	return;
	// }
	// deadlineDate = new Date(ipDateArray[1][1]); // Deadline
	var cDataArray = generateChartDataTable();
	drawChart(cDataArray, chartOptions);
}

function generateChartDataTable(hVelocity, mVelocity, lVelocity) {
	//Create Table columns
	var chartDataTable = new google.visualization.DataTable();
	chartDataTable.addColumn('string', 'SprintName');
	chartDataTable.addColumn('number', 'TotalBacklog');
	chartDataTable.addColumn({
		type: 'string',
		role: 'annotation'
	});
	chartDataTable.addColumn({
		type: 'boolean',
		role: 'certainty'
	});
	chartDataTable.addColumn({
		id: 'i1',
		type: 'number',
		role: 'interval'
	});
	chartDataTable.addColumn({
		id: 'i2',
		type: 'number',
		role: 'interval'
	});
	chartDataTable.addColumn('number', 'SprintVelocity');
	chartDataTable.addColumn({
		type: 'string',
		role: 'annotation'
	});
	chartDataTable.addColumn('number', 'CumulativeVelocity');
	chartDataTable.addColumn({
		type: 'string',
		role: 'annotation'
	});
	chartDataTable.addColumn('number', 'LowForecast');
	chartDataTable.addColumn({
		type: 'string',
		role: 'annotation'
	});
	chartDataTable.addColumn('number', 'MidForecast');
	chartDataTable.addColumn({
		type: 'string',
		role: 'annotation'
	});
	chartDataTable.addColumn('number', 'HighForecast');
	chartDataTable.addColumn({
		type: 'string',
		role: 'annotation'
	});
	var chartDataArray = [];
	switch (arguments.length) {
		case 0:
			hVelocity = getHighAvgVelocity(inputData, 3); //Find highAvgVelocity as avg of last 3 sprints
		case 1:
			mVelocity = getAvgVelocity(inputData); //Find midAvgVelocity value
		case 2:
			lVelocity = Math.ceil(mVelocity - mVelocity * 0.25); //Find the lowAvgVelocity as 25% less than mid avg
	}
	highAvgVelocity = hVelocity;
	midAvgVelocity = mVelocity;
	lowAvgVelocity = lVelocity;
	var sprintVelocityArray = [];
	sprintVelocityArray = inputData.map(function (value) {
		return value[2];
	}); //Get 3rd coloumn form the input
	var cumulativeVelocityArray = [];
	cumulativeVelocityArray = getCumulativeVelocityArray(inputData);
	var totalBacklogArray = [];
	totalBacklogArray = generateTotalBacklogArray(inputData);
	doneBacklog = cumulativeVelocityArray[cumulativeVelocityArray.length - 1]; //Calcuate the Donebacklog
	totalBacklog = doneBacklog + inputData[inputData.length - 1][1]; //Calucate the TotaBacklog

	var highAvgVelocityArray = [];
	highAvgVelocityArray = generateAvgVelocityArray(totalBacklog, highAvgVelocity, doneBacklog);

	var midAvgVelocityArray = [];
	midAvgVelocityArray = generateAvgVelocityArray(totalBacklog, midAvgVelocity, doneBacklog);

	var lowAvgVelocityArray = [];
	lowAvgVelocityArray = generateAvgVelocityArray(totalBacklog, lowAvgVelocity, doneBacklog);

	var sprintNamesArray = [];
	var spStart = +inputData[0][0].replace(/\D/g, ''); // Get the start sprint number
	spStart = spStart == 0 ? 1 : spStart;
	sprintNamesArray = generateSprintNameArray(spStart, lowAvgVelocityArray.length);

	var sprintEndDatesArray = [];
	sprintEndDatesArray = generateSprintEndDatesArray(lowAvgVelocityArray.length);

	//Increase the length of all Arrays to match lowAvgVelocityArray
	totalBacklogArray = increaseArrayWithValue(
		totalBacklogArray,
		lowAvgVelocityArray.length,
		totalBacklogArray[totalBacklogArray.length - 1]
	);

	sprintVelocityArray = increaseArrayWithValue(sprintVelocityArray, lowAvgVelocityArray.length, null);
	cumulativeVelocityArray = increaseArrayWithValue(cumulativeVelocityArray, lowAvgVelocityArray.length, null);
	highAvgVelocityArray = increaseArrayWithValue(highAvgVelocityArray, lowAvgVelocityArray.length, null);
	midAvgVelocityArray = increaseArrayWithValue(midAvgVelocityArray, lowAvgVelocityArray.length, null);
	// Create final chart data array
	for (var i = 0; i < lowAvgVelocityArray.length; i++) {
		var rowArray = [];
		rowArray[0] = sprintNamesArray[i]; //Sprint Name
		rowArray[1] = totalBacklogArray[i]; //Total backlog
		if (i < inputData.length) {
			//annotation: Total backlog
			rowArray[2] = '' + totalBacklogArray[i];
			rowArray[3] = true; //certainty: Total Backlog
			rowArray[4] = null; //Interval: i1-Dealine
			rowArray[5] = null; //Intervla: i2-Dealine
		} else {
			rowArray[2] = i == deadlineSprint(spStartDate, deadlineDate) ? dateDDMMMYYYY(deadlineDate) : null;
			rowArray[3] = false;
			rowArray[4] = rowArray[2] == null ? null : 0;
			rowArray[5] = rowArray[2] == null ? null : totalBacklog;
		}
		rowArray[6] = sprintVelocityArray[i]; // SprintVelocity
		rowArray[7] = '' + sprintVelocityArray[i]; // annotation: sprintvelocity
		rowArray[8] = cumulativeVelocityArray[i]; // CumulativeVelocity
		rowArray[9] = '' + cumulativeVelocityArray[i]; // annotation: cumulativeVelocity
		rowArray[10] = lowAvgVelocityArray[i]; // LowAvgVelocity
		if (lowAvgVelocityArray[i] == totalBacklog) {
			// annotation: lowAvgVelocity
			rowArray[11] = sprintEndDatesArray[i];
		} else {
			rowArray[11] = null;
		}
		rowArray[12] = midAvgVelocityArray[i]; // midAvgVelocity
		if (midAvgVelocityArray[i] == totalBacklog) {
			// annotation: midAvgVelocity
			rowArray[13] = sprintEndDatesArray[i];
		} else {
			rowArray[13] = null;
		}
		rowArray[14] = highAvgVelocityArray[i]; // highAvgVelcity
		if (highAvgVelocityArray[i] == totalBacklog) {
			// annotation: highAvgVelocity
			rowArray[15] = sprintEndDatesArray[i];
		} else {
			rowArray[15] = null;
		}
		chartDataArray.push(rowArray);
	}
	chartDataTable.addRows(chartDataArray);
	// chartDataTable.addRows(sampleBurndownData);
	return chartDataTable;
}

function drawChart(cData, cOptions) {
	var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
	chart.draw(cData, cOptions);
	//Print the Backlog details table
	var tableHTML = createBacklogDetailHTML(totalBacklog, doneBacklog, totalBacklog - doneBacklog);
	$('#backlogDetailsTable').empty();
	$('#backlogDetailsTable').append(tableHTML);
	// tableHTML = createAvgVelocityHTML(lowAvgVelocity, midAvgVelocity, highAvgVelocity);
	// $("#avgVelocityTable").append(tableHTML);
	document.getElementById('txtBox_lowForecast').value = lowAvgVelocity;
	document.getElementById('txtBox_midForecast').value = midAvgVelocity;
	document.getElementById('txtBox_highForecast').value = highAvgVelocity;
	//Update the required velocity table if compliance date is given
	var requiredSprints = deadlineSprint(spStartDate, deadlineDate) - inputData.length + 1;
	if (requiredSprints) {
		document.getElementById('txtBox_complianceDate').innerHTML = dateDDMMMYYYY(deadlineDate);
		document.getElementById('txtBox_spToComplete').innerHTML = requiredSprints;
		document.getElementById('txtBox_requiredVelocity').innerHTML = Math.ceil(
			(totalBacklog - doneBacklog) / requiredSprints
		);
	}
}
//********************* USER INTERACTION FUNCTIONS **************************//
function updateForecast() {
	var lAvgVelocity = +document.getElementById('txtBox_lowForecast').value;
	var mAvgVelocity = +document.getElementById('txtBox_midForecast').value;
	var hAvgVelocity = +document.getElementById('txtBox_highForecast').value;
	var cDataArray = generateChartDataTable(hAvgVelocity, mAvgVelocity, lAvgVelocity);
	drawChart(cDataArray, chartOptions);
}

function sprintAvgDropdownChanged() {
	var xSprints = +document.getElementById('lastXSpAvgDropDown').value;
	var highVelocity;
	if (xSprints == 0) {
		// Max sprint velocity option selected
		var spVelocity = inputData.map(function (value) {
			return value[2];
		});
		spVelocity = spVelocity.sort(function (a, b) {
			return b - a;
		});
		highVelocity = spVelocity[0];
	} else {
		highVelocity = getHighAvgVelocity(inputData, xSprints);
	}
	document.getElementById('txtBox_highForecast').value = highVelocity;
	updateForecast();
}
