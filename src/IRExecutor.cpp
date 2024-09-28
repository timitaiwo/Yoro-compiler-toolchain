#include <iostream>
#include "IRExecutor.hpp"

IRExecutor::IRExecutor() {
    // llvm::orc::LLJITBuilder jitBuilder;

    // auto possible_jit = jitBuilder.create();
    // if (!bool(possible_jit)) {
    //     // Handle errors
    //     // Throw error
    // }

    // std::unique_ptr<llvm::orc::LLJIT>& anjit = possible_jit.get(); 

    // // jit = possible_jit.get();
};


IRExecutor::~IRExecutor(void){

};

bool IRExecutor::initiateExecution(std::unique_ptr<llvm::Module>& LLVMModule) {

    // auto moduleManager = jit->addModule(std::move(LLVMModule));
    // if (!moduleManager) {
    //     // throw error
    // }

    // auto mainFunction = moduleHandle->getModule()->getFunction("main");
    // if (!mainFunction) {
    //     // Handle errors
    // }

    // auto result = jit->runFunction(mainFunction, {});
    // if (result.hasValue()) {
    //     // Handle success
    // } else {
    //     // Handle errors
    // }

    std::cout << "\ncode executed" << std::endl;
    return true;
}