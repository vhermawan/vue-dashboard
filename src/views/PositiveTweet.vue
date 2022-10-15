<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Positive Tweets</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Username</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Tweet</th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >Sentiment</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in items" :key="data.id">
              <td>
                <div class="d-flex px-2 py-1">
                  <p class="text-xs font-weight-bold mb-0">{{data.user_screen_name}}</p>
                </div>
              </td>
              <td class="text-red" style="white-space:wrap !important;">
                <p class="text-xs font-weight-bold mb-0">{{data.text}}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="badge badge-sm bg-gradient-success">{{data.classification_result === 1 ? "positive" : "negative"}}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pt-3 pagination-table">
        <pagination v-model="currentPage" :records="500" :per-page="25" @paginate="myCallback"/>
      </div>
      <template>
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "authors-table",
  data() {
			return {
				items: null,
				loading: false,
        currentPage: 1,
        totalRows: 1,
        error: null,
        perPage: 20,
        rows: null,
			}
		},
		mounted(){
			this.fetchData(1);
		},
    watch: {
        currentPage: function (page) {
            this.fetchData(page);
        }
    },
		methods: {
			fetchData: function(page){
				this.loading = true;
				let url = "https://be-sentiment-app-ta.herokuapp.com/positive-tweet/all?hashtag=vaksin"+"&page="+page;
				axios
					.get(url)
					.then(
						function (response) {
							this.loading = false;
              this.items = response.data  
              console.log('res', response.data)
						}.bind(this)
					)
					.catch(function (error) {
						this.loading = false;
						console.log(error);
					}.bind(this));
			},
      myCallback(){
        console.log('run')
      }
		}
};
</script>
