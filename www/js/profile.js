function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


function getCompanyData(companyName){
	$.ajax({
      		type: "GET",
			url: serverurl + '/searchCompanyByName',
			data: "companyName=" + companyName,
      		dataType: "jsonp",
      		success: function(data) {
				$('#companyLogo').html('<img src="' + serverurl + '/getCompanyLogo?companyName=' + data.company.companyName +  '" width="50" height="50"/>');
				$('#companyName').html(data.company.companyName);
				setGeneralInfo(data);
				setFundingRounds(data);
				
				//generateDragableMap(data);
				
				
				//$('#companylist').html(linksBody);
				//$('#companylist').trigger('create');
                
      		},
      		error: function(data){
            	alert('loadCompanyByName error');
	 		}
    	});
	}

	
function setGeneralInfo(data){
	$('#industry').html(data.company.industry);
	$('#funding').html(data.company.funding);
	$('#homepage').html('<a href="JavaScript:openChildBrowser(\'' + data.company.homepageurl + '\')" style="text-decoration: none">' + data.company.homepageurl + '</a>');
	if (data.company.employees==0){
		$('#employees').html("Few employees");
		}
	else {
		$('#employees').html(data.company.employees);
		}
	
	var foundedDate = data.company.foundedDate;
	foundedDate = foundedDate.trim();
	if (foundedDate.length == 0){
		$('#foundedDate').html("Undefined");
		}
	else {
		$('#foundedDate').html(foundedDate);
		}
	}
	
	
function setFundingRounds(data){
	var fundingRoundsBody = '<ul data-role="listview" data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';
	$.each(data.company.fundings, function(key, val){
		fundingRoundsBody += '<li class="ui-li ui-li-static ui-body-c ui-corner-top textcontent">';
		var fundingDetailText='<p><strong>' + val.raisedCurrencyCode + val.raisedAmountString + ' on ' + val.fundedDate + ', ' + val.roundCode + '</strong></p>';
		fundingRoundsBody += fundingDetailText;
					
		if (val.investorList != null){
			var providers = '';
			$.each(val.investorList, function(key, val){
			providers += '<p><font color="#999999">' + val + '</font></p>';
			});
		fundingRoundsBody += providers;
		}
		fundingRoundsBody += '</li>';			
      }); 
    fundingRoundsBody += '</ul>';
	
	$('#fundingRounds').html(fundingRoundsBody);
	$('#fundingRounds').trigger('create');
}


function getOfficesCoordinates(companyName){
	$.ajax({
      		type: "GET",
			url: serverurl + '/getOfficesByCompanyName',
			data: "companyName=" + companyName,
      		dataType: "jsonp",
      		success: function(data) {
				generateDragableMap(data);
      		},
      		error: function(data){
            	alert('getOfficesCoordinates error');
	 		}
    	});
	}

/*
function generateDragableMap(data){
    var DragableMap = null; 
    var level = 8; 
    var options;
    var centerLatlng = new google.maps.LatLng(data.offices[0].latitude, data.offices[0].longitude); 
    //var bounds = new google.maps.LatLngBounds();

    options = {   
      zoom: level, 
      center: centerLatlng, 
      mapTypeId: google.maps.MapTypeId.ROADMAP, 
      mapTypeControl: true 
    }; 
    
    DragableMap = new google.maps.Map(document.getElementById("googleMapDiv"), options); 
	
    for (var i = 0; i < data.offices.length; i++) {
    	var myLatLng = new google.maps.LatLng(data.offices[i].latitude, data.offices[i].longitude);
    	//bounds.extend(myLatLng);
    	var marker = new google.maps.Marker({
        	position: myLatLng,
        	map: DragableMap
    	});

    	//DragableMap.fitBounds(bounds);
    	//DragableMap.setCenter(bounds.getCenter(), DragableMap.getBoundsZoomLevel( bounds ) );

    	// var j = i + 1;
    	// marker.setTitle(j.toString());
    	attachInfoWindow(marker, i, DragableMap, data.offices[i].city);
    }
  }
 */
 

function generateDragableMap(data){
    var DragableMap = null; 
    var level = 8; 
    var options;
    var centerLatlng = new google.maps.LatLng(data.offices[0].latitude, data.offices[0].longitude); 
    //var bounds = new google.maps.LatLngBounds();

    options = {   
      zoom: level, 
      center: centerLatlng, 
      mapTypeId: google.maps.MapTypeId.ROADMAP, 
      mapTypeControl: true 
    }; 
    
    DragableMap = new google.maps.Map(document.getElementById("googleMapDiv"), options); 

    offices = data.offices;
	
    for (var i = 0; i < offices.length; i++) {
    	var myLatLng = new google.maps.LatLng(offices[i].latitude, offices[i].longitude);
    	
    	var marker = new google.maps.Marker({
        	position: myLatLng,
        	map: DragableMap
    	});

          var addressString;
          var s1 = offices[i].address1 + '\n' + offices[i].address2 + '\n';
          s1 = s1.replace("undefined", "");
          s1 = s1.trim();
          
          var s21 = offices[i].city;
          s21 = s21.replace("undefined", "");
          s21 = s21.trim()
          var s22 = offices[i].statecode;
          s22 = s22.replace("undefined", "");
          s22 = s22.trim()
          var s23 = offices[i].zipcode;
          s23 = s23.replace("undefined", "");
          s23 = s23.trim();
          if (s21 == "") {
            if (s22 == ""){
              s2 = s23;
            }
            else s22 + " " + s23;
          }
          else if (s22 == ""){
            s2 = s21;
          }
          else s2 = s21+ ", " + s22 + " " + s23;;

          if (s1 != ""){
            addressString = s1 + "</br>" +s2;}
            else{
              addressString = s2;
            }

          var s3 = " " + offices[i].country_code;
          s3 = s3.replace("undefined", " ");
          s3 = s3.trim();
          if (s3 != ""){
            addressString = addressString + ", " + s3;
          }
    	attachInfoWindow(marker, i, DragableMap, addressString);
    }
  }

  

