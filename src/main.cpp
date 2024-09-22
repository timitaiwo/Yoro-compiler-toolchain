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

    std::cout << "Root node is named? " << ts_node_is_named(root_node) << std::endl;

    // Do LLVM Codegen first
    // Check no errors or missing
    // Do semantic checks using treesitter query

    // Do LLVM codegen

    // TODO: implement the operators and test each one
    // TODO: Generate the LLVM IR by iterating down to the 
    //       lowest node of the graph and climbing back up


    // source_file.close();  // close file 
    return 0;
}
