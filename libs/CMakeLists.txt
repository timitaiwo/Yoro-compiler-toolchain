# CMake File to integrate Tree-sitter and LLVM
set(TREESITTER_DIR "treesitter")
add_library(tree-sitter "${TREESITTER_DIR}/lib/src/lib.c")

target_include_directories(tree-sitter
                    PRIVATE
                    "${TREESITTER_DIR}/lib/include"
                    "${TREESITTER_DIR}/lib/src"
                    )