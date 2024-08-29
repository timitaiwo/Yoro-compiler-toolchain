/**
 * A JavaScript Object that corellates rule 
 * precedences to integer values
 */
const precedences = {
  comment : 0,
  assignment : 1,   // =
  logical_or : 2,   // || 
  logical_and : 3,  // && 
  equality : 4,     // == !=
  comparison : 5,   // < <= > >=
  addition_subtraction : 6, // + -
  multiply_divide : 7,      // * / 
  modulus: 8,       // % 
  exponent : 9,     // **
  unary : 10,       // + - !   ? Python way or C++ way
  parenthesis : 11,  // (  )
  primitive: 12,    // primitive datatypes
};


module.exports = grammar({
  name: 'yoro',


  rules: {

    source_file: $ => repeat(choice($._comment, $._keywords, $._operator, $._expression)),


    // Comments
    single_line_comment: $ => /(\/\/|#)(\p{Letter}|\p{Number}|\p{Symbol}|\p{Punctuation}|\p{Separator}|\p{Emoji})*/,
    multi_line_comment: $ => /\/\*(\r|\n|\r\n)?(\p{Letter}|\p{Number}|\p{Symbol}|\p{Punctuation}|\p{Separator}|\p{Emoji})*(\r|\n|\r\n)?\*\//,
    _comment: $ => choice($.single_line_comment, $.multi_line_comment),

    //Keywords
    _keywords: $ => choice($._datatype,
                            $._control_flow_keywords,
                            $._declarator_keywords),

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


    // Character literal
    _character_literal: _ => prec(precedences["primitive"], /'(\p{Letter}|\p{Number}|\p{Symbol}|\p{Punctuation}|\p{Separator}|\p{Emoji})'/),
    _string_literal: _ => /"(\p{Letter}*|\p{Number}*|\p{Mark}*|\p{Symbol}*|\p{Separator}*|\p{Emoji}*|\p{Punctuation}*)*"/,
    /* Update to represent 
    - escaped characters e.g \n, \t etc.
    */

    _primitive: $ => prec(precedences["primitive"], choice($.boolean_primitive,
                            $.character_primitive,
                            $.integer_primitive,
                            $.floating_point_primitive,
                            $.string_primitive)),

    // Boolean primitives
    boolean_primitive: $ => {

      const truth_primitive = /[+|-]?ootọ/;
      const false_primitive =/[+|-]?irọ/;

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
    
    // Characters and string primitives
    character_primitive: $ => $._character_literal,
    string_primitive: $ => $._string_literal,


    // Arithmetic Operations
    addition_operator: _ => '+',
    subtraction_operator: _ => '-',
    multiplication_operator: _ => '*',
    division_operator: _ => '/',
    modulus_operator: _ => '%',
    exponent_operator: _ => '**',

    // String concatenation

    _concatenation_primitive: $ => prec(precedences["primitive"],
                                      choice($.character_primitive, 
                                              $.string_primitive)), // Add identifier

    // _concatenation_expression: $ => choice($.identifier, $._concatenation_primitive),
                                          // Add identifier to list
    string_concatenation: $ => prec.left(
                                  seq(
                                    field("left", $._concatenation_primitive),
                                    $.addition_operator,
                                    field("right", $._concatenation_primitive)
                                  )
                                ),

    // Number Arithmetic
    _arithmetic_primitive: $ => prec(precedences["primitive"],
                                      choice($.integer_primitive, 
                                            $.floating_point_primitive,
                                            $.boolean_primitive)),

    _arithmetic_expression: $ => choice($.identifier, $._arithmetic_primitive, $._number_arithmetic, $._parenthesized_expression),
    
    _number_arithmetic: $ => choice($.numeric_addition,
                                    $.numeric_subtraction,
                                    $.numeric_division,
                                    $.numeric_multiplication,
                                    $.numeric_modulus,
                                    $.numeric_exponent),
  
  numeric_addition: $ => prec.left(precedences["addition_subtraction"],
                  seq(
                    field("left", $._arithmetic_expression),
                    field("operator", $.addition_operator),
                    field("right", $._arithmetic_expression)
                  )
                ),

  numeric_subtraction: $ => prec.left(precedences["addition_subtraction"],
                  seq(
                    field("left", $._arithmetic_expression),
                    field("operator", $.subtraction_operator),
                    field("right", $._arithmetic_expression)
                  )
                ),
                
  numeric_multiplication: $ => prec.left(precedences["multiply_divide"],
                  seq(
                    field("left", $._arithmetic_expression),
                    field("operator", $.multiplication_operator),
                    field("right", $._arithmetic_expression)
                  )
                ),

  numeric_division: $ => prec.left(precedences["multiply_divide"],
                  seq(
                    field("left", $._arithmetic_expression),
                    field("operator", $.division_operator),
                    field("right", $._arithmetic_expression)
                  )
                ),
            
  numeric_modulus: $ => prec.left(precedences["modulus"],
                  seq(
                    field("left", $._arithmetic_expression),
                    field("operator", $.modulus_operator),
                    field("right", $._arithmetic_expression)
                  )
                ),

  numeric_exponent: $ => prec.left(precedences["exponent"],
                      seq(
                        field("left", $._arithmetic_expression),
                        field("operator", $.exponent_operator),
                        field("right", $._arithmetic_expression)
                      )
                    ),

    // Conditional Operators
    logical_or_operator: _ => '||',
    logical_and_operator: _ => '&&',
    equals_operator: _ => '==',
    not_equals_operator: _ => '!=',
    less_than_operator: _ => '<',
    greater_than_operator: _ => '>',
    less_than_equal_operator: _ => '<=',
    greater_than_equal_operator: _ => '>=',


    string_char_comparison_expression: $ => choice(
      ...[
        [$.logical_or_operator, precedences.logical_or],
        [$.logical_and_operator, precedences.logical_and],
        [$.equals_operator, precedences.equality],
        [$.not_equals_operator, precedences.equality],
        [$.less_than_operator, precedences.comparison],
        [$.less_than_equal_operator, precedences.comparison],
        [$.greater_than_operator, precedences.comparison],
        [$.greater_than_equal_operator, precedences.comparison]
      ].map(([operator, precedence]) => 
                    prec.left(precedence, seq(
                      field('left', $._concatenation_primitive),
                      field('operator', operator),
                      field('right', $._concatenation_primitive)
                    )))
                ),

    number_comparison_expression: $ => choice(
                   ...[
                    [$.logical_or_operator, precedences.logical_or],
                    [$.logical_and_operator, precedences.logical_and],
                    [$.equals_operator, precedences.equality],
                    [$.not_equals_operator, precedences.equality],
                    [$.less_than_operator, precedences.comparison],
                    [$.less_than_equal_operator, precedences.comparison],
                    [$.greater_than_operator, precedences.comparison],
                    [$.greater_than_equal_operator, precedences.comparison]
                   ].map(([operator, precedence]) => 
                                prec.left(precedence, seq(
                                  field('left', $._arithmetic_primitive),
                                  field('operator', operator),
                                  field('right', $._arithmetic_primitive)
                                )))
                            ),

    
    
    _comparison_expression: $ => ($.number_comparison_expression, $.string_char_comparison_expression),


    _binary_expression: $ => choice($._number_arithmetic, $.string_concatenation, $._comparison_expression, ),


    _parenthesized_expression: $ => prec(precedences["parenthesis"], 
                                        seq('(', $._expression ,')')),

    // conditional_expression: $ => ,

    // Uniary Operators
    // TODO: remove _operator after done with it
    _operator: $ => choice($.assignment_operator, $.not_operator),
    not_operator: _ => '!',
    // use + and - as unary operators

    _expression: $ => choice($.identifier, $._primitive, $._binary_expression, $._parenthesized_expression),
    // add conditional_expression to _expression later

    
    // not expression (seq(! expression ))

    
    // statement: $ => choice($._expression, $.assignment_statement),

    // conditional_expression: $ => seq($._primitive, $._comparison_operator, $._primitive),

    // statement: $ => choice($.identifier, $.expression, $._primitive),
    // statement: $ => choice($.identifier, $.expression, $._primitive, $.function_call),

    // branch_condition: $ => ,

    // codeblock: $ => repeat($.statement),

    _control_flow_keywords: $ => choice($.if_statement_keyword, 
                                    $.else_statement_keyword,
                                    $.for_loop_keyword,
                                    $.while_loop_keyword,
                                    $.break_keyword,
                                    $.continue_keyword,
                                ),

    if_statement_keyword: _ => 'ṣe',
    else_statement_keyword: _ => 'tabi',
    // if_statement: $ => seq($.if_keyword, '(', choice($.conditional_expression, $.boolean), ')', '{', repeat($.statement), '}' , optional(optional($._else_if_block), $._else_block)),
    // _else_if_block: _ => seq($.else_keyword, $.if_keyword, '{', repeat($.statement), '}'),
    // _else_block: _ => seq($.else_keyword, '{', repeat($.statement), '}'), 

    // while loop and for loop

    for_loop_keyword: _ => 'fun',
    while_loop_keyword: _ => 'nigbati',

    // while_loop: $ => ,
    // _for_loop: $ => 

    break_keyword: _ => 'kuro',  // How to implement?
    continue_keyword: _ => 'tẹsiwaju',// How to implement?


    _declarator_keywords: $ => choice($.function_keyword,
                                  $.return_keyword,
                                  $.assignment_keyword
                                  ),

    function_keyword: _ => 'iṣẹ',
    return_keyword: _ => 'pada',

    // parameter_declaration: $ => seq($._datatype, $.identifier),
    // function_declaration: $ => seq($.function_declaration, $.identifier, '(',
    //                                 optional(optional(seq($.parameter_declaration, ',')), $.parameter_declaration), ')',
    //                                 optional(seq('->', $._datatype)), '{', repeat($.statement),
    //                                 optional(seq($.return_keyword, $.expression)), '}'),


    // function_call: $ => {

    //   const parameter = choice($.identifier, $._primitive)
      
    //   return seq($.identifier, '(',
    //               seq(
    //                 repeat(seq(parameter, ',')),
    //                 optional(parameter)
    //                 ),
    //               ')')
    // },

    assignment_keyword: _ => 'jẹki',
    assignment_operator: _ => '=',
    // assignment_statement: $ => seq($.assignment_keyword, $.identifier, ':', $._datatype, $.assignment_operator, choice($._expression, $.function_call), ';'),
    // assignment_statement: $ => seq($.assignment_keyword, $.identifier, ':', $._datatype, $.assignment_operator, $._expression, ';'),


    // Yọrọ identifiers 
    identifier: $ => /(\p{Letter}|_)(\p{Letter}|\p{Number}|_)+/,
    word: $ => $.identifier,
  }
});
