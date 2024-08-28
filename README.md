# Birkbeck Yọrọ repo

To clone this repo use 
>```git clone --recurse-submodule https://github.com/Birkbeck/msc-projects-2023-4-timitaiwo.git```

Alternatively, clone the repo then instanciate the submodules i.e 
- ```git clone https://github.com/Birkbeck/msc-projects-2023-4-timitaiwo.git```
- ```git submodule update --init --recursive```

**Remember to use g++ or clang++ when compiling**

error handling in C - https://youtu.be/A9bPqlgbUvg?si=5cPvZjbYq8qdRMr8 

*TODO: ...*
- Ensure compound binary expressions are parsed correctly
- Hide arithmetic operators after the above is done
- Fix floating point Regex to recognize literals like 3. to implicitly represent 3.00
- Fix string literals to deal with greedy behaviour of collecting past the second double quotes (")
- Fix comment regexs to handle empty comments 
- Convert keyword literals to regex unicode 

## Syntax checks
- Figure out how to process syntax errors from Treesitter (possibly using Treesitter queries)

## Semantic checks
- Variable declaration done once in a block which Rust like shadowing occuring

- Determine if the arithmetic expression is valid e.g 
    - integer, floating point and boolean values can be added together, with boolean values being coerced to 0 for false values and 1 for truth values.
    - strings and characters are appended
    - strings and characters cannot be added to integer, floating point and boolean values


## Behaviour of primitives
- Once a boolean interacts with an integer or floating point number in an expression, it is coersed to 0 or 1 for true and false values respectively

### ...in conditional expressions
- A string of length 0, i.e "", is coerced to false otherwise it is true
- An integer equals to 0 is coerced to false, otherwise it is true



## Build instructions
- Download [Treesitter's binary](https://github.com/tree-sitter/tree-sitter/releases) and add it to the tree-sitter-yoro directory. Optionally, it can be added to the PATH environment variable.

- Run ```./tree-sitter generate``` in the tree-sitter-yoro directory or ```tree-sitter generate``` in the tree-sitter-yoro directory if Treesitter is added as an environment PATH variable

- Run ```./tree-sitter build``` in the tree-sitter-yoro directory or ```tree-sitter build``` in the tree-sitter-yoro directory if Treesitter is added as an environment PATH variable
