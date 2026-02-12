<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
    <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform hover:scale-105 transition-transform duration-300">
      <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6 text-center">
        Hello World
      </h1>

      <p class="text-gray-600 text-center mb-6">
        Vue 3 + Tailwind CSS Demo
      </p>

      <div class="flex flex-col items-center gap-4">
        <button
          class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
          @click="count++"
        >
          Click me: {{ count }}
        </button>

        <p class="text-sm text-gray-500">
          Count: <span class="font-mono text-purple-600">{{ count }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional custom styles if needed */
</style>
