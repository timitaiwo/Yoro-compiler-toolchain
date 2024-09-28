// #include <iostream>
#include "IRGenerator.hpp"

IRGenerator::IRGenerator(std::string name_main)
{
    LLVMContext = std::make_unique<llvm::LLVMContext>();
    LLVMModule = std::make_unique<llvm::Module>("Yoro Complier", *LLVMContext);
    LLVMIRBuilder = std::make_unique<llvm::IRBuilder<>>(*LLVMContext);
    name_main = name_main;
    std::cout << "IR instantiated\n" << std::endl;
};


IRGenerator::~IRGenerator(void)
{

};

// std::unique_ptr<llvm::Module> IRGenerator::getIR(AST& tree)
std::string IRGenerator::getIR(AST& tree)
{ 
    std::cout << "The tree's S-Expression is " << tree << std::endl;

    TSNode astRoot = tree.getRoot();
    recursiveGeneration(astRoot);

    // if missingNodes is not empty, process and print error
    // if functionNames not have main, throw error 
    
    return "";
}

void IRGenerator::recursiveGeneration(TSNode startNode) {
    size_t childrenCount = ts_node_named_child_count(startNode);

    for (int i {}; i < childrenCount; ++i){
        TSNode childNode = ts_node_named_child(startNode, i);

        std::string nodeType = ts_node_type(childNode);

        // if nodeType is missing add to missing Nodes vector 

        // if (nodeType == "string_primitive") throw std::invalid_argument("This compiler does not yet support strings")

        // if (nodeType in primitiveNodes) generatePrimitive
        // if (nodeType is function_call) check if function_name is name_main then throw error check functionNames vector and throw error if not found

        

        // if (nodeType is identifier) check and substitute the instructions  else error

        // if (nodeType is arithmetic) 
        // if (nodeType is comparison)

        // if (nodeType is codeblock)  iterate the codeblock if it is not empty else skip 

        // if (nodeType is assignment_statement) check process assignment or reassignment 

        // if (nodeType is function_declaration) checkif function_name is name_main and add it to function names as main else generate the function

        // if nodeType is if_statement implements skip
        // if nodeType is while_loop implements skip

        


        std::cout << nodeType << std::endl;
        // std::cout << << std::endl;
        // std::cout << ts_node_start_byte(childNode) << std::endl;
        // std::cout << ts_node_end_byte(childNode) << std::endl;
        // std::cout << << std::endl;
        // std::cout << << std::endl;
        // std::cout << tree.toString(childNode) << std::endl;
        // std::cout << ts_node_is_null(childNode) << std::endl;
        // std::cout << ts_node_is_named(childNode) << std::endl;
        // std::cout << ts_node_is_missing(childNode) << std::endl;
        // std::cout << ts_node_is_extra(childNode) << std::endl; 
        // std::cout << ts_node_has_error(childNode) << std::endl; 
        // std::cout << ts_node_is_error(childNode) << std::endl; 


    }
}