# Important interfaces for types

## IComparable\<T\>

Defines a generalized comparison method that a value type or class implements to create a type-specific comparison method for ordering or sorting its instances.

```csharp
interface IComparable<T>
{
	int CompareTo (T? other);
}
```

The CompareTo returns a value that indicates the relative order of the objects being compared. The return value has these meanings:

| Value             | Meaning                                                                 |
| :---------------- | :---------------------------------------------------------------------- |
| Less than zero    | This instance precedes other in the `sort` order.                       |
| Zero              | This instance occurs in the same position in the `sort` order as other. |
| Greater than zero | This instance follows other in the sort order.                          |

## IComparer\<T\>

Defines a method that a type implements to compare two objects.

This interface is used with the `List<T>.Sort` and `List<T>.BinarySearch` methods. It provides a way to customize the sort order of a collection. Classes that implement this interface include the `SortedDictionary<TKey,TValue>` and `SortedList<TKey,TValue>` generic classes.

The default implementation of this interface is the `Comparer<T>` class. The `StringComparer` class implements this interface for type String.

```csharp
interface IComparer<T>
{
	int Compare (T? x, T? y);
}
```

Return a signed integer that indicates the relative values of x and y, as shown in the following table:

| Value             | Meaning                  |
| :---------------- | :----------------------- |
| Less than zero    | `x` is less than `y`.    |
| Zero              | `x` equals `y`.          |
| Greater than zero | `x` is greater than `y`. |

## IEquatable\<T\>

Defines a generalized method that a value type or class implements to create a type-specific method for determining equality of instances.

```csharp
interface IEquatable<T>
{
	bool Equals (T? other);
}
```

Note: If a type implements the `IEquatable<T>`, then the type must override the `Equals(object? other)` and `GetHashCode()` methods provided also.

## EqualityComparer\<T\>

Defines methods to support the comparison of objects for equality. This interface allows the implementation of customized equality comparison for collections. That is, you can create your own definition of equality for type `T`, and specify that this definition be used with a collection type that accepts the `IEqualityComparer<T>` generic interface.

```csharp
interface IEqualityComparer<T>
{
	bool Equals (T? x, T? y);
	int GetHashCode (T obj);
}
```

## IDisposable & IAsyncDisposable

The `IDisposable` interface is used to release unmanaged resources like file handles, database connections, network connections, or any resource that is not managed by the .NET runtime.

The `IDisposable` interface is typically implemented when a class holds onto resources that need to be explicitly released or closed to avoid potential resource leaks and do a proper clean-up. By implementing `IDisposable`, you can provide a mechanism for users of your class to explicitly release those resources when they're done with them, rather than relying on the garbage collector to eventually clean them up.

The `IAsyncDisposable` interface is similar to `IDisposable`, but it is specifically designed for asynchronous resource clean-up scenarios.

If you implement the `IAsyncDisposable` interface but not the `IDisposable` interface, your app can potentially leak resources. If a class implements `IAsyncDisposable`, but not `IDisposable`, and a consumer only calls `Dispose()`, your implementation would never call `DisposeAsync()`. This would result in a resource leak.

Implementation example:

```csharp
public class AsyncDisposable : IAsyncDisposable, IDisposable
{
    //a flag to indicate whether the object has been disposed to prevent multiple dispose calls
    private bool _disposed;

    //A disposable field
    private readonly MemoryStream _field;

    public AsyncDisposable()
    {
        _field = new MemoryStream();
    }

    //IDosposable implementation. Do not change this code. Put cleanup code in the Dispose(bool disposing) method
    public void Dispose()
    {
        Dispose(disposing: true);
        GC.SuppressFinalize(this);
    }

    //IAsyncDisposable implementation. Do not change this code. Put cleanup code in the DisposeAsyncCore method
    public async ValueTask DisposeAsync()
    {
        //Call the overridable DisposeAsyncCore that does the actual work
        await DisposeAsyncCore().ConfigureAwait(false);

        //no need to call finalizer, because the resources have been freed by the DisposeAsyncCore method
        GC.SuppressFinalize(this);
    }

    // Async version of Dispose method
    protected virtual async ValueTask DisposeAsyncCore()
    {
        if (!_disposed)
        {
            await _field.DisposeAsync().ConfigureAwait(false);
        }
    }

    // Sync version of Dispose method
    protected virtual void Dispose(bool disposing)
    {
        if (!_disposed)
        {
            if (disposing)
            {
                //Dispose managed state (managed objects)
                _field.Dispose();
            }

            // TODO: free unmanaged resources (unmanaged objects) and override finalizer
            // TODO: set large fields to null
            _disposed = true;
        }
    }

    //TODO: override finalizer only if 'Dispose(bool disposing)' has code to free unmanaged resources
    // ~AsyncDisposable()
    // {
    //     // Do not change this code. Put clean-up code in Dispose(bool disposing) method
    //     Dispose(disposing: false);
    // }
}
```
