cmake_minimum_required(VERSION 3.30.1)
project(yoro)

set(OSBitness 32)
if(CMAKE_SIZEOF_VOID_P EQUAL 8)
    set(OSBitness 64)
endif()

# set(CMAKE_SOURCE_DIR src)
set(LIBS_DIR "${CMAKE_SOURCE_DIR}/libs")

set(FullOutputDir "${CMAKE_SOURCE_DIR}/bin/${CMAKE_SYSTEM_NAME}${OSBitness}/${CMAKE_BUILD_TYPE}")
set(SourceCodeDir "${CMAKE_SOURCE_DIR}/src")

set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${FullOutputDir}/static libs")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${FullOutputDir}")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${FullOutputDir}")


add_executable(${PROJECT_NAME} ${SourceCodeDir}/main.cpp)
