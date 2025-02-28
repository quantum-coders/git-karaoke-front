<template>
	<div class="container my-5">
		<!-- HERO SECTION -->
		<section class="hero text-center py-5 mb-5">
			<div class="overlay"></div>
			<div class="position-relative">
				<h1 class="display-3 fw-bold text-white">
					<icon name="mdi:github" class="me-2" />
					Git Karaoke
				</h1>
				<p class="lead text-white mt-3">
					Transform your GitHub repository history into an immersive, AI-generated musical experience!
				</p>
				<NuxtLink to="/create" class="btn btn-danger btn-lg mt-4">
					<icon name="mdi:play-circle-outline" class="me-2" />
					Create Your Song Now
				</NuxtLink>
			</div>
		</section>

		<!-- HOW IT WORKS SECTION -->
		<section class="how-it-works mb-5">
			<h2 class="mb-4 text-center">How It Works</h2>
			<div class="row g-4">
				<!-- Step 1 -->
				<div class="col-md-4">
					<div class="card h-100 shadow-sm">
						<div class="card-body text-center">
							<icon name="mdi:github-circle" size="3em" class="text-primary mb-3" />
							<h5 class="card-title">Connect Your Repository</h5>
							<p class="card-text">
								Simply enter the URL of your GitHub repository. Our system fetches all commit data, repository metadata, and more using the GitHub API.
							</p>
						</div>
					</div>
				</div>
				<!-- Step 2 -->
				<div class="col-md-4">
					<div class="card h-100 shadow-sm">
						<div class="card-body text-center">
							<icon name="mdi:server" size="3em" class="text-success mb-3" />
							<h5 class="card-title">Analyze & Embed</h5>
							<p class="card-text">
								Our robust backend processes your repository's history, generating high-quality embeddings with advanced AI techniques. Every commit is transformed into a unique digital fingerprint.
							</p>
						</div>
					</div>
				</div>
				<!-- Step 3 -->
				<div class="col-md-4">
					<div class="card h-100 shadow-sm">
						<div class="card-body text-center">
							<icon name="mdi:robot" size="3em" class="text-warning mb-3" />
							<h5 class="card-title">Generate Your Music</h5>
							<p class="card-text">
								With state-of-the-art AI, we synthesize lyrics and audio to create a personalized song that reflects your code’s journey. Experience the magic where code meets melody!
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- TECHNOLOGY SECTION -->
		<section class="technology mb-5">
			<h2 class="mb-4 text-center">Our Cutting-Edge Technology</h2>
			<div class="row align-items-center">
				<div class="col-md-6">
					<SvgTechDiagram />
				</div>
				<div class="col-md-6">
					<ul class="list-unstyled fs-5">
						<li class="mb-3">
							<icon name="mdi:code-tags" class="me-2 text-info" />
							<strong>Prisma & MySQL:</strong>
							Robust data management with a secure MySQL database using Prisma ORM.
						</li>
						<li class="mb-3">
							<icon name="mdi:api" class="me-2 text-danger" />
							<strong>API Integrations:</strong>
							Seamlessly integrates with GitHub, ChromaDB, OpenAI, and Suno to deliver a full-stack solution.
						</li>
						<li class="mb-3">
							<icon name="mdi:cloud" class="me-2 text-secondary" />
							<strong>Cloud Storage:</strong>
							We use DigitalOcean Spaces for scalable and reliable media storage.
						</li>
						<li class="mb-3">
							<icon name="mdi:music" class="me-2 text-success" />
							<strong>AI Music Generation:</strong>
							Our AI creates custom lyrics and audio tracks, merging code history with musical creativity.
						</li>
						<li class="mb-3">
							<icon name="mdi:chart-line" class="me-2 text-primary" />
							<strong>Data-Driven Insights:</strong>
							Comprehensive analysis of your repository commits that brings your code's story to life.
						</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- EMBEDDING SERVER SECTION -->
		<section class="embeddings mb-5 bg-light py-5">
			<h2 class="mb-4 text-center">Embedded Intelligence</h2>
			<p class="fs-5 text-center">
				Our proprietary embedding server leverages advanced AI models to analyze and convert your code commits into meaningful data points. This breakthrough technology enables us to craft personalized musical narratives based on your repository's unique evolution.
			</p>
			<div class="text-center">
				<icon name="mdi:brain" size="4em" class="text-purple" />
			</div>
		</section>

		<!-- CONCLUSION SECTION -->
		<section class="conclusion py-5">
			<h2 class="mb-4 text-center">Why Git Karaoke?</h2>
			<p class="lead text-center">
				Embrace the synergy of code and music. Git Karaoke combines sophisticated data analysis, cutting-edge AI, and seamless API integrations to deliver an unforgettable experience that transforms your repository’s story into a musical masterpiece.
			</p>
			<div class="text-center mt-4">
				<NuxtLink to="/create" class="btn btn-danger btn-lg">
					<icon name="mdi:music-note-plus" class="me-2" />
					Create Your Song Today
				</NuxtLink>
			</div>
		</section>

		<!-- TEAM SECTION -->
		<section class="team py-5 text-center">
			<h2 class="mb-4">Meet the Creators</h2>
			<p class="fs-5">
				This project is proudly built and maintained by:
			</p>
			<div>
				<p>
					<strong>0xJesus</strong> —
				</p>
				<p>
					<strong>thewebchimp</strong> —
				</p>
			</div>
		</section>
	</div>
</template>

<script setup>
	// No additional imports needed for icons if you're using Nuxt Icons globally
</script>

<style scoped>
	.hero {
		position: relative;
		background: url('/hero-background-2.jpg') center center no-repeat;
		background-size: cover;
		/* Reducimos la altura de 80vh a 50vh para hacer la imagen más pequeña */
		min-height: 50vh;
	}

	.hero .overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 1;
	}

	.hero > .position-relative {
		position: relative;
		z-index: 2;
	}

	/* Títulos */
	h1,
	h2 {
		font-family: 'Montserrat', sans-serif;
	}

	/* Para ajustar el tamaño de texto donde se necesite */
	.fs-5 {
		font-size: 1.25rem;
	}

	/* Animación al hover de botones */
	.btn:hover {
		transform: scale(1.05);
		transition: transform 0.2s ease-in-out;
	}
</style>
