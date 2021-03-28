<template>
  <nav v-if="nav.length">
    <NavLink
      v-for="(item, index) in nav"
      :key="item.link + index"
      :item="item"
      class="hover:text-beccy text-lg mb-4 mr-4 last:mr-0"
    />
  </nav>
</template>

<script>
export default {
  name: 'NavLinks',
  components: {},
  computed: {
    nav() {
      return this.$site.themeConfig.nav || [];
    },
  },
};
</script>

<style lang="scss" scoped>
.router-link-exact-active[href='/'],
.router-link-active {
  @apply text-beccy;
}
</style>
