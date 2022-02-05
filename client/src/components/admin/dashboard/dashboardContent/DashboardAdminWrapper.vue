<template>
  <div class="flex flex-col h-full xl:overflow-hidden">
    <div
      class="
        p-5
        flex flex-col
        w-full
        h-auto
        xl:h-full xl:grid
        admin-wrapper
        gap-5
        flex-grow
        xl:overflow-auto
      "
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
@media only screen and (min-width: 1280px) {
  .admin-wrapper {
    grid-template-columns: 400px 1fr;
  }
}
</style>
