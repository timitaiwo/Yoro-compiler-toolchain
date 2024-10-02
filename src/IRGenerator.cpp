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
    std::cout << "The tree's S-Expression is " << tree << std::endl << std::endl;

    TSNode astRoot = tree.getRoot();
    llvm::Value* recursedOutput = recursiveGeneration(astRoot, tree, true);

    // if missingNodes is not empty, process and print error
    // for (auto val: functionNames) std::cout << val << std::endl;

    if (functionNames.count("main") == 0) {
        std::string errorMsg = "Please note this script has not been declared with a '" + name_main + "' function. Please define this as it is where the program starts from";
        throw std::invalid_argument(errorMsg);
    }
    
    return std::move(LLVMModule);
    // return "";
}

llvm::Value* IRGenerator::recursiveGeneration(TSNode& startNode, AST& tree, bool isRoot) {
    // if (nodeType == "string_primitive") throw std::invalid_argument("This compiler does not yet support strings")

    // if nodeType is missing add to missing Nodes vector 

    size_t childrenCount = ts_node_named_child_count(startNode);

    std::cout << "is root " << isRoot << std::endl;

    for (int i {}; i < childrenCount; ++i){
        TSNode childNode = ts_node_named_child(startNode, i);

        std::string nodeType = ts_node_type(childNode);

        bool isPrimitive = (bool)primitiveNodes.count(nodeType);

        if (isPrimitive) {
            if (isRoot) return nullptr;
            return createPrimitive(childNode);
        }

        if (nodeType == "assignment_statement") {
            doAssignment(childNode, tree);        
        }

        if (nodeType == "function_declaration") {
            // createFunction(childNode, tree);
        }

        if (nodeType == "function_call") {
            // createFunctionCall(childNode);
        }

        if (nodeType == "codeblock") {
            std::cout << "Codeblock started: " << std::endl;

        }
        
        if (nodeType == "arithmetic") {
            std::string errorMsg = "Operation " + nodeType + " is currently not supported";
            throw std::invalid_argument(errorMsg);
        }

        if (nodeType == "comparison") {
            std::string errorMsg = "Operation " + nodeType + " is currently not supported";
            throw std::invalid_argument(errorMsg);
        }

        if (nodeType == "if_statement") {
            std::string errorMsg = "Operation " + nodeType + " is currently not supported";
            throw std::invalid_argument(errorMsg);
        }

        if (nodeType == "while_loop") {
            std::string errorMsg = "Operation " + nodeType + " is currently not supported";
            throw std::invalid_argument(errorMsg);
        }

        if (nodeType == "for_loop") {
            std::string errorMsg = "Operation " + nodeType + " is currently not supported";
            throw std::invalid_argument(errorMsg);
        }
        
    }
    return nullptr;
}

std::string IRGenerator::getNodeStringValue(TSNode& node) {

    uint32_t startByte = ts_node_start_byte(node);
    uint32_t endByte = ts_node_end_byte(node);
    
    return innerSourceCode.substr(startByte, endByte-startByte);
}

llvm::Value* IRGenerator::createPrimitive(TSNode primitiveNode){
    

    std::string nodeType = std::string(ts_node_type(primitiveNode));
    std::string nodeStringValue = getNodeStringValue(primitiveNode);

    std::cout << "Created value " << nodeStringValue << " of type " << nodeType << std:: endl;
    

    return nullptr;
}

llvm::Value* IRGenerator::doAssignment(TSNode topAssignmentNode, AST& tree){

    TSNode assignmentNode = ts_node_named_child(topAssignmentNode, 0); // First layer
            std::string assignmentType = std::string(ts_node_type(assignmentNode));

            std::string variableName;
            std::string variableType;

            if (assignmentType == "variable_initialization") {
                TSNode initializationNode = ts_node_named_child(assignmentNode, 0);

                TSNode identifierNode = ts_node_named_child(initializationNode, 0);

                TSNode variableTypeNode = ts_node_named_child(initializationNode, 1);

                variableName = getNodeStringValue(identifierNode);

                variableType = std::string(ts_node_type(variableTypeNode));
            }

            else if (assignmentType == "variable_reassignment") {
                // TODO: for now assume that reassignment is correct
                // VariableInfo
                TSNode variableNameNode = ts_node_named_child(assignmentNode, 0);

                variableName = getNodeStringValue(variableNameNode);

                if (inFunction && functionVariables.count(variableName) == 1) {
                    VariableInfo variableInfo = functionVariables[variableName];
                    variableType = std::get<0>(variableInfo);
                }
                else if (!inFunction && globalVariables.count(variableName) == 1) {
                    VariableInfo variableInfo = functionVariables[variableName];
                    variableType = std::get<0>(variableInfo);
                }
                else if (inFunction) {
                    std::string errorMsg = "variable "+ variableName + " not declared anywhere";
                    throw std::invalid_argument(errorMsg);
                }
                else {
                    std::string errorMsg = "variable "+ variableName + " not declared anywhere";
                    throw std::invalid_argument(errorMsg);
                }
            }

            std::string assignedExpressionName = "assigned_expression";
            TSNode assignedExpressionNode = ts_node_child_by_field_name(assignmentNode, assignedExpressionName.c_str(), assignedExpressionName.length());

            llvm::Value* assignedExpression = recursiveGeneration(assignedExpressionNode, tree);

            // Should ideally clean up the LLVM Value*
            if (inFunction) {
                functionVariables[variableName] = std::make_tuple(variableType, assignedExpression);
            } else {
                globalVariables[variableName] = std::make_tuple(variableType, assignedExpression);
            }

            std::cout << variableName << ',' << variableType << std::endl;

    return nullptr;
}


