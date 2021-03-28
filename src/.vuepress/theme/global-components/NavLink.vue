<template>
  <RouterLink v-if="isInternal" :to="link" :exact="exact" @focusout.native="focusoutAction">
    {{ item.text }}
  </RouterLink>
  <a v-else :href="link" class="external" :target="target" :rel="rel" @focusout="focusoutAction">
    <span v-if="item.icon" class="w-em h-em inline-block align-middle relative -top-px">
      <component :is="item.icon" />
    </span>
    {{ item.text }}
    <OutboundLink v-if="!item.icon && isBlankTarget" />
  </a>
</template>

<script>
import { isExternal, isMailto, isTel, ensureExt } from '../util';

export default {
  name: 'NavLink',
  props: {
    item: {
      required: true,
    },
  },
  computed: {
    link() {
      return ensureExt(this.item.link);
    },
    exact() {
      return this.link === '/';
    },
    isNonHttpURI() {
      return isMailto(this.link) || isTel(this.link);
    },
    isBlankTarget() {
      return this.target === '_blank';
    },
    isInternal() {
      return !isExternal(this.link) && !this.isBlankTarget;
    },
    target() {
      if (this.isNonHttpURI) {
        return null;
      }
      if (this.item.target) {
        return this.item.target;
      }
      return isExternal(this.link) ? '_blank' : '';
    },
    rel() {
      if (this.isNonHttpURI) {
        return null;
      }
      if (this.item.rel === false) {
        return null;
      }
      if (this.item.rel) {
        return this.item.rel;
      }
      return this.isBlankTarget ? 'noopener noreferrer' : null;
    },
  },
  methods: {
    focusoutAction() {
      this.$emit('focusout');
    },
  },
};
</script>
