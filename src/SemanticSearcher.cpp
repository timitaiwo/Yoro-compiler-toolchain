#include "SemanticSearcher.hpp"
#include "tree_sitter/api.h"

SemanticSearcher::SemanticSearcher(AST& searchTree) {
    treeSExpression = searchTree.toString(searchTree.getRoot());
    treeLanguage = searchTree.getLanguage();

}

SemanticSearcher::~SemanticSearcher() {

}

bool SemanticSearcher::validateTree() {
    
    return false;
}

