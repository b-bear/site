<template>
  <Wrapper v-if="prev || next">
    <div class="flex">
      <VpLink class="hover:text-beccy text-lg pr-4" v-if="prev" :href="prev.url"
        >← {{ prev.frontmatter.title }}
      </VpLink>
      <span class="flex-1" />
      <VpLink class="hover:text-beccy text-lg pl-4 text-right" v-if="next" :href="next.url"
        >{{ next.frontmatter.title }} →</VpLink
      >
    </div>
  </Wrapper>
</template>

<script setup>
import { useData } from 'vitepress';
import Wrapper from '@theme/components/Wrapper.vue';
import VpLink from '../global-components/VpLink.vue';
import { computed } from 'vue';
import { ensureStartingSlash } from '../util';

const { page } = useData();

const currentIndex = computed(() => {
  return page.value.portfolioItems?.findIndex((pageNeedle) => {
    return ensureStartingSlash(page.value.filePath).startsWith(pageNeedle.url);
  });
});
const prev = computed(() => {
  return page.value.portfolioItems?.[currentIndex.value - 1];
});

const next = computed(() => {
  return page.value.portfolioItems?.[currentIndex.value + 1];
});
</script>
