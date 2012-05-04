var totalPage;
  
function searchCompanyByImpreciseName(){
    var usrInput = $.trim($("#userinput").val());
	
	if(usrInput != '' && usrInput.indexOf(",") < 0){
		companyName = usrInput;
		$.cookie('companyName', companyName);
		$.cookie('searchinput', companyName);
		
		searchedNames = $.makeArray($.cookie('searchedNames'));
		
		searchedNames.push(companyName);
		$.cookie('searchedNames',searchedNames);
		
		pageIndex = 0;
		$.cookie('pageIndex', pageIndex);
		loadPage(companyName, pageIndex, 20);
		countPages(companyName, 20);
	}
}
  
  
function showLoading() {
    $('#companylist').hide();
    $("#loadingdiv").show();
}


function delayAnimation(hasResult){
	if (hasResult){
		setTimeout('hideLoading()',500)
		}
	else {
		hideLoadingAndPagor();
		}
}


function hideLoading() {
    $("#loadingdiv").hide();
    $('#companylist').fadeIn();
}


function hideLoadingAndPagor(){
	$("#loadingdiv").hide();
    $('#companylist').fadeIn();
	}


function loadPage(companyName, pageIndex, companyAmountPerPage){
	showLoading();
	$.ajax({
      		type: "GET",
			url: serverurl + '/loadCompaniesTillPage',
			data: "companyName=" + companyName + "&pageIndex=" + pageIndex + "&companyAmountPerPage=" + companyAmountPerPage,
      		dataType: "jsonp",
      		success: function(data) {
				var companies = data.companies;
				
				var linksBody = '<ul id="listviewid" data-role="listview" class="ui-listview">';
				
				if ( companies.length !=0 ){
					$.each(companies, function(key, val){
						var foundedDate = $.trim(val.foundedDate);
						if (foundedDate.length == 0){
							foundedDate = '';
							} else {
							foundedDate = 'Since ' + foundedDate + '&nbsp;&nbsp;';	
							}
						var employees = val.employees;
						if (employees == 0){
							employees = 'Few';
							}

						linksBody += '<li><a href="profile.html?companyName=' + val.companyName + '" rel="external" class="ui-link-inherit"><img src="' + serverurl + '/getCompanyLogo?companyName=' + val.companyName + '" class="ui-li-thumb"><h3 class="ui-li-heading">' + val.companyName + '</h3><p class="ui-li-aside"><strong>' + val.funding + '</strong></p><p>' + val.industry + ' Industry</p><p><font color="#999999">' + foundedDate + employees + ' employees</font></p></a></li>';
      				});
					
					linksBody += '<li id="loadmorelink"><a href="JavaScript:animateLoadMore();" class="ui-link-inherit"><img src="images/loading.gif" class="ui-li-icon" id="loadingicon" style="display:none"><p>&nbsp;</p><p><h4 id="loadmoreid" style="text-align:center; color:#0C7BC7;">Load More...</h4></p><p>&nbsp;</p></a></li>';
					
					linksBody += '</ul>';
					
					$('#companylist').html(linksBody);
					$('#companylist').trigger('create');	
					delayAnimation(true);
					//$('#currentPage').html(pageIndex + 1);
					
				} else {
					linksBody += '<li><img src="images/sm-gen_company50x50.png" class="ui-li-thumb"><h3 class="ui-li-heading">Company Not Found</h3><p>Please try other company names</p><p><font color="#999999">Click Search to restart</font></p></li>';
					linksBody += '</ul>';
					$('#companylist').html(linksBody);
					$('#companylist').trigger('create');	
					delayAnimation(false);
					}
					
                
      		},
      		error: function(data){
            	alert('loadPage error');
	 		}
    	});
	
	}
	
	
function countPages(companyName, companyAmountPerPage){
	$.ajax({
      		type: "GET",
			url: serverurl + '/countPages',
			data: "companyName=" + companyName + "&companyAmountPerPage=" + companyAmountPerPage,
      		dataType: "jsonp",
      		success: function(data) {
				totalPage = data.pageAmount;
				//$('#totalPage').html(totalPage);
      		},
      		error: function(data){
            	alert('countPages error');
	 		}
    	});
  }


function animateLoadMore(){
	$('#loadingicon').attr('style','');
	setTimeout('checkMorePage()',800);
	}
	

function checkMorePage(){
	$('#loadingicon').attr('style','display:none');
	if (pageIndex < totalPage - 1){
		pageIndex++;
		$.cookie('pageIndex', pageIndex);
		companyName = $.cookie("companyName");
		loadMore(companyName, pageIndex, 20);
		}
	else {
		$('#loadmoreid').fadeIn(function(){
			$('#loadmoreid').html('No More Results');
			});
		}
	}


