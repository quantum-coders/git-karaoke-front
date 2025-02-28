// ~/stores/tasks.store.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRuntimeConfig } from '#app'

export const useTasksStore = defineStore('tasksStore', () => {
  const { public: { apiURL } } = useRuntimeConfig()

  // STATE
  // Estructura: array de objetos { taskId, status, intervalId, ... }
  const tasks = ref([])

  // GETTER => filtra sólo las que siguen en PENDING
  const pendingTasks = computed(() => tasks.value.filter(t => t.status === 'PENDING' || t.status === 'TEXT_SUCCESS'))

  /**
   * Añade una tarea al array, si no existe.
   */
  const addTask = (taskId) => {
    const existing = tasks.value.find(t => t.taskId === taskId)
    if (!existing) {
      tasks.value.push({ taskId, status: 'PENDING', intervalId: null })
    }
  }

  /**
   * Remueve la tarea.
   */
  const removeTask = (taskId) => {
    tasks.value = tasks.value.filter(t => t.taskId !== taskId)
  }

  /**
   * Llama a la API para ver el estado de la tarea.
   */
  const fetchTaskStatus = async (taskId) => {
    try {
      const res = await $fetch(`${apiURL}/karaoke/tasks/${taskId}`)
      // res.data => { status: 'success', taskId, songStatus: 'PENDING'|'SUCCESS'|'FAILED'... }
      // Actualizar la store
      const idx = tasks.value.findIndex(t => t.taskId === taskId)
      if (idx >= 0) {
        tasks.value[idx].status = res.data.songStatus || 'UNKNOWN'
      }
      return res.data
    } catch (error) {
      console.error('fetchTaskStatus error =>', error)
      throw error
    }
  }

  /**
   * Inicia polling para una tarea dada (cada X ms).
   */
  const startPolling = (taskId, intervalMs = 10000) => {
    // Añade la tarea si no existe
    addTask(taskId)

    // Si ya existe un interval, no creamos otro
    const t = tasks.value.find(t => t.taskId === taskId)
    if (t && t.intervalId) {
      console.log('Polling ya estaba iniciado para', taskId)
      return
    }

    // Creamos el intervalo
    const intervalId = setInterval(async () => {
      try {
        const data = await fetchTaskStatus(taskId)
        // Si la canción se completó, paramos el polling
        const status = data.songStatus || 'UNKNOWN'
        if (status.includes('SUCCESS') || status.includes('COMPLETED') || status.includes('FAILED') || status.includes('ERROR')) {
          stopPolling(taskId)
        }
      } catch (err) {
        // Si hay error, paramos, o decides reintentar
        console.warn('Error en polling =>', err)
        stopPolling(taskId)
      }
    }, intervalMs)

    // Guardamos intervalId
    if (t) {
      t.intervalId = intervalId
    }
  }

  /**
   * Detiene el polling para la tarea.
   */
  const stopPolling = (taskId) => {
    const t = tasks.value.find(t => t.taskId === taskId)
    if (t && t.intervalId) {
      clearInterval(t.intervalId)
      t.intervalId = null
    }
  }

  return {
    tasks,
    pendingTasks,
    addTask,
    removeTask,
    fetchTaskStatus,
    startPolling,
    stopPolling
  }
})
