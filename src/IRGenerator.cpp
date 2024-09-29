#include "IRGenerator.hpp"

IRGenerator::IRGenerator(std::map<std::string, std::string> custom_functions, std::string source_code)
{
    // Check if name_main and print are in custom_functions else throw 
    // exception
    if (custom_functions.count("print") != 1 && custom_functions.count("name_main")) 
        throw std::invalid_argument("The custom_functions variable needs to define a name for the print and main functions respectively");

    LLVMContext = std::make_unique<llvm::LLVMContext>();
    LLVMModule = std::make_unique<llvm::Module>("Yoro Complier", *LLVMContext);
    LLVMIRBuilder = std::make_unique<llvm::IRBuilder<>>(*LLVMContext);

    name_main = custom_functions["name_main"];
    print = custom_functions["print"];
    
    innerSourceCode = source_code;

    functionsCannotDefine  = {"main", "put"};
    functionsCannotDefine.insert(custom_functions["print"]);

    functionsCannotCall  = {"main", "put"};
    functionsCannotCall.insert(custom_functions["name_main"]);

    std::cout << "IR instantiated\n" << std::endl;
};


IRGenerator::~IRGenerator(void)
{

};

std::unique_ptr<llvm::Module> IRGenerator::getIR(AST& tree)
// std::string IRGenerator::getIR(AST& tree)
{ 
    std::cout << "The tree's S-Expression is " << tree << std::endl;

    TSNode astRoot = tree.getRoot();
    recursiveGeneration(astRoot);

    // if missingNodes is not empty, process and print error
    // if functionNames not have main, throw error 
    for (auto valu: functionNames) std::cout << valu << std::endl;

    if (functionNames.count("main") == 0) {
        std::string errorMsg = "Please note this script has not been declared with a '" + name_main + "' function. Please define this as it is where the program starts from";
        throw std::invalid_argument(errorMsg);
    }
    
    return std::move(LLVMModule);
    // return "";
}

void IRGenerator::recursiveGeneration(TSNode& startNode) {
    size_t childrenCount = ts_node_named_child_count(startNode);

    for (int i {}; i < childrenCount; ++i){
        TSNode childNode = ts_node_named_child(startNode, i);

        std::string nodeType = ts_node_type(childNode);

        bool isPrimitive = (bool)primitiveNodes.count(nodeType);

        if (isPrimitive) {
            std::cout << "Primitive gotten: ";
            std::cout << getStringValue(childNode) << std::endl;
        } 

        if (nodeType == "function_declaration") {
            std::string functionNameFieldName = "function_name";
            TSNode functionNameNode = ts_node_child_by_field_name(childNode, functionNameFieldName.c_str(), functionNameFieldName.length());
            std:: string functionName = getStringValue(functionNameNode);

            if (functionsCannotDefine.count(functionName) > 0) {
                std::string errorMsg = "Please note that function '" + functionName + "' is used internally. Please rename your function";
                throw std::invalid_argument(errorMsg);
            }

            functionName = functionName == name_main ? "main" : functionName;

            if (functionNames.count(functionName) > 0) {
                std::string errorMsg = "Please note that functions can only be defined once '" + functionName + "' has been defined more than once. Please rename.";
                throw std::invalid_argument(errorMsg);
            }

            functionNames.insert(functionName);

            std::cout << "Function " << functionName << " declared" << std::endl;

            // if main proceed as normal

            // Create function object
            std::cout << functionName << std::endl;
            
        }

        if (nodeType == "function_call") {
            std::string functionNameFieldName = "function_name";
            TSNode functionNameNode = ts_node_child_by_field_name(childNode, functionNameFieldName.c_str(), functionNameFieldName.length());
            std:: string functionName = getStringValue(functionNameNode);

            if (functionsCannotCall.count(functionName) > 0) {
                std::string errorMsg = "Please note that function '" + functionName + "' cannot be called due to internal useage. Please select the right function";
                throw std::invalid_argument(errorMsg);
            }

            functionName = functionName == print ? "put" : functionName;

            if (functionNames.count(functionName) == 0) {
                std::string errorMsg = "Please note that the function '" + functionName + "' has not been defined. Please define.";
                throw std::invalid_argument(errorMsg);
            }


            std::cout << "Function " << functionName << " called" << std::endl;

            // if main proceed as normal
            // if put // call external function

            // Create function object
            std::cout << functionName << std::endl;

        }

        if (nodeType == "codeblock") {
            std::cout << "Codeblock started: " << std::endl;

        }

        if (nodeType == "identifier") {
            std::string identifier = getStringValue(childNode);
        } 
        

        std::cout << nodeType << std::endl;
        

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
        // if nodeType is for_loop implements skip

        


        // std::cout << ts_node_is_null(childNode) << std::endl;
        // std::cout << ts_node_is_named(childNode) << std::endl;
        // std::cout << ts_node_is_missing(childNode) << std::endl;
        // std::cout << ts_node_is_extra(childNode) << std::endl; 
        // std::cout << ts_node_has_error(childNode) << std::endl; 
        // std::cout << ts_node_is_error(childNode) << std::endl; 
    }
}

std::string IRGenerator::getStringValue(TSNode& node) {

    uint32_t startByte = ts_node_start_byte(node);
    uint32_t endByte = ts_node_end_byte(node);
    
    return innerSourceCode.substr(startByte, endByte-startByte);
}


