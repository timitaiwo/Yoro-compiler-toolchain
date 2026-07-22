# Yọrọ compiler toolchain

Yọrọ is a metaprogramming language that allows users to create their programming language.

Users define keywords with a config file and run the toolchain to generate a compiler. Programs generated using such compilers can call functions from other programs compiler using Yọrọ compilers.

It takes syntax inspiration from Go, Rust and other modern programming languages and is planned to be a systems level programming language with an optional garbage collection mode. 

### Roadmap

1. ✅ Frontend: Parser, AST is done using tree-sitter
2. Midlayer: IR generation and optimization
3. Backend: assembly generation
3. Memory management: garbage collection, arena allocators, etc. 
4. Language Server Protocol: 

## Setup 
This project integrates tree-sitter as a submodule so to clone this repo use the command `git clone --recurse-submodule https://github.com/timitaiwo/Yoro-compiler-toolchain.git`

Alternatively, the steps can be separated i.e. clone the repo then instanciate the submodules using the below commands 
- ```git clone https://github.com/timitaiwo/Yoro-compiler-toolchain.git```
- ```git submodule update --init --recursive```


**Note:** Building has been verified for Linux systems only

**WIP:** use nix flakes to creating a reproducable development environment with the `nix develop` command.


## Prerequisites

- CMake
- Build system e.g Ninja
- NodeJS
- LLVM installed on the system with libedit, libzstd, libcurl 

    use the command ```sudo apt install libzstd-dev libcurl4-openssl-dev libedit-dev``` to add this


Test the generated ll file with the `lli` command e.g. `lli test_lli.ll; echo $?`

## Build instructions

- Add CMake build system

- Download [Treesitter's binary](https://github.com/tree-sitter/tree-sitter/releases) and add it to can be added to the OS PATH environment variable.

- Run ```./tree-sitter generate``` in the tree-sitter-yoro directory or ```tree-sitter generate``` in the tree-sitter-yoro directory if Treesitter is added as an environment PATH variable

- Run ```./tree-sitter build``` in the tree-sitter-yoro directory or ```tree-sitter build``` in the tree-sitter-yoro directory if Treesitter is added as an environment PATH variable

error handling in C - https://youtu.be/A9bPqlgbUvg?si=5cPvZjbYq8qdRMr8 

## *TODO: ...*

- Figure out lexicographic order for character and string comparisons

- Add Tests for a combination of comparison and arithmetic expressions (both for arit expressions or string expressions)

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





