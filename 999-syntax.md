# C# Syntax

## Basic Structure

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

## Comments

```csharp
// Single-line comment

/*
Multi-line comment
*/
```

## Variables and Data Types

```csharp
// Variable declaration and initialization
int number = 10;
double decimalNumber = 10.5;
char character = 'A';
string text = "Hello";
bool isTrue = true;

// Implicitly typed variable
var autoVariable = 100;
```

### Common Data types

```csharp
int integerNumber = 100;
float floatNumber = 10.5f;
double doubleNumber = 20.99;
decimal decimalNumber = 100.5m;
char singleCharacter = 'A';
string textString = "Hello, World!";
bool booleanValue = true;
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

## Generics

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

```cshap
var valueTuple = (1, "apple", 3.14);
var (id, name, price) = valueTuple;
Console.WriteLine(id);    // Output: 1
Console.WriteLine(name);  // Output: apple
Console.WriteLine(price); // Output: 3.14
```

## Exception Handling

```csharp
try
{
    // code that may cause an exception
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
}
finally
{
    // code to be executed regardless of an exception
}
```

## Namespaces

```csharp
using System;
using System.Collections.Generic;

// Define a namespace
namespace MyNamespace
{
    class MyClass
    {
        // class members
    }
}
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

```cshap
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


```cshap
public delegate void MyDelegate(string message);

public class Program
{
    public static void DisplayMessage(string message)
    {
        Console.WriteLine(message);
    }

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
    {
        Console.WriteLine("Message1: " + message);
    }

    public static void DisplayMessage2(string message)
    {
        Console.WriteLine("Message2: " + message);
    }

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

```cshap
public class Program
{
    public static void DisplayMessage(string message)
    {
        Console.WriteLine(message);
    }

    public static void Main(string[] args)
    {
        Action<string> messageAction = DisplayMessage;
        messageAction("Hello, Action Delegate!"); // Output: Hello, Action Delegate!
    }
}
```

#### Func

```cshap
public class Program
{
    public static int Add(int x, int y)
    {
        return x + y;
    }

    public static void Main(string[] args)
    
        Func<int, int, int> addFunc = Add;
        int result = addFunc(5, 3);
        Console.WriteLine(result); // Output: 8
    }
}
```

#### Predicate

```cshap
public class Program
{
    public static bool IsPositive(int number)
    {
        return number > 0;
    }

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
