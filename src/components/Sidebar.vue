<template>
    <transition
        enter-active-class="transition-transform duration-200 ease-out"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-200 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
    >
      <aside v-show="isOpen" v-if="icon" @click.stop class="fixed overflow-y-auto z-20 right-0 top-0 bottom-0 w-90 bg-white dark:bg-neutral-900 shadow-xl w-full sm:w-[400px] flex flex-col">
        <div class="p-6 pr-4 pb-4 flex flex-row items-center justify-between">
          <p class="text-black dark:text-gray-200">{{ icon.name }}</p>
          <button @click="$emit('close')" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-700">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
          </button>
        </div>

        <div class="text-[12px] font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul class="flex -mb-px">
            <li class="w-full focus-within:z-10" v-if="icon.versions['regular']">
              <p class="cursor-pointer inline-block p-3 py-2 rounded-t-lg" @click="version='regular'" :class="{'active text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 text-blue-600 border-b-2 border-blue-600': version === 'regular', 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-b-2 border-transparent': version !== 'regular'}">Regular</p>
            </li>
            <li class="w-full focus-within:z-10" v-if="icon.versions['outlined']">
              <p class="cursor-pointer inline-block p-3 py-2 rounded-t-lg" @click="version='outlined'" :class="{'active text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 text-blue-600 border-b-2 border-blue-600': version === 'outlined', 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-b-2 border-transparent': version !== 'outlined'}">Outlined</p>
            </li>
            <li class="w-full focus-within:z-10" v-if="icon.versions['round']">
              <p class="cursor-pointer inline-block p-3 py-2 rounded-t-lg" @click="version='round'" :class="{'active text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 text-blue-600 border-b-2 border-blue-600': version === 'round', 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-b-2 border-transparent': version !== 'round'}">Round</p>
            </li>
            <li class="w-full focus-within:z-10" v-if="icon.versions['sharp']">
              <p class="cursor-pointer inline-block p-3 py-2 rounded-t-lg" @click="version='sharp'" :class="{'active text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 text-blue-600 border-b-2 border-blue-600': version === 'sharp', 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-b-2 border-transparent': version !== 'sharp'}">Sharp</p>
            </li>
            <li class="w-full focus-within:z-10" v-if="icon.versions['two-tone']">
              <p class="cursor-pointer inline-block p-3 py-2 rounded-t-lg" @click="version='two-tone'" :class="{'active text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 text-blue-600 border-b-2 border-blue-600': version === 'two-tone', 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-b-2 border-transparent': version !== 'two-tone'}">Two-tone</p>
            </li>
          </ul>
        </div>

        <div class="p-6 pt-0 mt-4 flex-1 flex flex-col gap-4">
          <div class="aspect-square bg-gray-100 dark:bg-neutral-800 rounded-md flex justify-center items-center">
            <div class="icon" :class="version" v-html="`&#x${fontCode(icon)};`" style="font-size: 120px;"></div>
          </div>

          <div>
            <label for="name" class="text-sm font-medium text-gray-900 dark:text-white mb-1 block">Name:</label>
            <div class="relative">
              <input id="name" type="text" class="col-span-6 bg-gray-100 text-gray-500 dark:bg-neutral-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" :value="icon.key" disabled readonly>
              <button @click="copyName" data-copy-to-clipboard-target="name" data-tooltip-target="tooltip-name" class="absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-neutral-700 rounded-full p-2 inline-flex items-center justify-center">
                <span id="default-icon-name"><svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#5f6368"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg></span>
                <span id="success-icon-name" class="hidden inline-flex items-center"><svg class="w-3.5 h-3.5 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg></span>
              </button>
            </div>
          </div>
          <div v-if="icon.category">
            <label for="category" class="text-sm font-medium text-gray-900 dark:text-white mb-1 block">Category:</label>
            <div class="relative">
              <input id="category" type="text" class="col-span-6 bg-gray-100 dark:bg-neutral-800 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" :value="icon.category" disabled readonly>
            </div>
          </div>
          <div>
            <label for="codepoint" class="text-sm font-medium text-gray-900 dark:text-white mb-1 block">Codepoint:</label>
            <div class="relative">
              <input id="codepoint" type="text" class="col-span-6 bg-gray-100 dark:bg-neutral-800 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" :value="fontCode(icon)" disabled readonly>
              <button @click="copyCodepoint" data-copy-to-clipboard-target="codepoint" data-tooltip-target="tooltip-codepoint" class="absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-neutral-700 rounded-full p-2 inline-flex items-center justify-center">
                <span id="default-icon-codepoint"><svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#5f6368"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg></span>
                <span id="success-icon-codepoint" class="hidden inline-flex items-center"><svg class="w-3.5 h-3.5 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg></span>
              </button>
            </div>
          </div>

        </div>

        <div class="flex flex-col" v-if="hasToDownload()">
          <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul class="flex -mb-px">
              <li class="w-full focus-within:z-10" v-if="'svg' in icon.versions[version]">
                <p class="cursor-pointer inline-block p-4 rounded-t-lg" @click="target='svg'" :class="{'active text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 text-blue-600 border-b-2 border-blue-600': target === 'svg', 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-b-2 border-transparent': target !== 'svg'}">SVG</p>
              </li>
              <li class="w-full focus-within:z-10" v-if="'png' in icon.versions[version]">
                <p class="cursor-pointer inline-block p-4 rounded-t-lg" @click="target='png'" :class="{'active text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 text-blue-600 border-b-2 border-blue-600': target === 'png', 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-b-2 border-transparent': target !== 'png'}">PNG</p>
              </li>
              <li class="w-full focus-within:z-10" v-if="'android' in icon.versions[version]">
                <p class="cursor-pointer inline-block p-4 rounded-t-lg" @click="target='android'" :class="{'active text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 text-blue-600 border-b-2 border-blue-600': target === 'android', 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-b-2 border-transparent': target !== 'android'}">Android</p>
              </li>
              <li class="w-full focus-within:z-10" v-if="'ios' in icon.versions[version]">
                <p class="cursor-pointer inline-block p-4 rounded-t-lg" @click="target='ios'" :class="{'active text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 text-blue-600 border-b-2 border-blue-600': target === 'ios', 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-b-2 border-transparent': target !== 'ios'}">iOS</p>
              </li>
            </ul>
          </div>
          <button class="m-6 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded flex flex-row" @click="download">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
            <span class="flex-1">Download</span>
          </button>
        </div>
      </aside>
    </transition>
