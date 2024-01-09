import typescript from "rollup-plugin-typescript2";
import terser from "@rollup/plugin-terser";
const BANNER = [
  "/** \n",
  "* NO TOCAR ESTE ARCHIVO: Es generado automaticamente\n",
  "*/",
];

export default {
  input: "src/index.ts",
  output: {
    banner: BANNER.join(""),
    file: "dist/index.js",
    format: "esm",
  },
  plugins: [typescript(),terser()],
};
