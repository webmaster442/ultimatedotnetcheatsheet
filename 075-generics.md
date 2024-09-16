# Generics

Generics in C# allow you to define classes, methods, interfaces, and delegates with type parameters, enabling type safety and code reuse without compromising performance.

Type parameters can be defined for types and methods using angle brackets (`<>`).

## Constraints

Generic constraints in C# provide a way to restrict the types that can be used as arguments for a generic type parameter. Without constraints, generic type parameters can be any type (class, struct, enum, etc.). However, sometimes you want to limit the generic type to certain kinds of types (e.g., reference types, value types, types that implement a specific interface, etc.). Constraints are declared using the `where` clause in the generic type or method declaration.

### No Constraints

If you don't specify any constraints, the type parameter can be any type.

```csharp
public class GenericClass<T>
{
    public T Value { get; set; }
}
```

### Value Type

```csharp
public class ValueTypeOnly<T> where T : struct
{
    public T Value { get; set; }
}
```

### Reference Type

```csharp
public class ReferenceTypeOnly<T> where T : class
{
    public T Value { get; set; }
}
```

### Parameterless Constructor

The `new()` constraint ensures that the type `T` has a parameterless constructor. This is useful when you need to create instances of the type within the generic class or method.

```csharp
public class InstantiateType<T> where T : new()
{
    public T CreateInstance()
    {
        return new T(); // Requires T to have a parameterless constructor
    }
}
```

### Base Class or Implemented interface

```csharp
public class BaseClass { }
public class DerivedClass : BaseClass { }

public class DerivedTypeOnly<T> where T : BaseClass
{
    public T Value { get; set; }
}
```

### Multiple Constraints

```csharp
public class MultiConstraint<T> where T : class, new()
{
    public T CreateInstance()
    {
        return new T(); // T must be a reference type and have a parameterless constructor
    }
}
```

### Enum

```csharp
public class EnumConstraint<T> where T : struct, Enum
{
    public void PrintEnumValues()
    {
        foreach (var value in Enum.GetValues(typeof(T)))
        {
            Console.WriteLine(value);
        }
    }
}
```

### Delegate

```csharp
public class DelegateConstraint<T> where T : Delegate
{
    public void InvokeDelegate(T del)
    {
        del.DynamicInvoke(); // Invoke delegate dynamically
    }
}
```

### notnull

The `notnull` constraint restricts the generic type parameter `T` to types that are not nullable, meaning:

* It can be any value type
* It can be any non-nullable reference type
* It cannot be nullable types like int? (nullable value type) or string? (nullable reference type in C# 8.0 with nullable reference types enabled).

```csharp
public class NotNullConstraint<T> where T : notnull
{
    public T Value { get; set; }

    public NotNullConstraint(T value)
    {
        Value = value ?? throw new ArgumentNullException(nameof(value), "Value cannot be null");
    }
}

// Allowed: Non-nullable reference type (string)
NotNullConstraint<string> stringConstraint = new NotNullConstraint<string>("Hello");

// Allowed: Non-nullable reference type (string)
NotNullConstraint<string> stringConstraint = new NotNullConstraint<string>("Hello");

// Not allowed: Nullable reference type (string?) in C# 8.0ű
// compile error
NotNullConstraint<string?> nullableStringConstraint = new NotNullConstraint<string?>(null);

// Not allowed: Nullable value type (int?)
// compile error
NotNullConstraint<int?> nullableValueConstraint = new NotNullConstraint<int?>(null);
```

## Covariance

Covariance allows you to use a more derived type than originally specified. In C#, covariance applies to generic type parameters in interfaces and delegates when used for output (return types). You declare a type parameter as covariant using the `out` keyword.

```csharp
public interface ICovariant<out T>
{
    T GetItem();
}
```

Here, `T` is covariant because it is marked with the `out` keyword, and it can only be used as a return type. The `out` keyword means that if `Dog` inherits from `Animal`, then `ICovariant<Dog>` can be treated as `ICovariant<Animal>`:

```csharp
ICovariant<Animal> animals = new CovariantImplementation<Dog>();
Animal animal = animals.GetItem();
```

## Contravariance

Contravariance allows you to use a more general (or base) type than originally specified. In C#, contravariance applies to generic type parameters in interfaces and delegates when used for input (method parameters). You declare a type parameter as contravariant using the `in` keyword.

```csharp
public interface IContravariant<in T>
{
    void SetItem(T item);
}
```

Here, `T` is contravariant because it is marked with the in keyword, and it can only be used as a method parameter. The `in` keyword means that if `Dog` inherits from `Animal`, then `IContravariant<Animal>` can be treated as `IContravariant<Dog>`.

```csharp
IContravariant<Dog> dogs = new ContravariantImplementation<Animal>();
dogs.SetItem(new Dog());
```

## Invariance

Invariance means that there is no relationship between `GenericType<Derived>` and `GenericType<Base>`, even if `Derived` inherits from `Base`. Most generic types in C# are invariant by default. This means that `List<Dog>` is not considered a subtype of `List<Animal>`, even though `Dog` is a subtype of `Animal`.

```csharp
//the following causes a compile error
List<Animal> animals = new List<Dog>();
```
