<script setup lang="ts">
import InputSearch from '../../components/UI/InputSearch.vue';
import Recording from '../../components/UI/Recording.vue';

import { ref } from 'vue';

const isText = ref(true);

const onRecordingToggled = (isRecording: boolean) => {
    isText.value = isRecording;
};

</script>

<template>
    <section class="relative isolate flex min-h-0 flex-1 flex-col">
        <div class="h-0 flex-1 overflow-y-auto"></div>

        <div class="shrink-0 pt-4">
            <InputSearch v-if="isText" :is-recording="isText" @recording-toggled="onRecordingToggled" />

            <div v-else class="flex min-h-18 w-full items-center justify-end rounded-full border border-white/10 px-3 py-2">
                <Recording class="pointer-events-none absolute inset-y-0 left-0 w-full max-w-sm" />
                <button
                    type="button"
                    class="relative z-10 shrink-0 cursor-pointer rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600"
                    aria-label="Volver a escribir"
                    @click="isText = true"
                >

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square-text preview-icon">
                        <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/>
                        <path d="M7 11h10"/>
                        <path d="M7 15h6"/>
                        <path d="M7 7h8"/>
                    </svg>
                </button>
            </div>
        </div>
    </section>
</template>
