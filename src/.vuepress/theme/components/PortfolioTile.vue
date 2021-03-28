<template>
  <RouterLink
    class="block relative bg-cover bg-no-repeat bg-center rounded-md border overflow-hidden"
    :style="{ backgroundImage: `url(${$withBase(image)})` }"
    :to="to"
  >
    <slot>
      <div class="portfolio-cover">
        {{ title }}
      </div>
    </slot>
  </RouterLink>
</template>

<script>
export default {
  name: 'PortfolioTile',
  props: {
    to: {
      type: [String, Object],
    },
    title: {
      type: String,
    },
    image: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.portfolio-cover {
  @apply absolute bg-white bg-opacity-80 text-gray-700 font-bold transition-opacity text-center flex justify-center items-center p-em;
  @apply lg:inset-0 lg:hover:opacity-100 lg:opacity-0 w-full left-0 bottom-0;
}
</style>
