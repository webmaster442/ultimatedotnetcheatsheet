# Strings

More infos:

* https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/strings/
* https://learn.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings


## String escape sequences

| Escape sequence |                           Character name                            |
| :-------------: | :-----------------------------------------------------------------: |
|      `\'`       |                            Single quote                             |
|       `\`       |                            Double quote                             |
|      `\\`       |                              Backslash                              |
|      `\0`       |                                Null                                 |
|      `\a`       |                                Alert                                |
|      `\b`       |                              Backspace                              |
|      `\f`       |                              Form feed                              |
|      `\n`       |                              New line                               |
|      `\r`       |                           Carriage return                           |
|      `\t`       |                           Horizontal tab                            |
|      `\v`       |                            Vertical tab                             |
|      `\u`       |      Unicode escape sequence (UTF-16) followed by 4 hex digits      |
|      `\U`       |      Unicode escape sequence (UTF-32) followed by 8 hex digits      |
|      `\x`       | Unicode escape sequence similar to "\u" except with variable length |


## Numeric format strings

| Format specifier |    Name     |         Supported          |                                             Description                                             |
| :--------------: | :---------: | :------------------------: | :-------------------------------------------------------------------------------------------------: |
|    `C` or `c`    |  Currency   |     All numeric types      |                                      Formats value as currency                                      |
|    `D` or `d`    |   Decimal   |       Integral types       |                             Integer digits with optional negative sign.                             |
|    `E` or `e`    | Exponential |     All numeric types      |                                        Exponential notation                                         |
|    `F` or `f`    | Fixed-point |     All numeric types      |                      Integral and decimal digits with optional negative sign.                       |
|   `G` or  `g`    |   General   |     All numeric types      |                   The more compact of either fixed-point or scientific notation.                    |
|    `N` or `n`    |   Number    |     All numeric types      | Integral and decimal digits, group separators, and a decimal separator with optional negative sign. |
|    `P` or `p`    |   Percent   |     All numeric types      |                    Number multiplied by 100 and displayed with a percent symbol.                    |
|    `R` or `r`    | Round-trip  | Single, Double, BigInteger |                        A string that can round-trip to an identical number.                         |
|    `X` or `x`    | Hexadecimal |       Integral types       |                                        A hexadecimal string.                                        |
|    any other     |   Unknown   |     All numeric types      |                               Throws a `FormatException` at run time.                               |

## Custom numeric format strings

| Format specifier |                     Name                     |                                                        Description                                                        |
| :--------------: | :------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------: |
|       `0`        |               Zero placeholder               |      Replaces the zero with the corresponding digit if one is present; otherwise, zero appears in the result string.      |
|       `#`        |              Digit placeholder               | Replaces the "#" symbol with the corresponding digit if one is present; otherwise, no digit appears in the result string. |
|       `.`        |                Decimal point                 |                          Determines the location of the decimal separator in the result string.                           |
|       `,`        | Group separator, number scaling <sup>I</sup> |                             Serves as both a group separator and a number scaling specifier.                              |
|       `%`        |            Percentage placeholder            |                Multiplies a number by 100 and inserts a localized percentage symbol in the result string.                 |
|       `‰`        |            Per mille placeholder             |                Multiplies a number by 1000 and inserts a localized per mille symbol in the result string.                 |
|       `E0`       |      Exponential notation <sup>II</sup>      |                   If followed by at least one 0 (zero), formats the result using exponential notation.                    |
|       `\`        |       Escape character <sup>III</sup>        |            Causes the next character to be interpreted as a literal rather than as a custom format specifier.             |
|       `;`        |       Section separator <sup>IV</sup>        |                  Defines sections with separate format strings for positive, negative, and zero numbers.                  |
|    any other     |             All other characters             |                                  The character is copied to the result string unchanged.                                  |


**I**: . As a group separator, it inserts a localized group separator character between each group. As a number scaling specifier, it divides a number
 by 1000 for each comma specified.

**II**: The case of "E" or "e" indicates the case of the exponent symbol in the result string. The number of zeros following the "E" or "e" character determines
 the minimum number of digits in the exponent. A plus sign (+) indicates that a sign character always precedes the exponent. 
 A minus sign (-) indicates that a sign character precedes only negative exponents.

**III**: The `#`, `0`, `.`, `,`, `%`, and `‰` symbols in a format string are interpreted as format specifiers rather than as literal characters. 
Depending on their position in a custom format string, the uppercase and lowercase "E" as well as the + and - symbols may also be interpreted as format specifiers.

