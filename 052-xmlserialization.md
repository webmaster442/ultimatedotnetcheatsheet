# XML Serialization

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

    Indicates to the XmlSerializer that the member must be treated as XML text when the class that contains it is serialized or deserialized.

## XML serialization example

### Object model that will be serialized:

**Note: The types that will be serialied must have `public` accessibility modifier.**

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

//A sub class, that is part of the root class that needs to be serialied
//NOTE: Complex types, like this, needs to be serialized as XML elements
//It is not pissible to serialize these as attributes
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

### Serialization code:

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

### This code produces this XML file:

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
