<template>
  <aside class="w-full max-w-xs fixed left-0 top-0 h-full overflow-hidden overflow-y-auto bg-white p-5">
    <a href="/" v-if="theme.logo">
      <img class="max-h-20 mb-8" :src="withBase(theme.logo)" :alt="site.siteTitle" loading="lazy" />
      <span v-if="site.siteTitle" class="sr-only"> {{ site.siteTitle }} </span>
    </a>
    <NavLinks class="flex flex-col" />
  </aside>
</template>

<script setup>
import { withBase, useData } from 'vitepress';
import NavLinks from '@theme/components/NavLinks.vue';

const { theme, site } = useData();
</script>
