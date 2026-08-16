using UltimateDotNetCheatSheet.Extensions;

namespace Tests;

public class ReflectionTests
{

    public record class RequiredClass
    {
        public required string RequiredProperty { get; set; }
    }

    [Test]
    public void TestCreateInstance()
    {
        var instance = ReflectionExtensions.CreateInstance<RequiredClass>(typeof(RequiredClass), new Dictionary<string, object>
        {
            { "RequiredProperty", "FooBar" }
        });
        Assert.Multiple(() =>
        {
            Assert.That(instance, Is.Not.Null);
            Assert.That(instance.RequiredProperty, Is.EqualTo("FooBar"));
        });
    }

    [Test]
    public void TestIsRecord()
    {
        var result = ReflectionExtensions.IsRecordType(typeof(RequiredClass));
        Assert.That(result, Is.True);
    }
}