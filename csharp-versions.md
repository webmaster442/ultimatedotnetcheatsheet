# C# Version History

## 1.0

_Released  January 2002_

* Classes
* Structs
* Interfaces
* Events
* Properties
* Delegates
* Operators and expressions
* Statements
* Attributes

## 1.2

_Released April 2003_

The code generated in a `foreach` loop called `Dispose` on an `IEnumerator` when that `IEnumerator` implemented `IDisposable`.

## 2.0

_Released November 2005_

* Generics
* Partial types
* Anonymous methods
* Nullable value types
* Iterators
* Covariance and contravariance
* Getter/setter separate accessibility
* Method group conversions (delegates)
* Static classes
* Delegate inference

## 3.0

_Released November 2007_

* Auto-implemented properties
* Anonymous types
* Query expressions
* Lambda expressions
* Expression trees
* Extension methods
* Implicitly typed local variables
* Partial methods
* Object and collection initializers

## 4.0

_Released April 2010_

* Dynamic binding
* Named/optional arguments
* Generic covariant and contravariant
* Embedded interop types

## 5.0

_Released August 2012_

* Asynchronous members
* Caller info attributes

## 6.0

_Released July 2015_

* Static imports
* Exception filters
* Auto-property initializers
* Expression bodied members
* Null propagator
* String interpolation
* nameof operator
* Index initializers
* Await in catch/finally blocks
* Default values for getter-only properties

## 7.0

_Released March 2017_

* Out variables
* Tuples and deconstruction
* Pattern matching
* Local functions
* Expanded expression bodied members
* Ref locals
* Ref returns
* Discards
* Binary Literals and Digit Separators
* Throw expressions

## 7.1

_Released August 2017_

* async Main method
* default literal expressions
* Inferred tuple element names
* Pattern matching on generic type parameters

## 7.2

_Released November 2017_

* Initializers on stackalloc arrays
* Use fixed statements with any type that supports a pattern
* Access fixed fields without pinning
* Reassign ref local variables
* readonly struct types
* ref readonly modifier on method returns
* private protected access modifier
* Conditional ref expressions

## 7.3

_Released May 2018_

* access fixed fields without pinning
* reassign ref local variables
* use initializers on stackalloc arrays
* fixed statements with any type that supports a pattern

## 8.0

_Released September 2019_

* Readonly members
* Default interface methods
* Pattern matching enhancements: Switch expressions, Property patterns, Tuple patterns, Positional patterns
* Using declarations
* Static local functions
* Disposable ref structs
* Nullable reference types
* Asynchronous streams
* Indices and ranges
* Null-coalescing assignment
* Unmanaged constructed types
* Stackalloc in nested expressions
* Enhancement of interpolated verbatim strings

## 9.0

_Released November 2020_

* Records
* Init only setters
* Top-level statements
* Pattern matching enhancements: relational patterns and logical patterns
* Native sized integers
* Function pointers
* Suppress emitting localsinit flag
* Module initializers
* New features for partial methods
* Target-typed new expressions
* static anonymous functions
* Target-typed conditional expressions
* Covariant return types
* Extension GetEnumerator support for foreach loops
* Lambda discard parameters
* Attributes on local functions

## 10.0

_Released November 2021_

* Record structs
* Improvements of structure types
* Interpolated string handlers
* global using directives
* File-scoped namespace declaration
* Extended property patterns
* Lambda expressions can have a natural type, where the compiler can infer a delegate type from the lambda expression or method group.
* Lambda expressions can declare a return type when the compiler can't infer it.
* Attributes can be applied to lambda expressions.
* In C# 10, const strings can be initialized using string interpolation if all the placeholders are themselves constant strings.
* In C# 10, you can add the sealed modifier when you override ToString in a record type.
* Warnings for definite assignment and null-state analysis are more accurate.
* Allow both assignment and declaration in the same deconstruction.
* Allow AsyncMethodBuilder attribute on methods
* CallerArgumentExpression attribute
* new format for the #line pragma.

## 11.0

_Released November 2022_

* Raw string literals
* Generic math support
* Generic attributes
* UTF-8 string literals
* Newlines in string interpolation expressions
* List patterns
* File-local types
* Required members
* Auto-default structs
* Pattern match Span<char> on a constant string
* Extended nameof scope
* Numeric IntPtr
* ref fields and scoped ref
* Improved method group conversion to delegate

## 12.0

_Released November 2023_

* Primary constructors
* Collection expressions
* Inline arrays
* Optional parameters in lambda expressions
* ref readonly parameters
* Alias any type
* Experimental attribute

## 13.0

_Released November 2024_

* Params collections
* New lock type
* New escape sequence - \e
* Implicit indexer access in object initializers
* ref locals and unsafe contexts in iterators and async methods
* ref struct types to implement interfaces.
* Partial properties and indexers
* field contextual keyword

