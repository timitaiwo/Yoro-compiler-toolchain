// #include <iostream>
#include "IRGenerator.hpp"

IRGenerator::IRGenerator(void)
{
    LLVMContext = std::make_unique<llvm::LLVMContext>();
    LLVMModule = std::make_unique<llvm::Module>("Yoro Complier", *LLVMContext);
    LLVMIRBuilder = std::make_unique<llvm::IRBuilder<>>(*LLVMContext);
    std::cout << "IR instantiated\n" << std::endl;
};


IRGenerator::~IRGenerator(void)
{

};

// std::unique_ptr<llvm::Module> IRGenerator::getIR(AST& tree)
std::string IRGenerator::getIR(AST& tree)
{ 
    std::cout << tree << std::endl;
    // Throw error if main is not found
    TSNode astRoot = tree.getRoot();

    std::cout << ts_node_child_count(astRoot);
    return "";
}