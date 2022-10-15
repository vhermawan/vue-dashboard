<template>
  <div class="py-4 container-fluid">
    <div class=" row">
      <div class="col-12">
        <negative-tweet-table />
      </div>
    </div>
  </div>
</template>

<script>
import NegativeTweetTable from "./components/NegativeTweet.vue";

export default {
  name: "tables",
  components: {
    NegativeTweetTable,
  },
};
</script>
