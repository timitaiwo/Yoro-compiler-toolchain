/**
 * This provides a wrapper class around the treesitter library
 *
 */

#include <tree_sitter/api.h>
#include <string>

// Include parser header
#include <tree_sitter/parser.h>

class AST
{
private:
    /* data */
    TSParser *parser = nullptr;
    TSTree* concrete_tree = nullptr;
public:
    AST(void);
    ~AST(void);
    void generate_tree(std::string source_code);
    TSTree* get_tree(void);
};


