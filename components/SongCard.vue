<template>
  <div class="card h-100 shadow-lg border-0 overflow-hidden hover-scale">
    <!-- Imagen de cover con efecto de zoom al pasar el mouse -->
    <img
      v-if="song.cover_image_url"
      :src="song.cover_image_url"
      class="card-img-top img-fluid"
      :alt="`${song.title} cover image`"
    />
    <div class="card-body d-flex flex-column">
      <h5 class="card-title text-primary fw-bold">{{ song.title }}</h5>
      <p class="card-text">
        <span class="d-block">
          <i class="bi bi-music-note-beamed"></i>
          <strong>Style:</strong> {{ song.style }}
        </span>
        <span class="d-block">
          <i class="bi bi-emoji-smile"></i>
          <strong>Status:</strong>
          <span :class="statusClass">{{ song.status }}</span>
        </span>
        <span class="d-block">
          <i class="bi bi-github"></i>
          <strong>Repository:</strong> {{ song.repository.full_name }}
        </span>
        <span class="d-block">
          <i class="bi bi-pencil-square"></i>
          <strong>Commits:</strong> {{ song.commit_count }}
        </span>
      </p>
      <button class="btn btn-outline-primary mt-auto" @click="goToDetail">
        <i class="bi bi-info-circle me-1"></i> See Details
      </button>
    </div>
  </div>
</template>

<script setup>


const props = defineProps({
  song: {
    type: Object,
    required: true
  }
});

const router = useRouter();

function goToDetail() {
  router.push(`/karaoke/${props.song.id}`);
}

// Computed para darle estilo al status con emojis y colores amigables
const statusClass = computed(() => {
  switch (props.song.status.toLowerCase()) {
    case 'completed':
      return 'text-success fw-bold';
    case 'failed':
    case 'error':
      return 'text-danger fw-bold';
    case 'pending':
      return 'text-warning fw-bold';
    default:
      return 'text-secondary';
  }
});
</script>

<style scoped>
.hover-scale {
  border-radius: 0.75rem;
  transition: transform 0.3s;
}
.hover-scale:hover {
  transform: scale(1.03);
}
.card-img-top {
  height: 220px;
  object-fit: cover;
}
.card-title {
  margin-bottom: 0.5rem;
}
.card-text span {
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}
</style>
