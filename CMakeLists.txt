cmake_minimum_required(VERSION 3.30.1)
# If on windows NMake needs to be installed.
# It comes bundled with the Microsoft Visual Studio IDE
project(yoro)

# Integrate CMake and Google Test
# https://matgomes.com/integrate-google-test-into-cmake/

set(CXX_STANDARD 20)
set(CXX_STANDARD_REQUIRED TRUE)
set(CXX_STANDARD_EXTENSIONS OFF)

# enable_testing()

# add_subdirectory(src)
# add_subdirectory(tests)


# Move the below to src after sorting out AST
set(OSBitness 32)
if(CMAKE_SIZEOF_VOID_P EQUAL 8)
    set(OSBitness 64)
endif()


# Define Output directories
set(FullOutputDir "${CMAKE_SOURCE_DIR}/bin/${CMAKE_SYSTEM_NAME}${OSBitness}/${CMAKE_BUILD_TYPE}")
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${FullOutputDir}/static libs")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${FullOutputDir}")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${FullOutputDir}")


set(SOURCE_CODE_DIR "${CMAKE_SOURCE_DIR}/src")
set(LIBRARIES_DIR "${CMAKE_SOURCE_DIR}/libs")
set(YORO_PARSER_DIR "${CMAKE_SOURCE_DIR}/tree-sitter-yoro/src")

message(STATUS "${YORO_PARSER_DIR}")


# Setup Treesitter library
add_subdirectory(${LIBRARIES_DIR})
# Ensure this is valid
# add_executable(parser 
#                 ")

# Setup LLVM - https://releases.llvm.org/18.1.8/docs/CMake.html#embedding-llvm-in-your-project
# find_package(LLVM REQUIRED CONFIG)
# if(LLVM_FOUND)
#     message(STATUS "Found install of LLVM ${LLVM_PACKAGE_VERSION} on the system")
# else()
#     message(STATUS "Did not find an install of LLVM on the system")
#     message(WARNING "LLVM install not found on the systemso compile of LLVM attempted"
#                     "ensure the command below is executed\n"
#                     "git submodule update --init --recursive"
#                     "\n")
#     set(LLVM_SRC_DIR "${LIBRARIES_DIR}/llvm-project-18.x/llvm")
#     include_directories("{LLVM_SRC_DIR}/include/llvm")
#     add_subdirectory(${LLVM_SRC_DIR})
# endif()

# include_directories(${LLVM_INCLUDE_DIRS})
# separate_arguments(LLVM_DEFINITIONS_LIST NATIVE_COMMAND ${LLVM_DEFINITIONS})
# add_definitions(${LLVM_DEFINITIONS_LIST})

# llvm_map_components_to_libnames(llvm_libs support core irreader)


# Build the yọrọ compiler
set(SOURCES 
    ${SOURCE_CODE_DIR}/main.cpp
    ${SOURCE_CODE_DIR}/AST.cpp
    )

add_executable(${PROJECT_NAME}
                "${SOURCES}"
                )
 
target_include_directories(${PROJECT_NAME}
                            PRIVATE
                            "${LIBRARIES_DIR}/treesitter/lib/include"
                            "${YORO_PARSER_DIR}"
                            )

target_link_libraries(${PROJECT_NAME}
                        tree-sitter
                        # ${llvm_libs}
                        )

target_compile_features(${PROJECT_NAME}
                        PRIVATE cxx_std_20)

# Link against LLVM libraries
# target_link_libraries(simple-tool ${llvm_libs})