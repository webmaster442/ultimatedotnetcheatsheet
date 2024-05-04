# Project file XML settings

* Enable implicit usings:

    ```xml
    <PropertyGroup>
        <ImplicitUsings>enable</ImplicitUsings>
    </PropertyGroup>
    ```

* Enable nullable reference types
    
    ```xml
    <PropertyGroup>
        <Nullable>enable</Nullable>
    </PropertyGroup>
    ```
* Set internals visible to an other project

    ```xml
	<ItemGroup>
		<InternalsVisibleTo Include="ProjectName"/>
	</ItemGroup>
    ```
* Do not append target framework to output path

    ```xml
    <PropertyGroup>
        <AppendTargetFrameworkToOutputPath>false</AppendTargetFrameworkToOutputPath>
    </PropertyGroup>
    ```
* Set Assembly version based on build date (year.month.date)

    ```xml
    <PropertyGroup>
        <Version>
            $([System.DateTime]::UtcNow.ToString("yyyy")).$([System.DateTime]::UtcNow.ToString("MM"))
            .$([System.DateTime]::UtcNow.ToString("dd")).0
        </Version>
        <AssemblyVersion>
            $([System.DateTime]::UtcNow.ToString("yyyy")).$([System.DateTime]::UtcNow.ToString("MM"))
            .$([System.DateTime]::UtcNow.ToString("dd")).0
            </AssemblyVersion>
        <FileVersion>
            $([System.DateTime]::UtcNow.ToString("yyyy")).$([System.DateTime]::UtcNow.ToString("MM"))
            .$([System.DateTime]::UtcNow.ToString("dd")).0
        </FileVersion>
    </PropertyGroup>
    ```

* Disable Source Link Source Revision including in Assembly info:

    ```xml
    <PropertyGroup>
        <IncludeSourceRevisionInInformationalVersion>false</IncludeSourceRevisionInInformationalVersion>
    </PropertyGroup>
    ```

* Allow Unsafe code:

    ```xml
    <PropertyGroup>
        <AllowUnsafeBlocks>True</AllowUnsafeBlocks>
    </PropertyGroup>
    ```
