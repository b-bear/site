<template>
  <div :class="pageClasses">
    <Navbar @toggle-sidebar="toggleSidebar" @close-sidebar="isSidebarOpen = false" />
    <transition name="fade">
      <div
        v-if="isSidebarOpen"
        class="z-50 md:hidden fixed bg-black opacity-70 inset-0"
        @click="toggleSidebar(false)"
      />
    </transition>

    <Sidebar
      class="z-50 transition-transform transform md:-translate-x-full"
      :class="[isSidebarOpen ? '-translate-x-0' : '-translate-x-full']"
    />
    <Home v-if="$page.frontmatter.home" />
    <Portfolio v-else-if="$page.frontmatter.portfolio" />
    <DefaultPage v-else />
  </div>
</template>

<script>
import Home from '@theme/pages/Home.vue';
import Portfolio from '@theme/pages/Portfolio.vue';
import DefaultPage from '@theme/pages/DefaultPage.vue';
import Navbar from '@theme/components/Navbar.vue';
import Sidebar from '@theme/components/Sidebar.vue';

export default {
  name: 'Layout',

  components: {
    Home,
    Portfolio,
    DefaultPage,
    Sidebar,
    Navbar,
  },

  data() {
    return {
      isSidebarOpen: false,
    };
  },

  computed: {
    pageClasses() {
      return this.$page.frontmatter.pageClass;
    },
  },
  created() {
    const { baseCanonicalUrl } = this.$site.themeConfig;
    if (baseCanonicalUrl && typeof this.$ssrContext !== 'undefined') {
      const pagePath = this.$page.path.replace(/\.html$/, '');
      this.$ssrContext.userHeadTags += `<link rel="canonical" href="${baseCanonicalUrl}${pagePath}"/>`;
    }
  },
  mounted() {
    this.$router.afterEach(() => {
      this.isSidebarOpen = false;
    });
  },

  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen;
      this.$emit('toggle-sidebar', this.isSidebarOpen);
    },
  },
};
</script>

<style lang="scss">
@import '../styles/index';
html,
body {
  @apply text-gray-800;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
