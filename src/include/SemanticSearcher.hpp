#ifndef _YORO_SEMANTIC_SEARCH_
#define _YORO_SEMANTIC_SEARCH_

#include "AST.hpp"
// #include "tree_sitter/api.h"

class SemanticSearcher {

    public:
    SemanticSearcher(AST& searchTree);
    ~SemanticSearcher();
    bool validateTree();

    private:
    const TSLanguage* treeLanguage;
    std::string treeSExpression;

    

};


#endif