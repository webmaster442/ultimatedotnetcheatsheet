# Serialization

## XML Serialization

XML serialization is part of .NET since the 1.0 release. It uses attributes and under the hood reflection to serialize data into the XML (https://en.wikipedia.org/wiki/XML) format. To use XML serialization you must reference the `System.Xml.Serialization` namespace. **Warning**: The XmlSerializer class **does not serializes objects that are marked as `[Obsolete]`**.

Important attributes and their hierarchy for XML serialization:


* **XmlArray**: 
  
  Specifies that the XmlSerializer must serialize a particular class member as an array of XML elements.

* **XmlArrayItem**: 
  
  Represents an attribute that specifies the derived types that the XmlSerializer can place in a serialized array.

* **XmlAttribute**:
  
   Specifies that the XmlSerializer must serialize the class member as an XML attribute.

* **XmlElement**:
  
   Indicates that a public field or property represents an XML element when the XmlSerializer serializes or deserializes the object that contains it.

* **XmlEnum**:
   
   Controls how the XmlSerializer serializes an enumeration member.

* **XmlIgnore**:
  
    Instructs the Serialize(TextWriter, Object) method of the XmlSerializer not to serialize the public field or public read/write property value.

* **XmlRoot**:
  
  Controls XML serialization of the attribute target as an XML root element.

* **XmlTextAttribute**: 

    Indicates to the XmlSerializer that the member must be treated as XML text when the class that contains it is serialized or de-serialized.

### XML serialization example

**Object model that will be serialized:**

```csharp
[XmlType(Namespace = "myxmlNamespace", TypeName = "SerializedTypeName")]
[XmlRoot(ElementName = "rootName")]
public class ClassToSerialize
{
    [XmlAttribute(AttributeName = "attribute")]
    public string MyAttribute { get; set; }

    //This value will be ignored
    [XmlIgnore]
    public int Ignored { get; set; }

    [XmlElement(ElementName = "subElement")]
    public SubClass SubClass { get; set; }

    [XmlArray(ElementName = "array")]
    [XmlArrayItem(ElementName = "item1", Type = typeof(Item1))]
    [XmlArrayItem(ElementName = "item2", Type = typeof(Item2))]
    public BaseItem[] Array { get; set; }
}

//An enum with custom values
public enum TestEnum
{
    [XmlEnum(Name = "FirstValue")]
    First,
    [XmlEnum(Name = "SecondValue")]
    Second
}

//A sub class, that is part of the root class that needs to be serialized
//NOTE: Complex types, like this, needs to be serialized as XML elements
//It is not possible to serialize these as attributes
public class SubClass
{
    [XmlText]
    public string Text { get; set; }
}

//An abstract class, that will be used in an array
public abstract class BaseItem
{
    [XmlAttribute(AttributeName = "BaseString")]
    public string Value { get; set; }
}

//A derived type
public class Item1 : BaseItem
{
    [XmlAttribute(AttributeName = "Item1Double")]
    public double DoubleValue { get; set; }
}

//Another derived type
public class Item2 : BaseItem
{
    [XmlAttribute(AttributeName = "Item2Int")]
    public int IntValue { get; set; }
}
```

**Note**: The types that will be serialied must have `public` accessibility modifier.

**Serialization code:**

```csharp
var data = new ClassToSerialize()
{
    Ignored = 42,
    MyAttribute = "attribute value",
    SubClass = new SubClass
    {
        Text = "xml text"
    },
    Array = new BaseItem[]
    {
        new Item1
        {
            Value = "Item1 Value",
            DoubleValue = 42.42
        },
        new Item2
        {
            IntValue = 1242,
            Value = "Item2 Value"
        }
    }
};
XmlSerializer serializer = new XmlSerializer(typeof(ClassToSerialize), "namespaceName");
using (var stream = File.Create("testfile.xml"))
{
    serializer.Serialize(stream, data);
}
```

**Result XML:**

```xml
<?xml version="1.0" encoding="utf-8"?>
<rootName 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:xsd="http://www.w3.org/2001/XMLSchema"
  attribute="attribute value"
  xmlns="namespaceName">
  <subElement xmlns="myxmlNamespace">xml text</subElement>
  <array xmlns="myxmlNamespace">
    <item1 
      BaseString="Item1 Value"
      Item1Double="42.42" />
    <item2 
      BaseString="Item2 Value"
      Item2Int="1242" />
  </array>
</rootName>
```

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

### JSON Serializer options

Serialization and de serialization options can be controlled via the `JsonSerializerOptions` class. Important properties:

* `bool AllowTrailingCommas`:
  
	Get or sets a value that indicates whether an extra comma at the end of a list of JSON values in an object or array is allowed (and ignored) within the JSON payload being de-serialized.

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
	
	Custom values can be set, by implementing the `JsonNamingPolicy` class.
	
* `bool IncludeFields`:

	Gets or sets a value that indicates whether fields are handled during serialization and de-serialization. The default value is false.
	
* `bool IgnoreReadOnlyProperties`:

	Gets or sets a value that indicates whether null values are ignored during serialization and de-serialization. The default value is false.
	
* `JsonCommentHandling ReadCommentHandling`:

	Gets or sets a value that defines how comments are handled during de-serialization.
	
	Possible values:
	
	* `JsonCommentHandling.Disallow`
	
		Doesn't allow comments within the JSON input. Comments are treated as invalid JSON if found, and a `System.Text.Json.JsonException` is thrown. This is the default value.
	* `JsonCommentHandling.Skip`
	
		Allows comments within the JSON input and ignores them. The `System.Text.Json.Utf8JsonReader` behaves as if no comments are present.
	* `JsonCommentHandling.Allow`
	
		Allows comments within the JSON input and treats them as valid tokens. While reading, the caller can access the comment values.
	
* `JsonNumberHandling NumberHandling`:

	Gets or sets an object that specifies how number types should be handled when serializing or de-serializing.
	
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

	Gets or sets a value that determines when properties with default values are ignored during serialization or de-serialization. The default value is `JsonIgnoreCondition.Never`.

	Possible values:
	
	* `JsonIgnoreCondition.Never`
  
		Property is always serialized and de-serialized, regardless of IgnoreNullValues configuration.
	
	* `JsonIgnoreCondition.Always`
  
		Property is always ignored.
	
	* `JsonIgnoreCondition.WhenWritingDefault`
	
		Property is ignored only if it equals the default value for its type.
	
	* `JsonIgnoreCondition.WhenWritingNull`

		Property is ignored if its value is null. This is applied only to reference-type properties and fields.

### Converters

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
