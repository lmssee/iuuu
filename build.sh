#!/bin/bash

# 替换 rollup 打包后文本
fn_search_files() {
    for file in "$1"/*; do
        if [ -d "$file" ]; then
            # 查找文件
            local css=$(find "$file" -name **.css)
            # 判断该文件是否为文件类型
            if [ -f "$css" ]; then
                local cssFileName=$(basename "$css")
                local baseFileName=$(basename $css .css)
                local esModuleName="$file/\${baseFileName}.mjs"
                local commandModuleName="$file/\${baseFileName}.cjs"
                if [ -f "$esModuleName" ]; then
                    local new_string=";import \\"./\${cssFileName}\\";"
                    sed -i "" "s#[\/][\*][ ]*empty[ ]*css[ ]*[\*][\/]#\${new_string}#g" "$esModuleName"
                fi
                if [ -f "$commandModuleName" ]; then
                    local new_string=";require(\\"./\${cssFileName}\\");"
                    sed -i "" "s#[\/][\*][ ]*empty[ ]*css[ ]*[\*][\/]#\${new_string}#g" "$commandModuleName"
                fi
            fi
            fn_search_files "$file"
        fi
    done
}

dirName=$(pwd)

fn_search_files $dirName
