# Attributes

^^^
![Common Attributes](img/attributes.svg)
^^^ Common Attributes

## Data annotation

^^^
![Data annotation Attributes](img/attributes-dataannotation.svg)
^^^ Data annotation Attributes

## Creating custom attributes

All custom attributes must inherit from the `System.Attribute` class. This is the foundation that allows the attribute to be recognized by the .NET runtime.

* The attribute class must end with the name `Attribute`
* The attribute class must be annotated with the `AttributeUsage` attribute, which determines how a custom attribute class can be used.

```csharp
[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
public class MyCustomAttribute : Attribute
{
    public string Description { get; }
    public int Version { get; }

    // Constructor to initialize the attribute
    public MyCustomAttribute(string description, int version)
    {
        Description = description;
        Version = version;
    }
}
```

In the above example the `MyCustomAttribute` is restricted to be used on methods and classes. The `Inherited = false` prevents the attribute from being inherited by derived classes. The `AllowMultiple = false` ensures that the attribute can only be applied once per element.

## Attributes interpreted by the C# compiler

### Obsolete

It is used to mark program elements (like classes, methods, properties, etc.) as outdated or no longer recommended for use. The `[Obsolete]` attribute is typically applied to warn developers when they use a deprecated feature.

```csharp
[Obsolete("Use NewMethod instead.")]
public static void OldMethod()
{
    Console.WriteLine("This is the old method.");
}
```

During compile if any method calls the `OldMethod()` code, then a compiler warning will be produced with the message `Use NewMethod instead.`

### Experimental

Available since C# 12. It is used to indicate an experimental feature. The compiler issues a warning if you access a method or type annotated with the `[Experimental]` attribute. It is used to communicate that the feature is in a trial phase and not yet stable.

### SetsRequiredMembers

The `[SetsRequiredMembers]` attribute informs the compiler that a constructor sets all `required` members in that class or struct. The compiler assumes any constructor with the `SetsRequiredMembers` attribute initializes all `required` members. 

### ModuleInitializer

The `[ModuleInitializer]` attribute marks a method that the runtime calls when the assembly loads. The ModuleInitializer attribute can only be applied to a method that:

* Is static.
* Is parameterless.
* Returns void.
* Is accessible from the containing module, that is, internal or public.
* Isn't a generic method.
* Isn't contained in a generic class.
* Isn't a local function.

**The ModuleInitializer attribute can be applied to multiple methods. In that case, the order in which the runtime calls them is deterministic but not specified.**

```csharp
using System.Runtime.CompilerServices;

internal static class Program
{
    [ModuleInitializer]
    public static void BeforeMain()
    {
        Console.WriteLine("This is executed before main");
    }

    private static void Main(string[] args)
    {
        Console.WriteLine("Main");
    }
}
```

### OverloadResolutionPriority

The `[OverloadResolutionPriority]` attribute enables library authors to prefer one overload over another when two overloads can be ambiguous. Its primary use case is for library authors to write better performing overloads while still supporting existing code without breaks.

```csharp
[OverloadResolutionPriority(1)]
public void M(params ReadOnlySpan<int> s) => Console.WriteLine("Span");
// Default overload resolution priority of 0
public void M(params int[] a) => Console.WriteLine("Array");
```

Overload resolution considers the two methods equally good for some argument types. For an argument of `int[]`, it prefers the first overload. To get the compiler to prefer the `ReadOnlySpan` version, you can increase the priority of that overload. This way, when the user types in `M(` into the editor, the `void M(params ReadOnlySpan<int> s)` version will be suggested by the IntelliSense first.

## Nullable attributes

In a nullable enabled context, the compiler performs static analysis of code to determine the null-state of all reference type variables:

* not-null: Static analysis determines that a variable has a non-null value.
* maybe-null: Static analysis can't determine that a variable is assigned a non-null value.

Attributes can be aplied to our code that gives the compiler more information about the rules for your API. When calling code is compiled in a nullable enabled context, the compiler will warn callers when they violate those rules. These attributes don't enable more checks on your implementation.

### Preconditions: AllowNull and DisallowNull

* `AllowNull`: A non-nullable parameter, field, or property may be null.
* `DisallowNull`: A nullable parameter, field, or property should never be null.

```csharp
[AllowNull]
public string ScreenName
{
    get => _screenName;
    set => _screenName = value ?? GenerateRandomScreenName();
}
private string _screenName = GenerateRandomScreenName();

[DisallowNull]
public string? ReviewComment
{
    get => _comment;
    set => _comment = value ?? throw new ArgumentNullException(nameof(value), "Cannot set to null");
}
string? _comment;
```

### Postconditions: MaybeNull and NotNull

* `MaybeNull`: A non-nullable parameter, field, property, or return value may be null.
* `NotNull`: A nullable parameter, field, property, or return value will never be null.

```csharp
[return: MaybeNull]
public T Find<T>(IEnumerable<T> sequence, Func<T, bool> predicate)
{
    //implementation
}

public static void ThrowWhenNull([NotNull] object? value, string valueExpression = "")
{
    _ = value ?? throw new ArgumentNullException(nameof(value), valueExpression);
}
```

### Conditional post-conditions: NotNullWhen, MaybeNullWhen, and NotNullIfNotNull

* `NotNullWhen`: A nullable argument won't be null when the method returns the specified `bool` value.
* `MaybeNullWhen`: A non-nullable argument may be null when the method returns the specified `bool` value.
* `NotNullIfNotNull`: A return value, property, or argument isn't null if the argument for the specified parameter isn't null.

```csharp
bool TryGetMessage(string key, [NotNullWhen(true)] out string? message)
{
    if (_messageMap.ContainsKey(key))
        message = _messageMap[key];
    else
        message = null;
    return message is not null;
}

[return: NotNullIfNotNull(nameof(url))]
string? GetTopLevelDomainFromFullUrl(string? url)
{
    //implementation
}

```

### MemberNotNull and MemberNotNullWhen

* `MemberNotNull`: The listed member won't be null when the method returns.
* `MemberNotNullWhen`: The listed member won't be null when the method returns the specified bool value.

```csharp
public class Container
{
    private string _uniqueIdentifier; // must be initialized.
    private string? _optionalMessage;

    public Container()
    {
        Helper();
    }

    public Container(string message)
    {
        Helper();
        _optionalMessage = message;
    }

    [MemberNotNull(nameof(_uniqueIdentifier))]
    private void Helper()
    {
        _uniqueIdentifier = DateTime.Now.Ticks.ToString();
    }
}
```

### DoesNotReturn and DoesNotReturnIf

* `DoesNotReturn`: A method or property never returns. In other words, it always throws an exception.
* `DoesNotReturnIf`: A method or property never returns if the associated bool parameter has the specified value.

```csharp
[DoesNotReturn]
private void FailFast()
{
    throw new InvalidOperationException();
}

public void SetState(object containedField)
{
    if (containedField is null)
    {
        FailFast();
    }

    // containedField can't be null:
    _field = containedField;
}
```
