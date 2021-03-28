<template>
  <Wrapper v-if="prev || next">
    <div class="flex">
      <NavLink class="hover:text-beccy text-lg pr-4" v-if="prev" :item="{ text: `← ${prev.title}`, link: prev.path }" />
      <span class="flex-1" />
      <NavLink
        class="hover:text-beccy text-lg pl-4 text-right"
        v-if="next"
        :item="{ text: `${next.title} →`, link: next.path }"
      />
    </div>
  </Wrapper>
</template>

<script>
import Wrapper from '@theme/components/Wrapper.vue';
export default {
  name: 'PageNav',
  components: {
    Wrapper,
  },
  name: 'PageNav',
  props: ['pageList'],
  computed: {
    currentIndex() {
      return this.pageList.findIndex((page) => this.$page.path === page.path);
    },
    prev() {
      return this.pageList?.[this.currentIndex - 1];
    },

    next() {
      return this.pageList?.[this.currentIndex + 1];
    },
  },
};
</script>

