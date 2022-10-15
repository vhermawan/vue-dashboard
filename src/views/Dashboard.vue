<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.tweet.title"
              :value="count"
              :iconClass="stats.tweet.iconClass"
              :iconBackground="stats.tweet.iconBackground"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.positive.title"
              :value="positiveSentiment"
              :iconClass="stats.positive.iconClass"
              :iconBackground="stats.positive.iconBackground"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.negative.title"
              :value="negativeSentiment"
              :iconClass="stats.negative.iconClass"
              :iconBackground="stats.negative.iconBackground"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.accuracy.title"
              :value="stats.accuracy.value"
              :iconClass="stats.accuracy.iconClass"
              :iconBackground="stats.accuracy.iconBackground"
              directionReverse
            ></card>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 mb-lg">
            <word-cloud-negative />
          </div>
          <div class="col-lg-6">
            <word-cloud-positive />
          </div>
        </div>
        <div class="row mt-4">
          <div class="card h-100">
            <line-chart />
          </div>
        </div>
        <div class="row mt-4">
          <div class="card h-100">
            <pie-chart />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-lg-12 mb-lg-0 mb-4">
            <div class="card">
              <authors-table />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/examples/Cards/Card.vue";
import LineChart from "./components/LineChart.vue";
import PieChart from "./components/PieChart.vue";
import WordCloudPositive from "./components/WordCloudPositive.vue";
import WordCloudNegative from "./components/WordCloudNegative.vue";
import AuthorsTable from "./components/AuthorsTable.vue";
import US from "@/assets/img/icons/flags/US.png";
import DE from "@/assets/img/icons/flags/DE.png";
import GB from "@/assets/img/icons/flags/GB.png";
import BR from "@/assets/img/icons/flags/BR.png";

import axios from "axios";

export default {
  name: "dashboard-default",
  data() {
    return {
      count: null,
			positiveSentiment: null,
			negativeSentiment: null,
			hashtag: null,
			posneg: null,
			loadingCount: false,
			loadingNegativeSentinment: false,
			loadingPositiveSentiment:false,
			loadingChart:false,
      stats: {
        tweet: {
          title: "Number of tweets",
          value: "$53,000",
          iconClass: "fas fa-comment",
          iconBackground: "bg-gradient-primary",
        },
        positive: {
          title: "Positive Sentiment",
          value: "2,300",
          iconClass: "fas fa-plus",
          iconBackground: "bg-gradient-success",
        },
        negative: {
          title: "Negative Sentiment",
          value: "+3,462",
          iconClass: "fas fa-times",
          percentageColor: "text-danger",
          iconBackground: "bg-gradient-danger",
        },
        accuracy: {
          title: "Accuarcy",
          value: "82.5 %",
          iconClass: "ni ni-paper-diploma",
          iconBackground: "bg-gradient-warning",
        },
      },
      sales: {
        us: {
          country: "United States",
          sales: 2500,
          value: "$230,900",
          bounce: "29.9%",
          flag: US,
        },
        germany: {
          country: "Germany",
          sales: "3.900",
          value: "$440,000",
          bounce: "40.22%",
          flag: DE,
        },
        britain: {
          country: "Great Britain",
          sales: "1.400",
          value: "$190,700",
          bounce: "23.44%",
          flag: GB,
        },
        brasil: {
          country: "Brasil",
          sales: "562",
          value: "$143,960",
          bounce: "32.14%",
          flag: BR,
        },
      },
    };
  },
  created() {
		this.hashtag = "vaksin";
		this.countTweet();
		this.countSentiment();
	},
  mounted: function (){
    this.countTweet();
  },  
  methods: {
		countTweet: function () {
			this.loadingCount = true;
			let url = "https://be-sentiment-app-ta.herokuapp.com/tweet/count?hashtag=" + this.hashtag;
			axios
				.get(url)
				.then(
					function (response) {
						this.loadingCount= false;
						this.count = response.data.count
					}.bind(this)
				)
				.catch(function (error) {
					this.loadingCount= false;
					console.log(error)
				});
		},
		countSentiment: function () {
			let url = "https://be-sentiment-app-ta.herokuapp.com/tweet/sentiment?hashtag=" + this.hashtag;
			this.loadingNegativeSentinment = true;
			this.loadingPositiveSentiment = true;
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
						this.posneg = [this.positiveSentiment, this.negativeSentiment];
						this.loadingNegativeSentinment = false;
						this.loadingPositiveSentiment = false;
					}.bind(this)
				)
				.catch(function (error) {
					console.log(error)
					this.loadingNegativeSentinment = false;
					this.loadingPositiveSentiment = false;
				});
		}
	},
  components: {
    Card,
    LineChart,
    WordCloudNegative,
    WordCloudPositive,
    AuthorsTable,
    PieChart,
  },
  
};
</script>
