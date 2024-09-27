/** This class implements functionality of generating Intermediate Generation
sdfs
sdsf
 */

#include <string>
#include "AST.hpp"

#ifndef _YORO_IR_GEN_
#define _YORO_IR_GEN_

class IRGenerator
{
    public:
    IRGenerator(void);
    ~IRGenerator(void);

    std::string getIR(AST& tree);
};

#endif
