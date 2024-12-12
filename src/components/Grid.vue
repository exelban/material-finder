<template>
  <main class="mt-20">
    <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-2 p-2">
      <div class="bg-white p-4 rounded-lg hover:bg-gray-100 transition-shadow cursor-pointer flex flex-col items-center"
          v-for="icon in filteredIcons"
          :key="icon.code"
          @click="$emit('select-icon', icon)"
      >
        <div class="w-12 h-12 rounded-full flex items-center justify-center mb-2">
          <div class="icon" v-html="`&#x${fontCode(icon)};`"></div>
        </div>
        <span class="text-sm font-medium text-gray-600 text-center">{{ icon.name }}</span>
      </div>
    </div>

    <div ref="target" class="h-4 w-full"></div>
  </main>
</template>

<script setup>
import {ref, computed, onBeforeMount} from "vue"
import {useIntersectionObserver} from "@vueuse/core"
const target = ref(null)
const icons = ref({})
const limit = ref(60)

const props = defineProps({
  searchQuery: String,
})
defineEmits(["select-icon", "close"])

const filteredIcons = computed(() => {
  if (!icons || !icons.value || !icons.value.length) return []
  return icons.value.filter(icon =>
      icon.name.toLowerCase().includes(props.searchQuery.toLowerCase())
  ).slice(0, limit.value)
})

const fontCode = (icon) => {
  if ("regular" in icon.versions && "font" in icon.versions["regular"]) return icon.versions["regular"].font
  else if ("outlined" in icon.versions && "font" in icon.versions["outlined"]) return icon.versions["outlined"].font
  else if ("round" in icon.versions && "font" in icon.versions["round"]) return icon.versions["round"].font
  else if ("sharp" in icon.versions && "font" in icon.versions["sharp"]) return icon.versions["sharp"].font
  else if ("two-tone" in icon.versions && "font" in icon.versions["two-tone"]) return icon.versions["two-tone"].font
}

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    limit.value += 60
  }
})

onBeforeMount(async () => {
  let response = await fetch("https://api.serhiy.io/v1/material-finder")
  icons.value = await response.json()
})
</script>