# Reflection

## Get all types that implement a given interface

```csharp
public static IEnumerable<Type> GetTypesThatImplement<TInterface>(Assembly assembly,
                                                                    bool includeAbstract = false)
    where TInterface : class
{
    var types = assembly.GetTypes()
        .Where(t => t.IsAssignableTo(typeof(TInterface)) && !t.IsInterface);

    if (!includeAbstract)
        types = types.Where(t => !t.IsAbstract);

    return types;
}
```

## Get assembly version

```csharp
public static Version GetCurrentAssemblyVersion()
{
    return System.Reflection.Assembly.GetExecutingAssembly()
        .GetName()
        .Version
        ?? new Version(0, 0, 0, 0);
}
```

## Check if a type is a record class

```csharp
public static bool IsRecordType(Type type)
{
    if (!type.IsClass)
        return false;

    var searchFlags = System.Reflection.BindingFlags.Instance
            | System.Reflection.BindingFlags.Public
            | System.Reflection.BindingFlags.NonPublic;

    return type.GetProperty("EqualityContract", searchFlags) != null
        && type.GetMethod("<Clone>$", searchFlags) != null;
}
```

## Check if a type is a ref struct

```csharp
public static bool IsRefStruct(Type type)
{
    return type.IsByRefLike;
}
```

## Create an instance of a type with optional property initializers

**Notes**

1. This method will fail with an exception if, the `type` has no parameterless constructor
2. Reflection doesn't enforce that properties marked with the `required` keyword have to have a value set. If you don't set these values, then they can be `null`
3. This method doesn't check property and value types. If you provide a wrong type of value in the `propertyInitializers`, then the method will fail with an exception.

```csharp
public static T CreateInstance<T>(Type type,
                                    Dictionary<string, object>? propertyInitializers = null)
    where T: class
{
    if (typeof(T) != type)
        throw new ArgumentException("Type mismatch");

    T? instance = Activator.CreateInstance(type) as T
        ?? throw new InvalidOperationException("Failed to create instance");
    
    var searchFlags = System.Reflection.BindingFlags.Instance
                    | System.Reflection.BindingFlags.Public
                    | System.Reflection.BindingFlags.NonPublic;

    if (propertyInitializers != null)
    {
        foreach (var propery in propertyInitializers)
        {
            var propertyInfo = type.GetProperty(propery.Key, searchFlags)
                ?? throw new ArgumentException($"Property {propery.Key} not found");

            propertyInfo.SetValue(instance, propery.Value);
        }
    }

    return instance;
}
```
