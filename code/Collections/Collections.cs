using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Graphs.Collections
{
    internal interface IEnumerator : IDisposable 
    {
        object Current { get; }
        bool MoveNext();
        void Reset();
    }

    internal interface IEnumerator<out T> : IEnumerator
    {
        T Current { get; }
    }

    internal interface IEnumerable
    {
        IEnumerator GetEnumerator();
    }

    internal interface IEnumerable<out T> : IEnumerable
    {
        IEnumerator<T> GetEnumerator();
    }

    internal interface ICollection<T> : IEnumerable<T>
    {
        int Count { get; }
        bool IsReadOnly { get; }
        void Add(T item);
        void Clear();
        bool Contains(T item);
        void CopyTo(T[] array, int arrayIndex);
        bool Remove(T item);
    }

    internal interface IReadOnlyCollection<out T> : IEnumerable<T>
    {
        int Count { get; }
    }

    internal interface IList<T> : ICollection<T>
    {
        T this[int index] { get; set; }
        int IndexOf(T item);

        void Insert(int index, T item);

        void RemoveAt(int index);
    }

    internal interface IReadOnlyList<out T> : IReadOnlyCollection<T>
    {
        T this[int index] { get; }
    }

    interface IDictionary<TKey, TValue> : ICollection<KeyValuePair<TKey, TValue>> 
    {
        TValue this[TKey key] { get; set; }
        ICollection<TKey> Keys { get; }
        ICollection<TValue> Values { get; }
        void Add(TKey key, TValue value);
        bool ContainsKey(TKey key);
        bool Remove(TKey key);
        bool TryGetValue(TKey key, [MaybeNullWhen(false)] out TValue value);
    }

    interface IReadOnlyDictionary<TKey, TValue> : IReadOnlyCollection<KeyValuePair<TKey, TValue>>
    {
        TValue this[TKey key] { get; }
        IEnumerable<TKey> Keys { get; }
        IEnumerable<TValue> Values { get; }
        bool ContainsKey(TKey key);
        bool TryGetValue(TKey key, [MaybeNullWhen(false)] out TValue value);
    }

    interface ISet<T> : ICollection<T>
    {
        void ExceptWith(IEnumerable<T> other);
        void IntersectWith(IEnumerable<T> other);
        bool IsProperSubsetOf(IEnumerable<T> other);
        bool IsProperSupersetOf(IEnumerable<T> other);
        bool IsSubsetOf(IEnumerable<T> other);
        bool IsSupersetOf(IEnumerable<T> other);
        bool Overlaps(IEnumerable<T> other);
        bool SetEquals(IEnumerable<T> other);
        void SymmetricExceptWith(IEnumerable<T> other);
        void UnionWith(IEnumerable<T> other);
    }

    interface IReadOnlySet<T> : IReadOnlyCollection<T>
    {
        bool Contains(T item);
        bool IsProperSubsetOf(IEnumerable<T> other);
        bool IsProperSupersetOf(IEnumerable<T> other);
        bool IsSubsetOf(IEnumerable<T> other);
        bool IsSupersetOf(IEnumerable<T> other);
        bool Overlaps(IEnumerable<T> other);
        bool SetEquals(IEnumerable<T> other);
    }
}
