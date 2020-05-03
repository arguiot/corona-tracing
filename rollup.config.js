import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'app/main.js',
    output: {
        file: 'src/js/functions.js',
        format: 'iife',
    },
    intro: '/* Copyright © 2019 Arthur Guiot */',
    plugins: [
		resolve(), // tells Rollup to build using Node Modules
		commonjs(), // converts to ES modules
		production && terser() // minify, but only in production
	]
};