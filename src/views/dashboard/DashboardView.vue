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
    <section class="flex min-h-215 flex-1 flex-col">
        <!-- Zona de mensajes del chat (por ahora vacía). -->
        <div class="min-h-0 flex-1 overflow-y-auto">
            <div class="flex min-h-full flex-col">
            </div>
        </div>

        <!-- Entrada del chat, alineada al fondo de la pantalla. -->
        <div class="shrink-0 pt-4 pb-3 -mb-6 lg:-mb-8">
            <div v-if="isText">
                <InputSearch :is-recording="isText" @recording-toggled="onRecordingToggled" />
            </div>

            <div v-else class="space-y-2">
                <Recording />
                <button type="button" @click="isText = true" class="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square-text preview-icon">
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
