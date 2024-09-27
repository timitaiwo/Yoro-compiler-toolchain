// #include <iostream>
#include "IRGenerator.hpp"

IRGenerator::IRGenerator(void) {
    LLVMContext = std::make_unique<llvm::LLVMContext>();
    LLVMModule = std::make_unique<llvm::Module>("Yoro Complier", *LLVMContext);
    LLVMIRBuilder = std::make_unique<llvm::IRBuilder<>>(*LLVMContext);
    std::cout << "IR instantiated" << std::endl;
};


IRGenerator::~IRGenerator(void){

};

std::unique_ptr<llvm::Module> IRGenerator::getIR(AST& tree) {
    // return "printed IR";
    // return LLVMModule->print(, nullptr);
    return std::move(LLVMModule);
}