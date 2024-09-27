#include <iostream>
#include "IRGenerator.hpp"

IRGenerator::IRGenerator(void) {
    std::cout << "IR instantiated" << std::endl;
};


IRGenerator::~IRGenerator(void){

};

std::string IRGenerator::getIR(AST& tree) {
    std::cout << "printed IR" << std::endl;
    return " ";
}