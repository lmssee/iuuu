import { writeFileSync } from 'node:fs';
import createData from './createData';

export function createScss() {
    const { targetDir, targetName, className } = createData;
    /** 写入样式 */
    writeFileSync(
        `${targetDir}/${targetName}.scss`,
        `.${className}_class {
  position: relative;
  width: auto;
  padding: 4px 16px;
  display: inline-block;
  position: relative;
  top: 0;
  left: 0;
  transition: all 0.5s;
  color: #000;
  background-color: #fff;
  border: none;
  box-shadow: 1px 1px 12px #25252599;
  border-radius: 24px;

  &:hover {
   transition: all 1s;
   // color: #0f0;
   background-color: #000;
   text-shadow: 1px 1px 1px #0f0, -1px -1px 1px #0f0, -1px 1px 1px #0f0, 1px -1px 1px #0f0;
   box-shadow: 1px 1px 12px #0f06;
   animation: textShadow .68s infinite ease-in-out alternate-reverse;
  }   
}
    
@keyframes textShadow {
  from {
    box-shadow: 1px 1px 12px #0f06;
    text-shadow: 1px 1px 1px #0f0, -1px -1px 1px #0f0, -1px 1px 1px #0f0, 1px -1px 1px #0f0;
  }
    
to {
  box-shadow: 1px 1px 1px #0ff6;
  text-shadow: 1px 1px 3px #0ff, -1px -1px 3px #0ff, -1px 1px 3px #0ff, 1px -1px 3px #0ff;
  }
}`,
    );
}
