# Collections

^^^
![collection interfaces](img/collections1.svg)
^^^ collection interfaces

## Generic collections

* `Dictionary<TKey,TValue>` - Represents a collection of keys and values.
* `OrderedDictionary<TKey,TValue>` - Represents a collection of key/value pairs that are accessible by the key or index.
* `SortedDictionary<TKey,TValue>` - Represents a collection of key/value pairs that are sorted on the key.
* `SortedList<TKey,TValue>` - Represents a collection of key/value pairs that are sorted by key based on the associated `IComparer<T>` implementation.
* `HashSet<T>` - Represents a set of values.
* `LinkedList<T>` - Represents a doubly linked list.
* `List<T>` - Represents a strongly typed list of objects that can be accessed by index. Provides methods to search, sort, and manipulate lists.
* `PriorityQueue<TElement,TPriority>` - Represents a collection of items that have a value and a priority. On dequeue, the item with the lowest priority value is removed.
* `Queue<T>` - Represents a first-in, first-out collection of objects.
* `SortedSet<T>` - Represents a collection of objects that is maintained in sorted order.
* `Stack<T>` - Represents a variable size last-in-first-out (LIFO) collection of instances of the same specified type.

## Frozen Collections

Frozen collections are types that provide immutable, read-only collections optimized for fast lookup and enumeration.

* `FrozenDictionary<TKey,TValue>`

  Provides an immutable, read-only dictionary optimized for fast lookup and enumeration. It has a relatively high cost to create but provides excellent lookup performance. Thus, it is ideal for cases where a dictionary is created once, potentially at the startup of an application, and is used throughout the remainder of the life of the application.

* `FrozenSet<T>`

  Provides an immutable, read-only set optimized for fast lookup and enumeration. It has a relatively high cost to create but provides excellent lookup performance. Thus, it is ideal for cases where a set is created once, potentially at the startup of an application, and is used throughout the remainder of the life of the application.

## Immutable Collections

* `ImmutableArray<T>` - Represents an array that is immutable, meaning it can't be changed once it's created.
* `ImmutableDictionary<TKey,TValue>` - Represents an immutable, unordered collection of keys and values.
* `ImmutableHashSet<T>` - Represents an immutable, unordered hash set.
* `ImmutableList<T>` - Represents an immutable list, which is a strongly typed list of objects that can be accessed by index.
* `ImmutableQueue<T>` - Represents an immutable queue.
* `ImmutableSortedDictionary<TKey,TValue>` - Represents an immutable sorted dictionary.
* `ImmutableSortedSet<T>` - Represents an immutable sorted set implementation.
* `ImmutableStack<T>` - Represents an immutable stack.

## Concurent collections

* `BlockingCollection<T>`- Provides blocking and bounding capabilities for thread-safe collections that implement `IProducerConsumerCollection<T>`.
* `ConcurrentBag<T>` - Represents a thread-safe, unordered collection of objects.
* `ConcurrentDictionary<TKey,TValue>` - Represents a thread-safe collection of key/value pairs that can be accessed by multiple threads concurrently.
* `ConcurrentQueue<T>` - Represents a thread-safe first in-first out (FIFO) collection.
* `ConcurrentStack<T>` - Represents a thread-safe last in-first out (LIFO) collection.

## # `Span<T>` and `Memory<T>`

The `Span<T>` and `Memory<T>` types allow you to work work with a with contiguous blocks of memory in a very efficient way, without incurring the overhead of copying data. Essentially one can think about them as a "views" for existing data.

* `Span<T>` is a `ref struct` that provides a type-safe, memory-safe, and high-performance way to represent a contiguous region of arbitrary memory. It can point to managed arrays, stack-allocated memory, or even unmanaged memory.

* `Memory<T>` is a `struct` that is a managed counterpart to `Span<T>`. Unlike `Span<T>`, `Memory<T>` can be stored on the heap and safely passed across async and await boundaries.

|    Feature    |                `Span<T>`                 |                 `Memory<T>`                 |
| :-----------: | :--------------------------------------: | :-----------------------------------------: |
|     Type      |               `ref struct`               |                  `struct`                   |
|   Location    |                Stack-only                |                Stack or Heap                |
| Async Support |  No (cannot be used in `async` methods)  | Yes (can be used across `await` boundaries) |
|  Field Usage  | Cannot be a field in a class/heap object |    Can be a field in any class or struct    |
|   Generics    |    Cannot be a generic type argument     |   Can be used as a generic type argument    |
|  Performance  |   Extremely fast (near-zero overhead)    |    Slightly more overhead than `Span<T>`    |
|  Conversion   |  Can be converted to `ReadOnlySpan<T>`   | Can be converted to Span via .Span property |

Use `Span<T>` or `ReadOnlySpan<T>` when:

* You are doing synchronous operations (like parsing a string, calculating a checksum, or processing a buffer).
* The data is short-lived and stays within the current method scope.

Use `Memory<T>` or `ReadOnlyMemory<T>` when:

* You need to store the "view" of the data as a field in a class.
* You are passing data to a background task or storing it for later processing.

^^^
![Span\<T\> Types](img/span.svg)
^^^ Span\<T\> Types

^^^
![Memory\<T\> Types](img/memory.svg)
^^^ Memory\<T\> Types

Note: **`Equals()` on `Span<T>` or `ReadOnlySpan<T>` will always throw an exception. Use the equality operator instead.**
