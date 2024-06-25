function fn_search_files {  
    param($rootPath)  
  
    Get-ChildItem -Path $rootPath -Directory | ForEach-Object {  
        $dir = $_.FullName  
          
        # 查找 CSS 文件  
        $cssFiles = Get-ChildItem -Path $dir -Filter *.css -File -Recurse  
          
        foreach ($cssFile in $cssFiles) {  
            $cssFileName = $cssFile.Name  
            $baseFileName = [System.IO.Path]::GetFileNameWithoutExtension($cssFileName)  
            $esModuleName = Join-Path -Path $dir -ChildPath "$baseFileName.mjs"  
            $commandModuleName = Join-Path -Path $dir -ChildPath "$baseFileName.cjs"  
              
            if (Test-Path -Path $esModuleName -PathType Leaf) {  
                $newString = ";import `"./$cssFileName`";"  
                (Get-Content -Path $esModuleName -Raw) -replace '\[/\]\[*\]\s*empty\s*css\s*\[*\]\[/\]', $newString | Set-Content -Path $esModuleName  
            }  
              
            if (Test-Path -Path $commandModuleName -PathType Leaf) {  
                $newString = ";require(`"./$cssFileName`");"  
                (Get-Content -Path $commandModuleName -Raw) -replace '\[/\]\[*\]\s*empty\s*css\s*\[*\]\[/\]', $newString | Set-Content -Path $commandModuleName  
            }  
        }  
          
        # 递归调用函数以搜索子目录  
        fn_search_files -rootPath $dir  
    }  
}  
  
# 示例用法：从某个根目录开始搜索  
fn_search_files -rootPath "C:\path\to\your\root\directory"
