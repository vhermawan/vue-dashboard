<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Top Tweets</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Display Name</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Tweet</th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >Retweet</th>
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
                <span class="badge badge-sm bg-gradient-success">{{data.retweet_count}}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
				loading: false
			}
		},
		mounted(){
			this.fetchData();
		},
		methods: {
			fetchData: function(){
				this.loading = true;
				let url = "https://be-sentiment-app-ta.herokuapp.com/tweet/toptweet?hashtag=vaksin";
				axios
					.get(url)
					.then(
						function (response) {
							this.loading = false;
              this.items = response.data.result
              console.log('res', response.data.result)
						}.bind(this)
					)
					.catch(function (error) {
						this.loading = false;
						console.log(error);
					}.bind(this));
			}
		}
};
</script>
