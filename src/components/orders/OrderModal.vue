<template>
    <dialog ref="dialog" class="order-modal" aria-labelledby="order-detail-title" @close="emit('close')">
        <header>
            <h2 id="order-detail-title">Detalle del pedido</h2>
            <form method="dialog">
                <button type="submit" autofocus>Cerrar</button>
            </form>
        </header>

        <dl>
            <dt>ID</dt><dd>{{ order.id }}</dd>
            <dt>Conversación</dt><dd>{{ order.conversationId }}</dd>
            <dt>Fecha</dt><dd>{{ order.createdAt }}</dd>
            <dt>Estado del pedido</dt><dd>{{ order.orderStatus }}</dd>
            <dt>Estado del pago</dt><dd>{{ order.paymentStatus }}</dd>
            <dt>Método de entrega</dt><dd>{{ order.fulfillmentMethod }}</dd>
            <dt>Moneda</dt><dd>{{ order.currency }}</dd>
            <dt>Subtotal</dt><dd>{{ order.productsSubtotal }}</dd>
            <dt>Costo de envío</dt><dd>{{ order.deliveryFee }}</dd>
            <dt>Total</dt><dd>{{ order.totalPrice }}</dd>
        </dl>

        <section v-if="order.customer">
            <h3>Cliente</h3>
            <dl>
                <dt>Correo</dt><dd>{{ order.customer.email }}</dd>
                <dt>Teléfono</dt><dd>{{ order.customer.phone }}</dd>
                <dt>Dirección</dt><dd>{{ order.customer.address }}</dd>
            </dl>
        </section>

        <section v-if="order.dispatchBranch">
            <h3>Sucursal de despacho</h3>
            <dl>
                <dt>ID</dt><dd>{{ order.dispatchBranch.id }}</dd>
                <dt>Nombre</dt><dd>{{ order.dispatchBranch.name }}</dd>
                <dt>Correo</dt><dd>{{ order.dispatchBranch.email }}</dd>
            </dl>
        </section>

        <section>
            <h3 id="order-products-title">Productos</h3>
            <ul v-if="products.length" class="products" aria-labelledby="order-products-title" tabindex="0">
                <li v-for="(product, index) in products" :key="index">
                    <dl>
                        <dt>SKU</dt><dd>{{ product.sku }}</dd>
                        <dt>Nombre</dt><dd>{{ product.name }}</dd>
                        <dt>Talla</dt><dd>{{ product.size }}</dd>
                        <dt>Color</dt><dd>{{ product.color }}</dd>
                        <dt>Cantidad</dt><dd>{{ product.quantity }}</dd>
                        <dt>Precio unitario</dt><dd>{{ product.unitPrice }}</dd>
                    </dl>
                </li>
            </ul>
            <p v-else>Sin productos.</p>
        </section>
    </dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import type { Order } from '../../features/orders/orders.interface';

const props = defineProps<{ order: Order & { id: string } }>();
const emit = defineEmits<{ close: [] }>();

const dialog = ref<HTMLDialogElement | null>(null);
const products = computed(() => Object.values(props.order.products ?? {}).filter((product) => product != null));

onMounted(() => dialog.value?.showModal());
</script>

<style scoped>
.order-modal {
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

.order-modal::backdrop {
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

.products {
    max-height: min(16rem, 40dvh);
    overflow-y: auto;
}

.products li {
    border-top: 1px solid #ccc;
    padding-top: 0.5rem;
}
</style>
