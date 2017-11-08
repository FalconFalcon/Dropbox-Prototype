import React, {Component} from 'react';
import FusionCharts from 'fusioncharts';
// Load the charts module
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';

charts(FusionCharts)

var chartConfigs = {
    type: "Column2D",
    className: "fc-column2d", // ReactJS attribute-name for DOM classes
    dataFormat: "JSON",
    dataSource: {
        chart:{},
        data: [{value: 500}, {value: 600}, {value: 700}]
    }
  }

  var myDataSource = {
          chart: {
              caption: "Harry's SuperMart",
              subCaption: "Top 5 stores in last month by revenue",
              numberPrefix: "$",
              theme: "ocean"
          },
          data: [{
              label: "Bakersfield Central",
              value: "880000"
          }, {
              label: "Garden Groove harbour",
              value: "730000"
          }, {
              label: "Los Angeles Topanga",
              value: "590000"
          }, {
              label: "Compton-Rancho Dom",
              value: "520000"
          }, {
              label: "Daly City Serramonte",
              value: "330000"
          }]
      };

  var revenueChartConfigs = {
          id: "revenue-chart",
          type: "column2d",
          width: "80%",
          height: 400,
          dataFormat: "json",
          dataSource: myDataSource
      };

      var categoryChartConfigs = {
              id: "category-chart",
              type: "column2d",
              width: "80%",
              height: 400,
              dataFormat: "json",
              dataSource: myDataSource
          };


class Dashboard extends Component {
  render() {
    return (

  <div>
	 <h1 className="main-title">Your Fitness Evaluation: </h1>
	  <div id="interactive-dashbaord"></div>
 	  <div className="chart-row">
 		   <div id="country-revenue"> <ReactFC {...chartConfigs} /> </div>
 	  </div>
 	  <div className="chart-row">
		  <div id="monthly-revenue" className="inline-chart"> <ReactFC {...revenueChartConfigs} /> </div>
 		  <div id="product-revenue" className="inline-chart"> <ReactFC {...categoryChartConfigs} /> </div>
 	  </div>
  </div>

    );
  }
}

export default Dashboard;