</template>

<script setup>
import { ref } from "vue"

const target = ref("svg")
const version = ref("regular")
const props = defineProps({
  icon: Object,
  isOpen: Boolean
})

defineEmits({
  close: null
})

const download = () => {
  window.open(`https://api.serhiy.io/v1/material-finder/${props.icon.key}/${target.value}?version=${version.value}`)
}
const fontCode = (icon) => {
  return icon.versions[version.value].font
}
const hasToDownload = () => {
  return "svg" in props.icon.versions[version.value] || "png" in props.icon.versions[version.value] || "android" in props.icon.versions[version.value] || "ios" in props.icon.versions[version.value]
}

const copyCodepoint = () => {
  const $defaultIcon = document.getElementById('default-icon-codepoint')
  const $successIcon = document.getElementById('success-icon-codepoint')

  $defaultIcon.classList.add('hidden')
  $successIcon.classList.remove('hidden')

  navigator.clipboard.writeText(props.icon.codepoint)

  setTimeout(() => {
    $defaultIcon.classList.remove('hidden')
    $successIcon.classList.add('hidden')
  }, 1000)
}
const copyName = () => {
  const $defaultIcon = document.getElementById('default-icon-name')
  const $successIcon = document.getElementById('success-icon-name')

  $defaultIcon.classList.add('hidden')
  $successIcon.classList.remove('hidden')

  navigator.clipboard.writeText(props.icon.code)

  setTimeout(() => {
    $defaultIcon.classList.remove('hidden')
    $successIcon.classList.add('hidden')
  }, 1000)
}
</script>