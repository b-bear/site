<template>
  <aside class="w-full max-w-xs fixed left-0 top-0 h-full overflow-hidden overflow-y-auto bg-white p-5">
    <RouterLink to="/" v-if="$site.themeConfig.logo">
      <img class="max-h-20 mb-8" :src="$withBase($site.themeConfig.logo)" :alt="$siteTitle" loading="lazy" />
      <span v-if="$siteTitle" class="sr-only"> {{ $siteTitle }} </span>
    </RouterLink>
    <NavLinks class="flex flex-col" />
  </aside>
</template>

<script>
import NavLinks from '@theme/components/NavLinks.vue';

export default {
  name: 'Sidebar',
  components: { NavLinks },
};
</script>
