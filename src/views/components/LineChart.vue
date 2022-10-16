<template>
  <div class="row mt-4">
    <div class="col-lg-12 mb-lg">
      <h6>Chart Tweet</h6>
    </div>
    <div class="col-lg-12 mb-lg">
      <!-- <line-chart /> -->
      <div class="hello" ref="chartdiv">
      </div>
    </div>
  </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from "axios";
am4core.useTheme(am4themes_animated);
export default {
  name: "Line Chart",
  mounted: function (){

    this.fetchData();

    
  },  
  methods: {
    fetchData() {
    let url = "https://be-sentiment-app-ta.herokuapp.com/tweet/daytoday?hashtag=vaksin";
    axios
      .get(url)
      .then(
        function (response) {
          this.generateChart(response.data.result);
        }.bind(this)
      )
      .catch(
        function (error) {
          console.error('err',error)
        }.bind(this)
      );
  
    },
    generateChart(dataChart){
      let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

      chart.paddingRight = 20;

      let label = [];
      for(let i=0;i<dataChart.length;i++)
      {
        let result = dataChart[i];
        if(!label.includes(result.dateLabel)){
          label.push(result.dateLabel);
        }
      }

      let dataTest = [];
      for(let i=0;i<dataChart.length;i++)
      {
       
        let valueNegative, valuePositive
       
        if(dataChart[i].classification_result === 0){
          valueNegative= parseInt(dataChart[i].countSentiment)
        }else{
          valuePositive = parseInt(dataChart[i].countSentiment)
        }
        
        dataTest.push({date : new Date(dataChart[i].dateLabel),valueNegative ,valuePositive });
      }

      chart.data = dataTest;
      chart.legend = new am4charts.Legend();

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series1 = chart.series.push(new am4charts.LineSeries());
      series1.dataFields.dateX = "date";
      series1.dataFields.valueY = "valuePositive";
      series1.name = "positive"
      series1.strokeWidth = 3;
      series1.stroke = am4core.color("#38E54D");
      series1.bullets.push(new am4charts.CircleBullet());

      series1.tooltipText = "Positive Sentiment: {valueY.value}";
      chart.cursor = new am4charts.XYCursor();

      let series2 = chart.series.push(new am4charts.LineSeries());
      series2.dataFields.dateX = "date";
      series2.dataFields.valueY = "valueNegative";
      series2.name="negative"
      series2.strokeWidth = 3;
      series2.bullets.push(new am4charts.CircleBullet());
      series2.stroke = am4core.color("#ff0000");

      series2.tooltipText = "Negative Sentiment: {valueY.value}";
      chart.cursor = new am4charts.XYCursor();

      this.chart = chart;
    }
  }  
};
</script>
<style scoped>
.hello {
  width: 100%;
  height: 400px;
}
</style>
