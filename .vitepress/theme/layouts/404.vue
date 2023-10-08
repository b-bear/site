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
          <a class="bg-beccy hover:bg-beccy-light text-white font-bold rounded text-lg p-4 inline-block" href="/">
            Take me home
          </a>
        </div>
      </Wrapper>
    </main>
  </div>
</template>

<script>
import { watch } from 'vue';
import { useRouter } from 'vitepress';
import Navbar from '@theme/components/Navbar.vue';
import Sidebar from '@theme/components/Sidebar.vue';
import Wrapper from '@theme/components/Wrapper.vue';

const emit = defineEmits(['toggle-sidebar']);

const router = useRouter();
const isSidebarOpen = ref(false);

watch(
  () => router.route.data.relativePath,
  (path) => {
    isSidebarOpen.value = false;
  }
);

const toggleSidebar = (to) => {
  isSidebarOpen.value = typeof to === 'boolean' ? to : !isSidebarOpen.value;
  emit('toggle-sidebar', isSidebarOpen.value);
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
