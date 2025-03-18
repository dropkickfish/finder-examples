<script setup lang="ts">
import { ref } from 'vue'
import { create, type OpeningOptions, type FrontifyAsset } from '@frontify/frontify-finder'

type Tag = {
  value: string
  source: string
}

type MetadataValue = {
  value: string | number
  metadataField: {
    id: string
    label: string
  }
}

const assets = ref<FrontifyAsset[]>([])
const isFinderOpen = ref(false)

const config: OpeningOptions = {
  clientId: 'client-id',
  options: {
    allowMultiSelect: false
  }
}

const handleButtonClick = async () => {
  isFinderOpen.value = true
  const finder = await create(config)
  finder.mount(document.getElementById('finder-container') as HTMLElement)
  finder.onAssetsChosen((selectedAssets: FrontifyAsset[]) => {
    console.log('assets', selectedAssets)
    assets.value = selectedAssets
  })
}
</script>

<template>
  <div class="flex flex-col w-full h-screen border border-black bg-white">
    <div class="grid grid-cols-1 md:grid-cols-3 h-full">
      <div class="flex flex-col border-r border-gray-300 h-full">
        <div class="p-6 border-b border-gray-300 bg-gray-100">
          <h1 class="text-lg font-bold uppercase">Frontify Finder</h1>
          <p class="text-sm mb-4">Vue 3 Typescript Example</p>

          <button :disabled="isFinderOpen" class="w-full bg-black text-white py-2 px-4 mb-4 uppercase rounded-sm" @click="handleButtonClick">
            Open Finder
          </button>

          <p class="text-sm">
            A simple example of how to use the Frontify Finder in a Vue 3 Typescript application.
            <br />
            <br />
            The finder is mounted in the right column and the selected asset will be displayed in the left column alongside the asset details using the <code>onAssetsChosen</code> event.
            <br />
            <br />
            Documentation can be found <a href="https://developer.frontify.com/d/xJoA5nhTq1AT/finder#/general/frontify-finder" target="_blank" rel="noopener noreferrer">on the Frontify Developer Portal</a>.
            <br />
            <br />
            The Finder GitHub repository can be found <a href="https://github.com/Frontify/frontify-finder" target="_blank" rel="noopener noreferrer">here</a>.
            <br />
            <br />
            The npm package can be found <a href="https://www.npmjs.com/package/@frontify/frontify-finder" target="_blank" rel="noopener noreferrer">here</a>.
          </p>
        </div>

        <div class="flex-grow bg-gray-100 overflow-y-auto p-4 h-0 min-h-0">
          <div v-for="asset in assets" :key="asset.id" class="mb-6 p-4 bg-white rounded shadow">
            <img :src="asset.previewUrl" :alt="asset.title" class="w-full mb-4 rounded"/>
            <h2 class="text-xl font-bold mb-2">Title: {{ asset.title }}</h2>
            <p class="mb-1">Description: {{ asset.description }}</p>
            <p class="mb-1">Type: {{ asset.type }}</p>
            <p class="mb-1">Extension: {{ asset.extension }}</p>
            <p class="mb-1">Author: {{ asset.author }}</p>
            <p class="mb-1">Creator: {{ asset.creator.name }}</p>
            <p class="mb-1">Created At: {{ asset.createdAt }}</p>
            <p class="mb-1">Expires At: {{ asset.expiresAt }}</p>
            <p class="mb-1">Copyright: {{ asset.copyright.status }} - {{ asset.copyright.notice }}</p>
            <p class="mb-1">Tags: 
              <span class="flex flex-wrap gap-1 mt-1">
                <span v-for="tag in asset.tags" :key="tag.value" class="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded-full">
                  {{ tag.value }}
                </span>
              </span>
            </p>
            
            <div class="mb-3">
              <p class="mb-1 font-medium">Metadata:</p>
              <template v-if="asset.metadataValues.length > 0">
                <table class="w-full text-sm border-collapse">
                  <thead>
                    <tr class="bg-gray-100">
                      <th class="text-left p-2 border border-gray-200">Metadata field</th>
                      <th class="text-left p-2 border border-gray-200">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="metadata in asset.metadataValues" :key="metadata.metadataField.id" class="border-b border-gray-200">
                      <td class="p-2 border border-gray-200">{{ metadata.metadataField.label }}</td>
                      <td class="p-2 border border-gray-200">{{ metadata.value }}</td>
                    </tr>
                  </tbody>
                </table>
              </template>
              <p v-else class="text-sm text-gray-500 italic">No metadata available</p>
            </div>
            
            <p class="mb-1">Download URL: <a :href="asset.downloadUrl" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Link to asset download</a></p>
            <p class="mb-1">Preview URL: <a :href="asset.previewUrl" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Link to asset preview</a></p>
          </div>
        </div>
      </div>

      <div class="col-span-2 h-full flex items-center justify-center" id="finder-container">
        <!-- Empty right column - will be populated with the finder -->
      </div>
    </div>
  </div>
</template>

<style>
/* Add any additional styles here if needed */
</style>
