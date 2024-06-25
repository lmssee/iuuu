import { writeFileSync } from 'node:fs';
import initData from '../initData';

/** 添加 vite.config.ts 文件 */
export function createViteConfig() {
  viteConfig();
  vitestConfig();
}

function viteConfig() {
  writeFileSync(
    `${initData.name}/vite.config.ts`,
    `import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import terser from "@rollup/plugin-terser";


export default defineConfig({
    build: {
        // outDir: "out",
        // 是否打包压缩
        minify: false,
        cssMinify: false,
        // 是否 css 拆分
        cssCodeSplit: true,
        rollupOptions: {
            // 打包不引入不引入的依赖
            external: ['vue', 'ismi-js-tools', 'vite'],
            // modules: true,
            output: [{
                format: 'es',
                entryFileNames: "[name].mjs",
                preserveModules: true,
                exports: "named",
                dir: 'exportMjs'
            }, {
                format: 'cjs',
                entryFileNames: '[name].cjs',
                preserveModules: true,
                exports: "named",
                dir: 'exportCjs'
            }],
            plugins: [],
        },
        lib: {
            entry: "./index.ts",
            name: "${initData.name}"
        }
    },
    plugins: [
        vue(),
        vueJsx(),
    ],
});`,
  );
}

function vitestConfig() {
  writeFileSync(
    `${initData.name}/vitest.config.ts`,
    `import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url))
    }
  })
)`,
  );
}
