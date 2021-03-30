<template>
  <div>
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
    <main class="pb-12 pt-12">
      <Wrapper>
        <div class="prose prose-lg mx-auto text-center">
          <h1>404</h1>

          <p>How did we get here?</p>
        </div>
        <div class="mt-8 text-center">
          <RouterLink
            class="bg-beccy hover:bg-beccy-light text-white font-bold rounded text-lg p-4 inline-block"
            to="/"
          >
            Take me home
          </RouterLink>
        </div>
      </Wrapper>
    </main>
  </div>
</template>

<script>
import Home from '@theme/pages/Home.vue';
import Portfolio from '@theme/pages/Portfolio.vue';
import DefaultPage from '@theme/pages/DefaultPage.vue';
import Navbar from '@theme/components/Navbar.vue';
import Sidebar from '@theme/components/Sidebar.vue';
import Wrapper from '@theme/components/Wrapper.vue';

export default {
  name: 'Layout',

  components: {
    Wrapper,
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
