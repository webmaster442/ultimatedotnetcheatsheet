## JSON Serialization

The `System.Text.Json` serializer was introduced in .NET Core 3.0 as a NuGet package and it's inlcuded in .NET 5 and later releases by default. It's designed to be an efficient replacement for `Newtonsoft.Json`.

Basic usage:

```csharp
public class Person 
{
    public string Name { get; init; }
    public int Age { get; init; }
}

var person = new Person
{
    Name = "test",
    Age = 30,
}

string jsonString = JsonSerializer.Serialize(person);


//deserialization:
Person deserializedPerson = JsonSerializer.Deserialize<Person>(jsonString);
```

## JSON Serializer options
