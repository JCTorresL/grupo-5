<template>
    <div class="space-y-4">
        <h2 class="text-xl font-semibold">Pedidos</h2>

        <div>
            <p>Total de pedidos: {{ orders.length }}</p>
            <p>Total de completados: {{ completedCount }}</p>
            <p>Total de registrados: {{ registeredCount }}</p>
        </div>

        <div class="flex flex-col items-start gap-2">
            <label for="order-search">Buscar por ID o estado</label>
            <input
                id="order-search"
                v-model="search"
                type="search"
                placeholder="Ej. PED-DEMO-001"
                class="w-full max-w-sm rounded-lg border border-white/20 px-3 py-2"
            >
        </div>

        <p v-if="loading" role="status">Cargando pedidos…</p>
        <p v-else-if="loadError" role="alert">{{ loadError }}</p>
        <p v-else-if="!filteredOrders.length">No hay pedidos para mostrar.</p>

        <template v-else>
            <div class="overflow-x-auto rounded-lg border border-white/10">
                <table class="w-full whitespace-nowrap text-left text-sm [&_td]:px-4 [&_td]:py-3 [&_th]:px-4 [&_th]:py-3">
                    <thead class="bg-white/5">
                        <tr>
                            <th scope="col">Pedido</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Pago</th>
                            <th scope="col">Total</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-white/10">
                        <tr v-for="order in visibleOrders" :key="order.id">
                            <td>{{ order.id }}</td>
                            <td>{{ order.createdAt.slice(0, 10) }}</td>
                            <td>{{ order.orderStatus }}</td>
                            <td>{{ order.paymentStatus }}</td>
                            <td>{{ currency.format(order.totalPrice) }}</td>
                            <td>
                                <button
                                    type="button"
                                    class="rounded-md border border-white/20 px-3 py-1 enabled:hover:bg-white/10 disabled:opacity-50"
                                    :disabled="detailLoading"
                                    @click="openOrder(order.id)"
                                >
                                    Ver
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <nav aria-label="Paginación de pedidos" class="flex flex-wrap items-center gap-3 text-sm">
                <button
                    type="button"
                    class="rounded-md border border-white/20 px-3 py-1 enabled:hover:bg-white/10 disabled:opacity-50"
                    :disabled="page === 1"
                    @click="page--"
                >
                    Anterior
                </button>
                <span aria-live="polite">Página {{ page }} de {{ totalPages }}</span>
                <button
                    type="button"
                    class="rounded-md border border-white/20 px-3 py-1 enabled:hover:bg-white/10 disabled:opacity-50"
                    :disabled="page === totalPages"
                    @click="page++"
                >
                    Siguiente
                </button>
            </nav>
        </template>

        <p v-if="detailLoading" role="status">Cargando pedido…</p>
        <p v-if="detailError" role="alert">{{ detailError }}</p>

        <OrderModal
            v-if="selectedOrder"
            :order="selectedOrder"
            @close="selectedOrder = null"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import OrderModal from '../../components/orders/OrderModal.vue';
import { getOrderById, getOrders } from '../../features/orders/useOrders';

const orders = ref<Awaited<ReturnType<typeof getOrders>>>([]);
const search = ref('');
const page = ref(1);
const pageSize = 5;
const loading = ref(true);
const loadError = ref('');
const selectedOrder = ref<Awaited<ReturnType<typeof getOrderById>>>(null);
const detailLoading = ref(false);
const detailError = ref('');
const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' });

const completedCount = computed(() =>
    orders.value.filter((order) => order.orderStatus === 'entregado').length
);
const registeredCount = computed(() =>
    orders.value.filter((order) => order.orderStatus === 'registrado').length
);

const filteredOrders = computed(() => {
    const term = search.value.trim().toLowerCase();
    return orders.value.filter((order) =>
        order.id.toLowerCase().includes(term) || order.orderStatus.toLowerCase().includes(term)
    );
});

const totalPages = computed(() => Math.ceil(filteredOrders.value.length / pageSize));
const visibleOrders = computed(() => {
    const start = (page.value - 1) * pageSize;
    return filteredOrders.value.slice(start, start + pageSize);
});

watch(search, () => {
    page.value = 1;
});

const openOrder = async (id: string) => {
    detailLoading.value = true;
    detailError.value = '';

    try {
        selectedOrder.value = await getOrderById(id);
        if (!selectedOrder.value) detailError.value = 'El pedido ya no está disponible.';
    } catch {
        detailError.value = 'No se pudo cargar el pedido.';
    } finally {
        detailLoading.value = false;
    }
};

onMounted(async () => {
    try {
        orders.value = await getOrders();
    } catch (error) {
        loadError.value = 'No se pudieron cargar los pedidos.';
        console.error('No se pudieron cargar los pedidos:', error);
    } finally {
        loading.value = false;
    }
});
</script>
