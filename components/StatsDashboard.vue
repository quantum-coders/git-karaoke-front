<template>
	<div>
		<div v-if="stats" class="row g-3">
			<!-- Example Cards -->
			<div class="col-sm-6 col-md-4">
				<div class="card text-center">
					<div class="card-body">
						<h5 class="card-title">Total Songs</h5>
						<p class="card-text fs-1">{{ stats.totalSongs }}</p>
					</div>
				</div>
			</div>

			<div class="col-sm-6 col-md-4">
				<div class="card text-center">
					<div class="card-body">
						<h5 class="card-title">Most Popular Style</h5>
						<p class="card-text fs-4">
							{{ stats.mostPopularStyle || 'N/A' }}
						</p>
					</div>
				</div>
			</div>

			<div class="col-sm-6 col-md-4">
				<div class="card text-center">
					<div class="card-body">
						<h5 class="card-title">Other Stats</h5>
						<p class="card-text">
							{{ stats.somethingElse || '...' }}
						</p>
					</div>
				</div>
			</div>
		</div>

		<div v-else class="alert alert-info">
			No stats available.
		</div>
	</div>
</template>

<script setup>

	const karaokeStore = useKaraokeStore();

	// For convenience, a computed to read store's stats
	const stats = computed(() => karaokeStore.stats);
</script>
