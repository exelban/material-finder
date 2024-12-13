<template>
  <div class="min-h-screen overflow-auto bg-white dark:bg-neutral-900">
    <Header @search="handleSearch" @click="handleCloseSidebar"/>
    <Grid :search-query="searchQuery" @select-icon="handleSelectIcon" @close="handleCloseSidebar"></Grid>
    <Sidebar :icon="selectedIcon" :is-open="isSidebarOpen" @close="handleCloseSidebar"/>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"

import Header from "./components/Header.vue"
import Grid from "./components/Grid.vue"
import Sidebar from "./components/Sidebar.vue"

const searchQuery = ref("")
const selectedIcon = ref(null)
const isSidebarOpen = ref(false)

const handleSelectIcon = (icon) => {
  selectedIcon.value = icon
  isSidebarOpen.value = true
}

const handleCloseSidebar = () => {
  isSidebarOpen.value = false
  setTimeout(() => {
    selectedIcon.value = null
  }, 300)
}

const handleSearch = (query) => {
  searchQuery.value = query
}

watch(isSidebarOpen, (val) => {
  const el = document.body
  if (val) el.classList.add("max-sm:overflow-hidden")
  else el.classList.remove("max-sm:overflow-hidden")
})
</script>