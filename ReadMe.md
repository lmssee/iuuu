# iuuu

A simple Vue UI library construction tool (At least for now, it's like this)

**This package command is only applicable to projects created using this package and the directory structure needs to meet the package settings**

<table><tr>
<td><a href="https://github.com/lmssee/iuuu/blob/main/README.md"  target="_self">English</a></td>
<td><a href="https://github.com/lmssee/iuuu/blob/main/自述文件.md"  target="_self">中文</a></td>
</tr></table>

## install

```sh
npm install  --global  iuuu
```

## use

### create a new project

use you terminal and input :

```sh
npx iuuu  init
```

If you install globally, you can also use the following command

```sh
iuuu  init
```

If you have already decided on the name of the project, you can:

```sh
npx iuuu  init <project>
```

If you install globally, you can also use the following command

```sh
iuuu  init  <project>
```

If you are lazy, you can use `v` instead of `vue` and use `-i` instead of `init` in the command. That is, the shortest (in the case of global installation) command is

```sh
iuuu i
```

### create a component

```sh
npx iuuu create
```

as `init` , you can use `iuuu c ` of you global install

### Supplementary explanation to the working directory

After generating the project, you can `cd <project name>` enter the project root directory, execute `npm install && npm run dev`, and then you can see the initial `test button` component rendering test

The component uses [Vue's jsx](https://cn.vuejs.org/guide/extras/render-function.html) writing style, similar to template writing style

### src (source component's home)

The root directory of the component, which exposes the component to the outside through `index. ts`. The components are located in the `src` folder, and you can add new components by using the command `npx iuuu c`.

The ` npx iuuu c` command will create a new component with the name you entered in the `src` directory (please follow the naming convention for new components, separate words with `-`), and automatically add exports to `src/index.ts`. If you want to overwrite the component after writing some code, you can overwrite it again by using the command `npx iuuu c <component name>`.

### static

This is a component testing area where you can test newly written components that have just arrived

### about `css`

This project uses the `scss` write `css` style. You can write styles into the `.scss` file under the same name of the component. Because the project was exported as an on-demand export, the `css` was split, but after being packaged with `rollup`, a magical line was generated. The current solution is to manually write references using the `shell` file

If you have any questions, you can directly [submit question](https://github.com/lmssee/iuuu/issues/new)
