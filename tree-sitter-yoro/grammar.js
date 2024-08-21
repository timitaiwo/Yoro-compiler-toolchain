
module.exports = grammar({
  name: 'yoro',


  rules: {

    source_file: $ => repeat(choice($._primitive, $._comment)),
    // source_file: $ => repeat(choice($._primitive, $._comment, $.statement)),

    // Character literal
    _character_literal: _ => /'(\p{Letter}|\p{Number}|\p{Symbol}|\p{Punctuation}|\p{Separator}|\p{Emoji})'/,
    _string_literal: _ => /"(\p{Letter}*|\p{Number}*|\p{Mark}*|\p{Punctuation}*|\p{Symbol}*|\p{Separator}*|\p{Emoji}*)*"/,
    /* Update to represent 
    - escaped characters e.g \n, \t etc.
    */

    _primitive: $ => choice($.boolean_primitive,
                            $.character_primitive,
                            $.integer_primitive,
                            $.floating_point_primitive,
                            $.string_primitive),

    // Boolean primitives
    boolean_primitive: $ => {

      const truth_primitive = 'ootọ';
      const false_primitive ='irọ';

      return token(choice(truth_primitive, false_primitive));
    },

    integer_primitive: $ => {

      const binary_literal = /[+|-]?0[b|B][0|1]+/
      const octal_literal = /[+|-]?0[o|O][0-7]+/
      const decimal_literal = /[+|-]?[0-9]+/
      const hexadecimal_literal= /[+|-]?0[x|X][0-9A-Fa-f]+/

      return token(choice(binary_literal, octal_literal, 
        decimal_literal, hexadecimal_literal));
    },

    floating_point_primitive: $ => {
      
      const floating_point_literal = /[+|-]?[0-9]+\.[0-9]+/
      
      return token(floating_point_literal);
    },
    _number_primitive: $ => choice($.integer_primitive, $.floating_point_primitive),
    
    // Characters and string primitives
    character_primitive: $ => $._character_literal,
    string_primitive: $ => $._string_literal,

    // Comments
    single_line_comment: $ => /(\/\/|#)(\p{Letter}|\p{Number}|\p{Symbol}|\p{Punctuation}|\p{Separator}|\p{Emoji})+/,
    multi_line_comment: $ => /\/\*(\r|\n|\r\n)?(\p{Letter}|\p{Number}|\p{Symbol}|\p{Punctuation}|\p{Separator}|\p{Emoji})*(\r|\n|\r\n)?\*\//,
    _comment: $ => choice($.single_line_comment, $.multi_line_comment),

    // Datatype definitions
    _datatype: $ => choice($.int_primitive_keyword, 
                            $.f32_primitive_keyword, 
                            $.f64_primitive_keyword, 
                            $.bool_primitive_keyword,
                            $.char_primitive_keyword,
                            $.str_primitive_keyword),

    int_primitive_keyword: _ => 'int',
    f32_primitive_keyword: _ => 'f32',
    f64_primitive_keyword: _ => 'f64',
    bool_primitive_keyword: _ => 'bool',
    char_primitive_keyword: _ => 'char',
    str_primitive_keyword: _ => 'str',


    // Operators
    assignment_operator: _ => '=',

    // Arithmetic Operators
    addition_operator: _ => '+',
    subtraction_operator: _ => '-',
    multiplication_operator: _ => '*',
    division_operator: _ => '/',
    modulus_operator: _ => '%',

    _arithmetic_operator: $ => choice($.addition_operator,
                                      $.subtraction_operator,
                                      $.multiplication_operator,
                                      $.division_operator,
                                      $.modulus_operator),

    // Boolean Operators
    not_operator: _ => '!',

    // Conditional Operators
    less_than_operator: _ => '<',
    greater_than_operator: _ => '>',
    less_than_equal_operator: _ => '<=',
    greater_than_equal_operator: _ => '>=',
    equals_operator: _ => '==',
    not_equals_operator: _ => '!=',
    logical_and_operator: _ => '&&',
    logical_or_operator: _ => '||',

    _comparison_operator: $ => choice($.less_than_operator,
                                      $.less_than_equal_operator,
                                      $.greater_than_operator,
                                      $.greater_than_equal_operator,
                                      $.not_operator,
                                      $.equals_operator,
                                      $.not_equals_operator,
                                      $.logical_and_operator,
                                      $.logical_or_operator),
                                      
    _binary_operator: $ => choice($._arithmetic_operator,
                                  $._comparison_operator),

    _operator: $ => choice($._binary_operator, $.assignment_operator),


    // Expressions

    // Use the feild function when writing the expressions
    

    // _conditional_expression: $ => seq($._primitive, $._comparison_operator, $._primitive),
    // _boolean_not_expression: $ => seq($.not_operator, ),
    // arithmetic_expression: $ => seq($._primitive, $._arithmetic_operator, $._primitive),

    // boolean_expression: $ => choice($.boolean_primitive, ),
    
    // _binary_expression: $ => choice($.conditional_operations, $.arithmetic_expression),
    // expression: $ => choice($._primitive, $.binary_expression),

    // Yọrọ identifiers 
    identifier: $ => /(\p{Letter}|_)(\p{Letter}|\p{Number}|_)+/,
    word: $ => $.identifier,

    // statement: $ => choice($.identifier, $.expression, $._primitive),
    // statement: $ => choice($.identifier, $.expression, $._primitive, $.function_call),

    // codeblock: $ => repeat($.statement),

    // if_keyword: _ => 'ṣe',  //Update to use unicode regex when adding diacritcs
    // else_keyword: _ => 'tabi',
    // if_statement: $ => seq($.if_keyword, '(', choice($.conditional_expression, $.boolean), ')', '{', repeat($.statement), '}' , optional(optional($._else_if_block), $._else_block)),
    // _else_if_block: _ => seq($.else_keyword, $.if_keyword, '{', repeat($.statement), '}'),
    // _else_block: _ => seq($.else_keyword, '{', repeat($.statement), '}'), 

    // while loop and for loop

    // while_loop: $ => ,
    // _for_loop: $ => choice($.manual_for_loop, $.auto_for_loop),
    // manual_for_loop: $ => ,
    // auto_for_loop: $ => ,

    // break_keyword: _ => 'kuro',
    // continue_keyword: _ => 'tẹsiwaju',

    // expression: choice($._primitive, $.binary_expression),

    // statement: $ => choice($.assignment, $.expression),
    // assignment: $ => seq('jẹki', $.identifier, $._datatype, '=', choice($._primitive, $.expression, $.function_call)),

    // function_keyword: _ => 'iṣẹ',
    // return_keyword: _ => 'pada',

    // parameter_declaration: $ => seq($._datatype, $.identifier),
    // function_declaration: $ => seq($.function_declaration, $.identifier, '(',
    //                                 optional(optional(seq($.parameter_declaration, ',')), $.parameter_declaration), ')',
    //                                 optional(seq('->', $._datatype)), '{', repeat($.statement),
    //                                 optional(seq($.return_keyword, $.expression)), '}'),

    // function_call: $ => seq($.identifier, '(',
    //                         optional(optional(repeat(seq($.identifier, ',')), $.identifier)),
    //                         ')'),
  }
});
