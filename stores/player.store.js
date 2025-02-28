// ~/stores/player.store.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlayerStore = defineStore('playerStore', () => {
  const currentTrack = ref(null)     // { id, title, url, ... }
  const audio = ref(null)           // instancia de Audio() o howler
  const isPlaying = ref(false)

  // Iniciar reproducción
  const playTrack = (track) => {
    // stop anterior
    stop()

    currentTrack.value = track
    // Usamos nativo <Audio>:
    audio.value = new Audio(track.url)
    audio.value.play()
    isPlaying.value = true

    audio.value.onended = () => {
      isPlaying.value = false
      // Podrías reproducir la siguiente canción, etc.
    }
  }

  // Pausar
  const pause = () => {
    if (audio.value) {
      audio.value.pause()
      isPlaying.value = false
    }
  }

  // Reanudar
  const resume = () => {
    if (audio.value && !isPlaying.value) {
      audio.value.play()
      isPlaying.value = true
    }
  }

  // Detener
  const stop = () => {
    if (audio.value) {
      audio.value.pause()
      audio.value.currentTime = 0
      audio.value = null
    }
    isPlaying.value = false
    currentTrack.value = null
  }

  return {
    currentTrack,
    isPlaying,
    playTrack,
    pause,
    resume,
    stop
  }
})
