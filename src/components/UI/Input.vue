<script setup lang="ts">
withDefaults(defineProps<{
    modelValue?: string | number;
    type?: string;
}>(), {
    type: 'text',
});

defineEmits<{
    'update:modelValue': [value: string];
}>();
</script>

<template>
    <input
        :type="type"
        :value="modelValue"
        class="w-full rounded-lg border border-white/30 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder-white/60 outline-none transition focus:border-white/60 focus:bg-white/15 focus:ring-2 focus:ring-white/30 sm:text-base"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
</template>
