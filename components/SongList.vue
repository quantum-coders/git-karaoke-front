<template>
	<div class="row g-3">
		<div
			v-for="song in songs"
			:key="song.id"
			class="col-sm-6 col-md-4 col-lg-3"
		>
			<song-card :song="song" />
		</div>
	</div>
</template>

<script setup>

	const props = defineProps({
		songs: {
			type: Array,
			default: () => [],
		},
	});
</script>
