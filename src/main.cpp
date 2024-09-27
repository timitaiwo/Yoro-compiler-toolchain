// Include IO std libs
#include <iostream>
#include <fstream>
#include <sstream>


#include <string>

// Include project headers in src/include folder
#include "AST.hpp"
#include "IRGenerator.hpp"

// Main function
int main(int argv, char** args)
{
    // File Handling
    if (argv < 2){
        std::cout << "Please pass in a file name and try again" << std::endl;
        return 1;
    }

    std::string yoro_file = args[1];
    std::ifstream source_file(yoro_file);


    if (!source_file.is_open()) {
        std::cout << "File " << yoro_file << " cannot be opened" << std::endl;
        return 1;
    }

    // check file is UTF-16 for web environments
    // else it is assumed to be UTF-8

    // TSInputEncoding file_encoding = TSInputEncodingUTF16; //Only for the web

    // std::cout << "Reading the source code" << std::endl;
    std::stringstream source_stream;
    source_stream << source_file.rdbuf();
    std::string source_code = source_stream.str();

    // Build concrete syntax tree
    // std::string source_code = "'a' + 'ẹ';";

    // std::cout << '\n' << source_code << '\n' << std::endl;
    
    AST syntax_tree = AST();
    // AST syntax_tree = AST(file_encoding);  // Web environments
    syntax_tree.generate_tree(source_code);


    std::cout << syntax_tree.hasValidTree() << std::endl;
    std::cout << syntax_tree.printTree() << std::endl;
    std::cout << syntax_tree.isUTF8() << std::endl;
    

    // // Generate IR
    // std::string LLVM_IR = IRGenerator().getIR(syntax_tree);
    // std::cout << LLVM_IR << std::endl;

    // Do LLVM Codegen first
    // Check no errors or missing
    // Do semantic checks using treesitter query

    // Do LLVM codegen

    // TODO: implement the operators and test each one
    // TODO: Generate the LLVM IR by iterating down to the 
    //       lowest node of the graph and climbing back up

    // std::cout << "This one runs" << std::endl;

    source_file.close();  // close file 
    return 0;
}
