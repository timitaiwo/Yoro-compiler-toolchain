This folder potentially stores the libraries used by this project as git submodules

e.g LLVM, Treesitter and a unit test library (critereon, GoogleTest, CTest)

```git submodule update --init --recursive```

## Adding the submodules

To add LLVM use ```git submodule add  https://github.com/llvm/llvm-project.git libs/llvm-project```