let data = '';

/** 导出一个添加组件的数据
 *
 * - name ： 包名
 * - targetName ：组件名
 * - className ： 给出的 class 名
 * - targetDir ： 给出的当前组件的工作目录
 *
 */
export default {
  /** 库名称 */
  name: '',
  /** 新增组件名称 */
  set targetName(value: string) {
    data = value.replace(/^\W*|^\s*|^\d*/, '').replace(/\s*/gm, '');
    this.className = data.replace(/\-/gm, '_');
    do {
      data = data
        .split('-')
        .map((currentEle: string) => {
          return /[a-z]/.test(currentEle)
            ? currentEle.substring(0, 1).toUpperCase().concat(currentEle.substring(1))
            : currentEle;
        })
        .join('');
    } while (data.includes('-'));
  },
  get targetName() {
    return data;
  },

  /** class name  */
  className: '',
  /** 组件的目录位置 */
  get targetDir(): string {
    return `src/${data}`;
  },
};
