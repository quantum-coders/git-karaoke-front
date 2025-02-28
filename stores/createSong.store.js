// stores/createSong.store.js
import { defineStore } from 'pinia'
import { useRuntimeConfig } from '#app'

export const useCreateSongStore = defineStore('createSongStore', {
  state: () => ({
    isLoading: false,
    status: '', // 'pending', 'success', 'error', etc.
    error: null,
    createdSong: null
  }),
  actions: {
    async createSong(payload) {
      this.isLoading = true
      this.status = 'pending'
      this.error = null
      this.createdSong = null

      try {
        const { public: { apiURL } } = useRuntimeConfig()
        const res = await $fetch(`${apiURL}/karaoke`, {
          method: 'POST',
          body: payload
        })
        // Suppose the API returns { data: { song: {...} }, etc. }
        this.createdSong = res.data?.song
        this.status = 'success'
      } catch (err) {
        console.error('createSong error:', err)
        this.error = err?.data?.message || err.message
        this.status = 'error'
      } finally {
        this.isLoading = false
      }
    }
  }
})
