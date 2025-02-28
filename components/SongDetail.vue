<template>
	<div class="karaoke-song-detail py-4 position-relative">
		<!-- Subtle radial background -->
		<div class="karaoke-bg"></div>

		<!-- Header: Title and Status -->
		<div class="row align-items-center mb-3">
			<div class="col">
				<h1 class="fw-bold mb-0 d-flex align-items-center">
					<icon name="material-symbols:music-note" class="me-2" />
					{{ song.title }}
				</h1>
				<small class="text-muted">Song ID: {{ song.id }}</small>
			</div>
			<div class="col-auto text-end">
				<span class="badge bg-success me-2">{{ song.status.toUpperCase() }}</span>
				<span class="badge bg-secondary">{{ song.style }}</span>
			</div>
		</div>

		<!-- 2-column layout: LEFT = lyrics w/ highlight, RIGHT = meta info -->
		<div class="row gx-4 gy-4">
			<!-- LEFT COLUMN: Karaoke lyrics (approx highlight) -->
			<div class="col-12 col-lg-7">
				<!-- Approx Karaoke Card -->
				<div class="card bg-dark mb-4 shadow-sm">
					<div class="card-header text-white d-flex align-items-center">
						<icon name="material-symbols:lyrics" class="me-2" />
						Karaoke Lyrics
					</div>
					<div class="card-body">
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
					class="card bg-dark mb-4 shadow-sm"
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
					class="card bg-dark mb-4 shadow-sm"
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
				<div class="card bg-dark mb-4 shadow-sm text-white">
					<div class="card-header d-flex align-items-center text-white">
						<icon name="mdi:github" class="me-2" />
						Repository
					</div>
					<div class="card-body text-white">
						<p class="h5 mb-1">{{ song.repository.full_name }}</p>
						<p class=" mb-2 text-white">
							Owner: {{ song.repository.owner }}<br />
							Private: {{ song.repository.is_private ? 'Yes' : 'No' }}
						</p>
						<a
							:href="song.repository.url"
							target="_blank"
							class="btn btn-outline-light d-inline-flex align-items-center btn-sm"
						>
							<icon name="material-symbols:open-in-new" class="me-1" />
							Open Repo
						</a>
					</div>
				</div>

				<!-- Time Range & Commits -->
				<div class="card bg-dark mb-4 shadow-sm text-white">
					<div class="card-header text-white d-flex align-items-center">
						<icon name="material-symbols:timer" class="me-2" />
						Time Range & Commits
					</div>
					<div class="card-body text-white">
						<p class="mb-1">
							<strong>Start:</strong> {{ song.time_range?.start }}
						</p>
						<p class="mb-1">
							<strong>End:</strong> {{ song.time_range?.end }}
						</p>
						<p class="mb-1">
							<icon name="material-symbols:commit" class="me-1" />
							<strong>Commits:</strong> {{ song.commit_count }}
						</p>
					</div>
				</div>

				<!-- Cover Image -->
				<div v-if="song.cover_image_url" class="mb-4 text-center">
					<img
						:src="song.cover_image_url"
						alt="Cover"
						class="img-fluid cover-img"
					/>
				</div>

				<!-- Extra Info -->
				<div class="card bg-dark mb-4 shadow-sm text-white">
					<div class="card-header text-white d-flex align-items-center">
						<icon name="material-symbols:info" class="me-2" />
						Extra Info
					</div>
					<div class="card-body">
						<ul class="list-unstyled mb-1">
							<li><strong>Created At:</strong> {{ song.created_at }}</li>
							<li><strong>Updated At:</strong> {{ song.updated_at }}</li>
							<li><strong>Completed At:</strong> {{ song.completed_at }}</li>
							<li><strong>Suno Task ID:</strong> {{ song.suno_task_id }}</li>
							<li><strong>Instrumental:</strong> {{ song.instrumental ? 'Yes' : 'No' }}</li>
						</ul>
					</div>
				</div>

				<!-- Additional Audio Files -->
				<div
					v-if="otherAudioFiles.length"
					class="card bg-dark mb-4 shadow-sm text-white"
				>
					<div class="card-header text-white">
						<icon name="material-symbols:playlist-play" class="me-2" />
						Song variations
					</div>
					<div class="card-body">
						<div
							v-for="audio in otherAudioFiles"
							:key="audio.id"
							class="bg-secondary bg-opacity-25 p-2 mb-3 rounded"
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
							<!-- Basic AudioPlayer or your pinned approach -->
							<AudioPlayer
								:src="audio.url"
								:title="song.title"
								class="mt-2"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Pinned Mini Player at the Bottom -->
		<div
			v-if="pinnedAudioFile"
			class="pinned-player bg-dark text-white p-1 d-flex gap-1 flex-column align-items-start justify-content-between"
		>
			<div>
				<icon name="material-symbols:headphones" class="me-2" />
				<strong>{{ pinnedAudioFile.filename }}</strong>
			</div>
			<!-- The same AudioPlayer, but we also listen to 'timeupdate' & 'loadedmetadata' here -->
			<audio-player
				:src="pinnedAudioFile.url"
				:title="song.title"
				@timeupdate="onTimeUpdate"
				@loadedmetadata="onLoadedMetadata"
			/>
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

	// SPLIT LYRICS
	const splittedLyrics = computed(() => {
		if(!props.song.lyrics) return [];
		return props.song.lyrics.split('\n');
	});

	// PINNED AUDIO => FIRST FILE
	const pinnedAudioFile = computed(() => {
		const f = props.song.audio_files;
		return (f && f.length) ? f[0] : null;
	});

	// OTHER AUDIO
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
	function onLoadedMetadata(dur) {
		totalDuration.value = dur;
	}

	/** Called from AudioPlayer on each timeupdate => approximate highlight */
	function onTimeUpdate(time) {
		currentTime.value = time;
		approximateHighlight();
	}

	/** Approximate highlight => each line = totalDuration / lineCount */
	function approximateHighlight() {
		const lines = splittedLyrics.value;
		if(!lines.length || !totalDuration.value) {
			currentLineIndex.value = -1;
			return;
		}
		const lineDuration = totalDuration.value / lines.length;
		const i = Math.floor(currentTime.value / lineDuration);
		currentLineIndex.value = Math.min(i, lines.length - 1);
	}

	/** For fade-in lines (like your old snippet) => each line has a small delay. */
	function getLineStyle(idx) {
		const delaySec = 0.1 + idx * 0.05;
		return {
			animationDelay: `${ delaySec }s`,
		};
	}
