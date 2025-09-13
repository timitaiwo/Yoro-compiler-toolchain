# This CMake file controls the bulid of
# the yoro project

#########################################################
###################  Project Setup  #####################
#########################################################

# Setup LLVM - https://releases.llvm.org/18.1.8/docs/CMake.html#embedding-llvm-in-your-project
find_package(LLVM REQUIRED CONFIG COMPONENTS)
if(LLVM_FOUND)
    message(STATUS "Found install of LLVM ${LLVM_PACKAGE_VERSION} on the system")
else()
    message(STATUS "Did not find an install of LLVM on the system")
#     message(WARNING "LLVM install not found on the systemso compile of LLVM attempted"
#                     "ensure the command below is executed\n"
#                     "git submodule update --init --recursive"
#                     "\n")
#     set(LLVM_SRC_DIR "libs/llvm-project-18.x/llvm")
#     include_directories("{LLVM_SRC_DIR}/include/llvm")
#     add_subdirectory(${LLVM_SRC_DIR})
endif()

include_directories(${LLVM_INCLUDE_DIRS})
separate_arguments(LLVM_DEFINITIONS_LIST NATIVE_COMMAND ${LLVM_DEFINITIONS})
add_definitions(${LLVM_DEFINITIONS_LIST})

llvm_map_components_to_libnames(llvm_libs support core irreader)

message(STATUS "${llvm_libs}")


#########################################################
###################  Project Build  #####################
#########################################################


# Add Treesitter library
add_subdirectory(libs)

# Build the yọrọ compiler
set(SOURCES 
    main.cpp
    AST.cpp
    IRGenerator.cpp
    IRExecutor.cpp
    )

add_executable(${PROJECT_NAME}
                "${SOURCES}"
                )


# set(LLVM_INCLUDES
#     "libs/llvm-project-18.x/llvm/include"
#     "libs/llvm-project-18.x/utils/bazel/llvm-project-overlay/llvm/include"
# )
 
target_include_directories(${PROJECT_NAME}
                            PRIVATE
                            "include"
                            "tree-sitter-yoro/src"
                            "libs/treesitter/lib/include"
                            # "${LLVM_INCLUDES}/"
                            )

target_link_libraries(${PROJECT_NAME}
                        tree-sitter
                        LLVM
                        # ${llvm_libs}
                        )

# target_compile_definitions(${PROJECT_NAME}
#                             PRIVATE
#                             -Wno-c99-designated-initializer-order
#                             -Wc99-designator
#                             -Wreorder-init-list
#                             )

# Link against LLVM libraries
# target_link_libraries(simple-tool ${llvm_libs})
