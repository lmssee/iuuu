/**  添加 eslint  */

import { writeFileSync } from 'node:fs';
import initData from '../initData';

/**  添加 eslint  */
export default function eslint() {
  writeFileSync(
    `${initData.name}/.eslintrc.cjs`,
    `/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}`,
  );
}
