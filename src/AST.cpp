// #include <iostream>

#include "./AST.hpp"

// Include parser file
#include <parser.c>


AST::AST(TSInputEncoding file_encoding, std::string source_code) {

    // Instantiate Parse Object
    parser = ts_parser_new();
    bool languageSet = ts_parser_set_language(parser, tree_sitter_yoro());

    if (!languageSet){
        ts_parser_delete(parser);
        parser = nullptr;

        std::cout << "The tree-sitter CLI used to build this language defines a language version of " << LANGUAGE_VERSION;
        std::cout << ", the linked tree-sitter library works with language versions between " << TREE_SITTER_MIN_COMPATIBLE_LANGUAGE_VERSION << " and " << TREE_SITTER_LANGUAGE_VERSION << std::endl;

        // TODO: Throw error
    }

    // Generate tree
    TSTree* prospective_tree = ts_parser_parse_string(
                                        parser,
                                        nullptr,
                                        source_code.c_str(),
                                        source_code.length());
    
    // Error checking
    if (ts_node_has_error(ts_tree_root_node(prospective_tree))){
        // std::cout << "Tree Has Error!!!" << std::endl;
        ts_tree_delete(prospective_tree);
        ts_parser_delete(parser);
        throw std::invalid_argument("The program has an incorrect syntax. Check every line of code for syntax errors");
    }

    this->file_encoding = file_encoding;
    concrete_tree = prospective_tree;
    rootNode = ts_tree_root_node(concrete_tree);
    tree_ready = true;

}


AST::~AST(void)
{
    if (concrete_tree != nullptr) ts_tree_delete(concrete_tree);
    if (parser != nullptr) ts_parser_delete(parser);
}



bool AST::isUTF8() {
    return file_encoding == TSInputEncodingUTF8;
}

TSNode AST::getRoot(void) {
    return rootNode;
}



std::string AST::toString(TSNode node) const{
    if(!tree_ready) return "AST does not exist";

    char * nodeSExpressionChar = ts_node_string(node);

    std::string nodeSExpression = nodeSExpressionChar;

    free(nodeSExpressionChar);
    return nodeSExpression;
}

std::ostream& operator<<(std::ostream& os, const AST& ast) {
    return os << ast.toString(ast.rootNode);
}