import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'

const production = !process.env.ROLLUP_WATCH;

export default [
	{
		input: 'src/main.js',
		output: {
			sourcemap: true,
			format: 'cjs',
			name: 'app',
			file: 'dst/main.js'
		},
		plugins: [
			json(),

			babel({
				extensions: [ '.js', '.mjs', '.html' ]
			}),
			
			// If you have external dependencies installed from
			// npm, you'll most likely need these plugins. In
			// some cases you'll need additional configuration —
			// consult the documentation for details:
			// https://github.com/rollup/rollup-plugin-commonjs
			resolve({ browser: true }),
			commonjs(),

			// If we're building for production (npm run build
			// instead of npm run dev), minify
			production && terser()
		],
		external: ['fs', 'path', 'sharp']
	},

	{
		input: 'src/shrink.js',
		output: {
			sourcemap: true,
			format: 'cjs',
			name: 'app',
			file: 'dst/shrink.js'
		},
		plugins: [
			json(),

			babel({
				extensions: [ '.js', '.mjs', '.html' ]
			}),
			
			// If you have external dependencies installed from
			// npm, you'll most likely need these plugins. In
			// some cases you'll need additional configuration —
			// consult the documentation for details:
			// https://github.com/rollup/rollup-plugin-commonjs
			resolve({ browser: true }),
			commonjs(),

			// If we're building for production (npm run build
			// instead of npm run dev), minify
			production && terser()
		],
		external: ['fs', 'path', 'sharp']
	}
]