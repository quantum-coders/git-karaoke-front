<template>
	<div class="container">
		<h2 class="mb-4">All Songs</h2>

		<!-- Filters or Search Example (Optional) -->
		<div class="row mb-3 g-2">
			<div class="col-sm-6 col-md-4">
				<input
					v-model="searchQuery"
					type="text"
					class="form-control"
					placeholder="Search by title..."
				/>
			</div>
			<div class="col-sm-6 col-md-4">
				<select v-model="styleFilter" class="form-select">
					<option value="">-- All Styles --</option>
					<option
						v-for="s in allStyles"
						:key="s"
						:value="s"
					>
						{{ s }}
					</option>
				</select>
			</div>
			<div class="col-sm-12 col-md-4 text-md-end">
				<button class="btn btn-primary w-100 w-md-auto" @click="applyFilters">
					Search
				</button>
			</div>
		</div>

		<!-- Loading Indicator -->
		<div v-if="isLoading" class="text-center my-5">
			<div class="spinner-border text-primary" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>

		<!-- Song List -->
		<SongList
			v-else
			:songs="filteredSongs"
		/>

		<!-- Simple Pagination Example -->
		<div class="text-center mt-4" v-if="totalSongs > limit">
			<button
				class="btn btn-outline-secondary me-2"
				:disabled="page === 1"
				@click="prevPage"
			>
				Previous
			</button>
			<button
				class="btn btn-outline-secondary"
				:disabled="(page * limit) >= totalSongs"
				@click="nextPage"
			>
				Next
			</button>
		</div>
	</div>
</template>

<script setup>

	const karaokeStore = useKaraokeStore();

	const isLoading = ref(true);
	const page = ref(1);
	const limit = 10;
	const totalSongs = ref(0);

	// Filters
	const searchQuery = ref('');
	const styleFilter = ref('');
	const allStyles = ref([]);

	// We'll do a local filter:
	const filteredSongs = computed(() => {
		let list = karaokeStore.songs;

		// Filter by search query
		if(searchQuery.value) {
			const q = searchQuery.value.toLowerCase();
			list = list.filter((song) => song.title.toLowerCase().includes(q));
		}

		// Filter by style
		if(styleFilter.value) {
			list = list.filter((song) => song.style === styleFilter.value);
		}

		return list;
	});

	onMounted(async () => {
		try {
			// Fetch all styles
			await karaokeStore.fetchStyles();
			allStyles.value = karaokeStore.styles;

			// Fetch initial songs
			await loadSongs();
		} catch(error) {
			console.error('Error in karaoke/index:', error);
		} finally {
			isLoading.value = false;
		}
	});

	async function loadSongs() {
		isLoading.value = true;
		const offset = (page.value - 1) * limit;
		await karaokeStore.fetchAllSongs({ limit, offset });
		// Fake a "total" or retrieve from response metadata if your API provides it
		totalSongs.value = 50;
		isLoading.value = false;
	}

	function prevPage() {
		if(page.value > 1) {
			page.value--;
			loadSongs();
		}
	}

	function nextPage() {
		if((page.value * limit) < totalSongs.value) {
			page.value++;
			loadSongs();
		}
	}

	function applyFilters() {
		// If you want to do server-side filtering, call fetchAllSongs(...) with parameters
		// Here we just rely on local computed filtering => "filteredSongs"
	}
</script>

<style lang="sass" scoped>

	.container
		padding-top: 100px

</style>