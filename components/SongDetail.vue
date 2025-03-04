<template>
	<div class="karaoke-song-detail py-4 position-relative">
		<!-- Header: Title and Status -->
		<div class="song-title mb-3 d-flex align-items-start justify-content-between">
			<div class="song-title-wrapper d-flex align-items-center gap-1">
				<img
					:src="song.cover_image_url"
					alt="Cover"
				/>
				<div>
					<h1>{{ song.title }}</h1>
					<div class="d-flex align-items-center gap-2 ps-2">
						<span class="badge bg-success">{{ song.status.toUpperCase() }}</span>
						<span class="badge bg-secondary">{{ song.style }}</span>
						<small class="text-muted">Song ID: {{ song.id }}</small>
					</div>
				</div>
			</div>

			<button
				class="btn btn-outline-secondary"
				@click="reloadSong"
			>
				Reload Song
			</button>
		</div>

		<!-- 2-column layout: LEFT = lyrics w/ highlight, RIGHT = meta info -->
		<div class="row gx-4 gy-4">
			<!-- LEFT COLUMN: Karaoke lyrics (approx highlight) -->
			<div class="col-12 col-lg-7">
				<!-- Approx Karaoke Card -->
				<div class="card">
					<div class="card-header text-white d-flex align-items-center">
						<icon name="material-symbols:lyrics" class="me-2" />
						Karaoke Lyrics
					</div>
					<div class="card-body">
						<canvas class="wave-visualizer" />

						<p class="text-white small fst-italic">
							Each line highlights for an equal slice of the audio's total duration.
						</p>
						<div class="lyrics-container text-white">
							<div
								v-for="(line, idx) in splittedLyrics"
								:key="idx"
								class="karaoke-line"
								:class="{ active: idx === currentLineIndex }"
								:style="getLineStyle(idx)"
							>
								{{ line }}
							</div>
						</div>
					</div>
				</div>

				<!-- Commits in Range -->
				<div
					v-if="song.commitsInRange && song.commitsInRange.length"
					class="card mb-4 shadow-sm"
				>
					<div class="card-header text-white d-flex align-items-center">
						<icon name="material-symbols:commit" class="me-2" />
						Commits in Range
					</div>
					<div class="card-body">
						<p>Found {{ song.commitsInRange.length }} commit(s):</p>
						<ul class="list-group list-group-flush">
							<li
								v-for="(commit, cidx) in song.commitsInRange"
								:key="cidx"
								class="list-group-item bg-transparent border-light text-white"
							>
								<p class="mb-1 fw-bold">{{ commit.message }}</p>
								<small class="text-muted">
									Author: {{ commit.author }} | Date: {{ commit.date }}
								</small>
							</li>
						</ul>
					</div>
				</div>

				<!-- Analysis Tasks -->
				<div
					v-if="song.analysis_tasks && song.analysis_tasks.length"
					class="card mb-4 shadow-sm"
				>
					<div class="card-header text-white d-flex align-items-center">
						<icon name="material-symbols:analysis" class="me-2" />
						Analysis Tasks
					</div>
					<div class="card-body">
						<p>Found {{ song.analysis_tasks.length }} analysis task(s):</p>
						<ul class="list-group list-group-flush">
							<li
								v-for="(task, idx) in song.analysis_tasks"
								:key="idx"
								class="list-group-item bg-transparent border-light text-white"
							>
								<strong>Task #{{ idx + 1 }}:</strong> {{ task.description || 'No Description' }}
							</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- RIGHT COLUMN: Repo, Time Range, Cover, Extra Info, Additional Audio -->
			<div class="col-12 col-lg-5">
				<!-- Repository Info -->
				<div class="card mb-4 shadow-sm text-white">
					<div class="card-header d-flex align-items-center justify-content-between">
						<div class="d-flex align-items-center gap-2">
							<icon name="mdi:github" />
							Repository
						</div>

						<a
							:href="song.repository.url"
							target="_blank"
							class="btn btn-outline-light d-inline-flex align-items-center btn-sm"
						>
							<icon name="material-symbols:open-in-new" class="me-1" />
							Open Repo
						</a>
					</div>
					<div class="card-body text-white">
						<p class="h5 mb-1">{{ song.repository.full_name }}</p>
						<div class="row">
							<div class="col-6">
								<div class="data-chunk">
									<strong>Owner</strong> {{ song.repository.owner }}
								</div>
							</div>
							<div class="col-6">
								<div class="data-chunk">
									<strong>Private</strong> {{ song.repository.is_private ? 'Yes' : 'No' }}
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Time Range & Commits -->
				<div class="card time-range mb-4 shadow-sm text-white">
					<div class="card-header text-white d-flex align-items-center">
						<icon name="material-symbols:timer" class="me-2" />
						Time Range & Commits
					</div>
					<div class="card-body text-white">
						<div class="row">
							<div class="col-6">
								<div class="data-chunk">
									<strong>Start</strong> {{ moment(song.time_range?.start).format('lll') }}
								</div>
							</div>
							<div class="col-6">
								<div class="data-chunk">
									<strong>End</strong> {{ moment(song.time_range?.end).format('lll') }}
								</div>
							</div>
							<div class="col-6">
								<div class="data-chunk">
									<div class="d-flex align-items-center">
										<icon name="material-symbols:commit" class="me-1" />
										<strong>Commits</strong>
									</div>
									{{ song.commit_count }} commit{{ song.commit_count > 1 ? 's' : '' }}
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Cover Image -->
				<div v-if="song.cover_image_url" class="mb-4 text-center">
					<img
						:src="song.cover_image_url"
						alt="Cover"
						class="img-fluid cover-image w-100"
					/>
				</div>

				<!-- Additional Audio Files -->
				<div
					v-if="otherAudioFiles.length"
					class="card mb-4 shadow-sm text-white"
				>
					<div class="card-header text-white">
						<icon name="material-symbols:playlist-play" class="me-2" />
						Song variations
					</div>
					<div class="card-body">
						<div
							v-for="audio in otherAudioFiles"
							:key="audio.id"
						>
							<div class="d-flex justify-content-between align-items-center">
								<span class="filename">
									<icon name="material-symbols:headphones" class="me-1" />
									{{ audio.filename }}
								</span>
								<small class="text-muted">
									{{ audio.file_type.toUpperCase() }}
								</small>
							</div>

							<vue-sound
								show-download
								:file="audio.url"
							/>

							<!--<AudioPlayer
								:src="audio.url"
								:title="song.title"
								class="mt-2"
							/>-->
						</div>
					</div>
				</div>

				<!-- Extra Info -->
				<div class="card extra-info mb-4 shadow-sm text-white">
					<div class="card-header text-white d-flex align-items-center">
						<icon name="material-symbols:info" class="me-2" />
						Extra Info
					</div>
					<div class="card-body">
						<div class="row">
							<div class="col-6">
								<div class="data-chunk">
									<strong>Created</strong> {{ moment(song.created_at).format('lll') }}
								</div>
							</div>
							<div class="col-6">
								<div class="data-chunk">
									<strong>Updated</strong> {{ moment(song.updated_at).format('lll') }}
								</div>
							</div>
							<div class="col-6">
								<div class="data-chunk">
									<strong>Completed</strong>
									{{ song.completed_at ? moment(song.completed_at).format('lll') : 'N/A' }}
								</div>
							</div>
							<div class="col-6">
								<div class="data-chunk">
									<strong>Task ID</strong> {{ song.suno_task_id }}
								</div>
							</div>
							<div class="col-6">
								<div class="data-chunk">
									<strong>Instrumental</strong> {{ song.instrumental ? 'Yes' : 'No' }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Pinned Mini Player at the Bottom -->
		<div
			v-if="pinnedAudioFile"
			class="pinned-player"
		>
			<div>
				<icon name="material-symbols:headphones" class="me-2" />
				<strong>{{ pinnedAudioFile.filename }}</strong>
			</div>

			<vue-sound
				show-download
				:file="pinnedAudioFile.url"
			/>

			<!-- The same AudioPlayer, but we also listen to 'timeupdate' & 'loadedmetadata' here -->
			<!--<audio-player
				:src="pinnedAudioFile.url"
				:title="song.title"
				@timeupdate="onTimeUpdate"
				@loadedmetadata="onLoadedMetadata"
			/>-->
		</div>
	</div>
</template>

<script setup>
	import { VueSound } from 'vue-sound';
	import moment from 'moment-timezone';

	const props = defineProps({
		song: {
			type: Object,
			required: true,
		},
	});

	const emit = defineEmits([ 'reload' ]);

	const splittedLyrics = computed(() => {
		if(!props.song.lyrics) return [];
		return props.song.lyrics.split('\n');
	});

	const pinnedAudioFile = computed(() => {
		const f = props.song.audio_files;
		return (f && f.length) ? f[0] : null;
	});

	const otherAudioFiles = computed(() => {
		const f = props.song.audio_files;
		if(!f || f.length < 2) return [];
		return f.slice(1);
	});

	// Time-based highlight logic
	const totalDuration = ref(0);
	const currentTime = ref(0);
	const currentLineIndex = ref(-1);

	/** Called from AudioPlayer when metadata loaded => get total duration */
	const onLoadedMetadata = (dur) => { totalDuration.value = dur; };

	/** Called from AudioPlayer on each timeupdate => approximate highlight */
	const onTimeUpdate = (time) => {
		currentTime.value = time;
		approximateHighlight();
	};

	/** Approximate highlight => each line = totalDuration / lineCount */
	const approximateHighlight = () => {
		const lines = splittedLyrics.value;
		if(!lines.length || !totalDuration.value) {
			currentLineIndex.value = -1;
			return;
		}
		const lineDuration = totalDuration.value / lines.length;
		const i = Math.floor(currentTime.value / lineDuration);
		currentLineIndex.value = Math.min(i, lines.length - 1);
	};

	/** For fade-in lines (like your old snippet) => each line has a small delay. */
	const getLineStyle = (idx) => {
		const delaySec = 0.1 + idx * 0.05;
		return { animationDelay: `${ delaySec }s` };
	};

	const reloadSong = () => { emit('reload'); };
</script>

<style lang="sass" scoped>

	.song-title
		.song-title-wrapper
			h1
				font-size: 2rem

			img
				width: 80px
				height: 80px
				object-fit: cover
				border-radius: 6px

	.data-chunk
		margin-bottom: 0.5rem

		strong
			font-size: 0.75rem
			display: block
			font-weight: normal

	.card
		background: black

	.card-header
		border-bottom: 1px solid rgba(255, 255, 255, 0.25)

	.filename
		display: block
		overflow: hidden
		text-overflow: ellipsis
		white-space: nowrap

	audio
		width: 100%

	.karaoke-song-detail
		position: relative
		color: black
		min-height: 100vh

	.karaoke-line
		opacity: 0
		animation: fadeInLine 0.8s forwards ease-out
		margin-bottom: 4px
		transition: background-color 0.2s, transform 0.2s, text-shadow 0.2s

		&.active
			background-color: rgba(255, 255, 255, 0.15)
			text-shadow: 0 0 8px #fff
			transform: scale(1.03)
			font-weight: bold
			border-radius: 4px

	.pinned-player
		position: fixed
		bottom: 37px
		right: 0
		padding: 0.5rem
		width: 100%
		z-index: 999
		color: white
		background: black

	.cover-image
		border: 1px solid #fff
		border-radius: 6px

	@keyframes fadeInLine
		to
			opacity: 1
</style>