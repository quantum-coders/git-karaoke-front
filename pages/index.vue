<template>
	<div class="landing-page">
		<!-- HERO SECTION -->
		<section class="hero-section d-flex align-items-center justify-content-center position-relative">
			<div class="hero-overlay" />
			<div class="video-wrapper">
				<iframe
					class="video"
					src="https://player.vimeo.com/video/1061567470?background=1"
					frameborder="0"
					allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
				></iframe>
			</div>
			<div class="container text-center position-relative">
				<img src="/images/octocat.png" class="logo" alt="Git Karaoke" />
				<h1 class="title text-white">Git Karaoke</h1>
				<p class="lead text-white mt-3">
					Transform your GitHub repo history into AI-generated music that rocks!
				</p>

				<!-- Contenedor que agrupa ambos botones en la misma fila -->
				<div class="mt-4 d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3">

					<fancy-button @click="handleCreateClick">
						<span class="d-flex align-items-center">
							<span class="icon p-3">
								<icon name="material-symbols:add-diamond" />
							</span>
							<span class="p-3">Create a New Song</span>
						</span>
					</fancy-button>
					<fancy-button @click.prevent="useRouter().push('/about')">
						<span class="d-flex align-items-center">
							<span class="icon p-3">
								<icon name="material-symbols:emoji-people" />
							</span>
							<span class="p-3">About Us</span>
						</span>
					</fancy-button>
				</div>
			</div>
		</section>

		<section class="py-5">
			<div class="container">
				<h2 class="songs-title mb-4 text-center">Latest Songs</h2>

				<div v-if="isLoading" class="text-center my-5">
					<div class="spinner-border text-primary" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
				</div>

				<div v-else>
					<!-- Se utiliza el componente SongList para mostrar las canciones -->
					<song-list :songs="recentSongs" />

					<div class="mt-4 text-center">
						<fancy-button @click.prevent="useRouter().push('/karaoke')">
							<span class="d-flex align-items-center">
								<span class="icon p-3">
									<icon name="material-symbols:emoji-people" />
								</span>
								<span class="p-3">View all songs</span>
							</span>
						</fancy-button>
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

<style lang="sass" scoped>

	.video-wrapper
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 100%
		padding-top: 56.25%

		.video
			position: absolute
			top: 0
			left: 0
			width: 100%
			height: 100%

	.logo
		width: 150px
		height: 150px
		margin-bottom: 1rem

	.icon
		border-right: 2px solid #9140F9
		transition: all 300ms

	button:hover .icon
		border-color: transparent

	.hero-section
		min-height: 80vh
		background: black
		position: relative
		overflow: hidden

		.lead
			width: 300px
			margin: 0 auto

		.hero-overlay
			position: absolute
			top: 0
			left: 0
			width: 100%
			height: 100%
			background: rgba(0, 0, 0, 0.25)
			z-index: 1

	.hero-section .container
		z-index: 2

	.songs-title
		font-size: 1.5rem
		color: #333
</style>