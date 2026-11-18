const esbuild = require('esbuild');
const fs = require('fs');
const { transform } = require('@svgr/core');
const jsxPlugin = require('@svgr/plugin-jsx');

const svgPlugin = {
	name: 'svg-plugin',
	setup(build) {
		build.onLoad({ filter: /\.svg$/ }, async (args) => {
			const svg = fs.readFileSync(args.path, 'utf8');

			const componentCode = await transform(
				svg,
				{
					plugins: [jsxPlugin],
					exportType: 'named',
					namedExport: 'ReactComponent',
				},
				{ filePath: args.path }
			);

			const url = `data:image/svg+xml,${encodeURIComponent(svg)}`;

			return {
				contents: `
        ${componentCode}
        export default ${JSON.stringify(url)};
    `,
				loader: 'jsx',
			};
		});
	},
};

const isProduction = process.env.NODE_ENV === 'production';
fs.rmSync('dist', { recursive: true, force: true });
esbuild
	.build({
		entryPoints: ['src/index.tsx'],
		bundle: true,
		outdir: 'dist',
		entryNames: 'static/scripts/main',
		platform: 'browser',
		format: 'iife',
		target: ['es2015'],
		jsx: 'automatic',
		sourcemap: !isProduction,
		minify: isProduction,
		plugins: [svgPlugin],
		define: {
			'process.env.NODE_ENV': '"production"',
			'process.env.API_URL': '"https://api.v2.react-learning.ru"',
		},
		loader: {
			'.png': 'file',
			'.jpg': 'file',
			'.jpeg': 'file',
			'.webp': 'file',
			'.gif': 'file',
			'.woff': 'file',
			'.woff2': 'file',
			'.ttf': 'file',
			'.eot': 'file',
			'.otf': 'file',
			'.css': 'css',
			'.module.css': 'local-css',
		},
		assetNames: 'static/assets/[name]-[hash]',
		logLevel: 'info',
	})
	.catch(() => process.exit(1));
