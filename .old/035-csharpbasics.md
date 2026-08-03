# C# basics

## Operator Precedence

1. Primary:

    `x.y`, `f(x)`, `a[i]`, `x?.y`, `x?[y]`, `x++`, `x--`, `x!`, `new`, `typeof`, `checked`, `unchecked`, `default`, `nameof`, `delegate`, `sizeof`, `stackalloc`, `x->y`
2. Unary: `+x, -x, !x, ~x, ++x, --x, ^x, (T)x, await, &x, *x, true and false`
3. Range: `x..y`
4. Switch and with expressions: `switch, with`
5. Multiplicative: `x * y, x / y, x % y`
6. Additive: `x + y`, `x – y`
7. Shift: `x << y`, `x >> y`, `x >>> y`
8. Relational and type-testing: `x < y`, `x > y`, `x <= y`, `x >= y`, `is`, `as`
9. Equality: `x == y`, `x != y`
10. Boolean logical AND or bitwise logical AND: x & y`
11. Boolean logical XOR or bitwise logical XOR: `x ^ y`
12. Boolean logical OR or bitwise logical OR: `x | y`
13. Conditional AND: `x && y`
14. Conditional OR: `x || y`
15. Null-coalescing operator: `x ?? y`
16. Conditional operator: `c ? t : f`
17. Assignment and lambda declaration: 

    `x = y`, `x += y`, `x -= y`, `x *= y`, `x /= y`, `x %= y`, `x &= y`, `x |= y`, `x ^= y`, `x <<= y`, `x >>= y`, `x >>>= y`, `x ??= y`, `=>`

More info: https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/



## Keywords

Keywords are predefined, reserved identifiers that have special meanings to the compiler. They can't be used as identifiers in your program unless they include `@` as a prefix. For example, `@if` is a valid identifier, but `if` isn't because `if` is a keyword.

|   A-E    |    E-L    |    N-S     |    S-W    |
| :------: | :-------: | :--------: | :-------: |
| abstract |   event   | namespace  |  static   |
|    as    | explicit  |    new     |  string   |
|   base   |  extern   |    null    |  struct   |
|   bool   |   FALSE   |   object   |  switch   |
|  break   |  finally  |  operator  |   this    |
|   byte   |   fixed   |    out     |   throw   |
|   case   |   float   |  override  |   TRUE    |
|  catch   |    for    |   params   |    try    |
|   char   |  foreach  |  private   |  typeof   |
| checked  |   goto    | protected  |   uint    |
|  class   |    if     |   public   |   ulong   |
|  const   | implicit  |  readonly  | unchecked |
| continue |    in     |    ref     |  unsafe   |
| decimal  |    int    |   return   |  ushort   |
| default  | interface |   sbyte    |   using   |
| delegate | internal  |   sealed   |  virtual  |
|    do    |    is     |   short    |   void    |
|  double  |   lock    |   sizeof   | volatile  |
|   else   |   long    | stackalloc |   while   |
|   enum   |           |            |           |

## Contextual keywords

A contextual keyword is used to provide a specific meaning in the code, but it isn't a reserved word in C#. Some contextual keywords, such as `partial` and `where`, have special meanings in two or more contexts.

|    A-E     |   F-N   |      N-R       |    R-Y    |
| :--------: | :-----: | :------------: | :-------: |
|    add     |  file   |      nint      | required  |
|    and     |  from   |      not       |  scoped   |
|   alias    |   get   |    notnull     |  select   |
| ascending  | global  |     nuint      |    set    |
|    args    |  group  |       on       | unmanaged |
|   async    |  init   |       or       |   value   |
|   await    |  into   |    orderby     |    var    |
|     by     |  join   | partial (type) |   when    |
| descending |   let   |                |   where   |
|  dynamic   | managed |     record     |   with    |
|   equals   | nameof  |     remove     |   yield   |

## Basic program Structure

```csharp
using System;

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, World!");
        }
    }
}
```

With Top level statements (.NET > 5):

```csharp
Console.WriteLine("Hello, World!");
```

## Comments

```csharp
// Single-line comment

/*
This is a 
multi-line comment
*/
```

## Variables and Data Types

```csharp
//Variable declaration and initialization
int number = 10;
double decimalNumber = 10.5;
char character = 'A';
string text = "Hello";
bool isTrue = true;

// Implicitly typed variable
var autoVariable = 100;
```

## Control Structures

### Conditional Statements

```csharp
if (condition)
{
    // code to be executed if condition is true
}
else if (anotherCondition)
{
    // code to be executed if anotherCondition is true
}
else
{
    // code to be executed if all conditions are false
}
```

### Switch

```csharp
switch (variable)
{
    case value1:
        // code to be executed if variable == value1
        break;
    case value2:
        // code to be executed if variable == value2
        break;
    default:
        // code to be executed if variable doesn't match any case
        break;
}
```

### Loops

```csharp
// For Loop
for (int i = 0; i < 10; i++)
{
    // code to be executed
}

