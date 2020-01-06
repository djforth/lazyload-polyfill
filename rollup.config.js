// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';
import analyze from 'rollup-plugin-analyzer';
import autoExternal from 'rollup-plugin-auto-external';

export default {
  input: 'src/index.js',

  plugins: [
    autoExternal(),
    resolve({
      mainFields: ['module', 'main', 'jsnext:main'],
      browser: true,
      extensions: ['.js'],
    }),
    commonjs({
      namedExports: {
        // left-hand side can be an absolute path, a path
        // relative to the current directory, or the name
        // of a module in node_modules
        '@djforth/utilities': ['checkElements', 'curry'],
      },
    }),
    babel({
      exclude: 'node_modules/**', // only transpile our source code
      // , externalHelpers: true
      // , plugins: ['external-helpers']
      // , runtimeHelpers: true
    }),
    replace({
      exclude: 'node_modules/**',
      ENVIRONMENT: JSON.stringify(process.env.NODE_ENV),
    }),
    uglify(),
    analyze(),
  ],
  // external: id => id.includes('core-js'),

  output: {
    name: 'LazyloadPolyfill',
    sourcemap: true,
    file: 'index.js',
    format: 'umd',
    globals: {
      // map 'some-npm-package' to 'SomeNPMPackage' global variable
      '@djforth/utilities': 'DJForthUtilities',
    },
  },
};
