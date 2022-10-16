<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Tweets</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="col-lg-5 search-box">
        <input type="text" v-model="search" class="form-control form-control-lg" placeholder="Masukkan kata" >
      </div>
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
            <tr v-for="data in filteredItems" :key="data.id">
              <td>
                <div class="d-flex px-2 py-1">
                  <p class="text-xs font-weight-bold mb-0">{{data.user_screen_name}}</p>
                </div>
              </td>
              <td class="text-red" style="white-space:wrap !important;">
                <p class="text-xs font-weight-bold mb-0">{{data.text}}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <span v-if ="data.classification_result === 1" class="badge badge-sm bg-gradient-success">{{data.classification_result === 1 ? "positive" : "negative"}}</span>
                <span v-else class="badge badge-sm bg-gradient-error">{{data.classification_result === 1 ? "positive" : "negative"}}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pt-3 pagination-table">
        <pagination v-model="currentPage" :records="19817" :per-page="10" @paginate="myCallback"/>
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
        search:"",
				items: [],
				loading: false,
        currentPage: 1,
        totalRows: 1,
        error: null,
        perPage: 20,
        rows: null,
			}
		},
    computed: {
      filteredItems () {
        return this.items.filter(item => {
          return item.text.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        })
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
				let url = "https://be-sentiment-app-ta.herokuapp.com/tweet/all?hashtag=vaksin"+"&page="+page;
				axios
					.get(url)
					.then(
						function (response) {
              console.log('res',response)
							this.loading = false;
              this.items = response.data  
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
