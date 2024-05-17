# Operator Precedence

1. Primary:

    `x.y`, `f(x)`, `a[i]`, `x?.y`, `x?[y]`, `x++`, `x--`, `x!`, `new`, `typeof`, `checked`, `unchecked`, `default`, `nameof`, `delegate`, `sizeof`, `stackalloc`, `x->y`
2. Unary: `+x, -x, !x, ~x, ++x, --x, ^x, (T)x, await, &x, *x, true and false`
3. Range: `x..y`
4. Switch and with expressions: `switch, with`
5. Multiplicative: `x * y, x / y, x % y`
6. Additive: `x + y`, `x – y`
7. Shift: `x << y`, `x >> y`, `x >>> y`
8. Relational and type-testing: `x < y`, `x > y`, `x <= y`, `x >= y`, `is`, `as`
9. Equality: `x == y`, `x != y`
10. Boolean logical AND or bitwise logical AND: x & y`
11. Boolean logical XOR or bitwise logical XOR: `x ^ y`
12. Boolean logical OR or bitwise logical OR: `x | y`
13. Conditional AND: `x && y`
14. Conditional OR: `x || y`
15. Null-coalescing operator: `x ?? y`
16. Conditional operator: `c ? t : f`
17. Assignment and lambda declaration: 

    `x = y`, `x += y`, `x -= y`, `x *= y`, `x /= y`, `x %= y`, `x &= y`, `x |= y`, `x ^= y`, `x <<= y`, `x >>= y`, `x >>>= y`, `x ??= y`, `=>`

More info: https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/

# Access modifiers

|           Caller's location            | `public` | `protected  internal` | `protected` | `internal` | `private protected` | `private` |
| :------------------------------------: | :------: | :-------------------: | :---------: | :--------: | :-----------------: | :-------: |
|            Within the class            |    √     |           √           |      √      |     √      |          √          |     √     |
|     Derived class (same assembly)      |    √     |           √           |      √      |     √      |          √          |     X     |
|   Non-derived class (same assembly)    |    √     |           √           |      X      |     √      |          X          |     X     |
|   Derived class (different assembly)   |    √     |           √           |      √      |     X      |          X          |     X     |
| Non-derived class (different assembly) |    √     |           X           |      X      |     X      |          X          |     X     |

Beginning with C# 11, the `file` contextual keyword is a type modifier.

The `file` modifier restricts a top-level type's scope and visibility to the file in which it's declared. The `file` modifier will generally be applied to types written by a source generator. File-local types provide source generators with a convenient way to avoid name collisions among generated types. 

# Keywords

Keywords are predefined, reserved identifiers that have special meanings to the compiler. They can't be used as identifiers in your program unless they include `@` as a prefix. For example, `@if` is a valid identifier, but `if` isn't because `if` is a keyword.

|   A-E    |    E-L    |    N-S     |    S-W    |
| :------: | :-------: | :--------: | :-------: |
| abstract |   event   | namespace  |  static   |
|    as    | explicit  |    new     |  string   |
|   base   |  extern   |    null    |  struct   |
|   bool   |   FALSE   |   object   |  switch   |
|  break   |  finally  |  operator  |   this    |
|   byte   |   fixed   |    out     |   throw   |
|   case   |   float   |  override  |   TRUE    |
|  catch   |    for    |   params   |    try    |
|   char   |  foreach  |  private   |  typeof   |
| checked  |   goto    | protected  |   uint    |
|  class   |    if     |   public   |   ulong   |
|  const   | implicit  |  readonly  | unchecked |
| continue |    in     |    ref     |  unsafe   |
| decimal  |    int    |   return   |  ushort   |
| default  | interface |   sbyte    |   using   |
| delegate | internal  |   sealed   |  virtual  |
|    do    |    is     |   short    |   void    |
|  double  |   lock    |   sizeof   | volatile  |
|   else   |   long    | stackalloc |   while   |
|   enum   |           |            |           |

## Contextual keywords

A contextual keyword is used to provide a specific meaning in the code, but it isn't a reserved word in C#. Some contextual keywords, such as `partial` and `where`, have special meanings in two or more contexts.

|    A-E     |   F-N   |       N-R        |    R-Y    |
| :--------: | :-----: | :--------------: | :-------: |
|    add     |  file   |       nint       | required  |
|    and     |  from   |       not        |  scoped   |
|   alias    |   get   |     notnull      |  select   |
| ascending  | global  |      nuint       |    set    |
|    args    |  group  |        on        | unmanaged |
|   async    |  init   |        or        |   value   |
|   await    |  into   |     orderby      |    var    |
|     by     |  join   |  partial (type)  |   when    |
| descending |   let   | partial (method) |   where   |
|  dynamic   | managed |      record      |   with    |
|   equals   | nameof  |      remove      |   yield   |
