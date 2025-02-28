<template>
	<div class="d-flex flex-column vh-100">
		<button
			@click="toggleDrawer"
			class="hamburger hamburger--emphatic"
			:class="{ 'is-active': !!drawerOpen }"
			type="button"
		>
			<span class="hamburger-box">
				<span class="hamburger-inner"></span>
			</span>
		</button>

		<nav class="navbar" :class="navBarClass">
			<div class="container-fluid">
				<nuxt-link to="/" class="navbar-brand d-flex align-items-center gap-2">
					<svgo-octocat class="octocat" />
					<span>My Git Karaoke</span>
				</nuxt-link>
			</div>
		</nav>

		<!-- Drawer -->
		<div
			class="drawer text-white position-fixed top-0 start-0 h-100"
			:class="{ 'is-open': drawerOpen }"
		>
			<!-- Drawer Header (Title + Close Icon) -->
			<div class="d-flex justify-content-between align-items-center p-3">
				<h5 class="mb-0">Navigation</h5>
			</div>

			<!-- Drawer Body (Links) -->
			<ul class="nav flex-column p-2">
				<li class="nav-item mb-2">
					<nuxt-link
						to="/"
						class="nav-link text-white d-flex align-items-center"
						@click="toggleDrawer"
					>
						<icon name="ic:baseline-home" />
						Home
					</nuxt-link>
				</li>
				<li class="nav-item mb-2">
					<nuxt-link
						to="/create"
						class="nav-link text-white d-flex align-items-center"
						@click="toggleDrawer"
					>
						<icon name="ic:baseline-add-circle-outline" />
						Create Song
					</nuxt-link>
				</li>
				<li class="nav-item mb-2">
					<nuxt-link
						to="/karaoke"
						class="nav-link text-white d-flex align-items-center"
						@click="toggleDrawer"
					>
						<icon name="ic:baseline-library-music" />
						All Songs
					</nuxt-link>
				</li>
				<li class="nav-item mb-2">
					<nuxt-link
						to="/about"
						class="nav-link text-white d-flex align-items-center"
						@click="toggleDrawer"
					>
						<icon name="ic:baseline-info" />
						About
					</nuxt-link>
				</li>
			</ul>
		</div>

		<!-- Overlay behind the drawer -->
		<transition name="drawer-overlay">
			<div
				v-if="drawerOpen"
				class="drawer-overlay position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
				@click="toggleDrawer"
			/>
		</transition>

		<!-- Main Content -->
		<main class="section-content flex-grow-1 overflow-auto pretty-scrolls">
			<nuxt-page />
		</main>

		<!-- Footer -->
		<footer class="bg-dark text-center text-white py-2">
			<small>© 2025 My Git Karaoke</small>
		</footer>
	</div>
</template>

<script setup>
	import { ref } from 'vue';

	// Reactive state to track if the drawer is open
	const drawerOpen = ref(false);

	function toggleDrawer() {
		drawerOpen.value = !drawerOpen.value;
	}

	// compute the navBarClass based on the url
	const navBarClass = computed(() => {
		if(useRoute().path !== '/') {
			return 'inner-section';
		}
	});

</script>

<style lang="sass" scoped>
	.navbar
		position: fixed
		top: 0
		left: 0
		width: 100%
		z-index: 2
		transition: all 0.1s ease

		&.inner-section
			background: black

	.navbar-brand
		color: white
		line-height: 1
		font-size: 1rem

		.octocat
			width: 1.8rem
			height: 1.8rem

	.hamburger
		position: absolute
		right: 1rem
		top: 0.125rem
		z-index: 3000

	.drawer
		width: 400px
		background: rgba(black, 0.5)
		// glass background
		backdrop-filter: blur(10px)
		z-index: 2000
		margin-left: -400px
		transition: margin-left 0.3s ease

		&.is-open
			margin-left: 0

		.nav-item
			font-size: 1.2rem
			border-bottom: 1px solid rgba(white, 0.1)
			display: block

			a
				display: flex
				align-items: center
				gap: 1rem

</style>

<style scoped>

	/*
	  OVERLAY TRANSITION: The name "drawer-overlay"
	  matches the <transition name="drawer-overlay">
	*/
	.drawer-overlay-enter-active,
	.drawer-overlay-leave-active {
		transition: opacity 0.3s ease;
	}

	.drawer-overlay-enter {
		opacity: 0;
	}

	.drawer-overlay-leave-to {
		opacity: 0;
	}

	/* The overlay itself is a simple div with half-transparent background.
	   We set its z-index below the drawer, but above the main content.
	*/
	.drawer-overlay {
		z-index: 1999;
		cursor: pointer;
	}
</style>
