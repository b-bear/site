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
      class="z-50 transition-transform transform md:hidden"
      :class="[isSidebarOpen ? '-translate-x-0' : '-translate-x-full']"
    />
    <Portfolio v-if="page.frontmatter.portfolioHub" />
    <DefaultPage v-else />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter, useData } from 'vitepress';
import Portfolio from '@theme/pages/Portfolio.vue';
import DefaultPage from '@theme/pages/DefaultPage.vue';
import Navbar from '@theme/components/Navbar.vue';
import Sidebar from '@theme/components/Sidebar.vue';

const emit = defineEmits(['toggle-sidebar']);

const router = useRouter();
const isSidebarOpen = ref(false);

watch(
  () => router.route.data.relativePath,
  (path) => {
    isSidebarOpen.value = false;
  }
);

const { page } = useData();

const toggleSidebar = (to) => {
  isSidebarOpen.value = typeof to === 'boolean' ? to : !isSidebarOpen.value;
  emit('toggle-sidebar', isSidebarOpen.value);
};

const pageClasses = computed(() => {
  return page.value.frontmatter.pageClass;
});
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
