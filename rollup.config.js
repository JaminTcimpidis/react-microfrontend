import commonjs from "@rollup/plugin-commonjs";
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import dts from "rollup-plugin-dts";

export default [{
  input: "src/index.ts",
  output: [
    {
      file: './lib/cjs/index.js',
      format: 'cjs'
    },
    {
      file: './lib/esm/index.js',
      format: 'esm'
    }
  ],
  plugins:[
    resolve(),
    typescript({tsconfig: "./tsconfig.json"}),
    commonjs(),
    terser(),]
},
{
  input: "lib/esm/index.d.ts",
  output: [{ file: "lib/index.d.ts", format: "esm" }],
  plugins: [dts()],

  external: [/\.css$/],
},
];