void IRGenerator::createFunction(TSNode& functionNode, AST& tree) {

    // Setup function name
    inFunction = true;
    std::string functionNameFieldName = "function_name";
    TSNode functionNameNode = ts_node_child_by_field_name(functionNode, functionNameFieldName.c_str(), functionNameFieldName.length());
    std:: string functionName = getNodeStringValue(functionNameNode);

    if (functionsCannotDefine.count(functionName) > 0) {
        std::string errorMsg = "Please note that function '" + functionName + "' is used internally. Please rename your function";
        throw std::invalid_argument(errorMsg);
    }

    functionName = functionName == name_main ? "main" : functionName;

    // Check if function is already declared
    if (functionNames.count(functionName) > 0) {
        std::string errorMsg = "Please note that functions can only be defined once '" + functionName + "' has been defined more than once. Please rename.";
        throw std::invalid_argument(errorMsg);
    }

    // Create Function object
    functionNames.insert(functionName);
    int numChildren = ts_node_named_child_count(functionNode);
    std::vector<TSNode> parameterNodes = {};
    // std::vector<llvm::Type*> parameter_type ;
    std::vector<TSNode> returnTypeNode = {};

    for (int i = 1; i < numChildren; ++i) {
        TSNode childNode = ts_node_named_child(functionNode, i);

        if (std::string(ts_node_type(childNode)) == "parameter_declaration") {
            parameterNodes.push_back(childNode);
            continue;
        }

        if (std::string(ts_node_type(childNode)) == "codeblock") {
            break;
        }

        // Only return node pass the above filters currently
        returnTypeNode.push_back(childNode);
    }


    TSNode functionCodeblock = ts_node_named_child(functionNode, numChildren-1);
   

    // Check for return type
    // If name is main, return type is int automatically

    // createCodeblock(functionCodeblock, "entry", functionObject);

    std::cout << "Function " << functionName << " declared\n" << std::endl;
    
    inFunction = false;
}

// llvm::Function* IRGenerator::createPrintFunction() {

// }

// llvm::Function* IRGenerator::createCodeblock(TSNode& blockNode, std::string blockName = "", llvm::Function* function = nullptr) {
//     int numChildren = ts_node_named_child_count(blockNode);

//     if (numChildren == 0) {
//         return nullptr;
//     }

//     if (blockName == "") {
//         blockName = "empty" + std::to_string(numEmptyCodeblocks);
//         numEmptyCodeblocks += 1 ;
//     }

//     if (function != nullptr) {
//         llvm::BasicBlock *BB = llvm::BasicBlock::Create(*LLVMContext, "entry",function);

//         LLVMIRBuilder->SetInsertPoint(BB);
//     }
// }

// llvm::Value* IRGenerator::createFunctionCall(TSNode& callNode){
//     std::string functionNameFieldName = "function_name";
//     TSNode functionNameNode = ts_node_child_by_field_name(callNode, functionNameFieldName.c_str(), functionNameFieldName.length());
//     std:: string functionName = getNodeStringValue(functionNameNode);

//     if (functionsCannotCall.count(functionName) > 0) {
//         std::string errorMsg = "Please note that function '" + functionName + "' cannot be called due to internal useage. Please select the right function";
//         throw std::invalid_argument(errorMsg);
//     }

//     functionName = functionName == print ? "put" : functionName;

//     if (functionNames.count(functionName) == 0) {
//         std::string errorMsg = "Please note that the function '" + functionName + "' has not been defined. Please define.";
//         throw std::invalid_argument(errorMsg);
//     }

//     if (functionName == "put") {
//         //call external function
//         // reuturn nothing
//     }

//     llvm::Function* calleFunction = LLVMModule->getFunction(functionName);

//     // if (!calleFunction->arg_size() == ) {
//     //     std::string errorMsg = "The function call " + functionName + " does not match the number of parameters declard";
//     //     std::invalid_argument(errorMsg);
//     // }
    
//     std::vector<llvm::Value*> functionArguements;
//     for(size_t i = 0; i<calleFunction->arg_size(); ++i) {

//     }


//     std::cout << "Function " << functionName << " called" << std::endl;

//     // if main proceed as normal
//     // if functionName = put  call external function

//     // Create function object
//     std::cout << functionName << std::endl;
//     return nullptr;
// }