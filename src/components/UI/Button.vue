<script setup lang="ts">
withDefaults(defineProps<{
    type?: 'button' | 'submit' | 'reset';
}>(), {
    type: 'button',
});
</script>

<template>
    <button
        :type="type"
        class="inline-flex cursor-pointer items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-lg shadow-black/20 transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
    >
        <slot />
    </button>
</template>
