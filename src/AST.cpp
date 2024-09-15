#include <iostream>

#include "./AST.hpp"

// Include parser file
#include <parser.c>

AST::AST(void)
{
    parser = ts_parser_new();
    ts_parser_set_language(parser, tree_sitter_yoro());
}


AST::~AST(void)
{
    if (concrete_tree != nullptr) ts_tree_delete(concrete_tree);
    if (parser != nullptr) ts_parser_delete(parser);
}


void AST::generate_tree(std::string source_code)
{
    concrete_tree = ts_parser_parse_string(
                                        parser,
                                        nullptr,
                                        source_code.c_str(),
                                        source_code.length());
}

TSTree *AST::get_tree(void)
{
    return concrete_tree;
}
