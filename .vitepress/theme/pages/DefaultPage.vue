<template>
  <main class="pb-12 pt-12">
    <Wrapper>
      <Content class="prose prose-lg mx-auto" />
      <PageNav class="mt-12" v-bind="{ pageList: page.portfolioItems }" />
    </Wrapper>
  </main>
</template>

<script setup>
import { useData } from 'vitepress';
import PageNav from '@theme/components/PageNav.vue';
import Wrapper from '@theme/components/Wrapper.vue';

const { page } = useData();
</script>
