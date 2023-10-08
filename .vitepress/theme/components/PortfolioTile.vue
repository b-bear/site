<template>
  <a
    class="block relative bg-cover bg-no-repeat bg-center rounded-md border overflow-hidden"
    :style="{ backgroundImage: `url(${backgroundImageUrl})` }"
    :href="href"
  >
    <slot>
      <div class="portfolio-cover">
        {{ title }}
      </div>
    </slot>
  </a>
</template>

<script setup>
import { withBase } from 'vitepress';
import { computed } from 'vue';

const props = defineProps({
  href: { type: String },
  title: { type: String },
  image: { type: String },
});
const backgroundImageUrl = computed(() => withBase(props.image));
</script>
<style lang="scss" scoped>
.portfolio-cover {
  @apply absolute bg-white bg-opacity-80 text-gray-700 font-bold transition-opacity text-center flex justify-center items-center p-em;
  @apply lg:inset-0 lg:hover:opacity-100 lg:opacity-0 w-full left-0 bottom-0;
}
</style>
