<template>
	<div class="access-wrapper">
		<div class="access-bg"></div>
		<div class="access-card">
			<img src="/favicon.svg" alt="Git Karaoke" class="access-icon" />
			<h1 class="access-title">Git <span>Karaoke</span></h1>
			<p class="access-subtitle">Turn your commits into music — AI-powered songs from your code history</p>

			<div v-if="invalidCode" class="access-error">Invalid code. Please try again.</div>

			<form class="access-form" @submit.prevent="submitCode">
				<input v-model="code" type="password" placeholder="Enter access code" autofocus />
				<button type="submit">→</button>
			</form>

			<div class="access-divider"><span>or</span></div>
			<a href="mailto:hello@qcdr.io?subject=Git%20Karaoke%20Demo" class="access-link">Request demo access</a>
		</div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
const route = useRoute()
const router = useRouter()
const code = ref('')
const invalidCode = computed(() => route.query.error === 'invalid')
const submitCode = async () => {
	if (!code.value.trim()) return
	await router.push({ path: '/', query: { access: code.value.trim() } })
}
</script>

<style scoped>
.access-wrapper {
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #0a0a0a;
	font-family: 'DM Sans', 'Barlow', system-ui, sans-serif;
	color: #fff;
	position: relative;
	overflow: hidden;
}
.access-bg {
	position: absolute;
	top: -20%;
	left: 50%;
	transform: translateX(-50%);
	width: 500px;
	height: 500px;
	background: radial-gradient(circle, rgba(145,64,251,0.1) 0%, transparent 65%);
	border-radius: 50%;
	pointer-events: none;
}
.access-card {
	text-align: center;
	max-width: 400px;
	width: 100%;
	padding: 2rem;
	position: relative;
	z-index: 1;
}
.access-icon {
	width: 56px;
	height: 56px;
	margin-bottom: 1.25rem;
}
.access-title {
	font-size: 2.2rem;
	font-weight: 800;
	margin: 0 0 0.5rem;
	letter-spacing: -0.03em;
}
.access-title span { color: #9140FB; }
.access-subtitle {
	font-size: 0.85rem;
	opacity: 0.35;
	margin: 0 0 2.5rem;
	line-height: 1.6;
	max-width: 320px;
	margin-left: auto;
	margin-right: auto;
}
.access-error {
	background: rgba(145,64,251,0.1);
	border: 1px solid rgba(145,64,251,0.25);
	color: #b57bff;
	padding: 10px 16px;
	border-radius: 12px;
	font-size: 0.82rem;
	margin-bottom: 1rem;
	animation: shake 0.3s ease;
}
@keyframes shake {
	0%, 100% { transform: translateX(0); }
	25% { transform: translateX(-6px); }
	75% { transform: translateX(6px); }
}
.access-form {
	display: flex;
	border-radius: 14px;
	overflow: hidden;
	border: 1px solid rgba(255,255,255,0.08);
	background: rgba(255,255,255,0.03);
	transition: border-color 0.2s;
}
.access-form:focus-within { border-color: rgba(145,64,251,0.3); }
.access-form input {
	flex: 1;
	padding: 14px 18px;
	border: none;
	background: transparent;
	color: #fff;
	font-size: 0.9rem;
	outline: none;
	font-family: inherit;
}
.access-form input::placeholder { color: rgba(255,255,255,0.18); }
.access-form button {
	padding: 14px 22px;
	border: none;
	background: #9140FB;
	color: #fff;
	cursor: pointer;
	font-size: 1.1rem;
	font-weight: 700;
	transition: background 0.15s;
}
.access-form button:hover { background: #7c30e0; }
.access-divider {
	display: flex;
	align-items: center;
	margin: 1.25rem 0;
	gap: 12px;
}
.access-divider::before, .access-divider::after {
	content: '';
	flex: 1;
	height: 1px;
	background: rgba(255,255,255,0.06);
}
.access-divider span {
	font-size: 0.72rem;
	opacity: 0.25;
	text-transform: uppercase;
	letter-spacing: 0.1em;
}
.access-link {
	color: #9140FB;
	text-decoration: none;
	font-size: 0.85rem;
	font-weight: 500;
	opacity: 0.7;
	transition: opacity 0.15s;
}
.access-link:hover { opacity: 1; }
</style>
