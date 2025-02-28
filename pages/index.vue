<template>
	<div class="landing-page">
		<!-- HERO SECTION -->
		<section class="hero-section d-flex align-items-center justify-content-center position-relative">
			<!-- Overlay para oscurecer el fondo -->
			<div class="hero-overlay"></div>
			<div class="container text-center position-relative">
				<h1 class="display-3 fw-bold text-white">Git Karaoke</h1>
				<p class="lead text-white-50 mt-3">
					Transform your GitHub repo history into AI-generated music that rocks!
				</p>

				<!-- Contenedor que agrupa ambos botones en la misma fila -->
				<div class="mt-4 d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3">
					<!-- Botón principal para crear una nueva canción -->
					<button class="btn btn-danger btn-lg" @click="handleCreateClick">
						🎤 Create a New Song
					</button>
					<!-- Botón (NuxtLink) para ir al About -->
					<NuxtLink to="/about" class="btn btn-primary btn-lg">
						<icon name="mdi:information-outline" class="me-2" />
						About
					</NuxtLink>
				</div>
			</div>
		</section>

		<!-- LATEST SONGS SECTION -->
		<section class="py-5">
			<div class="container">
				<h2 class="mb-4 text-center">Latest Songs</h2>

				<div v-if="isLoading" class="text-center my-5">
					<div class="spinner-border text-primary" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
				</div>

				<div v-else>
					<!-- Se utiliza el componente SongList para mostrar las canciones -->
					<SongList :songs="recentSongs" />

					<div class="mt-4 text-end">
						<NuxtLink to="/karaoke" class="btn btn-outline-primary">
							<i class="bi bi-arrow-right-circle me-1"></i> View All Songs
						</NuxtLink>
					</div>
				</div>
			</div>
		</section>

	</div>
</template>
<script setup>

	const karaokeStore = useKaraokeStore();
	const isLoading = ref(true);

	// Se muestran las 3 canciones más recientes como "Latest"
	const recentSongs = computed(() => karaokeStore.songs.slice(0, 3));

	function handleCreateClick() {
		navigateTo('/create');
	}

	onMounted(async () => {
		try {
			// Fetch de canciones (limit 10, offset 0)
			await karaokeStore.fetchAllSongs({ limit: 10, offset: 0 });
		} catch(error) {
			console.error('Error fetching songs for landing page:', error);
		} finally {
			isLoading.value = false;
		}
	});
</script>

<style scoped>
	.hero-section {
		min-height: 80vh;
		background: url('/hero-background.jpg') no-repeat center center/cover;
		position: relative;
	}

	.hero-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5); /* Overlay oscuro para resaltar el texto */
		z-index: 1;
	}

	.hero-section .container {
		z-index: 2;
	}

	.landing-page {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}
</style>
