<template>
  <header class="flex items-center p-6 border-b">
    <MobileMenuIcon class="cursor-pointer md:hidden w-8 h-8 mr-4" @click.native="$emit('toggle-sidebar')" />
    <div class="flex-1 text-center">
      <a href="/" v-if="theme.logo" class="inline-block">
        <img class="max-h-20" :src="withBase(theme.logo)" :alt="site.siteTitle" />
        <span v-if="site.siteTitle" class="sr-only"> {{ site.siteTitle }} </span>
      </a>

      <NavLinks class="hidden md:block mt-6" />
    </div>
  </header>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import { withBase } from 'vitepress';
import MobileMenuIcon from '@theme/components/MobileMenuIcon.vue';
import NavLinks from '@theme/components/NavLinks.vue';

import { useData } from 'vitepress';

const { site, theme } = useData();

const emit = defineEmits(['close-sidebar', 'toggle-sidebar']);

const escClose = (event) => {
  const { key } = event;
  if (key === 'Escape') {
    emit('close-sidebar');
  }
};
onMounted(() => {
  document.addEventListener('keydown', escClose);
});
onBeforeUnmount(() => {
  document.removeEventListener('keydown', escClose);
});
</script>
