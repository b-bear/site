<template>
  <main class="pb-12 pt-12">
    <Wrapper>
      <Content class="prose prose-lg mx-auto" />
      <PageNav class="mt-12" v-bind="{ pageList }" />
    </Wrapper>
  </main>
</template>

<script>
import PageNav from '@theme/components/PageNav.vue';
import { getPageRelatives } from '@theme/util';
import Wrapper from '@theme/components/Wrapper.vue';

export default {
  name: 'DefaultPage',
  components: { PageNav, Wrapper },
  computed: {
    pageList() {
      return getPageRelatives(this.$site, this.$page);
    },
  },
};
</script>

