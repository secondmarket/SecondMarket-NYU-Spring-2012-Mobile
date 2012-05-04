function loadChart(){
  $.ajax({
          type: "GET",
          url: serverurl + '/getFusionChartJSON',
          dataType: "jsonp",
          success: function(data) {
          	var myChart = new FusionCharts( "Bar2D", "myChartId", "290", "340" );
          	myChart.setTransparent(true);
            //myChart.setJSONUrl("Data.json");
         	myChart.setJSONData(data);
         	myChart.render("chartContainer"); 
          },
          error: function(data){
              alert('loadError');
      }
    });
  }
  
  
function clickAndSearchCompanyByName(companyName){
  alert("Then go to: " + companyName + "Profile Page");
  $.ajax({
          type: "GET",
          url: serverurl + '/searchCompanyByName',
          data: "companyName=" + companyName,
          dataType: "jsonp",
          success: function(data) {
            $('#container').html(data.company.overview);
          },
          error: function(data){
              alert('loadError');
      }
      });

  }