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
  name: "Pie Chart",
  data() {
		return {
			positiveSentiment: null,
			negativeSentiment: null,
		}
	},
  mounted: function (){
    this.fetchData();
  },  
  methods: {
    fetchData() {
      let url = "https://be-sentiment-app-ta.herokuapp.com/tweet/sentiment?hashtag=vaksin";
			axios
				.get(url)
				.then(
					function (response) {
						for (let i = 0; i < response.data.result.length; i++) {
							if (response.data.result[i].label == 0) {
								this.negativeSentiment = response.data.result[i].result;
							} else {
								this.positiveSentiment = response.data.result[i].result;
							}
						}
            this.generateChart(this.negativeSentiment,this.positiveSentiment)
					}.bind(this)
				)
				.catch(function (error) {
					console.log(error)
				});
    },
    generateChart(negativeSentiment,positiveSentiment){

      console.log('sent', negativeSentiment, positiveSentiment)

      let chart = am4core.create(this.$refs.chartdiv, am4charts.PieChart);

      chart.paddingRight = 20;

      chart.data = [{
        "category": "Positive",
        "count": parseInt(positiveSentiment),
        "color" : am4core.color("#38E54D"),
      }, {
        "category": "Negative",
        "count": parseInt(negativeSentiment),
        "color" : am4core.color("#ff0000")
      }];

      // Add and configure Series
      var pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "count";
      pieSeries.dataFields.category = "category";
      pieSeries.slices.template.propertyFields.fill = "color";
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
