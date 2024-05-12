# Usefull Powershell commands & scripts

* Enable long path support (Windows 10 version 1607 or later)

    ```powershell
    New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" `
    -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
    ```

* Delete bin and obj directories produced by build

    ```powershell
    function RemoveBinObj  {
        $directories = Get-ChildItem -Directory -Recurse | Where-Object { $_.Name -eq "bin" -or $_.Name -eq "obj" }
        foreach ($directory in $directories) {
            Write-Host "Deleting $($directory.FullName)" -ForegroundColor Yellow
            Remove-Item $directory.FullName -Recurse -Force
        }
        Write-Host "Cleanup complete!" -ForegroundColor Green
    }

    RemoveBinObj
    ```
