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


More info: https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/access-modifiers
