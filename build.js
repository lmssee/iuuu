import fs from 'node:fs';
import path from 'node:path';

function searchFiles(rootPath) {
  fs.readdirSync(rootPath, { withFileTypes: true }).forEach(dirent => {
    const fullPath = path.join(rootPath, dirent.name);

    if (dirent.isDirectory()) {
      // 递归搜索子目录
      searchFiles(fullPath);
    } else if (dirent.isFile() && dirent.name.endsWith('.css')) {
      // 找到了 .css 文件
      const cssFileName = dirent.name;
      const baseFileName = path.parse(cssFileName).name;

      // 构建 .mjs 和 .cjs 文件的路径
      const esModuleName = path.join(rootPath, `${baseFileName}.mjs`);
      const commandModuleName = path.join(rootPath, `${baseFileName}.cjs`);

      // 检查是否存在对应的 .mjs 或 .cjs 文件
      if (fs.existsSync(esModuleName)) {
        // 读取 .mjs 文件内容
        let content = fs.readFileSync(esModuleName, 'utf8');

        // 查找并替换占位符（这里假设占位符为 "/* empty css */"）
        const newString = `;import "./${cssFileName}";`;
        content = content.replace(/\/[*] empty css [*]\//g, newString);

        // 写入修改后的内容
        fs.writeFileSync(esModuleName, content);
      }

      if (fs.existsSync(commandModuleName)) {
        // 读取 .cjs 文件内容
        let content = fs.readFileSync(commandModuleName, 'utf8');

        // 查找并替换占位符
        const newString = `;require("./${cssFileName}");`;
        content = content.replace(/\/[*] empty css [*]\//g, newString);

        // 写入修改后的内容
        fs.writeFileSync(commandModuleName, content);
      }
    }
  });
}

// 示例用法：从某个根目录开始搜索
// const rootPath = "C:\\path\\to\\your\\root\\directory"; // Windows 路径示例
// 或在 Unix/Linux/macOS 上使用
// const rootPath = '/path/to/your/root/directory';
searchFiles(process.cwd());
