/**
 * This provides a wrapper class around the treesitter library
 *
 */

#ifndef _YORO_AST_
#define _YORO_AST_

#include <string>
#include <iostream>

#include <tree_sitter/api.h>
// Include parser header
#include <tree_sitter/parser.h>


class AST
{
private:
    TSParser *parser = nullptr;
    TSTree* concrete_tree = nullptr;
    TSNode rootNode;
    bool tree_ready = false;
    TSInputEncoding file_encoding;

public:
    AST(TSInputEncoding file_encoding);
    AST(void) : AST(TSInputEncodingUTF8) {};
    ~AST(void);
    
    bool generate_tree(std::string source_code);
    bool hasValidTree(void);
    std::string printTree(void);
    std::string printNode(TSNode& node);
    bool isUTF8();
};

#endif