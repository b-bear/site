<template>
  <nav v-if="nav.length">
    <VpLink
      v-for="(item, index) in nav"
      :key="item.link + index"
      :href="item.link"
      class="hover:text-beccy text-lg mb-4 mr-4 last:mr-0"
      >{{ item.text }} <template v-if="item.icon" #icon><component :is="icons[item.icon]" /></template
    ></VpLink>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useData } from 'vitepress';
import VpLink from '../global-components/VpLink.vue';

import IconTwitter from '../global-components/IconTwitter.vue';
import IconLinkedin from '../global-components/IconLinkedin.vue';

const icons = {
  twitter: IconTwitter,
  linkedin: IconLinkedin,
};

const { theme } = useData();

const nav = computed(() => theme.value.nav || []);
</script>

<style lang="scss" scoped>
.router-link-exact-active[href='/'],
.router-link-active {
  @apply text-beccy;
}
</style>
