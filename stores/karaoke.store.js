// stores/karaoke.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRuntimeConfig } from '#app';

export const useKaraokeStore = defineStore('karaokeStore', () => {
	const { public: { apiURL } } = useRuntimeConfig();

	// STATE
	const styles = ref([]);
	const songs = ref([]);
	const stats = ref(null);
	const currentSong = ref(null);
	const currentTaskInfo = ref(null); // <--- nueva variable reactiva
	// Nuevos estados reactivos necesarios:
	const loading = ref(false);
	const error = ref(null);
	const createdSongId = ref(null);

	/**
	 * GET /karaoke/styles
	 * Retorna estilos musicales disponibles.
	 */
	async function fetchStyles() {
		try {
			const res = await $fetch(`${ apiURL }/karaoke/styles`);
			styles.value = res.data; // asumiendo respuesta { data: [...] }
		} catch(err) {
			console.error('fetchStyles error:', err);
			throw err;
		}
	}

	/**
	 * GET /karaoke
	 * Lista TODAS las canciones (paginadas con limit, offset).
	 */
	async function fetchAllSongs(params = { limit: 10, offset: 0 }) {
		try {
			const res = await $fetch(`${ apiURL }/karaoke`, {
				query: params,
			});
			songs.value = res.data; // asumiendo respuesta { data: [...] }
		} catch(err) {
			console.error('fetchAllSongs error:', err);
			throw err;
		}
	}

	/**
	 * POST /karaoke
	 * Crea una nueva canción a partir de un repo, estilo, etc.
	 * @param {Object} payload
	 * { repoUrl, timeRange, musicStyle, instrumental, callbackUrl, ... }
	 */
	async function createSongFromRepo(payload) {
		try {
			const res = await $fetch(`${ apiURL }/karaoke`, {
				method: 'POST',
				body: payload,
			});
			console.log('Song created =>', res);
			return res;
		} catch(err) {
			console.error('createSongFromRepo error:', err);
			throw err;
		}
	}

	/**
	 * GET /karaoke/tasks/:taskId
	 * Consulta el estado de una tarea (SunoTaskId).
	 */
	async function checkTaskStatus(taskId) {
		try {
			const res = await $fetch(`${ apiURL }/karaoke/tasks/${ taskId }`);
			// Retorna { data: {songStatus: 'PENDING'|'SUCCESS'|...}, ... }
			return res.data;
		} catch(err) {
			console.error('checkTaskStatus error:', err);
			throw err;
		}
	}

	/**
	 * GET /karaoke/:songId (detalle simple)
	 */
	async function fetchSongById(songId) {
		try {
			const res = await $fetch(`${ apiURL }/karaoke/${ songId }`);
			currentSong.value = res.data;
			return res.data;
		} catch(err) {
			console.error('fetchSongById error:', err);
			throw err;
		}
	}

	/**
	 * GET /karaoke/:songId/detailed
	 * Detalle extendido de una canción (commits, analysis, etc.).
	 */
	async function fetchSongDetailed(songId) {
		try {
			const res = await $fetch(`${ apiURL }/karaoke/${ songId }/detailed`);
			currentSong.value = res.data;
			return res.data;
		} catch(err) {
			console.error('fetchSongDetailed error:', err);
			throw err;
		}
	}

	/**
	 * GET /karaoke/stats
	 * Estadísticas globales de Karaoke (canciones generadas, etc.).
	 */
	async function fetchStats() {
		try {
			const res = await $fetch(`${ apiURL }/karaoke/stats`);
			stats.value = res.data;
		} catch(err) {
			console.error('fetchStats error:', err);
			throw err;
		}
	}

	/**
	 * Crea una canción y hace polling hasta que esté completada o falle.
	 * Retorna la canción generada al finalizar.
	 * @param {Object} payload
	 * @param {Number} maxAttempts
	 * @param {Number} intervalMs
	 */
	async function createSongAndPoll(payload, { maxAttempts = 100, intervalMs = 10000 } = {}) {
		loading.value = true;
		error.value = null;
		createdSongId.value = null;
		currentTaskInfo.value = null;

		try {
			// 1) Crear la canción
			const createResponse = await createSongFromRepo(payload);
			const taskId = createResponse.data.song.taskId;

			let attempts = 0;
			let songStatus = 'PENDING';

			while(attempts < maxAttempts) {
				// Llamada a checkTaskStatus
				const statusResp = await checkTaskStatus(taskId);
				// Guardamos la respuesta completa (status, details, etc.)
				currentTaskInfo.value = statusResp;

				songStatus = statusResp.songStatus || 'PENDING';

				if(songStatus === 'SUCCESS' || songStatus === 'COMPLETED') {
					break;
				}
				if(songStatus.includes('FAILED') || songStatus.includes('ERROR')) {
					throw new Error(`Song generation failed: ${ songStatus }`);
				}

				attempts++;
				await new Promise(resolve => setTimeout(resolve, intervalMs));
			}

			if(songStatus !== 'SUCCESS' && songStatus !== 'COMPLETED') {
				throw new Error('Song generation timed out');
			}

			// 3) Buscar la canción recién generada
			await fetchAllSongs({ limit: 10, offset: 0 });
			const finalSong = songs.value.find(s => s.suno_task_id === taskId);

			if(finalSong?.id) {
				createdSongId.value = finalSong.id;
				await fetchSongDetailed(finalSong.id);
			} else {
				throw new Error('Generated song not found in DB.');
			}
		} catch(err) {
			error.value = err.message;
		} finally {
			loading.value = false;
		}
	}

	function resetStoreState() {
		loading.value = false;
		error.value = null;
		createdSongId.value = null;
		currentTaskInfo.value = null;
	}

	return {
		// State
		styles,
		currentTaskInfo,   // <--- exportamos la variable
		songs,
		stats,
		currentSong,
		loading,
		error,
		createdSongId,

		// Actions
		fetchStyles,
		fetchAllSongs,
		createSongFromRepo,
		fetchSongById,
		fetchSongDetailed,
		fetchStats,
		checkTaskStatus,
		resetStoreState,
		createSongAndPoll,
	};
});
