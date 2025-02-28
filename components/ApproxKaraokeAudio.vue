<template>
	<audio
		ref="audioRef"
		:src="src"
		controls
		@loadedmetadata="handleLoadedMetadata"
		@timeupdate="handleTimeUpdate"
	>
		Your browser does not support the audio element.
	</audio>
</template>

<script setup>

	const props = defineProps({
		src: {
			type: String,
			required: true,
		},
	});

	const emits = defineEmits([ 'durationLoaded', 'timeUpdate' ]);

	const audioRef = ref(null);

	function handleLoadedMetadata() {
		if(!audioRef.value) return;
		const dur = audioRef.value.duration; // total length in seconds
		// Emit the total duration
		emits('durationLoaded', dur);
	}

	function handleTimeUpdate() {
		if(!audioRef.value) return;
		const current = audioRef.value.currentTime;
		emits('timeUpdate', current);
	}
</script>
