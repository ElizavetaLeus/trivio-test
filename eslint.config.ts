// import { globalIgnores } from 'eslint/config'
// import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
// import pluginVue from 'eslint-plugin-vue'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

// export default defineConfigWithVueTs(
//   {
//     name: 'app/files-to-lint',
//     files: ['**/*.{ts,mts,tsx,vue}'],
//   },
//
//   globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),
//
//   pluginVue.configs['flat/essential'],
//   vueTsConfigs.recommended,
// )
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import vuePlugin from "eslint-plugin-vue";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vuePlugin.configs["flat/essential"],
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      indent: ['error', 2],
      'no-multi-spaces': 'error',
    }
  },
  {
    files: ["**/*.vue"],
    rules: {
      'vue/html-indent': ['error', 2]
    }
  }
);
