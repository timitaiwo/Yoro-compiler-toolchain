# Birkbeck Yọrọ repo

To clone this repo use 
>```git clone --recurse-submodule https://github.com/Birkbeck/msc-projects-2023-4-timitaiwo.git```

Alternatively, clone the repo then instanciate the submodules i.e 
- ```git clone https://github.com/Birkbeck/msc-projects-2023-4-timitaiwo.git```
- ```git submodule update --init --recursive```

**Remember to use g++ or clang++ when compiling**

error handling in C - https://youtu.be/A9bPqlgbUvg?si=5cPvZjbYq8qdRMr8 

*TODO: ...*
- Add identifier and to _number_expression and _concatenation_expression
- Ensure compound binary expressions are parsed correctly

- Figure out lexicographic order for character and string comparisons
- Convert keyword literals to regex unicode 

- Hide after all is done
    - operator names
    - statement

- Add Tests for a combination of comparison and arithmetic expressions (both for arit expressions or string expressions)

- Implement the below expressions
    - NOT
    - AND
    - OR 
    - Parenthesised
    - Fix identifiers in expressions

## Syntax checks
- Figure out how to process syntax and semantic errors from Treesitter (possibly using Treesitter queries)

## Semantic checks
- Variable declaration done once in a block which Rust like shadowing occuring
- Make sure no return expression occurs outside a function

- Determine if the arithmetic expression is valid e.g
    - Boolean false (irọ) does not divide or modulus
    - No division by zero
    
    - No int/floating_point/boolean and character/string mixup in the expressions
    
    - integer, floating point and boolean values can be added together, with boolean values being coerced to 0 for false values and 1 for truth values.
    - strings and characters are appended
    - strings and characters cannot be added to integer, floating point and boolean values


## Behaviour of primitives
- Once a boolean interacts with an integer or floating point number in an expression, it is coersced to 0 or 1 for true and false values respectively

### ...in a branch expression
- A string of length 0, i.e "", is coerced to false otherwise it is true
- An integer that equals to 0 is coerced to false, otherwise it is true


## String and char comparison
- An expression that compares a character and string would compare the character and the first grapheme (a.k.a) of the string
- The comparion would compare the string/character in lexicographic order




## Build instructions

- Add CMake build system

- Download [Treesitter's binary](https://github.com/tree-sitter/tree-sitter/releases) and add it to the tree-sitter-yoro directory. Optionally, it can be added to the PATH environment variable.

- Run ```./tree-sitter generate``` in the tree-sitter-yoro directory or ```tree-sitter generate``` in the tree-sitter-yoro directory if Treesitter is added as an environment PATH variable

- Run ```./tree-sitter build``` in the tree-sitter-yoro directory or ```tree-sitter build``` in the tree-sitter-yoro directory if Treesitter is added as an environment PATH variable
