import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		file: 'public/bundle.js',
		format: 'iife', // immediately-invoked function expression — suitable for <script> tags
		sourcemap: true
	},
	plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs({
      include: 'node_modules/**'
    }),
		production && uglify(),// minify, but only in production
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    })
	]
};
