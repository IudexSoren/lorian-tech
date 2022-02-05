<template>
  <div class="pb-3">
    <div class="flex gap-3 justify-between items-center w-full mb-3">
      <h3 class="text-lg text-primary font-bold">{{ filterName }}</h3>
      <button
        class="btn btn-secondary btn-sm"
        @click="onRemoveAllFilters(idFilter)"
      >
        <i class="fas fa-trash"></i>
      </button>
    </div>
    <div class="flex flex-wrap gap-1">
      <FilterTag
        v-for="(filter, index) of filters"
        :key="index"
        @on-remove="onRemove"
        :idFilter="idFilter"
        :index="index"
        :tagName="
          namesList ? namesList.find((n) => n.value === filter).name : filter
        "
      />
    </div>
  </div>
</template>

<script setup>
import FilterTag from "./FilterTag.vue";

const emit = defineEmits(["on-remove", "on-remove-all"]);

defineProps({
  idFilter: {
    type: Number,
    required: true,
  },
  filterName: {
    type: String,
    required: true,
  },
  filters: {
    type: Array,
    required: true,
  },
  namesList: {
    type: Array,
  },
});

const onRemove = (tagInfo) => {
  emit("on-remove", tagInfo);
};

const onRemoveAllFilters = (idFilter) => {
  emit("on-remove-all", idFilter);
};
</script>