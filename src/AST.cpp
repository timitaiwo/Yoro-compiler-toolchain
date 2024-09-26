// #include <iostream>

#include "./AST.hpp"

// Include parser file
#include <parser.c>


AST::AST(void)
{
    parser = ts_parser_new();
    bool languageSet = ts_parser_set_language(parser, tree_sitter_yoro());

    if (!languageSet){
        ts_parser_delete(parser);
        parser = nullptr;

        std::cout << "The tree-sitter CLI used to build this language defines a language version of " << LANGUAGE_VERSION;
        std::cout << ", the linked tree-sitter library works with language versions between " << TREE_SITTER_MIN_COMPATIBLE_LANGUAGE_VERSION << " and " << TREE_SITTER_LANGUAGE_VERSION << std::endl;

        // TODO: Throw error
    };
}


AST::~AST(void)
{
    if (concrete_tree != nullptr) ts_tree_delete(concrete_tree);
    if (parser != nullptr) ts_parser_delete(parser);
}


bool AST::generate_tree(std::string source_code)
{
    TSTree* prospective_tree = ts_parser_parse_string(
                                        parser,
                                        nullptr,
                                        source_code.c_str(),
                                        source_code.length());
    // TODO: Implement error checking
    // if (hasMissing(prospective_tree) || hasError(prospective_tree) ) {
    //     ts_tree_delete(prospective_tree);
    //     return false;
    // }

    concrete_tree = prospective_tree;
    tree_ready = true;
    return tree_ready;
}

// TODO: Implement hasMissing and hasError
bool hasMissing(TSTree* prospective_tree) {


    return false;
}

bool hasError(TSTree* prospective_tree) {

    return false;
}

bool AST::hasValidTree(void) {
    return tree_ready;
}

