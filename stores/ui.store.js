// ~/stores/ui.store.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('uiStore', () => {
  // Ejemplo: control de modal global
  const isCreateSongModalOpen = ref(false)

  // Ejemplo: array de notificaciones
  const notifications = ref([]) // { id, type, message }

  // Ejemplo: spinner global
  const isLoading = ref(false)

  // Métodos para modal
  const openCreateSongModal = () => { isCreateSongModalOpen.value = true }
  const closeCreateSongModal = () => { isCreateSongModalOpen.value = false }

  // Métodos para notificaciones
  const addNotification = (type, message) => {
    const id = Date.now()
    notifications.value.push({ id, type, message })
    // Podrías hacer que se autodestruya tras X segundos
  }

  const removeNotification = (id) => {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }

  // Manejo de loading
  const setLoading = (val) => {
    isLoading.value = val
  }

  return {
    // state
    isCreateSongModalOpen,
    notifications,
    isLoading,

    // actions
    openCreateSongModal,
    closeCreateSongModal,
    addNotification,
    removeNotification,
    setLoading
  }
})
