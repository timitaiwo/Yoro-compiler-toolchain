# This CMake File controls tests

include(FetchContent)
FetchContent_Declare(
            googletest
            GIT_REPOSITORY https://github.com/google/googletest.git
            GIT_TAG        release-1.15.2
            )
FetchContent_MakeAvailable(googletest)

add_executable(hello-world initial_google_test.cpp)

target_link_directories(
                hello-world
                PRIVATE
                GTest::GTest

                # Other relevant CMake Targets
) 

add_test(gtest_tests
            hello-world)