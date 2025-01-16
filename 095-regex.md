# Regular Expressions

A regular expression (regex) is a sequence of characters that defines a search pattern. It is commonly used for: 

* Pattern Matching: Finding specific sequences in text (e.g., dates, phone numbers).
* Validation: Checking if a string meets a specific format (e.g., email addresses).
* Search and Replace: Modifying text by identifying and replacing patterns.
* Splitting Strings: Breaking strings into parts based on a pattern.

The `System.Text.RegularExpressions` namespace provides the primary classes for regex operations.

## Anchors

Anchors are special characters that allow you to specify where in the string a match should occur. They are useful for enforcing strict matching criteria and can be combined with other patterns to precisely define where a match should occur within the input string. 

| Regex |                         Meaning                         |
| :---: | :-----------------------------------------------------: |
|  `^`  | Start of string, or start of line in multi-line pattern |
| `\A`  |                     Start of string                     |
|  `$`  |   End of string, or end of line in multi-line pattern   |
| `\Z`  |                      End of string                      |
| `\b`  |                      Word boundary                      |
| `\B`  |                    Not word boundary                    |
| `\<`  |                      Start of word                      |
| `\>`  |                       End of word                       |

## Character Classes and special chars

Character classes are patterns that match a single character from a specified set of characters.

| Regex  |       Meaning        |
| :----: | :------------------: |
|  `\c`  |  Control character   |
|  `\s`  |     White space      |
|  `\S`  |   Not white space    |
|  `\d`  |        Digit         |
|  `\D`  |      Not digit       |
|  `\w`  |         Word         |
|  `\W`  |       Not word       |
|  `\x`  | A Hexade­cimal digit  |
|  `\O`  |     Octal digit      |
|  `\n`  |       New line       |
|  `\r`  |   Carriage return    |
|  `\t`  |         Tab          |
|  `\v`  |     Vertical tab     |
|  `\f`  |      Form feed       |
| `\xxx` | Octal character xxx  |
| `\xhh` |   Hex character hh   |

## Groups and Ranges

Groups are used to create subpatterns within a larger pattern. They are enclosed in parentheses `()` and allow you to apply quantifiers or modifiers to multiple characters. Groups can be referenced later in the expression or used for capturing matches. 

Ranges specify a range of characters to match within square brackets `[]`. For instance, `[a-z]` matches any lowercase letter from `a` to `z`. They provide a concise way to match characters within a specific set or range. Together, groups and ranges enhance the power and flexibility of regular expressions for pattern matching tasks.

|   Regex    |               Meaning                |
| :--------: | :----------------------------------: |
|    `.`     | Any character except new line (`\n`) |
| `(a \| b)` |                a or b                |
|  `(...)`   |                Group                 |
| `(?:...)`  |   Passive (non-c­apt­uring) group    |
|  `[abc]`   |         Range (a or b or c)          |
|  `[^abc]`  |          Not (a or b or c)           |
|  `[a-q]`   |    Lower case letter from a to q     |
|  `[A-Q]`   |    Upper case letter from A to Q     |
|  `[0-7]`   |          Digit from 0 to 7           |
|    `\x`    |    Group/­sub­pattern number "­x"    |

## Quanti­fiers

Quantifiers specify the quantity of the preceding element in the pattern. They control how many times a character, group, or character class should be matched in the input string. 

|  Regex  |  Meaning  |
| :-----: | :-------: |
|   `*`   | 0 or more |
|  `{3}`  | Exactly 3 |
|   `+`   | 1 or more |
| `{3,}`  | 3 or more |
|   `?`   |  0 or 1   |
| `{3,5}` | 3, 4 or 5 |

# Regex best practices

1. Avoid Overcomplication: Use simple patterns that are easy to understand. Complex regex can be hard to read and debug. E.g.: The Pattern `^([0-9]{4})-([0-1][0-9])-([0-3][0-9])$` matches the string `2024-12-06`, so does the `^\d{4}-\d{2}-\d{2}$` regex, but the later one is easier to understand.

