<script lang="ts" setup>
import { computed } from 'vue';
import { normalizeLink } from '../util';
import { isActive, isExternalVisitable } from '../util/shared';
import { useRoute } from 'vitepress';

const props = defineProps<{
  tag?: string;
  href?: string;
  target?: string;
  rel?: string;
}>();
const route = useRoute();
const tag = computed(() => props.tag ?? (props.href ? 'a' : 'span'));
const isExternal = computed(() => props.href && isExternalVisitable(props.href));

const isActiveLink = computed(() => isActive(route.path, props.href));
</script>

<template>
  <component
    :is="tag"
    class=""
    :class="{
      link: href,
      external: isExternal,
      'router-link-active': isActiveLink,
    }"
    :href="href ? normalizeLink(href) : undefined"
    :target="target ?? (isExternal ? '_blank' : undefined)"
    :rel="rel ?? (isExternal ? 'noreferrer' : undefined)"
  >
    <span v-if="$slots.icon" class="inline-block w-4 h-4 mr-1 align-middle"> <slot name="icon" /></span>

    <slot />
    <span v-if="!$slots.icon && isExternal" class="inline-block w-4 h-4 ml-1 align-middle">
      <span class="sr-only">(opens new window)</span></span
    >
  </component>
</template>
