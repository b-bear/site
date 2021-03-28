<template>
  <header class="flex items-center p-6 border-b">
    <MobileMenuIcon class="cursor-pointer md:hidden w-8 h-8 mr-4" @click.native="$emit('toggle-sidebar')" />
    <div class="flex-1 text-center">
      <RouterLink to="/" v-if="$site.themeConfig.logo" class="inline-block">
        <img class="max-h-20" :src="$withBase($site.themeConfig.logo)" :alt="$siteTitle" />
        <span v-if="$siteTitle" class="sr-only"> {{ $siteTitle }} </span>
      </RouterLink>

      <NavLinks class="hidden md:block mt-6" />
    </div>
  </header>
</template>

<script>
import MobileMenuIcon from '@theme/components/MobileMenuIcon.vue';
import NavLinks from '@theme/components/NavLinks.vue';

export default {
  name: 'Navbar',
  components: {
    MobileMenuIcon,
    NavLinks,
  },
  mounted() {
    document.addEventListener('keydown', this.escClose);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.escClose);
  },
  methods: {
    escClose(event) {
      const { key } = event;
      if (key === 'Escape') {
        this.$emit('close-sidebar');
      }
    },
  },
};
</script>
