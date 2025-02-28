<template>
  <audio
    ref="audioRef"
    :src="src"
    controls
  >
    Your browser does not support the audio element.
  </audio>
</template>

<script setup>

const props = defineProps({
  src: String,
  title: String
})

const emits = defineEmits(['timeupdate', 'loadedmetadata'])

const audioRef = ref(null)

onMounted(() => {
  if (!audioRef.value) return

  // Listen for timeupdate
  audioRef.value.addEventListener('timeupdate', () => {
    emits('timeupdate', audioRef.value.currentTime)
  })

  // Listen for loadedmetadata
  audioRef.value.addEventListener('loadedmetadata', () => {
    emits('loadedmetadata', audioRef.value.duration)
  })
})
</script>
