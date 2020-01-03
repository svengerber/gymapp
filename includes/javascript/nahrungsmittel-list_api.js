
$( document ).ready(function() {
	'use strict';
	var host = "https://api.fitnessapp.cf"
  var api_url = host + '/v1/fruit/'

	/*$.ajax({
			url: api_url,
			contentType: "application/json",
			dataType: 'json',
			success: function(result){
				var display = [{value: 'name', tag: 'h2', textprint: ''}, {value :'calories', tag: 'p', textprint: 'calories: '}]
				renderBoxes(result, display, "#nahrungsmittel-list div.container");
			}
	})*/
	$.ajax({
			url: api_url,
			contentType: "application/json",
			dataType: 'json',
			success: function(result){
				var display = [{value: 'name', tag: 'h2', tagParameter: '', tagParameterValue: '', textprint: ''},
				{value :'calories', tag: 'p', tagParameter: '', tagParameterValue: '', textprint: 'calories: '},
		  	{value :'', tag: 'img', tagParameter: 'src=', tagParameterValue: 'pic_url', textprint: ''}]
				renderBoxesWhithPic(result, display, "#nahrungsmittel-list div.container");
			}
	})
});


function renderBoxesWhithPic(data, display, output) {
	var out = ''
	$.each(data, function (index, value) {
		out = out + '<div class="content_box_with_pic">'
		$.each(display, function(i, value){
			var tag = display[i].tag
			var tagParameter = display[i].tagParameter
			var tagParameterValue = display[i].tagParameterValue
			var textprint = display[i].textprint
			var value = display[i].value

			out = out + '<' + tag + ' ' + tagParameter + '"'
			if (tagParameterValue != ''){
				out = out + eval('data[index].' + tagParameterValue)
			};
			out = out + '"' + '>' + textprint
			if (value != ''){
				out = out + eval('data[index].' + value)
			};
			out = out + '</' + tag + '>'
		})
		out = out + '</div>'
	})
	$( output ).html(
		out
	);
}

function renderBoxes(data, display, output) {
	var out = ''
	$.each(data, function (index, value) {
		out = out + '<div class="content_box">'
		$.each(display, function(i, value){
			out = out + '<' + display[i].tag + '>' + display[i].textprint + eval('data[index].' + display[i].value) + '</' + display[i].tag + '>'
		})
		out = out + '</div>'
	})
	$( output ).html(
		out
	);
}

function renderList(data, output) {
	var out = ''
	$.each(data, function (index, value) {
		out = out + '<li>' + data[index].name + '</li>'
	})
	$( output ).html(
		out
	);
}
