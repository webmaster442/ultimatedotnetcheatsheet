# Pattern matching

## Discard pattern

The discard pattern can be used to match any expression, including `null`. It's represented by the `_` symbol.

```csharp
bool isFloatingPointNumber(string input)
{
    //the out value of the conversion is discarded
    return double.TryParse(input, out double _);
}
```

## var pattern

The `var` pattern can be used to match any expression, including `null`, and assign its result to a new local variable:

```csharp
bool isFloatingPointNumber(string input)
{
    return double.TryParse(input, out var _);
}
```

## Declaration and type patterns

```csharp
object greeting = "Hello, World!";
if (greeting is string message)
{
	//greeting is a string and casted to message variable
}
```

A declaration pattern with type T matches an expression when an expression result is non-null and any of the following conditions are true:

* The run-time type of an expression result is T.
* The run-time type of an expression result derives from type T, implements interface T, or another implicit reference conversion exists from it to T.

**Null checking:**

```csharp
if (input is not null)
{
    // ...
}
```

**Type checking in switch:**

```csharp
public abstract class Vehicle {}
public class Car : Vehicle {}
public class Truck : Vehicle {}

public static class TollCalculator
{
    public static decimal CalculateToll(this Vehicle vehicle) => vehicle switch
    {
        Car _ => 2.00m,
        Truck _ => 7.50m,
        null => throw new ArgumentNullException(nameof(vehicle)),
        _ => throw new ArgumentException("Unknown type of a vehicle", nameof(vehicle)),
    };
}
```

## Constant pattern

```csharp
public static decimal GetGroupTicketPrice(int visitorCount) => visitorCount switch
{
    1 => 12.0m,
    2 => 20.0m,
    3 => 27.0m,
    0 => 0.0m,
    _ => throw new ArgumentException($"Not supported number of visitors: {visitorCount}", nameof(visitorCount)),
};
```

In a constant pattern, you can use any constant expression, such as integers, floating-point numbers, char, string, boolean, enums, name of a declared const field or local and null. Note: `Span<char>` or `ReadOnlySpan<char>` can also be matched in the constant pattern, but in C# 11 and later versions

## Relational patterns

```csharp
static string Classify(double measurement) => measurement switch
{
    < -4.0 => "Too low",
    > 10.0 => "Too high",
    double.NaN => "Unknown",
    _ => "Acceptable",
};
```

In a relational pattern, you can use any of the relational operators `<`, `>`, `<=`, or `>=`. The right-hand part of a relational pattern must be a constant expression. For the constant expression, the constant pattern limitations apply.

## Logical patterns

```csharp
static string Classify(double measurement) => measurement switch
{
    < -40.0 => "Too low",
    >= -40.0 and < 0 => "Low",
    >= 0 and < 10.0 => "Acceptable",
    >= 10.0 and < 20.0 => "High",
    >= 20.0 => "Too high",
    double.NaN => "Unknown",
};
```

```csharp
static string GetCalendarSeason(DateTime date) => date.Month switch
{
    3 or 4 or 5 => "spring",
    6 or 7 or 8 => "summer",
    9 or 10 or 11 => "autumn",
    12 or 1 or 2 => "winter",
    _ => throw new ArgumentOutOfRangeException(nameof(date), $"Date with unexpected month: {date.Month}."),
};
```

Precedence: `not`, `and`, `or`. To explicitly specify the precedence, use parentheses:

```csharp
static bool IsLetter(char c) => c is (>= 'a' and <= 'z') or (>= 'A' and <= 'Z');
```

## Property Pattern

```csharp
static bool IsConferenceDay(DateTime date) => date is { Year: 2020, Month: 5, Day: 19 or 20 or 21 };
```

A property pattern matches an expression when an expression result is non-null and every nested pattern matches the corresponding property or field of the expression result. It can be combined with run-time type check and variable declaration:

```csharp
static string TakeFive(object input) => input switch
{
    string { Length: >= 5 } s => s.Substring(0, 5),
    string s => s,

    ICollection<char> { Count: >= 5 } symbols => new string(symbols.Take(5).ToArray()),
    ICollection<char> symbols => new string(symbols.ToArray()),

    null => throw new ArgumentNullException(nameof(input)),
    _ => throw new ArgumentException("Not supported input type."),
};
```

## Positional pattern

You use a positional pattern to deconstruct an expression result and match the resulting values against the corresponding nested patterns.

```csharp
public readonly struct Point
{
    public int X { get; }
    public int Y { get; }

    public Point(int x, int y) => (X, Y) = (x, y);
    public void Deconstruct(out int x, out int y) => (x, y) = (X, Y);
}

static string Classify(Point point) => point switch
{
    (0, 0) => "Origin",
    (1, 0) => "positive X basis end",
    (0, 1) => "positive Y basis end",
    _ => "Just a point",
};
```

At the preceding example, the type of an expression contains the Deconstruct method, which is used to deconstruct an expression result. You can also match expressions of tuple types against positional patterns. In that way, you can match multiple inputs against various patterns:

```csharp
static decimal GetGroupTicketPriceDiscount(int groupSize, DateTime visitDate)
    => (groupSize, visitDate.DayOfWeek) switch
    {
        (<= 0, _) => throw new ArgumentException("Group size must be positive."),
        (_, DayOfWeek.Saturday or DayOfWeek.Sunday) => 0.0m,
        (>= 5 and < 10, DayOfWeek.Monday) => 20.0m,
        (>= 10, DayOfWeek.Monday) => 30.0m,
        (>= 5 and < 10, _) => 12.0m,
        (>= 10, _) => 15.0m,
        _ => 0.0m,
    };
```

## List patterns

```csharp
int[] numbers = { 1, 2, 3 };

numbers is [1, 2, 3]; //true
numbers is [1, 2, 4]; //false
numbers is [1, 2, 3, 4]; //false
numbers is [0 or 1, <= 2, >= 3]; //true
```

To match elements only at the start or/and the end of an input sequence, use the slice pattern (`..`);  A slice pattern matches zero or more elements. You can use at most one slice pattern in a list pattern. The slice pattern can only appear in a list pattern.

```csharp
new[] { 1, 2, 3, 4, 5 } is [> 0, > 0, ..];  // True
new[] { 1, 1 } is [_, _, ..];  // True
new[] { 0, 1, 2, 3, 4 } is [> 0, > 0, ..];  // False
new[] { 1 } is [1, 2, ..];  // False

new[] { 1, 2, 3, 4 } is [.., > 0, > 0];  // True
new[] { 2, 4 } is [.., > 0, 2, 4];  // False
new[] { 2, 4 } is [.., 2, 4];  // True

new[] { 1, 2, 3, 4 } is [>= 0, .., 2 or 4];  // True
new[] { 1, 0, 0, 1 } is [1, 0, .., 0, 1];  // True
new[] { 1, 0, 1 } is [1, 0, .., 0, 1];  // False
```