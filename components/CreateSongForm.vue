<template>
	<div class="container my-4" style="max-width: 600px;">
		<h2 class="mb-4 fw-bold">🎤 Create New Song</h2>
		<!-- NEW: Informational alert about generation time -->
		<div class="alert alert-info mb-4" role="alert">
			<strong>Important:</strong> The generation process can take several minutes.
			Please do not close this window or navigate away while your song is being created.
			You will see real-time status updates: first the lyrics are generated, then the audio is rendered.
		</div>
		<!-- FORM -->
		<form @submit.prevent="handleSubmit" class="row g-3">
			<!-- Repo URL -->
			<div class="col-12">
				<label for="repoUrl" class="form-label fw-semibold">Repo URL</label>
				<input
					id="repoUrl"
					v-model="formData.repoUrl"
					type="text"
					class="form-control"
					placeholder="https://github.com/vercel/next.js"
					required
				/>
			</div>

			<!-- Time Range -->
			<div class="col-6">
				<label for="timeRange" class="form-label fw-semibold">Time Range</label>
				<select id="timeRange" v-model="formData.timeRange" class="form-select">
					<option value="day">Last Day</option>
					<option value="week">Last Week</option>
					<option value="month">Last Month</option>
					<option value="lastActivity">Last Activity</option>
				</select>
			</div>

			<!-- Music Style -->
			<div class="col-6">
				<label for="musicStyle" class="form-label fw-semibold">Music Style</label>
				<select
					id="musicStyle"
					v-model="selectedStyle"
					class="form-select"
					required
				>
					<!-- Opción para "elige un estilo" -->
					<option value="" disabled>-- Select a style --</option>

					<!-- Opciones que vienen de la store (styles) -->
					<option
						v-for="(style, index) in storeStyles"
						:key="index"
						:value="style"
					>
						{{ style }}
					</option>

					<!-- Opción para custom -->
					<option value="custom">Other / Custom</option>
				</select>
			</div>

			<!-- Input adicional si el usuario selecciona "custom" -->
			<div class="col-6" v-if="selectedStyle === 'custom'">
				<label for="customStyle" class="form-label fw-semibold">Custom Style</label>
				<input
					id="customStyle"
					v-model="customStyle"
					type="text"
					class="form-control"
					placeholder="e.g. Rap, Death Metal, etc."
				/>
			</div>

			<!-- Submit button -->
			<div class="col-12">
				<button
					class="btn btn-primary w-100 d-flex align-items-center justify-content-center"
					:disabled="loading"
				>
					<template v-if="loading">
						<span
							class="spinner-border spinner-border-sm me-2"
							role="status"
							aria-hidden="true"
						></span>
						Generating...
					</template>
					<template v-else>
						🚀 Generate Song
					</template>
				</button>
			</div>
		</form>

		<!-- Error message -->
		<transition name="fade">
			<div v-if="error" class="alert alert-danger mt-4" role="alert">
				⚠️ Error: {{ error }}
			</div>
		</transition>

		<!-- Loading message + Polling Info -->
		<transition name="fade">
			<div v-if="loading && !error" class="mt-4 text-center">
				<p class="text-muted fs-5">{{ pollingMessage }}</p>
			</div>
		</transition>

		<!-- Success message -->
		<transition name="fade">
			<div v-if="createdSongId && !loading" class="mt-4 text-center">
				<div class="alert alert-success" role="alert">
					<strong>Song created successfully!</strong>
				</div>
				<NuxtLink :to="`/karaoke/${createdSongId}`" class="btn btn-success">
					🎧 View Song Details
				</NuxtLink>
			</div>
		</transition>
	</div>
</template>

<script setup>

	// Access the store
	const store = useKaraokeStore();
	const router = useRouter();
	const selectedStyle = ref('');
	const customStyle = ref('');

	// Reactive form data
	const formData = ref({
		repoUrl: '',
		timeRange: 'lastActivity',
		musicStyle: 'Rap',
		instrumental: false,
		callbackUrl: typeof window !== 'undefined' ? window.location.origin : '',
	});

	// Computed store states
	const loading = computed(() => store.loading);
	const error = computed(() => store.error);
	const createdSongId = computed(() => store.createdSongId);
	// Nueva: estado parcial de la tarea
	const currentTaskInfo = computed(() => store.currentTaskInfo);
	// Computed para estilos que vienen del store
	const storeStyles = computed(() =>
		store.styles && store.styles.length
			? store.styles
			: [ 'Rap', 'Rock', 'Pop' ], // valores por defecto si no hay nada en la store
	);

	// Submit
	async function handleSubmit() {
		formData.value.musicStyle =
			selectedStyle.value === 'custom' ? customStyle.value : selectedStyle.value;
		await store.createSongAndPoll(formData.value);
	}

	onBeforeMount(async () => {
		store.resetStoreState();
		try {
			await store.fetchStyles(); // si tienes un endpoint para obtener estilos
		} catch(err) {
			console.error(err);
		}
	});

	const pollingMessage = computed(() => {
		if(!currentTaskInfo.value) {
			return '🚀 Initializing song generation...';
		}
		const st = currentTaskInfo.value.songStatus || 'PENDING';
		switch(st) {
			case 'PENDING':
				return '⏳ Hang tight... Song generation is pending...';
			case 'TEXT_SUCCESS':
				return '✍️ Lyrics generated! Now, audio is being prepared...';
			case 'FIRST_SUCCESS':
				return '🎧 Preview ready! Finalizing your epic track...';
			case 'SUCCESS':
			case 'COMPLETED':
				return '🎉 Boom! Your final song is ready!';
			case 'FAILED':
			case 'ERROR':
				return '🚨 Oops! Something went wrong with the generation. Please try again.';
			default:
				return `🔄 Current status: ${ st }`;
		}
	});

</script>

<style scoped>
	.fade-enter-active, .fade-leave-active {
		transition: opacity 0.5s;
	}

	.fade-enter-from, .fade-leave-to {
		opacity: 0;
	}
</style>
