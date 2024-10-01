# This CMake File controls tests

include(CTest)
add_test(NAME TestPrint
        COMMAND "${CMAKE_RUNTIME_OUTPUT_DIRECTORY}/${PROJECT_NAME}" "${CMAKE_SOURCE_DIR}/tests/01_print.yoro"
)

add_test(NAME TestVariableDeclaration
        COMMAND "${CMAKE_RUNTIME_OUTPUT_DIRECTORY}/${PROJECT_NAME}" "${CMAKE_SOURCE_DIR}/tests/02_var_decl.yoro"
)

add_test(NAME TestArithmeticOperators
        COMMAND "${CMAKE_RUNTIME_OUTPUT_DIRECTORY}/${PROJECT_NAME}" "${CMAKE_SOURCE_DIR}/tests/03_arithmetic_operators.yoro"
)

add_test(NAME TestComparisonOperators
        COMMAND "${CMAKE_RUNTIME_OUTPUT_DIRECTORY}/${PROJECT_NAME}" "${CMAKE_SOURCE_DIR}/tests/04_comparison_operators.yoro"
)

add_test(NAME TestConditionalStatements
        COMMAND "${CMAKE_RUNTIME_OUTPUT_DIRECTORY}/${PROJECT_NAME}" "${CMAKE_SOURCE_DIR}/tests/05_conditonal_statements.yoro"
)

add_test(NAME TestForLoops
        COMMAND "${CMAKE_RUNTIME_OUTPUT_DIRECTORY}/${PROJECT_NAME}" "${CMAKE_SOURCE_DIR}/tests/06_loops_statements.yoro"
)

add_test(NAME TestFunctionCalls
        COMMAND "${CMAKE_RUNTIME_OUTPUT_DIRECTORY}/${PROJECT_NAME}" "${CMAKE_SOURCE_DIR}/tests/07_function_call.yoro"
)

add_test(NAME TestRandomCode
        COMMAND "${CMAKE_RUNTIME_OUTPUT_DIRECTORY}/${PROJECT_NAME}" "${CMAKE_SOURCE_DIR}/tests/08_random_code.yoro"
)