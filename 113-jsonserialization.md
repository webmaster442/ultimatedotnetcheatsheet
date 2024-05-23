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

Serialization and deserialization ptions can be controlled via the `JsonSerializerOptions` class. Important properties:

* `bool AllowTrailingCommas`:
  
	Get or sets a value that indicates whether an extra comma at the end of a list of JSON values in an object or array is allowed (and ignored) within the JSON payload being deserialized.

* `bool WriteIndented`:

	Gets or sets a value that indicates whether JSON should use pretty printing. By default, JSON is serialized without any extra white space.

* `bool PropertyNameCaseInsensitive`:

	Gets or sets a value that indicates whether a property's name uses a case-insensitive comparison during deserialization. The default value is false.
	
* `JsonNamingPolicy? PropertyNamingPolicy`:

	Gets or sets a value that specifies the policy used to convert a property's name on an object to another format, such as camel-casing, or null to leave property  names unchanged.
	
	Possible built-in values, that can be set:
	
	* `JsonNamingPolicy.CamelCase` - `propertyName`
	* `JsonNamingPolicy.KebabCaseLower` - `property-name`
	* `JsonNamingPolicy.KebabCaseUpper` - `PROPERTY-NAME`
	* `JsonNamingPolicy.SnakeCaseLower` - `property_name`
	* `JsonNamingPolicy.SnakeCaseUpper` - `PROPERTY_NAME`
	
	Custom values can be set, by implementint the `JsonNamingPolicy` class.
	
* `bool IncludeFields`:

	Gets or sets a value that indicates whether fields are handled during serialization and deserialization. The default value is false.
	
* `bool IgnoreReadOnlyProperties`:

	Gets or sets a value that indicates whether null values are ignored during serialization and deserialization. The default value is false.
	
* `JsonCommentHandling ReadCommentHandling`:

	Gets or sets a value that defines how comments are handled during deserialization.
	
	Possible values:
	
	* `JsonCommentHandling.Disallow`
	
		Doesn't allow comments within the JSON input. Comments are treated as invalid JSON if found, and a `System.Text.Json.JsonException` is thrown. This is the default value.
	* `JsonCommentHandling.Skip`
	
		Allows comments within the JSON input and ignores them. The `System.Text.Json.Utf8JsonReader` behaves as if no comments are present.
	* `JsonCommentHandling.Allow`
	
		Allows comments within the JSON input and treats them as valid tokens. While reading, the caller can access the comment values.
	
* `JsonNumberHandling NumberHandling`:

	Gets or sets an object that specifies how number types should be handled when serializing or deserializing.
	
	Possible values:
	
	* `JsonNumberHandling.Strict`
	
		Numbers will only be read from System.Text.Json.JsonTokenType.Number tokens and will only be written as JSON numbers (without quotes).
	
	* `JsonNumberHandling.AllowReadingFromString`
	
	Numbers can be read from System.Text.Json.JsonTokenType.String tokens. Does not prevent numbers from being read from System.Text.Json.JsonTokenType.Number token.
	
	* `JsonNumberHandling.WriteAsString`
	
		Numbers will be written as JSON strings (with quotes), not as JSON numbers.
	
	* `JsonNumberHandling.AllowNamedFloatingPointLiterals`
	
		The `NaN`, `Infinity` and `-Infinity` `System.Text.Json.JsonTokenType.String` tokens can be read as floating-point constants, and the `System.Single` and `System.Double` values for these constants will be written as their corresponding JSON string representations.
	
* `JsonIgnoreCondition DefaultIgnoreCondition`:

	Gets or sets a value that determines when properties with default values are ignored during serialization or deserialization. The default value is `JsonIgnoreCondition.Never`.

	Possible values:
	
	* `JsonIgnoreCondition.Never`
  
		Property is always serialized and deserialized, regardless of IgnoreNullValues configuration.
	
	* `JsonIgnoreCondition.Always`
  
		Property is always ignored.
	
	* `JsonIgnoreCondition.WhenWritingDefault`
	
		Property is ignored only if it equals the default value for its type.
	
	* `JsonIgnoreCondition.WhenWritingNull`

		Property is ignored if its value is null. This is applied only to reference-type properties and fields.

## Converters

You can convert complex types into JSON representation, by implementing the `JsonConverter<T>` abstract class and then adding the converter to the `Converters` collection of your `JsonSerializerOptions` instance.

An example converter:

```csharp
public class CultureInfoConverter : JsonConverter<CultureInfo>
{
    public override CultureInfo? Read(ref Utf8JsonReader reader, 
                                      Type typeToConvert, 
                                      JsonSerializerOptions options)
    {
        return new CultureInfo(reader.GetString()!);
    }

     public override void Write(Utf8JsonWriter writer,
                                CultureInfo value, 
                                JsonSerializerOptions options)
     {
        writer.WriteStringValue(value.Name);
     }
}
```
