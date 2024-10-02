// Include IO std libs
#include <exception>
#include <iostream>
#include <fstream>
#include <sstream>

// 
#include <string>
#include <map>

// Include project headers in src/include folder
#include "AST.hpp"
#include "IRGenerator.hpp"
#include "SemanticSearcher.hpp"
#include "IRExecutor.hpp"

// Main function
int main(int argv, char** args)
{
    // File Handling
    if (argv < 2) {
        std::cout << "Please pass in a valid file name and try again" << std::endl;
        return 1;
    }

    std::map<std::string, std::string> custom_functions = {{"name_main", "pataki"}, {"print","sọpe"}};

    std::string yoro_file = args[1];
    std::ifstream source_file(yoro_file);

    if (!source_file.is_open()) {
        std::cout << "File " << yoro_file << " cannot be opened" << std::endl;
        return 1;
    }
    
    // std::cout << "Reading the source code" << std::endl;
    std::stringstream source_stream;
    source_stream << source_file.rdbuf();
    std::string source_code = source_stream.str();

    // Build concrete syntax tree
    // std::string source_code = "'a' + 'ẹ';";

    std::cout << '\n' << source_code << '\n' << std::endl;

    try {

    // Create Pasrser, IRGenerator and IR executor objects
    // Return 1 if any of them fail
    #ifdef __wasm__
    TSInputEncoding file_encoding = TSInputEncodingUTF16;
    AST abstractSTree = AST(file_encoding, source_code);
    #else
    AST abstractSTree = AST(source_code);
    #endif

    // std::cout << abstractSTree << std::endl;

    // TODO: Do semantic checks using treesitter query
    SemanticSearcher semanticSearcher = SemanticSearcher(abstractSTree);


    // Generate IR
    IRGenerator irGenerator = IRGenerator(custom_functions, source_code);

    std::unique_ptr<llvm::Module> inMemoryIR = irGenerator.getIR(abstractSTree);
    inMemoryIR->print(llvm::outs(), nullptr); // Print IR

    
    // // Execute IR Module
    // auto executor = IRExecutor();
    // executor.initiateExecution(inMemoryIR);

    } catch (const std::exception& e) {
        std::cerr << e.what() << std::endl;
        return 1;
    }

    source_file.close();  // close file 
    return 0;
}
