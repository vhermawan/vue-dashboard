<template>
  <div class="card card-carousel overflow-hidden h-350 p-0">
    <div id="carouselExampleCaptions" class="carousel slide h-100" data-bs-ride="carousel">
      <div class="mt-wc">
        <h5 class="text-black mb-1">Word Cloud Positive</h5>
      </div>
      <div class="carousel-inner border-radius-lg h-100">
        <div
          class="carousel-item h-100 active"
          :style="{backgroundImage: 'url(' + require('@/assets/img/wordcloud-positive.png') + ')',
          backgroundSize: 'contain', backgroundRepeat: ' no-repeat',}"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "carousel",
};
</script>