// While Loop
while (condition)
{
    // code to be executed
}

// Do-While Loop
do
{
    // code to be executed
} while (condition);

// Foreach Loop
foreach (var item in collection)
{
    // code to be executed
}
```

## Methods

```csharp
class Program
{
    static void Main(string[] args)
    {
        int result = Add(5, 10);
        Console.WriteLine(result);
    }

    static int Add(int a, int b)
    {
        return a + b;
    }
}
```

## Classes and Objects

```csharp
class Person
{
    // Fields
    private string name;
    private int age;

    // Constructor
    public Person(string name, int age)
    {
        this.name = name;
        this.age = age;
    }

    // Method
    public void Greet()
    {
        Console.WriteLine($"Hello, my name is {name} and I am {age} years old.");
    }
}

// Creating an object
Person person = new Person("John", 30);
person.Greet();
```

### Access modifiers

|           Caller's location            | `public` | `protected  internal` | `protected` | `internal` | `private protected` | `private` |
| :------------------------------------: | :------: | :-------------------: | :---------: | :--------: | :-----------------: | :-------: |
|            Within the class            |    √     |           √           |      √      |     √      |          √          |     √     |
|     Derived class (same assembly)      |    √     |           √           |      √      |     √      |          √          |     X     |
|   Non-derived class (same assembly)    |    √     |           √           |      X      |     √      |          X          |     X     |
|   Derived class (different assembly)   |    √     |           √           |      √      |     X      |          X          |     X     |
| Non-derived class (different assembly) |    √     |           X           |      X      |     X      |          X          |     X     |

Beginning with C# 11, the `file` contextual keyword is a type modifier.

The `file` modifier restricts a top-level type's scope and visibility to the file in which it's declared. The `file` modifier will generally be applied to types written by a source generator. File-local types provide source generators with a convenient way to avoid name collisions among generated types. 

### Properties

```csharp
class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
}
```

### Inheritance

```csharp
class Animal
{
    public void Eat()
    {
        Console.WriteLine("Eating...");
    }
}

class Dog : Animal
{
    public void Bark()
    {
        Console.WriteLine("Barking...");
    }
}

Dog dog = new Dog();
dog.Eat();  // Inherited method
dog.Bark(); // Dog's method
```

### Polymorphism

```csharp
class Animal
{
    public virtual void MakeSound()
    {
        Console.WriteLine("Some generic animal sound");
    }
}

class Dog : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("Woof!");
    }
}

class Cat : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("Meow!");
    }
}

Animal myDog = new Dog();
Animal myCat = new Cat();

myDog.MakeSound(); // Output: Woof!
myCat.MakeSound(); // Output: Meow!
```

### Interfaces

```csharp
interface IAnimal
{
    void MakeSound();
}

class Dog : IAnimal
{
    public void MakeSound()
    {
        Console.WriteLine("Woof!");
    }
}
```

### Generics

```csharp
// Generic Class
public class GenericList<T>
{
    private T[] items = new T[100];
    private int count;

    public void Add(T item)
    {
        items[count++] = item;
    }

    public T Get(int index)
    {
        return items[index];
    }
}

GenericList<int> intList = new GenericList<int>();
intList.Add(1);
intList.Add(2);
Console.WriteLine(intList.Get(0)); // Output: 1

GenericList<string> stringList = new GenericList<string>();
stringList.Add("Hello");
stringList.Add("World");
Console.WriteLine(stringList.Get(1)); // Output: World

// Generic Method
public class Utilities
{
    public void Print<T>(T item)
    {
        Console.WriteLine(item);
    }
}

Utilities utilities = new Utilities();
utilities.Print(123);    // Output: 123
utilities.Print("abc");  // Output: abc
```

## Tupples

```csharp
var tuple = new Tuple<int, string, double>(1, "apple", 3.14);
Console.WriteLine(tuple.Item1); // Output: 1
Console.WriteLine(tuple.Item2); // Output: apple
Console.WriteLine(tuple.Item3); // Output: 3.14
```

### Value tupples

```csharp
var valueTuple = (1, "apple", 3.14);
Console.WriteLine(valueTuple.Item1); // Output: 1
Console.WriteLine(valueTuple.Item2); // Output: apple
Console.WriteLine(valueTuple.Item3); // Output: 3.14
```

```csharp
var valueTuple = (Id: 1, Name: "apple", Price: 3.14);
Console.WriteLine(valueTuple.Id);    // Output: 1
Console.WriteLine(valueTuple.Name);  // Output: apple
Console.WriteLine(valueTuple.Price); // Output: 3.14
```

### Deconstruct

```csharp
var valueTuple = (1, "apple", 3.14);
var (id, name, price) = valueTuple;
Console.WriteLine(id);    // Output: 1
Console.WriteLine(name);  // Output: apple
Console.WriteLine(price); // Output: 3.14
```

## Yield

```csharp
public class NumberGenerator
{
    public IEnumerable<int> GetNumbers()
    {
		for (int i=0; i<10; i++)
		{
		    if (i == 5)
            {
                yield break; // Exit the method when i equals 5
            }
			yield return i;
		}
	}
}

