# Object validation

The `Validator` class is commonly used for validating data annotations on objects. Validation attributes are defined in the `System.ComponentModel.DataAnnotations` namespace. To validate an object, first it must be annotated:

```csharp
public class Person
{
    [Required(ErrorMessage = "Name is required.")]
    [StringLength(100, ErrorMessage = "Name cannot be longer than 100 characters.")]
    public string Name { get; set; }

    [Range(1, 120, ErrorMessage = "Age must be between 1 and 120.")]
    public int Age { get; set; }

    [EmailAddress(ErrorMessage = "Invalid Email Address.")]
    public string Email { get; set; }
}
```

Validation code:

```csharp
//person instance with invalid data
var person = new Person
{
    Name = null, //Invalid: Required
    Age = 150, //Invalid: Out of Range
    Email = "invalid-email" //Invalid: Not an email format
};

// Create a list to hold validation results
var validationResults = new List<ValidationResult>();

// Validate the object
var validationContext = new ValidationContext(person, null, null);
bool isValid = Validator.TryValidateObject(person, validationContext, validationResults, true);

// Output the validation results
if (!isValid)
{
    Console.WriteLine("Validation failed for the following reasons:");

    foreach (var validationResult in validationResults)
    {
        Console.WriteLine($"- {validationResult.ErrorMessage}");
    }
}
else
{
    Console.WriteLine("Validation succeeded.");
}
```

## Defining a custom validation attribute

You can create a custom attribute by deriving from `ValidationAttribute` class:

```csharp

public class FutureDateAttribute : ValidationAttribute
{
    public FutureDateAttribute()
    {
        ErrorMessage = "The date must be in the future.";
    }

    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        if (value == null)
        {
            return new ValidationResult(ErrorMessage);
        }

        DateTime dateValue;
        if (DateTime.TryParse(value.ToString(), out dateValue))
        {
            if (dateValue > DateTime.Now)
            {
                return ValidationResult.Success;
            }
        }

        return new ValidationResult(ErrorMessage);
    }
}
```
