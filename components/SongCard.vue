<template>
	<div class="card h-100 shadow-lg border-0 overflow-hidden hover-scale">
		<img
			@click="goToDetail"
			v-if="song.cover_image_url"
			:src="song.cover_image_url"
			class="card-cover img-fluid"
			:alt="`${song.title} cover image`"
		/>
		<div class="card-body p-0 d-flex flex-column">
			<h5 class="card-title text-primary text-center fw-bold">{{ song.title }}</h5>
			<div class="card-text">
				<div class="col col-4">
					<strong>Style</strong> {{ song.style }}
				</div>
				<div class="col col-4">
					<strong>Status</strong>
					<div :class="statusClass">{{ song.status }}</div>
				</div>
				<div class="col col-4">
					<strong>Commits</strong> {{ song.commit_count }} commit{{ song.commit_count > 1 ? 's' : '' }}
				</div>
				<div class="col col-12">
					<strong>Repository</strong> {{ song.repository.full_name }}
				</div>
			</div>
			<div class="p-3">
				<button class="btn btn-outline-primary w-100" @click="goToDetail">
					<i class="bi bi-info-circle me-1"></i> See Details
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>

	const props = defineProps({
		song: {
			type: Object,
			required: true,
		},
	});

	const router = useRouter();

	function goToDetail() {
		router.push(`/karaoke/${ props.song.id }`);
	}

	// Computed para darle estilo al status con emojis y colores amigables
	const statusClass = computed(() => {
		switch(props.song.status.toLowerCase()) {
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

<style lang="sass" scoped>
	.hover-scale
		border-radius: 0.75rem
		transition: transform 0.3s

		&:hover
			transform: scale(1.03)

	.card-cover
		height: 220px
		object-fit: cover
		border-bottom: 1px solid rgba(0, 0, 0, 0.125)
		margin-bottom: 1rem
		cursor: pointer

	.card-title
		font-size: 1rem
		margin-bottom: 1rem

	.card-text
		display: flex
		flex-wrap: wrap
		padding: 1rem
		border-top: 1px solid rgba(0, 0, 0, 0.125)
		border-bottom: 1px solid rgba(0, 0, 0, 0.125)

		.col
			font-size: 0.9rem
			margin-bottom: 0.25rem

			strong
				font-size: 0.75rem
				display: block

</style>
