module.exports = {
	apps: [
		{
			name: 'git-karaoke-front',
			port: '1389',
			exec_mode: 'cluster',
			instances: 1,
			script: './.output/server/index.mjs',
		},
	],
};
