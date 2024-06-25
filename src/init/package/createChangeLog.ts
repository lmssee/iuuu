/** 添加 ChangeLog */

import { writeFileSync } from 'node:fs';
import initData from '../initData';

export default function createChangeLog() {
  const { name } = initData;
  const time = new Date();
  const day = time.getDate(),
    month = time.getMonth() + 1,
    year = time.getFullYear();
  writeFileSync(
    `${name}/CHANGELOG.md`,
    `# ${name} 

## 0.0.0 (${month} 月 ${day} 日 ${year} 年)

- init this project
`,
  );
}
