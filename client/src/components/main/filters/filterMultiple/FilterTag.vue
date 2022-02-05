<template>
  <div
    class="
      p-1
      rounded
      bg-
      text-white
      flex
      gap-2
      items-center
      p-2
      border border-gray-700
      bg-dark-gray
      cursor-pointer
    "
    @click="onRemove(idFilter, index)"
    title="Click para remover este filtro"
  >
    <span class="font-bold">{{ tagName }}</span>
    <span
      class="
        h-5
        w-5
        rounded-full
        bg-white
        flex
        items-center
        justify-center
        text-sm
      "
    >
      <i class="fas fa-times text-black"></i>
    </span>
  </div>
</template>

<script setup>
const emit = defineEmits(["on-remove"]);

defineProps({
  index: {
    type: Number,
    required: true,
  },
  tagName: {
    type: String,
    required: true,
  },
  idFilter: {
    type: Number,
    required: true,
  },
});

const onRemove = (idFilter, index) => {
  emit("on-remove", {
    idFilter,
    index,
  });
};
</script>