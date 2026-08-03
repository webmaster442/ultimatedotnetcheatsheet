# Exceptions

## Common exceptions

^^^
![Common Exceptions](img/common_exceptions.svg)
^^^ Common Exceptions

## Implementing an own Exception

Every exception class should have 3 constructors for the following scenarios:

1. A parameterless constructor
2. A constructor that takes a string message
3. A constructor that takes a string message and an inner exception

The constructors should call the base class constructors with the appropriate parameters. Exceptions should be serializable for compatibility with older .NET Framework versions.

```csharp
[Serializable]
public class CustomException : Exception
{
    public CustomException()
    {
    }

    public CustomException(string? message) : base(message)
    {
    }

    public CustomException(string? message, Exception? innerException) 
        : base(message, innerException)
    {
    }
}
```

## UnreachableExecption

UnreachableException indicates that a code path that should never be reached has been reached. This is usefull, when dealing with enum values, that can be extended in the future. When handling enum values, it is a good practice to always have a default case, that throws an exception. This way, the method will fail fast, if a new enum value is added, and the switch statement is not updated.

```csharp
public enum MyEnum
{
    First,
    Second
}

public void SomeMethod(MyEnum value)
{
    switch(value)
    {
        case MyEnum.First:
            Console.WriteLine("First");
            break;
        case MyEnum.Second:
            Console.WriteLine("Second");
            break;
        default:
            throw new UnreachableException($"Unknown: {nameof(value)} value: {value}");
    }
}
```
