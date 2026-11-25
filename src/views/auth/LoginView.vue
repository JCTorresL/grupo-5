<script setup lang="ts">
import { reactive } from 'vue';
import router from '../../router/index.ts';

import Input from '../../components/UI/Input.vue';
import Button from '../../components/UI/Button.vue';

import { LogIn } from '../../features/auth/useAuth.ts';

const credentials = reactive({
    username: '',
    password: '',
});

function handleSubmit() {

    if (!credentials.username.trim() || !credentials.password) {
        return alert('Completa todos los campos.')
    }

    LogIn(credentials.username, credentials.password)
        .then(() => {
            router.push({ name: 'dashboard' });
        })
        .catch((error) => {
            console.error('Login failed:', error);
        });

}
</script>

<template>
    <div class="flex min-h-dvh w-full items-center justify-center px-4 py-8 sm:px-6">
        <div class="w-full max-w-[20rem] rounded-2xl border border-white/20 bg-white/15 p-5 text-white shadow-xl backdrop-blur-md sm:max-w-sm sm:p-8 md:max-w-md lg:max-w-lg lg:p-10 xl:max-w-xl xl:p-12">
            <h1 class="text-center text-xl font-bold sm:text-2xl lg:text-3xl">Login</h1>

            <form class="mt-6 space-y-4 sm:mt-8 sm:space-y-5 lg:mt-10 lg:space-y-6 xl:mt-12 xl:space-y-7" @submit.prevent="handleSubmit">
                <div class="space-y-1.5">
                    <label for="username" class="block text-sm font-medium">Usuario</label>
                    <Input id="username" v-model="credentials.username" autocomplete="username" placeholder="Ingresa tu usuario" />
                </div>

                <div class="space-y-1.5">
                    <label for="password" class="block text-sm font-medium">Contraseña</label>
                    <Input id="password" v-model="credentials.password" type="password" autocomplete="current-password" placeholder="Ingresa tu contraseña" />
                </div>

                <Button type="submit" class="w-full">Iniciar Sesión</Button>
            </form>
        </div>
    </div>
</template>
