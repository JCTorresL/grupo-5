<template>
    <dialog ref="dialog" class="conversation-modal" aria-labelledby="conversation-detail-title" @close="emit('close')">
        <header>
            <h2 id="conversation-detail-title">Detalle de la conversación</h2>
            <form method="dialog">
                <button type="submit" autofocus>Cerrar</button>
            </form>
        </header>

        <dl>
            <dt>ID</dt><dd>{{ conversation.id }}</dd>
            <dt>Canal</dt><dd>{{ conversation.channel }}</dd>
            <dt>Estado</dt><dd>{{ conversation.status }}</dd>
            <dt>Intención</dt><dd>{{ conversation.intent }}</dd>
            <dt>Resultado</dt><dd>{{ conversation.result ?? '—' }}</dd>
            <dt>Inicio</dt><dd>{{ conversation.startedAt }}</dd>
            <dt>Fin</dt><dd>{{ conversation.endedAt ?? '—' }}</dd>
            <dt>Alertas</dt><dd>{{ alerts }}</dd>
        </dl>

        <section v-if="conversation.query">
            <h3>Consulta de inventario</h3>
            <dl>
                <dt>SKU</dt><dd>{{ conversation.query.sku }}</dd>
                <dt>Sucursal</dt><dd>{{ conversation.query.branch }}</dd>
                <dt>Unidades disponibles</dt><dd>{{ conversation.query.availableUnits }}</dd>
                <dt>ID del registro</dt><dd>{{ conversation.query.recordId }}</dd>
                <dt>Última actualización</dt><dd>{{ conversation.query.lastUpdated }}</dd>
            </dl>
        </section>

        <h3 id="conversation-messages-title">Mensajes</h3>
        <ol v-if="messages.length" class="messages" aria-labelledby="conversation-messages-title" tabindex="0">
            <li v-for="(message, index) in messages" :key="index">
                <strong>{{ message.role }}</strong>
                <p>{{ message.text }}</p>
            </li>
        </ol>
        <p v-else>Sin mensajes.</p>
    </dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import type { FirebaseConversation } from '../../features/conversations/useConversation';

const props = defineProps<{ conversation: FirebaseConversation }>();
const emit = defineEmits<{ close: [] }>();

const dialog = ref<HTMLDialogElement | null>(null);
const messages = computed(() => Object.values(props.conversation.messages ?? {}).filter((message) => message != null));
const alerts = computed(() => {
    const value = props.conversation.alerts;
    return Array.isArray(value) ? value.join(', ') || 'Sin alertas' : value ?? 'Sin alertas';
});

onMounted(() => dialog.value?.showModal());
</script>

<style scoped>
.conversation-modal {
    margin: auto;
    width: min(36rem, calc(100% - 2rem));
    max-height: 90dvh;
    overflow: auto;
    overflow-wrap: anywhere;
    padding: 1rem;
    background: white;
    color: #111;
    border: 1px solid #ccc;
}

.conversation-modal::backdrop {
    background: rgb(0 0 0 / 45%);
}

header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.75rem;
}

button {
    border: 1px solid #ccc;
    padding: 0.25rem 0.5rem;
}

dl {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 0.25rem 0.75rem;
    margin-bottom: 0.75rem;
}

h2, h3, dt {
    font-weight: 600;
}

.messages {
    max-height: min(16rem, 40vh);
    overflow-y: auto;
    padding: 0.75rem;
    border: 1px solid #ccc;
}

.messages li + li {
    margin-top: 0.75rem;
}

.messages p {
    white-space: pre-wrap;
}
</style>
