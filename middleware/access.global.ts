export default defineNuxtRouteMiddleware((to) => {
	if (import.meta.server) return

	const config = useRuntimeConfig()
	const secret = config.public.demoAccessKey as string

	if (to.path === '/request-access') return

	const queryAccess = to.query.access as string | undefined

	if (queryAccess) {
		if (queryAccess === secret) {
			localStorage.setItem('karaoke_access', secret)
			const cleanQuery = { ...to.query }
			delete cleanQuery.access
			return navigateTo({ path: to.path, query: cleanQuery }, { replace: true })
		}
		return navigateTo({ path: '/request-access', query: { error: 'invalid' } }, { replace: true })
	}

	const stored = localStorage.getItem('karaoke_access')
	if (stored !== secret) {
		return navigateTo('/request-access')
	}
})
