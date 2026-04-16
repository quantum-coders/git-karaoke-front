<template>
	<div class="access-wrapper">
		<div class="access-card">
			<div class="access-icon">🎤</div>
			<h1 class="access-title">Git Karaoke</h1>
			<p class="access-subtitle">Private demo — access required</p>

			<div v-if="invalidCode" class="access-error">
				Invalid access code. Try again or request access below.
			</div>

			<form class="access-form" @submit.prevent="submitCode">
				<label class="access-label">Access code</label>
				<input
					v-model="code"
					type="password"
					class="access-input"
					placeholder="Enter your code"
					autofocus
				/>
				<button type="submit" class="access-button">Enter</button>
			</form>

			<div class="access-divider">
				<span>Don't have a code?</span>
			</div>

			<a href="mailto:hello@qcdr.io?subject=Git%20Karaoke%20Demo%20Access&body=Hi!%20I%27d%20love%20access%20to%20the%20Git%20Karaoke%20demo." class="access-request-link">
				Request demo access →
			</a>
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

<style scoped lang="sass">
.access-wrapper
	min-height: 100vh
	display: flex
	align-items: center
	justify-content: center
	padding: 1rem
	background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)
	font-family: 'DM Sans', 'Barlow', system-ui, sans-serif

.access-card
	background: rgba(255, 255, 255, 0.05)
	backdrop-filter: blur(20px)
	border: 1px solid rgba(255, 255, 255, 0.1)
	border-radius: 20px
	padding: 3rem 2.5rem
	max-width: 420px
	width: 100%
	box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4)
	text-align: center
	color: #fff

.access-icon
	font-size: 3.5rem
	margin-bottom: 0.5rem

.access-title
	font-size: 2rem
	font-weight: 700
	margin: 0 0 0.5rem
	letter-spacing: -0.02em
	background: linear-gradient(135deg, #ff006e 0%, #8338ec 100%)
	-webkit-background-clip: text
	-webkit-text-fill-color: transparent
	background-clip: text

.access-subtitle
	font-size: 0.95rem
	opacity: 0.7
	margin: 0 0 2rem

.access-error
	background: rgba(239, 68, 68, 0.15)
	border: 1px solid rgba(239, 68, 68, 0.4)
	color: #fca5a5
	padding: 0.75rem 1rem
	border-radius: 10px
	font-size: 0.85rem
	margin-bottom: 1.25rem

.access-form
	display: flex
	flex-direction: column
	gap: 0.75rem
	margin-bottom: 1.5rem

.access-label
	text-align: left
	font-size: 0.8rem
	opacity: 0.6
	letter-spacing: 0.05em
	text-transform: uppercase

.access-input
	background: rgba(0, 0, 0, 0.3)
	border: 1px solid rgba(255, 255, 255, 0.15)
	border-radius: 10px
	padding: 0.85rem 1rem
	color: #fff
	font-size: 1rem
	outline: none
	transition: border-color 0.2s, box-shadow 0.2s
	&:focus
		border-color: #8338ec
		box-shadow: 0 0 0 3px rgba(131, 56, 236, 0.2)

.access-button
	background: linear-gradient(135deg, #ff006e 0%, #8338ec 100%)
	color: #fff
	border: none
	border-radius: 10px
	padding: 0.85rem 1rem
	font-size: 1rem
	font-weight: 600
	cursor: pointer
	transition: transform 0.15s, box-shadow 0.2s
	&:hover
		transform: translateY(-1px)
		box-shadow: 0 10px 25px rgba(131, 56, 236, 0.4)
	&:active
		transform: translateY(0)

.access-divider
	display: flex
	align-items: center
	margin: 1rem 0
	opacity: 0.4
	font-size: 0.8rem
	&::before, &::after
		content: ''
		flex: 1
		height: 1px
		background: rgba(255, 255, 255, 0.15)
	& span
		padding: 0 0.75rem

.access-request-link
	display: inline-block
	color: #a78bfa
	text-decoration: none
	font-weight: 500
	font-size: 0.95rem
	padding: 0.5rem
	transition: color 0.15s
	&:hover
		color: #c4b5fd
</style>
