<script setup lang="ts">
import { onMounted } from 'vue';

/*
 * El widget de ElevenLabs necesita cargar su script externo.
 * Vue no permite etiquetas <script> dentro del <template>, así que se
 * inyecta una sola vez aquí y se evita duplicarlo en cada montaje.
 */
const SCRIPT_SRC = 'https://unpkg.com/@elevenlabs/convai-widget-embed';

onMounted(() => {
    if (document.querySelector('script[data-elevenlabs-convai]')) {
        return;
    }

    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.type = 'text/javascript';
    script.async = true;
    script.dataset.elevenlabsConvai = '';
    document.body.appendChild(script);
});
</script>

<template>
    <div>
        <elevenlabs-convai agent-id="agent_6401m830z5atf5dtww9arwpqf1yb" placement="bottom-left" variant="compact" mobile-fullscreen="false"></elevenlabs-convai>
    </div>
</template>

<style scoped>
elevenlabs-convai {
    position: absolute;
    inset: 0 3.5rem 0 0;
    z-index: 1;
    --el-overlay-padding: 0.5rem;
}
</style>
