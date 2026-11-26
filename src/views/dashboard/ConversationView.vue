<template>
    <div>
        <h2>Conversaciones</h2>

        <p>Cantidad de conversaciones: {{ conversations.length }}</p>
        <p>Total por voz: {{ voiceCount }}</p>
        <p>Total por texto: {{ textCount }}</p>

        <div>
            <label for="conversation-start">Fecha inicio</label>
            <input id="conversation-start" v-model="startDate" type="date">
        </div>

        <div>
            <label for="conversation-end">Fecha fin</label>
            <input id="conversation-end" v-model="endDate" type="date">
        </div>

        <p v-if="loading">Cargando conversaciones…</p>
        <p v-else-if="loadError" role="alert">{{ loadError }}</p>
        <p v-else-if="!filteredConversations.length">No hay conversaciones para mostrar.</p>

        <template v-else>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Fecha</th>
                        <th scope="col">Canal</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Intención</th>
                        <th scope="col">Resultado</th>
                        <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="conversation in visibleConversations" :key="conversation.id">
                        <td>{{ conversation.startedAt ?? '—' }}</td>
                        <td>{{ conversation.channel }}</td>
                        <td>{{ conversation.status }}</td>
                        <td>{{ conversation.intent }}</td>
                        <td>{{ conversation.result ?? '—' }}</td>
                        <td>
                            <button type="button" :disabled="detailLoading" @click="openConversation(conversation.id)">
                                Ver
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <button type="button" :disabled="page === 1" @click="page--">Anterior</button>
            <span>Página {{ page }} de {{ totalPages }}</span>
            <button type="button" :disabled="page === totalPages" @click="page++">Siguiente</button>
        </template>

        <p v-if="detailLoading" role="status">Cargando conversación…</p>
        <p v-if="detailError" role="alert">{{ detailError }}</p>

        <ConversationModal
            v-if="selectedConversation"
            :conversation="selectedConversation"
            @close="selectedConversation = null"
        />
    </div>
</template>

<script setup lang="ts">
import ConversationModal from '../../components/conversations/ConversationModal.vue';
import { getConversationById, getConversations } from '../../features/conversations/useConversation';

import { computed, onMounted, ref, watch } from 'vue';

const conversations = ref<Awaited<ReturnType<typeof getConversations>>>([]);
const startDate = ref('');
const endDate = ref('');
const page = ref(1);
const pageSize = 5;
const loading = ref(true);
const loadError = ref('');
const selectedConversation = ref<Awaited<ReturnType<typeof getConversationById>>>(null);
const detailLoading = ref(false);
const detailError = ref('');

const voiceCount = computed(() =>
    conversations.value.filter((conversation) => conversation.channel === 'voice' || conversation.channel === 'voz').length
);
const textCount = computed(() =>
    conversations.value.filter((conversation) => conversation.channel === 'text' || conversation.channel === 'texto').length
);

const filteredConversations = computed(() => conversations.value.filter((conversation) => {
    if (!startDate.value && !endDate.value) return true;
    if (typeof conversation.startedAt !== 'string') return false;

    const date = conversation.startedAt.slice(0, 10);
    return (!startDate.value || date >= startDate.value) &&
        (!endDate.value || date <= endDate.value);
}));

const totalPages = computed(() => Math.ceil(filteredConversations.value.length / pageSize));
const visibleConversations = computed(() => {
    const start = (page.value - 1) * pageSize;
    return filteredConversations.value.slice(start, start + pageSize);
});

watch([startDate, endDate], () => {
    page.value = 1;
});

const openConversation = async (id: string) => {
    detailLoading.value = true;
    detailError.value = '';

    try {
        selectedConversation.value = await getConversationById(id);
        if (!selectedConversation.value) detailError.value = 'La conversación ya no está disponible.';
    } catch {
        detailError.value = 'No se pudo cargar la conversación.';
    } finally {
        detailLoading.value = false;
    }
};

onMounted(async () => {
    try {
        conversations.value = await getConversations();
    } catch (error) {
        loadError.value = 'No se pudieron cargar las conversaciones.';
        console.error("No se pudieron cargar las conversaciones:", error);
    } finally {
        loading.value = false;
    }
})

</script>
