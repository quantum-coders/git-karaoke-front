// ~/stores/search.store.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRuntimeConfig } from '#app'

export const useSearchStore = defineStore('searchStore', () => {
  const { public: { apiURL } } = useRuntimeConfig()

  const query = ref('')
  const styleFilter = ref(null) // o 'Rock', 'Pop', etc.
  const statusFilter = ref(null) // 'pending', 'completed', etc.

  const results = ref([])

  const searchSongs = async () => {
    try {
      const params = {
        search: query.value || undefined,
        style: styleFilter.value || undefined,
        status: statusFilter.value || undefined
      }
      // Filtra undefined
      Object.keys(params).forEach(k => params[k] === undefined && delete params[k])

      const res = await $fetch(`${apiURL}/karaoke`, { query: params })
      results.value = res.data
    } catch (err) {
      console.error('searchSongs error =>', err)
      throw err
    }
  }

  const clearFilters = () => {
    query.value = ''
    styleFilter.value = null
    statusFilter.value = null
    results.value = []
  }

  return {
    query,
    styleFilter,
    statusFilter,
    results,
    searchSongs,
    clearFilters
  }
})
