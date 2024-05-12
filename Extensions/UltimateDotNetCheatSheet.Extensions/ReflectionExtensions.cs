namespace UltimateDotNetCheatSheet.Extensions;

public static class ReflectionExtensions
{
    /// <summary>
    /// Create an instance of a type with optional property initializers.
    /// </summary>
    /// <typeparam name="T">Generic Type to create</typeparam>
    /// <param name="type">Type to create. Must match the generic type</param>
    /// <param name="propertyInitializers">Property values to set, when creating the type.</param>
    /// <returns>An instance of type T</returns>
    /// <exception cref="ArgumentException">Type mismatch typeof(T) is not equal to type</exception>
    /// <exception cref="InvalidOperationException">Failed to create instance</exception>
    /// <exception cref="MissingMethodException">Type has no parameterless constructor</exception>
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

    public static Version GetCurrentAssemblyVersion()
    {
        return System.Reflection.Assembly.GetExecutingAssembly()
            .GetName()
            .Version
            ?? new Version(0, 0, 0, 0);
    }

    public static bool IsRecordType(this Type type)
    {
        if (!type.IsClass)
            return false;

        var searchFlags = System.Reflection.BindingFlags.Instance
                | System.Reflection.BindingFlags.Public
                | System.Reflection.BindingFlags.NonPublic;

        return type.GetProperty("EqualityContract", searchFlags) != null
            && type.GetMethod("<Clone>$", searchFlags) != null;
    }

    public static bool IsRefStruct(this Type type)
    {
        return type.IsByRefLike;
    }

    public static IEnumerable<Type> GetTypesThatImplement<TInterface>(Assembly assembly)
        where TInterface : class
    {
        return assembly.GetTypes()
            .Where(t => t.IsAssignableTo(typeof(TInterface)) && !t.IsInterface);
    }
}