function loadMore(companyName, pageIndex, companyAmountPerPage){
	$.ajax({
      		type: "GET",
			url: serverurl + '/loadCompanyByPage',
			data: "companyName=" + companyName + "&pageIndex=" + pageIndex + "&companyAmountPerPage=" + companyAmountPerPage,
      		dataType: "jsonp",
      		success: function(data) {
				var companies = data.companies;
				
				var newLinksBody = '';
				if ( companies.length !=0 ){
					$.each(companies, function(key, val){
						var foundedDate = $.trim(val.foundedDate);
						if (foundedDate.length == 0){
							foundedDate = '';
							} else {
							foundedDate = 'Since ' + foundedDate + '&nbsp;&nbsp;';	
							}
						var employees = val.employees;
						if (employees == 0){
							employees = 'Few';
							}

						newLinksBody += '<li><a href="profile.html?companyName=' + val.companyName + '" rel="external" class="ui-link-inherit"><img src="' + serverurl + '/getCompanyLogo?companyName=' + val.companyName + '" class="ui-li-thumb"><h3 class="ui-li-heading">' + val.companyName + '</h3><p class="ui-li-aside"><strong>' + val.funding + '</strong></p><p>' + val.industry + ' Industry</p><p><font color="#999999">' + foundedDate + employees + ' employees</font></p></a></li>';
      				});
					
					newLinksBody += '<li id="loadmorelink"><a href="JavaScript:animateLoadMore();" class="ui-link-inherit"><img src="images/loading.gif" class="ui-li-icon" id="loadingicon" style="display:none"><p>&nbsp;</p><p><h4 id="loadmoreid" style="text-align:center; color:#0C7BC7;">Load More...</h4></p><p>&nbsp;</p></a></li>';
					
					
					$('#loadmorelink').remove();
					$('#listviewid').append(newLinksBody).listview("refresh");
						
					//delayAnimation(true);
					//$('#currentPage').html(pageIndex + 1);
					
				} else {
					newLinksBody += '<li id="loadmorelink"><a href="JavaScript:animateLoadMore();" class="ui-link-inherit"><img src="images/loading.gif" class="ui-li-icon" id="loadingicon" style="display:none"><p>&nbsp;</p><p><h2 id="loadmoreid" style="text-align:center; color:#0C7BC7; vertical-align:bottom">No More Results</h2></p></a></li>';
					$('#listviewid').append(newLinksBody).listview("refresh");
					
					//delayAnimation(false);
					}
					
                
      		},
      		error: function(data){
            	alert('loadMore error');
	 		}
    	});
	
	}
	
	
function reloadPage(){
	$.cookie('pageIndex', null);
	$.cookie('companyName',null);
	$.cookie('searchinput',null);
	$.cookie('pageIndex', 0);
	$.cookie('companyName','');
	$.cookie('searchinput','');
	$("#userinput").val("");
	
	pageIndex = 0;
	companyName = '';
  	loadPage(companyName, pageIndex, 20);
	countPages(companyName, 20);
	
	}
	
//$( function() {
//  $('body').bind( 'taphold', function( e ) {
//    alert( 'You tapped and held!' );
//    e.stopImmediatePropagation();
//    return false;
//  } );  
//
//  $('body').bind( 'swipeleft', function( e ) {
//    //alert('left ' + pageIndex);
//	if (pageIndex > 0){
//		pageIndex--;
//		$.cookie('pageIndex', pageIndex);
//		companyName = $.cookie("companyName");
//		loadPage(companyName, pageIndex, 20);
//		}
//    //e.stopImmediatePropagation();
//    //return false;
//  } );  
//  
//   $('body').bind( 'swiperight', function( e ) {
//	if (pageIndex < totalPage - 1){
//		pageIndex++;
//		$.cookie('pageIndex', pageIndex);
//		companyName = $.cookie("companyName");
//		loadPage(companyName, pageIndex, 20);
//		}
//   
//    //e.stopImmediatePropagation();
//    //return false;
//  } );  
//
//} );


//function goToFirstPage() {
//	pageIndex = 0;
//	$.cookie('pageIndex', pageIndex);
//	companyName = $.cookie("companyName");
//    loadPage(companyName, pageIndex, 20);
//}
//
//
//function goToLastPage() {
//    pageIndex = totalPage-1;
//	$.cookie('pageIndex', pageIndex);
//	companyName = $.cookie("companyName");
//	loadPage(companyName, pageIndex, 20);
//}
