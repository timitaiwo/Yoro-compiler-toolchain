#include <iostream>
#include <fstream>
#include <string>

#include "AST.hpp"

int main(int argv, char** args)
{
    // File Handling
    // if (argv < 2){
    //     std::cout << "Please pass in a file name" << std::endl;
    //     return 1;
    // }

    // std::string yoro_file = args[1];
    // std::ifstream source_file(yoro_file);

    // if (!source_file.is_open()) {
    //     std::cout << "Error: File " << yoro_file << " cannot be opened" << std::endl;
    // }
    // std::string source_code = source_file.text()

    // Build concrete syntax tree
    std::string source_code = "'a' + 'ẹ';";
    
    AST syntax_tree = AST();
    syntax_tree.generate_tree(source_code);

    TSNode root_node = ts_tree_root_node(syntax_tree.get_tree());

    std::cout << "The root node is " << ts_node_string(root_node) << std::endl;

    
    // // Do semantic checks

    // // Do LLVM codegen


    // source_file.close();
    return 0;
}
