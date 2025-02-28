import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRuntimeConfig } from '#app'

export const useConfigStore = defineStore('configStore', () => {
  const globalConfig = ref(null)
  const { public: { apiURL } } = useRuntimeConfig()

  /**
   * GET /karaoke/config
   * Obtiene la configuración global del sistema.
   */
  const fetchGlobalConfig = async () => {
    try {
      const res = await $fetch(`${apiURL}/karaoke/config`)
      // asumiendo que el servidor retorna un objeto con la propiedad `data`:
      // {
      //   "result": "success",
      //   "status": 200,
      //   "data": { defaultInstrumental: false, ... },
      //   "message": "Global karaoke config"
      // }
      globalConfig.value = res.data
    } catch (error) {
      console.error('fetchGlobalConfig error:', error)
      throw error
    }
  }

  return {
    globalConfig,
    fetchGlobalConfig
  }
})
