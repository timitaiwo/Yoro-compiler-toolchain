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
#include <tuple>
#include "AST.hpp"

// Include LLVM stuffs
#include "llvm/IR/IRBuilder.h"
#include "llvm/IR/LLVMContext.h"
#include "llvm/IR/Module.h"
#include "llvm/IR/Verifier.h"

#include "llvm/IR/Function.h"
#include "llvm/IR/Value.h"
#include "llvm/IR/Type.h"

using VariableInfo = std::tuple<std::string, llvm::Value*>;
using variableList = std::map<std::string, VariableInfo >;


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

    std::string getIR(AST& tree);


    private:
    std::unique_ptr<llvm::LLVMContext> LLVMContext;
    std::unique_ptr<llvm::Module> LLVMModule;
    std::unique_ptr<llvm::IRBuilder<>> LLVMIRBuilder;

    std::string innerSourceCode;
    std::string name_main;
    std::string print;
    std::set<std::string> functionsCannotDefine = {};
    std::set<std::string> functionsCannotCall = {};

    std::set<std::string> functionNames {};
    variableList functionVariables {};
    variableList globalVariables {};
    bool inFunction = false;

    std::vector<TSNode> missingNodes {};
    int numEmptyCodeblocks = 0;


    std::string getNodeStringValue(TSNode& node);

    // IRGen
    llvm::Value* recursiveGeneration(TSNode& startNode, AST& tree, bool isRoot=false);
    llvm::Value* createPrimitive(TSNode primitiveNode);
    llvm::Value* doAssignment(TSNode assignmentNode, AST& tree);
    void createFunction(TSNode& functionNode, AST& tree);
    // llvm::Function* createPrintFunction();
    // llvm::Function* createCodeblock(TSNode& blockNode, std::string blockName, llvm::Function* function);
    llvm::Value* createFunctionCall(TSNode& callNode);

    // Node cross-checks

    std::set<std::string> data_types = {
                                "int_primitive_keyword",
                                "f32_primitive_keyword",
                                "f64_primitive_keyword",
                                "bool_primitive_keyword", 
                                "char_primitive_keyword",
                                "str_primitive_keyword" 
                            };

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
