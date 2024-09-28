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

    this->file_encoding = file_encoding;

    // Generate tree
    TSTree* prospective_tree = ts_parser_parse_string(
                                        parser,
                                        nullptr,
                                        source_code.c_str(),
                                        source_code.length());
    // TODO: Implement error checking
    // if (hasMissing(prospective_tree) || hasError(prospective_tree) ) {
    //     ts_tree_delete(prospective_tree);
    //     ts_parser_delete(parser);
    //     Throw error for missing
    // }

    concrete_tree = prospective_tree;
    rootNode = ts_tree_root_node(concrete_tree);
    tree_ready = true;

}


AST::~AST(void)
{
    if (concrete_tree != nullptr) ts_tree_delete(concrete_tree);
    if (parser != nullptr) ts_parser_delete(parser);
}


// TODO: Implement hasMissing and hasError
bool AST::hasMissing(TSTree* prospective_tree) {


    return false;
}

bool AST::hasError(TSTree* prospective_tree) {

    return false;
}



bool AST::isUTF8() {
    return file_encoding == TSInputEncodingUTF8;
}

TSNode AST::getRoot(void) {
    return rootNode;
}



// std::string AST::toString() const {
//     if(!tree_ready) return "AST does not exist";

//     char * nodeSExpressionChar = ts_node_string(rootNode);

//     std::string nodeSExpression = nodeSExpressionChar;

//     free(nodeSExpressionChar);
//     return nodeSExpression;
// }

std::string AST::toString(TSNode node) const{
    if(!tree_ready) return "AST does not exist";

    char * nodeSExpressionChar = ts_node_string(rootNode);

    std::string nodeSExpression = nodeSExpressionChar;

    free(nodeSExpressionChar);
    return nodeSExpression;
}

std::ostream& operator<<(std::ostream& os, const AST& ast) {
    return os << ast.toString(ast.rootNode);
}