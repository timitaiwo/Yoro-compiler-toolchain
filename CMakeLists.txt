cmake_minimum_required(VERSION 3.30.1)
# On windows NMake needs to be installed.
# It bundled with the Microsoft Visual Studio IDE
project(yoro)

# Integrate CMake and Google Test
# https://matgomes.com/integrate-google-test-into-cmake/

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

set(CMAKE_C_STANDARD 11)
set(CMAKE_C_STANDARD_REQUIRED ON)
set(CMAKE_C_EXTENSIONS ON)

# Define Output directories
set(FullOutputDir "${CMAKE_SOURCE_DIR}/bin/")
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${FullOutputDir}/static_libs")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${FullOutputDir}")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${FullOutputDir}")



enable_testing()
add_subdirectory(src)
add_subdirectory(tests)