function attachInfoWindow(marker, number, DragableMap, address) {
    var infowindow = new google.maps.InfoWindow({ 
      content: address,
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(DragableMap,marker);
    });

  }
  
 
function getAffiliatedPeople(companyName){
	$.ajax({
      		type: "GET",
			url: serverurl + '/getAffiliatedPeopleByCompanyName',
			data: "companyName=" + companyName,
      		dataType: "jsonp",
      		success: function(data) {
				var peopleBody = '<ul data-role="listview" data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';
				$.each(data.relationships, function(key, val){
					peopleBody += '<li class="ui-li ui-li-static ui-body-c ui-corner-top textcontent">';
					peopleBody += '<p><strong>' + val.name + '</strong></p>';
					peopleBody += '<p><font color="#999999">' + val.title + '</font></p>';
					peopleBody += '</li>';
     			 }); 
				peopleBody += '</ul>';
				$('#peopleBody').html(peopleBody);
				$('#peopleBody').trigger('create');
				
      		},
      		error: function(data){
            	alert('getAffiliatedPeople error');
	 		}
    	});
	}
	

function getCompanyOverview(companyName){
	$.ajax({
      		type: "GET",
			url: serverurl + '/getCompanyOverviewByCompanyName',
			data: "companyName=" + companyName,
      		dataType: "jsonp",
      		success: function(data) {
				$('#overviewBody').html(data.overview);
				$('#overviewBody').trigger('create');
      		},
      		error: function(data){
            	alert('getAffiliatedPeople error');
	 		}
    	});
	
	}
	

function getCompanyWikiLink(){
	$.ajax({
      		type: "GET",
			url: serverurl + '/getCompanyWikiLinkByCompanyName',
			data: "companyName=" + companyName,
      		dataType: "jsonp",
      		success: function(data) {
				//alert(data.wikiUrl);
				if (data.wikiUrl == null){
					openChildBrowser('http://en.wikipedia.org/wiki/Not_Found');
					}
				else {
					openChildBrowser(data.wikiUrl);
					}
	
      		},
      		error: function(data){
            	alert('getAffiliatedPeople error');
	 		}
    	});
	
	}


function getEdgarDoc(companyName){
	$.ajax({
      		type: "GET",
			url: serverurl + '/getEdgarDoc',
			data: "companyName=" + companyName,
      		dataType: "jsonp",
      		success: function(data) {
				var filingBody = '<ul data-role="listview" data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';
				
				if (data.detail == 'none'){
					filingBody += '<li>No EDGAR filings</li></ul>';
					$('#edgarFilings').html(filingBody);
					$('#edgarFilings').trigger('create');
				} else {
					var pageBody = "";
					var i = 0;
					$.each(data.detail, function(key, val){
						filingBody += '<li>';
						filingBody += '<a data-transition="slide" href="#edgar'+i+'">' + val.filings + ' ' + val.filingDate + '</a>';
						filingBody += '</li>';

						pageBody += '<div data-role="page" id="edgar'+i+'" data-theme="c">';
						pageBody += '<div data-role="header"><a href="#edgar" data-direction="reverse" data-role="button" data-theme="a" data-icon="back" data-transition="slide">Back</a><h1>'+ val.filings + ' ' + val.filingDate +'</h1></div>';
						pageBody += '<div data-role="content" data-theme="c">';
						pageBody += '<ul data-role="listview" data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';
					
						$.each(data.detail[i].docList, function(key, val){
							pageBody += '<li><a data-transition="slide" href="JavaScript:openChildBrowser(\''+ val.docLink +'\')">'+val.docName+'</a></li>';
						});
					
						pageBody += '</ul>';
						pageBody += '<p><a href="#edgar" data-direction="reverse" data-role="button" data-theme="c" data-transition="slide">Back</a></p></div>';
						pageBody += '<div data-role="footer" data-position="fixed"></div></div>';
						i++;
     			 	}); 
					filingBody += '</ul>';
					$('#edgarFilings').html(filingBody);
					$('#edgarFilings').trigger('create');
					$('body').append(pageBody);
				}
				
      		},
      		error: function(data){
            	alert('getEdgarFilings error');
	 		}
    	});
	}