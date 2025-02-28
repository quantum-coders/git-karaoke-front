<template>
	<div class="d-flex flex-column vh-100">

		<!-- Top App Bar (Navbar) -->
		<nav class="navbar navbar-dark bg-dark">
			<div class="container-fluid">
				<!-- Brand or Title -->
				<NuxtLink to="/" class="navbar-brand">
					My Git Karaoke
				</NuxtLink>
				<!-- Toggle Drawer Button -->
				<button
					class="btn btn-outline-light"
					type="button"
					@click="toggleDrawer"
				>
					<icon name="ic:baseline-menu" size="24" />
				</button>
			</div>
		</nav>

		<!-- Drawer -->
		<transition name="drawer-slide">
			<div
				v-if="drawerOpen"
				class="drawer bg-dark text-white position-fixed top-0 start-0 h-100"
			>
				<!-- Drawer Header (Title + Close Icon) -->
				<div class="d-flex justify-content-between align-items-center p-3 border-bottom">
					<h5 class="mb-0">Navigation</h5>
					<button
						class="btn btn-sm btn-light"
						@click="toggleDrawer"
					>
						<icon name="ic:baseline-close" size="20" />
					</button>
				</div>

				<!-- Drawer Body (Links) -->
				<ul class="nav flex-column p-2">
					<li class="nav-item mb-2">
						<NuxtLink
							to="/"
							class="nav-link text-white d-flex align-items-center"
							@click="toggleDrawer"
						>
							<icon name="ic:baseline-home" size="20" class="me-2" />
							Home
						</NuxtLink>
					</li>
					<li class="nav-item mb-2">
						<NuxtLink
							to="/create"
							class="nav-link text-white d-flex align-items-center"
							@click="toggleDrawer"
						>
							<icon name="ic:baseline-add-circle-outline" size="20" class="me-2" />
							Create Song
						</NuxtLink>
					</li>
					<li class="nav-item mb-2">
						<NuxtLink
							to="/karaoke"
							class="nav-link text-white d-flex align-items-center"
							@click="toggleDrawer"
						>
							<icon name="ic:baseline-library-music" size="20" class="me-2" />
							All Songs
						</NuxtLink>
					</li>
					<li class="nav-item mb-2">
						<NuxtLink
							to="/about"
							class="nav-link text-white d-flex align-items-center"
							@click="toggleDrawer"
						>
							<icon name="ic:baseline-info" size="20" class="me-2" />
							About
						</NuxtLink>
					</li>
				</ul>
			</div>
		</transition>

		<!-- Overlay behind the drawer -->
		<transition name="drawer-overlay">
			<div
				v-if="drawerOpen"
				class="drawer-overlay position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
				@click="toggleDrawer"
			/>
		</transition>

		<!-- Main Content -->
		<main class="flex-grow-1 overflow-auto">
			<NuxtPage />
		</main>

		<!-- Footer -->
		<footer class="bg-dark text-center text-white py-2">
			<small>© 2025 My Git Karaoke</small>
		</footer>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';

	// Reactive state to track if the drawer is open
	const drawerOpen = ref(false);

	function toggleDrawer() {
		drawerOpen.value = !drawerOpen.value;
	}
</script>

<style scoped>
	/*
	  SLIDE TRANSITION: The name "drawer-slide" matches the <transition name="drawer-slide">
	  so we define:
	  - drawer-slide-enter-active and drawer-slide-leave-active for the animation,
	  - drawer-slide-enter and drawer-slide-leave-to for the initial/final positions.
	*/
	.drawer-slide-enter-active,
	.drawer-slide-leave-active {
		transition: transform 0.3s ease, opacity 0.3s ease;
	}

	.drawer-slide-enter {
		transform: translateX(-100%);
		opacity: 0;
	}

	.drawer-slide-leave-to {
		transform: translateX(-100%);
		opacity: 0;
	}

	/* The drawer container */
	.drawer {
		width: 280px;
		z-index: 2000;
	}

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
