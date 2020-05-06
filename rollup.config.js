import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {
    terser
} from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';

const production = !process.env.ROLLUP_WATCH;

export default [{
        input: 'app/main.js',
        output: {
            file: 'src/js/functions.js',
            format: 'iife',
            name: 'con',
            sourcemap: true
        },
        intro: '/* Copyright © 2019 Arthur Guiot */',
        plugins: [
            resolve(), // tells Rollup to build using Node Modules
            commonjs(), // converts to ES modules
            babel({
                babelHelpers: 'bundled',
                presets: ['@babel/preset-env']
            }),
            production && terser() // minify, but only in production
        ]
    },
    {
        input: 'app/tutorial.js',
        output: {
            file: 'src/js/tutorial.js',
            format: 'iife',
            name: 'tour',
            sourcemap: true
        },
        intro: '/* Copyright © 2019 Arthur Guiot */',
        plugins: [
            resolve(), // tells Rollup to build using Node Modules
            commonjs(), // converts to ES modules
            babel({
                babelHelpers: 'bundled',
                presets: ['@babel/preset-env']
            }),
            production && terser() // minify, but only in production
        ]
    }
]