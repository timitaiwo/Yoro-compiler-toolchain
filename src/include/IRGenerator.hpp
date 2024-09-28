/** This class implements functionality of generating Intermediate Generation
sdfs
sdsf
 */

#ifndef _YORO_IR_GEN_
#define _YORO_IR_GEN_

#include <string>
#include "AST.hpp"

// Include LLVM stuffs
#include "llvm/IR/IRBuilder.h"
#include "llvm/IR/LLVMContext.h"
#include "llvm/IR/Module.h"

class IRGenerator
{
    private:
    std::unique_ptr<llvm::LLVMContext> LLVMContext;
    std::unique_ptr<llvm::Module> LLVMModule;
    std::unique_ptr<llvm::IRBuilder<>> LLVMIRBuilder;

    public:
    IRGenerator(void);
    ~IRGenerator(void);

    // std::unique_ptr<llvm::Module> getIR(AST& tree);
    std::string getIR(AST& tree);
};

#endif