class Program
{
    static void Main(string[] args)
    {
        NumberGenerator generator = new NumberGenerator();
        
        foreach (int number in generator.GetNumbers())
        {
            Console.WriteLine(number); // Output: 0 1 2 3 4 
        }
    }
}
```

## Delegates

```csharp
public delegate void MyDelegate(string message);

public class Program
{
    public static void DisplayMessage(string message)
    {
        Console.WriteLine(message);
    }

    public static void Main(string[] args)
    {
        // Creating an instance of the delegate
        MyDelegate del = new MyDelegate(DisplayMessage);

        // Calling the delegate
        del("Hello, Delegates!"); // Output: Hello, Delegates!
    }
}
```

### Delegate as parameter


```csharp
public delegate void MyDelegate(string message);

public class Program
{
    public static void DisplayMessage(string message)
        => Console.WriteLine(message);
    
    public static void ProcessMessage(MyDelegate del, string message)
    {
        del(message);
    }

    public static void Main(string[] args)
    {
        MyDelegate del = new MyDelegate(DisplayMessage);
        ProcessMessage(del, "Hello, Delegates with Parameters!"); // Output: Hello, Delegates with Parameters!
    }
}
```

### Multicast Delegates

```csharp
public delegate void MyDelegate(string message);

public class Program
{
    public static void DisplayMessage1(string message)
        => Console.WriteLine("Message1: " + message);

    public static void DisplayMessage2(string message)
        => Console.WriteLine("Message2: " + message);

    public static void Main(string[] args)
    {
        MyDelegate del1 = new MyDelegate(DisplayMessage1);
        MyDelegate del2 = new MyDelegate(DisplayMessage2);

        // Combining delegates
        MyDelegate del = del1 + del2;
        del("Hello, Multicast Delegates!"); 
        // Output:
        // Message1: Hello, Multicast Delegates!
        // Message2: Hello, Multicast Delegates!
    }
}
```

### Generic Delegates

#### Action

```csharp
public class Program
{
    public static void DisplayMessage(string message)
        => Console.WriteLine(message);

    public static void Main(string[] args)
    {
        Action<string> messageAction = DisplayMessage;
        messageAction("Hello, Action Delegate!"); // Output: Hello, Action Delegate!
    }
}
```

#### Func

```csharp
public class Program
{
    public static int Add(int x, int y)
        => x + y;

    public static void Main(string[] args)
    
        Func<int, int, int> addFunc = Add;
        int result = addFunc(5, 3);
        Console.WriteLine(result); // Output: 8
    }
}
```

#### Predicate

```csharp
public class Program
{
    public static bool IsPositive(int number)
        => number > 0;

    public static void Main(string[] args)
    {
        Predicate<int> isPositivePredicate = IsPositive;
        bool result = isPositivePredicate(5);
        Console.WriteLine(result); // Output: True
    }
}
```

## Events

### Declaring an Event

```csharp
public class Publisher
{
    // Define the delegate for the event handler
    public delegate void EventHandler(object sender, EventArgs e);

    // Declare the event using the delegate
    public event EventHandler OnNotify;

    // Method to raise the event
    protected virtual void RaiseEvent()
    {
        if (OnNotify != null)
        {
            OnNotify(this, EventArgs.Empty);
        }
    }
}
```

### Subscribing to an event

```csharp
public class Subscriber
{
    public void OnNotified(object sender, EventArgs e)
    {
        Console.WriteLine("Standard event received!");
    }
}

class Program
{
    static void Main(string[] args)
    {
        Publisher pub = new Publisher();
        Subscriber sub = new Subscriber();

        // Subscribe to the event
        pub.OnNotify += sub.OnNotified; 

        // Raise the event
        pub.RaiseEvent(); // Output: Standard event received!
    }
}
```

### Creating Custom EventArgs

```csharp
public class CustomEventArgs : EventArgs
{
    public string Message { get; set; }
    public CustomEventArgs(string message)
    {
        Message = message;
    }
}

public class Publisher
{
    // Define the delegate with custom EventArgs
    public delegate void CustomEventHandler(object sender, CustomEventArgs e);

    // Declare the event using the delegate
    public event CustomEventHandler OnNotify;

    // Method to raise the event
    protected virtual void RaiseEvent(string message)
    {
        if (OnNotify != null)
        {
            OnNotify(this, new CustomEventArgs(message));
        }
    }
}
```