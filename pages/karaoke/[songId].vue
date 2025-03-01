<template>
	<div class="container py-5">
		<div v-if="isLoading" class="text-center my-5">
			<div class="spinner-border text-primary" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>

		<div v-else-if="!currentSong">
			<div class="alert alert-warning">
				Song not found or an error occurred.
			</div>
		</div>
		<div v-else>
			<!-- Detailed Song Info -->
			<song-detail :song="currentSong" @reload="reloadSong" />

			<!--<hr class="my-4" />
			<button
				class="btn btn-outline-secondary"
				@click="reloadSong"
			>
				Reload Song
			</button>-->
		</div>
	</div>
</template>

<script setup>

	const route = useRoute();
	const karaokeStore = useKaraokeStore();
	const tasksStore = useTasksStore();

	const isLoading = ref(true);
	const currentSong = ref(null);

	onMounted(async () => {
		const { songId } = route.params;
		await loadSong(songId);
	});

	async function loadSong(songId) {
		try {
			isLoading.value = true;
			const data = await karaokeStore.fetchSongDetailed(songId);
			currentSong.value = data;

			// If the song is still pending, start polling the task
			if(data.status === 'pending' && data.suno_task_id) {
				tasksStore.startPolling(data.suno_task_id, 10000);
			}
		} catch(error) {
			console.error('Error loading song detail:', error);
		} finally {
			isLoading.value = false;
		}
	}

	function reloadSong() {
		if(currentSong.value) {
			loadSong(currentSong.value.id);
		}
	}
</script>
