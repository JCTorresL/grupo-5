<script setup lang="ts">
import { LogOut } from '../features/auth/useAuth';
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import router from '../router';

const route = useRoute();

const isSidebarOpen = ref(false);
const menuButton = ref<HTMLButtonElement | null>(null);

const desktopQuery = window.matchMedia('(min-width: 1024px)');
const isDesktop = ref(desktopQuery.matches);

function closeSidebar(restoreFocus = true): void {
    if (!isSidebarOpen.value) {
        return;
    }

    isSidebarOpen.value = false;

    if (restoreFocus && !isDesktop.value) {
        void nextTick(() => menuButton.value?.focus());
    }
}

function toggleSidebar(): void {
    isSidebarOpen.value = !isSidebarOpen.value;
}

async function handleLogout(): Promise<void> {

    closeSidebar(false);
    await LogOut();
    router.push({ name: 'login' });

}

// Bloquea el scroll del fondo solo cuando el panel móvil está abierto.
watch(isSidebarOpen, (isOpen) => {
    document.body.style.overflow = isOpen && !isDesktop.value ? 'hidden' : '';
});

// Al navegar a otra sección, se cierra el panel en móvil.
watch(() => route.fullPath, () => closeSidebar());

function handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
        closeSidebar();
    }
}// Si se agranda la ventana hasta escritorio, se cierra el panel móvil.
function handleDesktopChange(event: MediaQueryListEvent): void {
    isDesktop.value = event.matches;

    if (event.matches) {
        closeSidebar();
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
    desktopQuery.addEventListener('change', handleDesktopChange);
});

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown);
    desktopQuery.removeEventListener('change', handleDesktopChange);
    document.body.style.overflow = '';
});
</script>

<template>
    <div class="flex min-h-dvh text-white">

        <Transition
            enter-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            leave-active-class="transition-opacity duration-200"
            leave-to-class="opacity-0"
        >
            <div
                v-if="isSidebarOpen"
                class="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden"
                aria-hidden="true"
                @click="closeSidebar()"
            />
        </Transition>

        <!-- Barra lateral -->
        <aside
            id="app-sidebar"
            class="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-white/10 bg-slate-950/90 backdrop-blur-xl transition-transform duration-300 ease-out lg:sticky lg:top-0 lg:z-auto lg:h-dvh lg:w-72 lg:translate-x-0"
            :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
            :inert="!isSidebarOpen && !isDesktop ? true : undefined"
        >
            <!-- Marca -->
            <div class="flex items-center justify-between gap-3 px-5 py-5">
                <RouterLink to="/dashboard" class="flex items-center gap-3" @click="closeSidebar()">
                    <span class="grid size-10 shrink-0 place-items-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-900/40">
                        <svg
                            class="size-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                            <path d="m3.3 7 8.7 5 8.7-5" />
                            <path d="M12 22V12" />
                        </svg>
                    </span>
                    <span class="flex flex-col leading-tight">
                        <span class="text-sm font-semibold">Jarvis</span>
                        <span class="text-xs text-white/50">Assistant</span>
                    </span>
                </RouterLink>

                <button
                    type="button"
                    class="grid size-9 cursor-pointer place-items-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 lg:hidden"
                    aria-label="Cerrar menú"
                    @click="closeSidebar()"
                >
                    <svg
                        class="size-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        aria-hidden="true"
                    >
                        <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Navegación -->
            <nav class="flex-1 overflow-y-auto px-3 py-2">
                <p class="px-3 pb-2 text-[11px] font-semibold tracking-wider text-white/40 uppercase">
                    Menú
                </p>

                <RouterLink
                    :to="{ name: 'dashboard' }"
                    exact-active-class="bg-blue-500/15 text-white ring-1 ring-blue-400/20 ring-inset"
                    class="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                    <svg
                        class="size-5 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    Chat
                </RouterLink>

                <RouterLink
                    :to="{ name: 'conversation' }"
                    exact-active-class="bg-blue-500/15 text-white ring-1 ring-blue-400/20 ring-inset"
                    class="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square-text preview-icon">
                        <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/>
                        <path d="M7 11h10"/><path d="M7 15h6"/>
                        <path d="M7 7h8"/>
                    </svg>
                    Conversaciones
                </RouterLink>

                <RouterLink
                    :to="{ name: 'order' }"
                    exact-active-class="bg-blue-500/15 text-white ring-1 ring-blue-400/20 ring-inset"
                    class="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-truck preview-icon">
                        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
                        <path d="M15 18H9"/>
                        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
                        <circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>
                    </svg>
                    Pedidos
                </RouterLink>
            </nav>

            <!-- Usuario y logout -->
            <div class="border-t border-white/10 p-3">
                <button
                    type="button"
                    class="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50"
                    @click="handleLogout"
                >
                    <svg
                        class="size-5 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" x2="9" y1="12" y2="12" />
                    </svg>
                    Cerrar sesión
                </button>
            </div>
        </aside>

        <!-- Columna principal -->
        <div class="flex min-w-0 flex-1 flex-col bg-slate-900">
            <!-- Barra superior móvil -->
            <header class="sticky top-0 z-30 flex items-center gap-3 border-b border-white/10 bg-slate-950/60 px-4 py-3 backdrop-blur-md lg:hidden">
                <button
                    ref="menuButton"
                    type="button"
                    class="grid size-10 cursor-pointer place-items-center rounded-lg text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    aria-label="Abrir menú"
                    aria-controls="app-sidebar"
                    :aria-expanded="isSidebarOpen"
                    @click="toggleSidebar"
                >
                    <svg
                        class="size-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        aria-hidden="true"
                    >
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <span class="text-sm font-semibold">Jarvis Assistant</span>
            </header>

            <main class="flex flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                <div class="mx-auto flex w-full max-w-6xl flex-1 flex-col">
                    <RouterView />
                </div>
            </main>
        </div>
    </div>
</template>
