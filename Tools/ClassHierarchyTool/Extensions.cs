using System.Diagnostics;
using System.Windows.Controls;
using System.Xml.Linq;

namespace ClassHierarchyTool;

internal static class Extensions
{
    public static Stack<Type> GetParentTypes(this Type t)
    {
        static void GetParents(Type type, Stack<Type> chain)
        {
            chain.Push(type);
            if (type.BaseType != null)
            {
                GetParents(type.BaseType, chain);
            }
        }

        var chain = new Stack<Type>();
        chain.Push(t);
        if (t.BaseType != null)
        {
            GetParents(t.BaseType, chain);
        }

        return chain;
    }

    public static string GetNomnomlHierachy(this IEnumerable<Type> types)
    {
        StringBuilder result = new();
        HashSet<string> list = new();

        static void AddParerntsToList(HashSet<string> list, IEnumerable<string> parents)
        {
            string? previous = null;
            foreach (var parent in parents)
            {
                if (previous == null)
                    previous = parent;
                else
                {
                    list.Add($"[{previous}] <:- [{parent}]");
                    previous = parent;
                }
            }
        }

        foreach (Type type in types)
        {
            var parents = type.GetParentTypes().Select(x => x.Name);
            AddParerntsToList(list, parents);
        }

        foreach (var item in list)
        {
            result.AppendLine(item);
        }

        return result.ToString();
    }

    public static string ToMarkdown(this Dictionary<Type, string> typeDocumentations)
    {
        StringBuilder result = new();
        foreach (var typeDocument in typeDocumentations)
        {
            result.AppendLine($"* **{typeDocument.Key.Name}**");
            result.AppendLine();
            result.AppendLine($"    {typeDocument.Value}");
            result.AppendLine();
        }
        return result.ToString();
    }

    public static Dictionary<Type, string> GetSummaries(this IEnumerable<Type> types, string xmlPath)
    {
        string[] xmlFiles = Directory.GetFiles(xmlPath, "*.xml");

        Dictionary<Type, string> xmlPathByType = new();
        foreach (var type in types)
        {
            var hierarchy = type.GetParentTypes();
            foreach (var t in hierarchy)
            {
                if (xmlPathByType.ContainsKey(t))
                {
                    continue;
                }
                var xmlName = Path.Combine(xmlPath, Path.ChangeExtension(t.Assembly.GetName().Name, ".xml") ?? "");
                if (!File.Exists(xmlName))
                {
                    Debug.WriteLine($"File not found: {xmlName}");
                    continue;
                }
                xmlPathByType.Add(t, xmlName);
            }
        }

        Dictionary<Type, string> results = new();

        foreach (var item in xmlPathByType)
        {
            var xml = XDocument.Load(item.Value);
            var summary = xml.Descendants("member")
                .Where(x => x.Attribute("name")?.Value == $"T:{item.Key.FullName}")
                .FirstOrDefault()
                ?.Element("summary")
                ?.Value;
            if (summary != null)
            {
                results.Add(item.Key, summary);
            }
        }

        return results;
    }
}
