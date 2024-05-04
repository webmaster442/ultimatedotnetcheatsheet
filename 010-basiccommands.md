# Dotnet basic commands

* Check .NET version: `dotnet --version`
* List installed .NET SDKs: `dotnet --list-sdks`
* Show up-to-date status of installed .NET SDKs and .NET Runtimes: `dotnet sdk check`

## New

* Create new gitignore file in current dir: `dotnet new gitignore`
* Create new editorconfig file in current dir: `dotnet new editorconfig`
* Create new solution with name: `dotnet new  sln -n "Name of solution"`
* Create new class libary: `dotnet new classlib -n "Name of lib"`
* Create new console app: `dotnet new console -n "Program name"`
* Create new nunit test project: `dotnet new nunit -n "test project name"`
* Create new xunit test project: `dotnet new xunit -n "test project name"`

## Solution management

* List projects in solution: `dotnet sln [solution.sln] list `
* Add project to solution: `dotnet sln [solution.sln] add [project.csproj]`
* Remove project from solution: `dotnet sln [solution.sln] remove [project.csproj]`  

Note: solution file name can be ignored if folder only contains one `.sln` file.

## Package management

* List package references for project: `dotnet list [project.csproj] package`
* List package references for solution: `dotnet list [solution.sln] package`
* Add or update a package reference: `dotnet add [project.csproj] package [packagename]`
* Remove a package reference: `dotnet remove [project.csproj] package [packagename]`
* Restore package dependencies of project: `dotnet restore [project.csproj]`
* Restore package dependencies of solution: `dotnet restore [solution.sln]`
* Pack current project to nuget package: `dotnet pack [project.csproj]`

## Build & Run

* Build solution in debug mode: `dotnet build [solution.sln] -c DEBUG`
* Build solution in release mode: `dotnet build [solution.sln]  -c RELEASE`
* Build project in debug mode: `dotnet build [project.csproj] -c DEBUG`
* Build project in release mode: `dotnet build [project.csproj]  -c RELEASE`
* Clean output of a project: `dotnet clean [project.csproj]`
* Clean output of a solution: `dotnet clean [solution.sln]`
* Run a compiled assembly: `dotnet run [assembly.dll]`
* Run tests: `dotnet test [testproject.csproj]` or `dotnet test [solution.sln]`

## Tool management

* Install a tool: `dotnet tool install [tool Name]`
* Install a tool globaly: `dotnet tool install -g [tool Name]`
* List installed tools: `dotnet tool list`
* List globaly installed tools: `dotnet tool list -g`
* Remove a tool: `dotnet tool uninstall [tool Name]`
* Remove a globaly installed tool: `dotnet tool uninstall -g [tool Name]`
* Update a tool: `dotnet tool update [tool Name]`
* Update a globaly installed tool: `dotnet tool update -g [tool Name]`

Globally means that the tool is installed to the users profile, instead of the current project/solution.

## NuGet

* Display all cache directories: `dotnet nuget locals all --list`
* Clear all files from all local cache directories: `dotnet nuget locals all --clear`
* Push a package to the NuGet repository: `dotnet nuget push [package.nupkg] -k [api key]`
* Push a package to a custom NuGet feed: `dotnet nuget push [package.nupkg] -k [api key] -s [feed url]`
* Push all .nupkg files in the current directory to a local feed directory: `dotnet nuget push "*.nupkg" -s [feed directory]`
* List all configured NuGet sources: `dotnet nuget list source [source name]`
* Remove a NuGet source: `dotnet nuget remove source`
* Add a NuGet source: `dotnet nuget add source [url or local path] -n [source name]`
* Update a NuGet source: `dotnet nuget update source [source name]`

## Formating

* Create a new editorconfig file: `dotnet new editorconfig`
* Format all code in the solution or a project: `dotnet format [solution.sln or project.csproj]`
* Verify that all code is correctly formatted: `dotnet format --verify-no-changes`

## Workloads

* List all available workloads: `dotnet workload search`
* Install an optional workload: `dotnet workload install [workload id]`
* Uninstall a workload: `dotnet workload uninstall [workload id]`
* List installed workloads: `dotnet workload list`
* Repair workload installations: `dotnet workload repair`
* Update installed workloads: `dotnet workload update`
* Install workload needed for a project or a solution: `dotnet workload restore [soluton.sln or project.csproj]`

## Tools

* Install a tool: `dotnet tool install --global [tool name]`
* Uninstall a tool: `dotnet tool uninstall --global [tool name]`
* Lists all tools that are currently installed: `dotnet tool list --global`
* Searches all .NET tools that are published to NuGet: `dotnet tool search [tool name]`

Global tools are installed in `$HOME/.dotnet/tools` on Linux and macOS. On Windows they are installed in the `%USERPROFILE%\.dotnet\tools` folder. Instead of the `--global` switch use the `--tool-path [folder]` to install the tool to a custom directory. If no `--global` or `--tool-path` is specified, then the tool is installed to the current C# project.

## Useful tools

* **dotnet-ef**

	The command-line interface (CLI) tools for Entity Framework Core perform design-time development tasks. For example, they create migrations, apply migrations, and generate code for a model based on an existing database. The commands are an extension to the cross-platform dotnet command, which is part of the .NET Core SDK. These tools work with .NET Core projects. 
    
    Install with: `dotnet tool install --global dotnet-ef`

    More info: https://learn.microsoft.com/en-us/ef/core/cli/dotnet

* **csharprepl**

    A cross-platform command line REPL for the rapid experimentation and exploration of C#. It supports IntelliSense, installing NuGet packages, and referencing local .NET projects and assemblies. 
    
    Install with: `dotnet tool install -g csharprepl`

    More info: https://github.com/waf/CSharpRepl
	
* **IronPython**

	IronPython is an open-source implementation of the Python programming language that is tightly integrated with .NET. IronPython can use .NET and Python libraries, and other .NET languages can use Python code just as easily.
    
    Install with: `dotnet tool install -g IronPython.Console`

    More info: https://ironpython.net/

* **dotnet-format**

    Dotnet-format is a code formatter for dotnet that applies style preferences to a project or solution. Preferences will be read from an `.editorconfig` file, if present, otherwise a default set of preferences will be used.
    
    Install with: `dotnet tool install -g dotnet-format`

    More info: https://github.com/dotnet/format

* **.NET Upgrade Assistant**
  
	The .NET Upgrade Assistant is a Visual Studio extension and command-line tool that's designed to assist with upgrading apps to the latest version of .NET.
    
    Install with: `dotnet tool install -g upgrade-assistant`

    More info: https://dotnet.microsoft.com/en-us/platform/upgrade-assistant

* **SlnGen**

    SlnGen is a Visual Studio solution file generator. Visual Studio solutions generally do not scale well for large project trees. They are scoped views of a set of projects. Enterprise-level builds use custom logic like traversal to convey how they should be built by a hosted build environment. Maintaining Visual Studio solutions becomes hard because you have to keep them in sync with the other build logic. Instead, SlnGen reads the project references of a given project to create a Visual Studio solution on demand. For example, you can run it against a unit test project and be presented with a Visual Studio solution containing the unit test project and all of its project references.

    Install with: `dotnet tool install --global Microsoft.VisualStudio.SlnGen.Tool --add-source https://api.nuget.org/v3/index.json --ignore-failed-sources`

    More info: https://github.com/microsoft/slngen

* **Roslynator Cli**

    Roslynator is a set of code analysis tools for C#, powered by Roslyn.

    Install with: `dotnet tool install -g roslynator.dotnet.cli`

    More info: https://josefpihrt.github.io/docs/roslynator/cli
