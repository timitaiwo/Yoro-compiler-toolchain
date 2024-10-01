This folder potentially stores the libraries used by this project as git submodules

e.g LLVM, Treesitter and a unit test library (critereon, GoogleTest, CTest)


## Adding the submodules

- **LLVM**

    LLVM release 18 would be used ```https://github.com/llvm/llvm-project/tree/release/18.x```

    The command to add LLVM is ```git submodule add -b release/18.x https://github.com/llvm/llvm-project.git libs/llvm-project-18.x```

    LLVM build instructions can be found at https://llvm.org/docs/GettingStarted.html  

    - in the ```llvm-project-18.x``` directory run to generate the build files ```cmake -S llvm -B build -G Ninja -DLLVM_ENABLE_PROJECTS='clang;clang-tools-extra;lld;lldb;mlir;openmp' -DCMAKE_INSTALL_PREFIX='desired dir' -DCMAKE_BUILD_TYPE=Release -DLLVM_PARALLEL_{COMPILE,LINK}_JOBS=6```

    - Then run ```ninja``` in the same directory


    Additional flags added in this instance:
    - B: define the build directory
    - DLLVM_PARALLEL_{COMPILE,LINK}_JOBS=N: Define how many compile tasks can be done in parallel
    - DCMAKE_INSTALL_PREFIX=xyz: determine the install directory
    - DLLVM_ENABLE_PROJECTS: 