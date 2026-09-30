# Usefull Powershell commands & scripts

## Enable long path support (Windows 10 version 1607 or later)

```powershell
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" `
-Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```

## Install WSL

```powershell
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

After these commands you need to restart your computer

```powershell
wsl.exe --update
wsl.exe --set-default-version 2
wsl.exe --install -d Debian
```

## Delete bin and obj directories produced by build

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

## Render markdown to a html file (Works on Powershell Core > 7)

```powershell
function Convert-MarkdownToHtml {
    param (
        [Parameter(Mandatory = $true)]
        [string]$input,

        [Parameter(Mandatory = $true)]
        [string]$output
    )

    $markdownContent = Get-Content -Path $input -Raw
    $htmlContent = $markdownContent | ConvertFrom-Markdown
    $htmlContent | Out-File -FilePath $output -Encoding utf8
}
Convert-MarkdownToHtml -input "input.md" -output "out.html"
```

## Find a free port on local machine

```powershell
function Find-FreeTcpPort {
    param(
        [int]$StartPort = 49152, # Default ephemeral port range start
        [int]$EndPort = 65535    # Default ephemeral port range end
    )

    Write-Host "Searching for a free TCP port between $StartPort and $EndPort..."

    for ($port = $StartPort; $port -le $EndPort; $port++) {
        try {
            $tcpListener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Loopback, $port)
            $tcpListener.Start()
            $tcpListener.Stop()
            $tcpListener.Dispose() # Release the port
            Write-Host "Found a free port: $port"
            return $port
        } catch {
            # Port is in use, continue to the next one
            # Write-Verbose "Port $port is in use."
        }
    }

    Write-Warning "No free TCP port found in the specified range ($StartPort - $EndPort)."
    return $null
}
```

## List All Environment Variables for a Specific Process

```powershell
function Get-ProcessEnvironmentVariables {
    param(
        [Parameter(Mandatory=$true)]
        [string]$ProcessNameOrId
    )

    Write-Host "Attempting to find process '$ProcessNameOrId' and list its environment variables..."

    try {
        # Try to get the process by name first
        $process = Get-Process -Name $ProcessNameOrId -ErrorAction SilentlyContinue

        if (-not $process) {
            # If not found by name, try by ID
            $processId = [int]$ProcessNameOrId
            $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
        }

        if (-not $process) {
            Write-Error "Could not find a process with name or ID '$ProcessNameOrId'."
            return $null
        }

    } catch {
        Write-Error "An error occurred while trying to find the process. Error: $($_.Exception.Message)"
        return $null
    }

    Write-Host "Found process: $($process.ProcessName) (ID: $($process.Id))"
    Write-Host "Listing environment variables for this process..."

    try {
        # Get the environment variables from the process object
        # Note: Accessing environment variables of another process might require elevated privileges.
        $envVars = $process.StartInfo.EnvironmentVariables

        if ($envVars.Count -gt 0) {
            # Convert the Hashtable to a custom object array for easier display and manipulation
            $envVarsOutput = @()
            foreach ($key in $envVars.Keys) {
                $envVarsOutput += [PSCustomObject]@{
                    Name  = $key
                    Value = $envVars[$key]
                }
            }
            $envVarsOutput | Sort-Object Name | Format-Table -AutoSize
            return $envVarsOutput # Return the raw objects for further piping if needed
        } else {
            Write-Host "No environment variables found for this process or access denied."
            return $null
        }
    } catch {
        Write-Error "An error occurred while trying to list environment variables. This operation might require elevated privileges. Error: $($_.Exception.Message)"
        return $null
    }
}
```

## Sysinternals

The Sysinternals web site was created in 1996 by Mark Russinovich to host his advanced system utilities and technical information. Whether you’re an IT Pro or a developer, you’ll find Sysinternals utilities to help you manage, troubleshoot and diagnose your Windows and Linux systems and applications.

Sysinternals is available as a live service at the `\\live.sysinternals.com\tools\`. You can mount this folder as a network drive and access the hosted tools from there. The following section is an excerpt about the tools, that are usefull for .NET developers.

### Process Explorer

Process Explorer shows you information about which handles and DLLs processes have opened or loaded. It can be used to inspect process trees, threads, loaded DLLs, handles, environment variables, CPU usage and command-line arguments. It can replace Task Manager for investigating running applications.

```powershell
procexp64.exe
```

Full documentation: https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer

### Process Monitor

Process Monitor is an advanced monitoring tool for Windows that shows real-time file system, Registry and process/thread activity. It combines the features of two legacy Sysinternals utilities, Filemon and Regmon.

```powershell
Procmon64.exe
```

Full documentation: https://learn.microsoft.com/en-us/sysinternals/downloads/procmon

### ProcDump

ProcDump is a command-line utility whose primary purpose is monitoring an application for CPU spikes and generating crash dumps during a spike that an administrator or developer can use to determine the cause of the spike. ProcDump also includes hung window monitoring (using the same definition of a window hang that Windows and Task Manager use), unhandled exception monitoring and can generate dumps based on the values of system performance counters. It also can serve as a general process dump utility that you can embed in other scripts.

* Write a mini dump of a process named 'notepad': `procdump64.exe notepad`
* Write a Mini dump for a process named 'hang.exe' when one of its windows is unresponsive for more than 5 seconds: `procdump64.exe -h hang.exe`
* Write a Mini dump of a process named 'outlook' when total system CPU usage exceeds 20% for 10 seconds: `procdump64.exe outlook -s 10 -p "\Processor(_Total)\% Processor Time" 20`

Full documentation: https://learn.microsoft.com/en-us/sysinternals/downloads/procdump

### VMMap

VMMap is a process virtual and physical memory analysis utility. It shows a breakdown of a process's committed virtual memory types as well as the amount of physical memory (working set) assigned by the operating system to those types. Besides graphical representations of memory usage, VMMap also shows summary information and a detailed process memory map.

```powershell
vmmap64.exe
```

Full documentation: https://learn.microsoft.com/en-us/sysinternals/downloads/vmmap

### TCPView

TCPView is a Windows program that will show you detailed listings of all TCP and UDP endpoints on your system, including the local and remote addresses and state of TCP connections. TCPView also reports the name of the process that owns the endpoint. TCPView provides a more informative and conveniently presented subset of the Netstat program that ships with Windows.

```powershell
tcpview64.exe
```

Full documentation: https://learn.microsoft.com/en-us/sysinternals/downloads/tcpview

### ListDLLs

ListDLLs is a utility that reports the DLLs loaded into processes. You can use it to list all DLLs loaded into all processes, into a specific process, or to list the processes that have a particular DLL loaded.

* List the DLLs loaded into Outlook.exe, including their version information: `listdlls64.exe -v outlook`
* Show processes that have loaded MSO.DLL: `listdlls -d mso.dll`

Full documentation: https://learn.microsoft.com/en-us/sysinternals/downloads/listdlls
