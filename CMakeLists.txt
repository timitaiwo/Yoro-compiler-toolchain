cmake_minimum_required(VERSION 3.30.1)
# On windows NMake needs to be installed.
# It bundled with the Microsoft Visual Studio IDE
project(yoro)

# Integrate CMake and Google Test
# https://matgomes.com/integrate-google-test-into-cmake/

set(CXX_STANDARD 17)
set(CXX_STANDARD_REQUIRED ON)
set(CXX_STANDARD_EXTENSIONS ON)

set(C_STANDARD 11)
set(C_STANDARD_REQUIRED ON)
set(C_STANDARD_EXTENSIONS ON)

set(OSBitness 32)
if(CMAKE_SIZEOF_VOID_P EQUAL 8)
    set(OSBitness 64)
endif()

# Define Output directories
set(FullOutputDir "${CMAKE_SOURCE_DIR}/bin/${CMAKE_SYSTEM_NAME}${OSBitness}/${CMAKE_BUILD_TYPE}")
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${FullOutputDir}/static libs")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${FullOutputDir}")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${FullOutputDir}")



enable_testing()
add_subdirectory(src)
add_subdirectory(tests)
