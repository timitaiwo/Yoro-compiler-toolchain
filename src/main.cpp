#include <iostream>
#include <string>
#include <tree_sitter/api.h>

// Include parser header and header
#include <tree_sitter/parser.h>
#include <parser.c>

int main()
{

    // Instantiate the yoro parser
    TSParser *parser = ts_parser_new();

    // Set the parser's language
    ts_parser_set_language(parser, tree_sitter_yoro());

    // Build concrete syntax tree
    std::string sample_yoro = "'a' + 'ẹ'";
    // Use actual file text instead
    // experiement with both C++ and C styles of file interaction

    TSTree *concrete_syntax_tree = ts_parser_parse_string(
                                        parser,
                                        nullptr,
                                        sample_yoro.c_str(),
                                        sample_yoro.length());

    TSNode root_node = ts_tree_root_node(concrete_syntax_tree);

    std::cout << "The root node is " << ts_node_string(root_node) << std::endl;

    
    // // Do semantic checks

    // // Do LLVM codegen

    // std::cout << sample_yoro << std::endl;
}
