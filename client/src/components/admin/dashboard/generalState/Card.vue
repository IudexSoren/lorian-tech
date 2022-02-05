<template>
  <div
    class="
      card
      w-full
      h-60
      rounded
      border border-gray-700
      bg-dark-blue
      relative
      cursor-pointer
    "
    v-if="idComponent && access[idComponent]"
    @click="onClick"
  >
    <div
      class="
        card-backdrop
        absolute
        w-full
        h-full
        top-0
        p-3
        flex flex-wrap
        justify-between
        content-between
      "
    >
      <h3 class="text-3xl flex-grow text-truncated w-80 w-3/4 font-bold">
        {{ title }}
      </h3>
      <h3
        class="text-3xl flex-grow-0 w-1/4 text-truncated text-right"
        v-if="data"
      >
        {{ data }}
      </h3>
      <div class="w-full">
        <button class="btn btn-primary btn-sm btn-block ml-auto" v-if="route">
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { access } from "@/helpers/customHooks/AuthHook";

const ROUTER = useRouter();

const props = defineProps({
  route: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  data: {
    type: String,
  },
  buttonText: {
    type: String,
  },
  idComponent: {
    type: Number,
  },
});

const onClick = () => {
  if (props.route) ROUTER.push(props.route);
};
</script>

<style scoped>
.card {
  max-height: 300px;
}

.card .card-backdrop {
  background: rgba(34, 43, 55, 0.2);
}

.card:hover .card-backdrop {
  backdrop-filter: brightness(130%);
  transition: backdrop-filter linear 0.3s;
}
</style>