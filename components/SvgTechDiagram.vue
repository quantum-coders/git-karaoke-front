<script setup lang="ts">

</script>

<template>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <!-- Background and styling -->
  <defs>
    <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f8f9fa;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#e9ecef;stop-opacity:1" />
    </linearGradient>

    <!-- Connection arrows -->
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#6c757d" />
    </marker>

    <!-- Icon gradients -->
    <linearGradient id="github-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#333333;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#24292e;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="api-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6610f2;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#6f42c1;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="db-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#20c997;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#198754;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="ai-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#fd7e14;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#dc3545;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="storage-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0dcaf0;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0d6efd;stop-opacity:1" />
    </linearGradient>

    <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
      <feOffset dx="2" dy="2" result="offsetblur" />
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.2" />
      </feComponentTransfer>
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- Main background -->
  <rect width="800" height="500" fill="url(#bg-gradient)" rx="15" ry="15" />

  <!-- Title -->
  <text x="400" y="40" font-family="'Montserrat', sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="#212529">Git Karaoke Technology Architecture</text>

  <!-- GitHub Integration -->
  <g transform="translate(80, 120)" filter="url(#drop-shadow)">
    <rect width="140" height="80" rx="10" ry="10" fill="white" stroke="#dee2e6" stroke-width="1" />
    <circle cx="40" cy="30" r="20" fill="url(#github-gradient)" />
    <path d="M40,15 C31.7,15 25,21.7 25,30 C25,36.6 29.4,42.2 35.4,44.2 C36.2,44.4 36.5,43.9 36.5,43.4 C36.5,43 36.5,41.7 36.5,40.2 C32.2,41.2 31.2,37.9 31.2,37.9 C30.4,36 29.2,35.5 29.2,35.5 C27.6,34.4 29.3,34.4 29.3,34.4 C31.1,34.5 32,36.1 32,36.1 C33.5,38.7 36.2,38 36.6,37.6 C36.8,36.5 37.2,35.8 37.7,35.4 C34.1,35 30.3,33.6 30.3,27.7 C30.3,25.8 31,24.3 32.1,23.1 C31.9,22.6 31.3,21 32.3,18.8 C32.3,18.8 33.7,18.3 36.5,20.1 C37.6,19.7 38.8,19.5 40,19.5 C41.2,19.5 42.4,19.7 43.5,20.1 C46.3,18.3 47.7,18.8 47.7,18.8 C48.7,21 48.1,22.6 47.9,23.1 C49,24.3 49.7,25.8 49.7,27.7 C49.7,33.6 45.9,35 42.2,35.4 C42.8,35.9 43.4,36.9 43.4,38.4 C43.4,40.7 43.3,42.8 43.3,43.4 C43.3,43.9 43.6,44.4 44.4,44.2 C50.4,42.2 54.8,36.6 54.8,30 C55,21.7 48.3,15 40,15 Z" fill="white" />
    <text x="70" y="65" font-family="'Arial', sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#212529">GitHub Repository</text>
  </g>

  <!-- API Gateway -->
  <g transform="translate(330, 120)" filter="url(#drop-shadow)">
    <rect width="140" height="80" rx="10" ry="10" fill="white" stroke="#dee2e6" stroke-width="1" />
    <circle cx="40" cy="30" r="20" fill="url(#api-gradient)" />
    <path d="M48,24 L32,24 C30.9,24 30,24.9 30,26 L30,34 C30,35.1 30.9,36 32,36 L48,36 C49.1,36 50,35.1 50,34 L50,26 C50,24.9 49.1,24 48,24 Z M46,34 L34,34 L34,32 L46,32 L46,34 Z M46,30 L34,30 L34,28 L46,28 L46,30 Z M46,26 L34,26 L34,26 L46,26 L46,26 Z" fill="white" />
    <text x="70" y="65" font-family="'Arial', sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#212529">API Gateway</text>
  </g>

  <!-- Database -->
  <g transform="translate(580, 120)" filter="url(#drop-shadow)">
    <rect width="140" height="80" rx="10" ry="10" fill="white" stroke="#dee2e6" stroke-width="1" />
    <circle cx="40" cy="30" r="20" fill="url(#db-gradient)" />
    <path d="M40,20 C33,20 25,22 25,25 L25,35 C25,38 33,40 40,40 C47,40 55,38 55,35 L55,25 C55,22 47,20 40,20 Z M40,22 C47,22 53,24 53,25 C53,26 47,28 40,28 C33,28 27,26 27,25 C27,24 33,22 40,22 Z M53,35 C53,36 47,38 40,38 C33,38 27,36 27,35 L27,32 C30,34 35,35 40,35 C45,35 50,34 53,32 L53,35 Z M53,30 C53,31 47,33 40,33 C33,33 27,31 27,30 L27,27 C30,29 35,30 40,30 C45,30 50,29 53,27 L53,30 Z" fill="white" />
    <text x="70" y="55" font-family="'Arial', sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#212529">MySQL DB</text>
    <text x="70" y="75" font-family="'Arial', sans-serif" font-size="12" text-anchor="middle" fill="#6c757d">via Prisma ORM</text>
  </g>

  <!-- Embedding Server -->
  <g transform="translate(200, 250)" filter="url(#drop-shadow)">
    <rect width="140" height="80" rx="10" ry="10" fill="white" stroke="#dee2e6" stroke-width="1" />
    <circle cx="40" cy="30" r="20" fill="url(#ai-gradient)" />
    <path d="M45,24 C47.2,26.2 48,29 47.4,31.8 C46.8,34.5 44.8,36.8 42.1,37.7 C39.4,38.6 36.4,38 34.2,36.2 C32,34.3 31,31.5 31.5,28.7 C32,26 33.8,23.5 36.4,22.4 C39,21.3 42,21.6 44.2,23.2 M40,30 C40.8,30 41.5,29.3 41.5,28.5 C41.5,27.7 40.8,27 40,27 C39.2,27 38.5,27.7 38.5,28.5 C38.5,29.3 39.2,30 40,30 Z M40,33 C39.2,33 38.5,33.7 38.5,34.5 C38.5,35.3 39.2,36 40,36 C40.8,36 41.5,35.3 41.5,34.5 C41.5,33.7 40.8,33 40,33 Z M36.5,28.5 C35.7,28.5 35,29.2 35,30 C35,30.8 35.7,31.5 36.5,31.5 C37.3,31.5 38,30.8 38,30 C38,29.2 37.3,28.5 36.5,28.5 Z M43.5,28.5 C42.7,28.5 42,29.2 42,30 C42,30.8 42.7,31.5 43.5,31.5 C44.3,31.5 45,30.8 45,30 C45,29.2 44.3,28.5 43.5,28.5 Z" fill="white" />
    <text x="70" y="55" font-family="'Arial', sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#212529">Embedding Server</text>
    <text x="70" y="75" font-family="'Arial', sans-serif" font-size="12" text-anchor="middle" fill="#6c757d">ChromaDB</text>
  </g>

  <!-- AI Music Generator -->
  <g transform="translate(460, 250)" filter="url(#drop-shadow)">
    <rect width="140" height="80" rx="10" ry="10" fill="white" stroke="#dee2e6" stroke-width="1" />
    <circle cx="40" cy="30" r="20" fill="url(#ai-gradient)" />
    <path d="M32,25 L32,35 C32,36.1 32.9,37 34,37 L34,38 C34,39.1 34.9,40 36,40 C37.1,40 38,39.1 38,38 L38,37 L42,37 L42,38 C42,39.1 42.9,40 44,40 C45.1,40 46,39.1 46,38 L46,37 C47.1,37 48,36.1 48,35 L48,25 C48,23.9 47.1,23 46,23 L34,23 C32.9,23 32,23.9 32,25 Z M37,30 C36.4,30 36,29.6 36,29 C36,28.4 36.4,28 37,28 C37.6,28 38,28.4 38,29 C38,29.6 37.6,30 37,30 Z M43,30 C42.4,30 42,29.6 42,29 C42,28.4 42.4,28 43,28 C43.6,28 44,28.4 44,29 C44,29.6 43.6,30 43,30 Z" fill="white" />
    <text x="70" y="55" font-family="'Arial', sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#212529">AI Music Generator</text>
    <text x="70" y="75" font-family="'Arial', sans-serif" font-size="12" text-anchor="middle" fill="#6c757d">OpenAI + Suno</text>
  </g>

  <!-- Cloud Storage -->
  <g transform="translate(330, 380)" filter="url(#drop-shadow)">
    <rect width="140" height="80" rx="10" ry="10" fill="white" stroke="#dee2e6" stroke-width="1" />
    <circle cx="40" cy="30" r="20" fill="url(#storage-gradient)" />
    <path d="M40,22 C35,22 31,25.8 31,30 C31,34.2 35,38 40,38 C45,38 49,34.2 49,30 C49,25.8 45,22 40,22 Z M40,36 C36.1,36 33,33.3 33,30 C33,26.7 36.1,24 40,24 C43.9,24 47,26.7 47,30 C47,33.3 43.9,36 40,36 Z M43,30 C43,31.7 41.7,33 40,33 C38.3,33 37,31.7 37,30 C37,28.3 38.3,27 40,27 C41.7,27 43,28.3 43,30 Z" fill="white" />
    <text x="70" y="55" font-family="'Arial', sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#212529">Cloud Storage</text>
    <text x="70" y="75" font-family="'Arial', sans-serif" font-size="12" text-anchor="middle" fill="#6c757d">DigitalOcean Spaces</text>
  </g>

  <!-- Connecting Lines -->
  <!-- GitHub to API Gateway -->
  <line x1="220" y1="160" x2="330" y2="160" stroke="#6c757d" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead)" />

  <!-- API Gateway to DB -->
  <line x1="470" y1="160" x2="580" y2="160" stroke="#6c757d" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead)" />

  <!-- API Gateway to Embedding Server -->
  <line x1="350" y1="200" x2="280" y2="250" stroke="#6c757d" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead)" />

  <!-- API Gateway to AI Music Generator -->
  <line x1="450" y1="200" x2="500" y2="250" stroke="#6c757d" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead)" />

  <!-- Embedding Server to AI Music Generator -->
  <line x1="340" y1="290" x2="460" y2="290" stroke="#6c757d" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead)" />

  <!-- AI Music Generator to Cloud Storage -->
  <line x1="500" y1="330" x2="420" y2="380" stroke="#6c757d" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead)" />

  <!-- API Gateway to Cloud Storage -->
  <line x1="380" y1="200" x2="380" y2="380" stroke="#6c757d" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead)" />

  <!-- Labels for Connections -->
  <text x="275" y="145" font-family="'Arial', sans-serif" font-size="10" text-anchor="middle" fill="#495057">Repository Data</text>
  <text x="525" y="145" font-family="'Arial', sans-serif" font-size="10" text-anchor="middle" fill="#495057">Store/Retrieve Data</text>
  <text x="285" y="225" font-family="'Arial', sans-serif" font-size="10" text-anchor="middle" fill="#495057">Analyze Commits</text>
  <text x="510" y="225" font-family="'Arial', sans-serif" font-size="10" text-anchor="middle" fill="#495057">Generate Music</text>
  <text x="400" y="275" font-family="'Arial', sans-serif" font-size="10" text-anchor="middle" fill="#495057">Code Embeddings</text>
  <text x="475" y="355" font-family="'Arial', sans-serif" font-size="10" text-anchor="middle" fill="#495057">Store Media</text>
  <text x="393" y="290" font-family="'Arial', sans-serif" font-size="10" text-anchor="middle" fill="#495057">Access Media</text>

  <!-- Legend -->
  <rect x="620" y="380" width="160" height="100" rx="5" ry="5" fill="white" stroke="#dee2e6" stroke-width="1" />
  <text x="700" y="400" font-family="'Arial', sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#212529">Legend</text>

  <circle cx="640" cy="420" r="6" fill="url(#github-gradient)" />
  <text x="650" y="424" font-family="'Arial', sans-serif" font-size="10" fill="#212529" x-anchor="start">External Services</text>

  <circle cx="640" cy="440" r="6" fill="url(#api-gradient)" />
  <text x="650" y="444" font-family="'Arial', sans-serif" font-size="10" fill="#212529" x-anchor="start">Core Services</text>

  <circle cx="640" cy="460" r="6" fill="url(#storage-gradient)" />
  <text x="650" y="464" font-family="'Arial', sans-serif" font-size="10" fill="#212529" x-anchor="start">Storage Solutions</text>
</svg>
</template>

<style scoped>

</style>
