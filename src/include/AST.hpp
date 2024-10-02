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
    AST(TSInputEncoding file_encoding, std::string source_code);
    AST(std::string source_code) : AST(TSInputEncodingUTF8, source_code) {};
    ~AST(void);
    
    // 
    bool generate_tree(std::string source_code);
    bool isUTF8();
    TSNode getRoot(void);

    // String casting
    std::string toString(TSNode node) const;
    friend std::ostream& operator<<(std::ostream& os, const AST& ast);

    // 
    const TSLanguage* getLanguage();
};

#endif