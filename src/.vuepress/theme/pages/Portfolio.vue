<template>
  <Wrapper>
    <Content class="prose prose-lg max-w-none mx-auto p-2" />
    <div class="flex flex-wrap">
      <div
        class="w-full sm:w-1/2 pb-3 sm:p-3"
        :class="{ 'md:w-1/3 lg:w-1/4': !page.frontmatter.featured }"
        v-for="page in pageList"
        :key="page.path"
      >
        <PortfolioTile
          :class="[page.frontmatter.featured ? 'pb-ratio1 text-2xl' : 'pb-ratio43 text-lg']"
          :to="page.path"
          :title="page.title"
          :image="
            page.frontmatter.featured
              ? page.frontmatter.featured_thumb || page.frontmatter.thumb
              : page.frontmatter.thumb
          "
        />
      </div>
    </div>
  </Wrapper>
</template>

<script>
import { getPageRelatives } from '@theme/util';
import PortfolioTile from '@theme/components/PortfolioTile.vue';
import Wrapper from '@theme/components/Wrapper.vue';

export default {
  name: 'Portfolio',
  components: {
    Wrapper,
    PortfolioTile,
  },
  props: {
    page: {
      type: Object,
    },
  },
  computed: {
    internalPage() {
      return this.page || this.$page;
    },
    frontmatter() {
      return this.internalPage.frontmatter;
    },
    pageList() {
      return getPageRelatives(this.$site, this.internalPage);
    },
  },
};
</script>

<style lang="scss"></style>
