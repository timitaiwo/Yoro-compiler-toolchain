// Include IO std libs
#include <iostream>
#include <fstream>
#include <sstream>

// 
#include <string>

// Include project headers in src/include folder
#include "AST.hpp"
#include "IRGenerator.hpp"
#include "IRExecutor.hpp"

// Main function
int main(int argv, char** args)
{
    // // File Handling
    // if (argv < 2){
    //     std::cout << "Please pass in a file name and try again" << std::endl;
    //     return 1;
    // }

    // std::string yoro_file = args[1];
    // std::ifstream source_file(yoro_file);


    // if (!source_file.is_open()) {
    //     std::cout << "File " << yoro_file << " cannot be opened" << std::endl;
    //     return 1;
    // }

    // Create Pasrser, IRGenerator and IR executor objects
    // Throw error if any of them fail
    #ifdef __wasm__
    TSInputEncoding file_encoding = TSInputEncodingUTF16;
    AST syntax_tree = AST(file_encoding);
    #else
    AST syntax_tree = AST();
    #endif

    IRGenerator irGenerator = IRGenerator();
    auto executor = IRExecutor();
    
    // // std::cout << "Reading the source code" << std::endl;
    // std::stringstream source_stream;
    // source_stream << source_file.rdbuf();
    // std::string source_code = source_stream.str();

    // Build concrete syntax tree
    std::string source_code = "'a' + 'ẹ';";

    // std::cout << '\n' << source_code << '\n' << std::endl;
    
    syntax_tree.generate_tree(source_code);

    // TODO: Do semantic checks using treesitter query


    // Generate IR
    std::unique_ptr<llvm::Module> inMemoryIR = irGenerator.getIR(syntax_tree);
    inMemoryIR->print(llvm::outs(), nullptr); // Print IR

    // Execute IR Module
    executor.initiateExecution(inMemoryIR);

    // source_file.close();  // close file 
    return 0;
}