2. Anchor Patterns to the Start and End: Use `^` (start) and `$` (end) when matching the entire input. This avoids unintended partial matches. E.g.: `\d+` matches `123` in `abc123`. With anchors `^\d+$` matches only `123`

3. Escape Special Characters: Use `\` to escape special regex characters (`.`, `*`, `?`, etc.) when matching them literally.

4. Avoid Backtracking: Patterns with multiple overlapping possibilities (e.g.: `(.*)*`) can lead to inefficient backtracking. 

5. Use Named Groups for Clarity.: Use named capture groups to improve readability and make extracted values easier to work with. E.g.: `(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})`

6. Avoid Overuse: Use regex only when necessary. Simple string operations (e.g., `Contains`, `StartsWith`) are often more efficient for straightforward tasks.

7. Document Your Regex: Add comments or documentation explaining the purpose of complex patterns.

8. Use OWASP recommended patterns: The Open Web Application Security Project (OWASP) provides guidelines and patterns to avoid common security risks, particularly around input validation and avoiding vulnerabilities like ReDoS (Regular Expression Denial of Service). - https://owasp.org/www-community/OWASP_Validation_Regex_Repository

## Regex operations

### Match a string 

```csharp
Regex regex = new Regex(@"^\$(a|b)$");
Match match = regex.Match(input);
if (match.Success)
{
    //input string matches pattern
}
```

### Multiple Matches

```csharp
Regex pattern = new Regex(@"^\$(a|b)$");
foreach (Match m in pattern.Matches(input))
{
    Console.WriteLine($"Match: {m.Value}");
}
```

### Check for Match

```csharp
Regex pattern = new Regex(@"^\$(a|b)$");
bool isMatch = pattern.IsMatch(input);
```

### Replacement

```csharp
Regex pattern = new Regex(@"\d+");
string result = pattern.Replace(input, "number");
```

### Regex Modifiers 

`RegexOptions` enum can be used as parameter when creating a Regex to modify the behaviour.

* `RegexOptions.None`

    Use default behavior.

* `RegexOptions.IgnoreCase`

    Use case-insensitive matching.

* `RegexOptions.Multiline`

    Use multiline mode, where `^` and `$` indicate the beginning and end of each line (instead of the beginning and end of the input string).

* `RegexOptions.Singleline`

    Use single-line mode, where the period (`.`) matches every character (instead of every character except `\n`).

* `RegexOptions.ExplicitCapture`

    Do not capture unnamed groups. The only valid captures are explicitly named or numbered groups of the form `(?<`*name*`>` *subexpression*`)`.

* `RegexOptions.Compiled`

    Compile the regular expression to an assembly.

* `RegexOptions.IgnorePatternWhitespace`

    Exclude unescaped white space from the pattern, and enable comments after a number sign (`#`).

* `RegexOptions.RightToLeft`

    Change the search direction. Search moves from right to left instead of from left to right.

* `RegexOptions.ECMAScript`

    Enable ECMAScript-compliant behavior for the expression.

* `RegexOptions.CultureInvariant`

    Ignore cultural differences in language.

* `RegexOptions.NonBacktracking`

    Match using an approach that avoids backtracking and guarantees linear-time processing in the length of the input. (Available in .NET 7 and later versions.)

## GeneratedRegex

The `GeneratedRegex` attribute is a feature introduced in C# 10 (with .NET 7) that allows you to create source-generated regular expressions. It generates highly optimized, compile-time regex code, eliminating the overhead of interpreting or compiling regex patterns at runtime.

This approach improves both performance and maintainability, especially for frequently used regex patterns.

Example:

```csharp
partial class Test
{
    // Define a source-generated regex
    [GeneratedRegex(@"\b\d{4}-\d{2}-\d{2}\b", RegexOptions.Compiled)]
    private static partial Regex DateRegex();
}
```

The `GeneratedRegex` attribute works only with a `partial` method declaration, which implies that the containing class must also have the `partial` modifier.
