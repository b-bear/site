<template>
  <Portfolio :page="portfolioPage" />
</template>

<script>
import Portfolio from '@theme/pages/Portfolio.vue';
export default {
  name: 'Home',
  components: {
    Portfolio,
  },
  computed: {
    portfolioPage() {
      return this.$site.pages.find((page) => page.regularPath === '/portfolio/');
    },
  },
};
</script>

