#ifndef _YORO_IR_EXEC_
#define _YORO_IR_EXEC_

// #include <string>
// #include "AST.hpp"
#include "llvm/IR/Module.h"

// Include LLVM stuffs
#include "llvm/ExecutionEngine/Orc/LLJIT.h"
// #include "llvm/ExecutionEngine/Orc/Core.h"


class IRExecutor
{
    private:
    
    std::unique_ptr<llvm::orc::LLJIT> jit;


    public:
    IRExecutor(void);
    ~IRExecutor(void);

    bool initiateExecution(std::unique_ptr<llvm::Module> LLVMModule);
};

#endif