</script>

<style lang="sass" scoped>

	.filename
		display: block
		overflow: hidden
		text-overflow: ellipsis
		white-space: nowrap

	audio
		width: 100%

</style>

<style scoped>
	.karaoke-song-detail {
		position: relative;
		color: black;
		min-height: 100vh;
	}

	/* Lyric lines with fade-in and an .active highlight */
	.karaoke-line {
		opacity: 0;
		animation: fadeInLine 0.8s forwards ease-out;
		margin-bottom: 4px;
		transition: background-color 0.2s, transform 0.2s, text-shadow 0.2s;
	}

	/* Staggered delay logic => see getLineStyle() for dynamic style */
	.karaoke-line.active {
		background-color: rgba(255, 255, 255, 0.15);
		text-shadow: 0 0 8px #fff;
		transform: scale(1.03);
		font-weight: bold;
		border-radius: 4px;
	}

	@keyframes fadeInLine {
		to {
			opacity: 1;
		}
	}

	.pinned-player {
		position: fixed;
		bottom: 40px;
		right: 0;
		width: 100%;
		border-top: 2px solid #444;
		z-index: 999;
	}

	@media (max-width: 768px) {
		.pinned-player {
			max-width: 100%;
		}
	}

	.cover-img {
		max-width: 400px;
		border: 1px solid #fff;
		border-radius: 6px;
	}
</style>
