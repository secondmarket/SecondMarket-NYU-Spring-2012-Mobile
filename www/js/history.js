function displayHistory(){
	var historyLinks = '<ul id="historyList" data-role="listview" data-inset="true">';
	
	searchedNames = $.makeArray($.cookie('searchedNames'));
	if ($.isEmptyObject(searchedNames)){
		historyLinks += '<li><h4 style="text-align:center;">No Search History</h4></li>';
	}
	else {
		var searchedArray = searchedNames[0].split(',');
		$.each(searchedArray, function(index, value){
		//alert(index + ': ' + value); 
		
		historyLinks += '<li data-icon="arrow-r" data-iconpos="right" data-theme="c"><a href="search.html" class="ui-link-inherit" rel="external" onClick="JavaScript:setHistoryNameCookie(\''+value+'\');">'+value+'</a></li>';
		
		});
	}
	
	historyLinks += '</ul>';
	//alert(historyLinks);
	
	$('#historyLinks').html(historyLinks);
	$('#historyLinks').trigger('create');
	//alert('here');
}

	
function setHistoryNameCookie(historyName){
	$.cookie('historyName',historyName);
	
	}
	

function deleteHistory(){
	$.cookie('searchedNames',null);
	$('#historyLinks').empty();
	var historyLinks = '<ul id="historyList" data-role="listview" data-inset="true">';
	historyLinks += '<li><h4 style="text-align:center;">No Search History</h4></li>';
	historyLinks += '</ul>';
	$('#historyLinks').html(historyLinks);
	$('#historyLinks').trigger('create');
	}