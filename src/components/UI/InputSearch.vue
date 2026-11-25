<template>
    <div class="border border-white/10 rounded-full flex gap-2 px-3 py-2">
        <input type="text" class="w-full pl-1 focus:outline-none" placeholder="Buscar..." />
        <button class="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer" type="button" @click="toggleRecording">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mic preview-icon">
                <path d="M12 19v3"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <rect x="9" y="2" width="6" height="13" rx="3"/>
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    isRecording: {
        type: Boolean,
    }
});

const emit = defineEmits(['recording-toggled']);
const isRecording = ref(props.isRecording);

const toggleRecording = () => {
    isRecording.value = !isRecording.value;
    emit('recording-toggled', isRecording.value);
};

</script>

<style scoped>

</style>