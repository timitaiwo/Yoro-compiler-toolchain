# Birkbeck Yọrọ repo

**Remember to use g++ or clang++ when compiling**

## Semantic checks
- Variable declaration done once in a block which Rust like shadowing occuring

- Determine if the arithmetic expression is valid e.g 
    - integer, floating point and boolean values can be added together, with boolean values being coerced to 0 for false values and 1 for truth values.
    - strings and characters are appended
    - strings and characters cannot be added to integer, floating point and boolean values


## Behaviour of conditional expressions
- A string of length 0, i.e "", is coerced to false otherwise it is true
- An integer equals to 0 is coerced to false, otherwise it is true


## Build instructions
- Download [Treesitter's binary](https://github.com/tree-sitter/tree-sitter/releases) and add it to the tree-sitter-yoro directory. Optionally, it can be added to the PATH environment variable.

- Run ```./tree-sitter generate``` in the tree-sitter-yoro directory or ```tree-sitter generate``` in the tree-sitter-yoro directory if Treesitter is added as an environment PATH variable

- Run ```./tree-sitter build``` in the tree-sitter-yoro directory or ```tree-sitter build``` in the tree-sitter-yoro directory if Treesitter is added as an environment PATH variable