**IV**: The semicolon (;) is a conditional format specifier that applies different formatting to a number depending on whether its value is positive, negative, or zero. 
To produce this behaviour, a custom format string can contain up to three sections separated by semicolons. These sections are:

* One section:
  The format string applies to all values.

* Two sections:
  The first section applies to positive values and zeros, and the second section applies to negative values.

  If the number to be formatted is negative, but becomes zero after rounding according to the format in the second section,
  the resulting zero is formatted according to the first section.

* Three sections:
  The first section applies to positive values, the second section applies to negative values, and the third section applies to zeros.

  The second section can be left empty (by having nothing between the semicolons), in which case the first section applies to all non-zero values.

  If the number to be formatted is non-zero, but becomes zero after rounding according to the format in the first or second section,
  the resulting zero is formatted according to the third section.

## Standard date and time format strings

| Format specifier |              Description              |      Example (en-Us culture)      |
| :--------------: | :-----------------------------------: | :-------------------------------: |
|       `d`        |          Short date pattern           |             6/15/2009             |
|       `D`        |           Long date pattern           |       Monday, June 15, 2009       |
|       `f`        |  Full date/time pattern (short time)  |   Monday, June 15, 2009 1:45 PM   |
|       `F`        |  Full date/time pattern (long time)   | Monday, June 15, 2009 1:45:30 PM  |
|       `g`        | General date/time pattern (long time) |       6/15/2009 1:45:30 PM        |
|    `m` or `M`    |           Month/day pattern           |              June 15              |
|    `O` or `o`    |     Round-trip date/time pattern      | 2009-06-15T13:45:30.0000000-07:00 |
|    `R` or `r`    |            RFC1123 pattern            |     Mon, 15 Jun 2009 20:45:30     |
|       `s`        |      Sortable date/time pattern       |        2009-06-15T13:45:30        |
|       `t`        |          Short time pattern           |              1:45 PM              |
|       `T`        |           Long time pattern           |            1:45:30 PM             |
|       `u`        | Universal sortable date/time pattern  |       2009-06-15 13:45:30Z        |
|       `U`        |   Universal full date/time pattern    | Monday, June 15, 2009 8:45:30 PM  |
|    `Y` or `y`    |          Year month pattern           |             June 2009             |

## Custom date and time format strings

| Format specifier |                             Description                             |
| :--------------: | :-----------------------------------------------------------------: |
|       `d`        |              The day of the month, from 1 through 31.               |
|       `dd`       |              The day of the month, from 01 through 31               |
|      `ddd`       |             The abbreviated name of the day of the week             |
|      `dddd`      |                The full name of the day of the week                 |
|   `g` or `gg`    |                          The period or era                          |
|       `h`        |            The hour, using a 12-hour clock from 1 to 12             |
|       `hh`       |            The hour, using a 12-hour clock from 01 to 12            |
|       `H`        |            The hour, using a 24-hour clock from 0 to 23             |
|       `HH`       |            The hour, using a 24-hour clock from 00 to 23            |
|       `K`        |                        Time zone information                        |
|       `m`        |                    The minute, from 0 through 59                    |
|       `mm`       |                   The minute, from 00 through 59                    |
|       `M`        |                    The month, from 1 through 12                     |
|       `MM`       |                    The month, from 01 through 12                    |
|      `MMM`       |                  The abbreviated name of the month                  |
|      `MMMM`      |                     The full name of the month                      |
|       `s`        |                    The second, from 0 through 59                    |
|       `ss`       |                   The second, from 00 through 59                    |
|       `t`        |             The first character of the AM/PM designator             |
|       `tt`       |                        The AM/PM designator                         |
|       `y`        |                       The year, from 0 to 99                        |
|       `yy`       |                       The year, from 00 to 99                       |
|      `yyy`       |              The year, with a minimum of three digits               |
|      `yyyy`      |                   The year as a four-digit number                   |
|     `yyyyy`      |                   The year as a five-digit number                   |
|       `z`        |            Hours offset from UTC, with no leading zeros             |
|       `zz`       | Hours offset from UTC, with a leading zero for a single-digit value |
|      `zzz`       |                  Hours and minutes offset from UTC                  |
|       `:`        |                         The time separator                          |
|       `/`        |                         The date separator                          |
|       `\`        |                        The escape character                         |
