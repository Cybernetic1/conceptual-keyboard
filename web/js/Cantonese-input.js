// **************************************************
// *** Cantonese pinyin input similar to Google's ***
// **************************************************

// Flow-chart for preparing canto-pinyins.txt:
// 1. yale-sort-by-freq.txt
// 2. ???....

// To do
// =====
// * handle approx pinyins
//   或者最简单的方法是： add another map for similar approx pinyins
//   in other words, look up YKY's pinyin and match to standard pinyin
// * cannot continuously input characters
// * allow choosing of chars by mouse
// * perhaps send to Conkey main window

// To do -- using Google Cantonese pinyin
// ======================================
// * Google has peculiar behavior in that it displays chars not exactly matching given pinyins
// * For each pinyin-given-so-far, there would be a list of words
// * We should imitate this behavior
// * Seems that Google has an algorithm that returns approx pinyins based on frequencies
// * Also, we already have the exact pinyins according to Google
// * So the procedure is:
// 		* extract all exact pinyins
//		* define approx function
//		* list chars according to freq AND match degree

// To do -- phrases
// ================
// * build repository of phrases
//   - how / where to store?
// * each phrase is addressed by 1 or more key?  It may be too slow to search from zero
// * but it may be the job of an RNN -- output a few keys
// * OR, cluster phrases, map chars --> semantic clusters
// * OR, build semantically-organized tree structure
// *

// Done:
// =====
// * intercept keys
// * load pinyinMap
// * accept key, display keys so far
// * put list of chars in column
// * allow choosing of chars by number
// * prepare Google exact pinyin list
// * sort according to frequency ranking number
// * 

// ************************** Read pinyins into buffer ************************
var pin = new Object(); // or just {}
var approx = new Object();

/**** Read Yale pinyins file ****
	console.log("Loading canto-pinyins.txt\n" +
	$.ajax({
	method: "GET",
	url: "/loadDatabase/canto-pinyins",		// Note: use filename without extension
	cache: false,
	success: function(data) {
		var lines = data.split("\n");
		lines.forEach(function(line) {
			if (line[0] == '/')
				return;
			else if (pin[line.substr(1)] == undefined)
				pin[line.substr(1)] = line.substr(0,1);
			else
				pin[line.substr(1)] += line.substr(0,1);
		});
	}}));
*/

var rank = new Object();

// **** Character frequency ranking (1 = most frequent)
console.log("Loading char-rank.txt\n" +
	$.ajax({
	method: "GET",
	url: "/loadDatabase/char-rank",		// Note: use filename without extension
	cache: false,
	success: function(data) {
		var lines = data.split("\n");
		lines.forEach(function(line) {
			var c = line.charAt(0);
			var cc = line.charCodeAt(1);
			if (!isNaN(cc) && cc != 44)		// 44 = comma
				console.log("char-rank.txt line corrupt:", line);
			else if (rank[c] == undefined)
				rank[c] = parseInt(line.substr(2));
			else
				console.log("char-rank.txt line error:", line);
			});
		console.log("testing rank 是:", rank['是']);

		// **** Load exact Google pinyins which depends on rank[]:
		console.log("Loading exact-Google-pinyins.txt\n" +
			$.ajax({
			method: "GET",
			url: "/loadDatabase/exact-Google-pinyins",		// Note: use filename without extension
			cache: false,
			success: function(data) {
				var lines = data.split("\n");
				lines.forEach(function(line) {
					// line format:  "字pinyin" or "字字pinyin"
					var n1 = line.charCodeAt(1);
					var n2 = line.charCodeAt(2);
					var i = 1;
					if (n1 >= 97 && n1 < 123)
						i = 1;
					else if (n2 >= 97 && n2 < 123)
						i = 2;
					var a = line.substr(0,i);		// 字 or 字字 to be added
					if (i == 2)	{
						console.log("ignored: ", a);
						return;						// ignore n-grams > 1
						}
					var pinyin = line.substr(i);
					if (pin[pinyin] == undefined)
						pin[pinyin] = a;
					else {
						// **** Need to sort according to frequency ranking
						var s = pin[line.substr(i)];	// sequence to insert 'a' to
						var j = 0;
						ra = rank[a];
						if (ra == undefined)
							ra = 65535;
						// Below, exploit the fact that 'undefined' in ANY comparison condition is ALWAYS false
						while (rank[s.charAt(j)] < ra)
							++j;
						var s2 = s.substring(0,j) + a + s.substring(j);
						pin[pinyin] = s2;
						}
					});
			}}));
			// end of inner loader
	// end of outer loader
	}}));

var current_pinyin = "";
var current_num = 0;
var chars = "";

$("#white-box").keydown(function (e) {
	if (e.which == 27) {						// Escape
		current_pinyin = "";
		current_num = 0;
		e.preventDefault();
    }

    if (e.which >= 65 && e.which <= 90) {		// A-Z
		current_num = 0;
		current_pinyin += String.fromCharCode(e.which + 32);

		// display chars
		chars = pin[current_pinyin];
		if (chars != undefined)
			showChars();

		e.preventDefault();
    }

	if (e.which >= 48 && e.which <= 57) {		// 0-9
		// choose chars
		current_num = current_num * 10 + (e.which - 48);
		sendChar(current_num);
		current_pinyin += '●';
		e.preventDefault();
	}

	if (e.which == 32) {						// space chooses 1st char
		current_pinyin += "●";
		current_num = 0;
		sendChar(current_num);
		e.preventDefault();
    }

	document.getElementById("pinyin-bar").innerHTML = current_pinyin;
});

function sendChar(i)
{
	if (i <= 9)
		document.getElementById("white-box").value += chars.charAt(i);
	else {
		element = document.getElementById("white-box");
		element.value = element.value.slice(0,-1) + chars.charAt(i);
	}
}

function showChars()
{
	var column1 = document.getElementById("column1");
	column1.innerHTML = "";		// clear the contents first

	for (var i = 0; i < chars.length; ++i)
		{
		var c = chars.charAt(i);
		// column1.appendChild(document.createTextNode(nums[i] + '.'));
		var num = i.toString();
		if (i < 10)
			num += " ";

		textNode = document.createElement('span');
		textNode.appendChild(document.createTextNode(num + c));
		column1.appendChild(textNode);

		// var row = column1.insertRow(-1)
		// var cell = row.insertCell(0);
		// cell.innerHTML = c;
		}
}

var column2 = document.getElementById("column2");
column2.innerHTML = "test";		// clear the contents first

console.log("So far so good, from Cantonese-input.js");
