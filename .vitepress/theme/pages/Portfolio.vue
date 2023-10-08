<template>
  <Wrapper>
    <Content class="prose prose-lg max-w-none mx-auto p-2" />
    <div class="flex flex-wrap">
      <div
        class="w-full sm:w-1/2 pb-3 sm:p-3"
        :class="{ 'md:w-1/3 lg:w-1/4': !portfolioPage.frontmatter.featured }"
        v-for="portfolioPage in page.portfolioItems"
        :key="portfolioPage.url"
      >
        <PortfolioTile
          :class="[portfolioPage.frontmatter.featured ? 'pb-ratio1 text-2xl' : 'pb-ratio43 text-lg']"
          :href="portfolioPage.url"
          :title="portfolioPage.frontmatter.title"
          :image="getPageImageUrl(portfolioPage)"
        />
      </div>
    </div>
  </Wrapper>
</template>

<script setup>
import { useData } from 'vitepress';
import PortfolioTile from '../components/PortfolioTile.vue';
import Wrapper from '@theme/components/Wrapper.vue';
const { page } = useData();

const getPageImageUrl = (page) => {
  return page.frontmatter.featured ? page.frontmatter.featured_thumb || page.frontmatter.thumb : page.frontmatter.thumb;
};
</script>

<style lang="scss"></style>
