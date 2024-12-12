<template>
  <header class="bg-white dark:bg-gray-800 fixed top-0 left-0 right-0 z-10">
    <div class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="flex flex-row gap-1">
          <div class="flex flex-col">
            <h1 class="text-xl font-semibold text-gray-600 dark:text-white">Material <span class="font-normal">Finder</span></h1>
            <h2 class="text-[10px] text-gray-600 flex justify-between" style="margin-top: -6px;"><a href="https://github.com/google/material-design-icons">by <span style="color: #4285F4;">G</span><span style="color: #EA4335;">o</span><span style="color: #FBBC05;">o</span><span style="color: #4285F4;">g</span><span style="color: #FBBC05;">l</span><span style="color: #EA4335;">e</span></a> <a href="https://github.com/exelban" style="margin-right: 2px;">by exelban</a></h2>
          </div>
        </div>
        <div class="flex-1 max-w-lg mx-4">
          <input
              v-model="searchQuery"
              @input="handleSearch"
              type="search"
              placeholder="Search icons..."
              class="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue"

const searchQuery = ref("")
const emit = defineEmits(["search"])

const handleSearch = () => {
  emit("search", searchQuery.value)
}
</script>