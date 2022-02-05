<template>
  <div class="flex flex-col gap-3 px-5">
    <h2 class="text-2xl w-full">{{ title }}</h2>
    <div class="flex flex-wrap w-full md:grid grid-cols-2 xl:grid-cols-3 gap-3">
      <Card
        v-for="(card, index) in cards"
        :key="index"
        :image="card.image"
        :route="card.route"
        :title="card.title"
        :data="card.data"
        :buttonText="card.buttonText"
        :idComponent="card.idComponente"
      />
    </div>
  </div>
</template>

<script setup>
import Card from "./Card.vue";

defineProps({
  title: {
    type: String,
  },
  cards: {
    type: Array,
  },
});
</script>

<style scoped>
</style>