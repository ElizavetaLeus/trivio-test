import { globalIgnores } from 'eslint/config';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    rules: {
      // Отступы: 4 пробела
      indent: ['error', 2],
      // Кавычки: одинарные
      quotes: ['error', 'single', { avoidEscape: true }],
      // Запятая в конце объектов/массивов всегда
      'comma-dangle': ['error', 'always-multiline'],
      // Обязательная точка с запятой
      semi: ['error', 'always'],
      // Пробел перед и после стрелки
      'arrow-spacing': ['error', { before: true, after: true }],
      // Запрет лишних пробелов
      'no-multi-spaces': 'error',
      // Допускается не более 1 пустой строки
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
      // Пробелы внутри фигурных скобок в объектах
      'object-curly-spacing': ['error', 'always'],
      // Vue шаблоны - отступы 4 пробела
      'vue/html-indent': ['error', 2],
      // Vue шаблон - Запрет лишних пробелов
      'vue/no-multi-spaces': 'error',
      // Vue шаблоны - перенсо атрибутов
      'vue/max-attributes-per-line': ['error', {
        singleline: { max: 99 },
        multiline: 1, // один атрибут на новую строку
      }],
      'vue/first-attribute-linebreak': ['error', {
        singleline: 'beside', // если тег в одну строку - атрибуты разрешены рядом
        multiline: 'below', // если переносишь - первый атрибут обязательно на новой строке
      }],
      'vue/html-closing-bracket-newline': ['error', {
        singleline: 'never', // если всё в одной строке то угловая скобочка на той же строке
        multiline: 'always', // если атрибуты переносяться закрывающая угловая скобка тоже переноситься
      }],
    },
  },
);
