import { writeFileSync } from 'node:fs';
import initData from '../initData';

/** 添加 html  */
export default function createIndexHtml() {
  const { name } = initData;
  /** 生成根 html */
  writeFileSync(
    `${name}/index.html`,
    `<!DOCTYPE html>
  <html lang="zh-cn">
    <head>
      <meta charset="UTF-8" />
      <link rel="shortcut icon" type="image/x-icon"  href="./favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${name} 功能测试</title>
    </head>
    <body>
      <div id="app">一定是特别的缘分</div>
      <script src="main.ts" type="module"></script>
    </body>
  </html>
  `,
  );
}
