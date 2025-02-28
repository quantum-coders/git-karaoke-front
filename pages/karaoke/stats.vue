<template>
  <div class="container py-5">
    <h2 class="mb-4">Git Karaoke Stats</h2>

    <div v-if="isLoading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else>
      <StatsDashboard />
    </div>
  </div>
</template>

<script setup>

const karaokeStore = useKaraokeStore()
const isLoading = ref(true)

onMounted(async () => {
  try {
    await karaokeStore.fetchStats()
  } catch (error) {
    console.error('Error fetching stats:', error)
  } finally {
    isLoading.value = false
  }
})
</script>
