/** This class implements functionality of generating Intermediate Generation
sdfs
sdsf
 */

#ifndef _YORO_IR_GEN_
#define _YORO_IR_GEN_

#include <string>
#include <set>
#include <vector>
#include <map>
#include <functional>
#include "AST.hpp"

// Include LLVM stuffs
#include "llvm/IR/IRBuilder.h"
#include "llvm/IR/LLVMContext.h"
#include "llvm/IR/Module.h"


enum Integer {
    BINARY,
    OCTAL,
    HEXADECIMAL,
    DECIMAL
};

class IRGenerator
{
    public:
    // IRGenerator(void) : IRGenerator("pataki"){};
    IRGenerator(std::map<std::string, std::string> custom_functions, std::string);
    ~IRGenerator(void);

    std::unique_ptr<llvm::Module> getIR(AST& tree);
    // std::string getIR(AST& tree);


    private:
    std::unique_ptr<llvm::LLVMContext> LLVMContext;
    std::unique_ptr<llvm::Module> LLVMModule;
    std::unique_ptr<llvm::IRBuilder<>> LLVMIRBuilder;

    std::string innerSourceCode;
    std::string name_main;
    std::string print;
    std::set<std::string> functionsCannotDefine = {};
    std::set<std::string> functionsCannotCall = {};

    void recursiveGeneration(TSNode& startNode);

    // std::map<std::string, std::function<>> IRGenMap;
    std::set<std::string> functionNames {};
    std::vector<TSNode> missingNodes {};

    std::string getStringValue(TSNode& node);

    std::set<std::string> primitiveNodes = {
                                            "boolean_true",
                                            "boolean_false",
                                            "character_primitive",
                                            "string_primitive",
                                            "binary_integer",
                                            "octal_integer",
                                            "hexadecimal_integer",
                                            "decimal_integer",
                                            "floating_point_primitive",

                                        };

    std::set<std::string> arithmeticNodes = {
                                                "addition",
                                                "addition",
                                                "subtraction",
                                                "division",
                                                "multiplication",
                                                "modulus",
                                                "exponent"
                                            };

    std::set<std::string> comparisonNodes = {
                                                "equals",
                                                "not_equals",
                                                "greater_than",
                                                "greater_than_or_equals",
                                                "less_than",
                                                "less_than_or_equals",
                                            };
};

#endif
