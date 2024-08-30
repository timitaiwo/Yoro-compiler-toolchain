/**
 * A JavaScript Object that corellates rule 
 * precedences to integer values
 */
const precedences = {

  expression: 1,
  sub_expression: 2,

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

    source_file: $ => repeat(choice($._comment, $.statement)),

    // Yọrọ identifiers 
    identifier: $ => /(\p{Letter}|_)(\p{Letter}|\p{Number}|_)+/,
    word: $ => $.identifier,


    // Comments
    single_line_comment: $ => /(\/\/|#)(\p{Letter}|\p{Number}|\p{Symbol}|\p{Punctuation}|\p{Separator}|\p{Emoji})*/,
    multi_line_comment: $ => /\/\*(\r|\n|\r\n)?(\p{Letter}|\p{Number}|\p{Symbol}|\p{Punctuation}|\p{Separator}|\p{Emoji})*(\r|\n|\r\n)?\*\//,
    _comment: $ => prec(precedences["comment"], 
                          choice($.single_line_comment, $.multi_line_comment)
                          ),

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
    _character_literal: _ => /'(\p{Letter}|\p{Number}|\p{Symbol}|\p{Punctuation}|\p{Separator}|\p{Emoji})'/,
    _string_literal: _ => /"[^"\p{Other}]*"/,
    /* Update to represent 
    - escaped characters e.g \n, \t etc.
    */


    _primitive: $ => prec(precedences["primitive"], 
                            choice(
                              $._arithmetic_primitive,
                              $._concatenation_primitive)),

    _arithmetic_primitive: $ => choice($.integer_primitive, 
                                $.floating_point_primitive,
                                $.boolean_primitive),


    _concatenation_primitive: $ => choice($.character_primitive, 
                                      $.string_primitive),


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
      
      // const floating_point_literal = /[+|-]?[0-9]+\.[0-9]+/
      const floating_point_literal = /[+|-]?[0-9]+\.([0-9]+)?/
      
      return token(floating_point_literal);
    },
    
    // Characters and string primitives
    character_primitive: $ => $._character_literal,
    string_primitive: $ => $._string_literal,


    // Arithmetic Operation Symbols
    addition_operator: _ => '+',
    subtraction_operator: _ => '-',
    multiplication_operator: _ => '*',
    division_operator: _ => '/',
    modulus_operator: _ => '%',
    exponent_operator: _ => '**',


    // Comparison Operator Symbols
    
    equals_operator: _ => '==',
    not_equals_operator: _ => '!=',
    less_than_operator: _ => '<',
    greater_than_operator: _ => '>',
    less_than_equal_operator: _ => '<=',
    greater_than_equal_operator: _ => '>=',


    


    // Add the below to expressions
    not_operator: _ => '!', // Also use + and - as unary operators
    logical_or_operator: _ => '||',
    logical_and_operator: _ => '&&',


      
    _binary_expression: $ => choice($._number_expression,
                                    $._string_char_expression),

    _parenthesized_expression: $ => prec(precedences["parenthesis"], 
                                        seq('(', $._expression ,')')),

    _expression: $ => prec(precedences["expression"], 
                            choice($.identifier,
                                    $._primitive, 
                                    $._binary_expression, 
                                    $._parenthesized_expression
                            )
                          ),

  
    statement: $ => prec(precedences["expression"], 
                          choice(
                            seq(choice($._expression, $.function_call), ';'),
                            $.assignment_statement,
                          )
                      ),


    _control_flow_keywords: $ => choice($.if_statement_keyword, 
                                        $.else_statement_keyword,
                                        $.for_loop_keyword,
                                        $.while_loop_keyword,
                                        $.break_keyword,
                                        $.continue_keyword,
                                    ),

    if_statement_keyword: _ => 'ṣe',
    else_statement_keyword: _ => 'tabi',
    for_loop_keyword: _ => 'fun',
    while_loop_keyword: _ => 'nigbati',
    break_keyword: _ => 'kuro',  // How to implement?
    continue_keyword: _ => 'tẹsiwaju',// How to implement?
    
    
    

    // branch_condition: $ => choice($.boolean_primitive, $._expression),

    // codeblock: $ => seq('{', repeat($.statement), '}'),

    // if_statement: $ => seq($.if_keyword, branch_condition , $.codeblock, optional(optional($._else_if_block), $._else_block)),
    // _else_if_block: _ => seq($.else_keyword, $.if_keyword, branch_condition, $.codeblock),
    // _else_block: _ => seq($.else_keyword, $.codeblock), 

    // while_loop: $ => seq($.while_loop_keyword, $.branch_condition, $.codeblock),
    // for_loop: $ => seq($.for_loop_keyword, 
    //                     '(', $.assignment_statement, ';',
    //                     $.branch_condition, ';', $.statement, ')', $.codeblock),

    _declarator_keywords: $ => choice($.function_keyword,
                                  $.return_keyword,
                                  $._assignment_keyword
                                  ),

    function_keyword: _ => 'iṣẹ',
    return_keyword: _ => 'pada',

    // parameter_declaration: $ => seq($._datatype, $.identifier),
    // function_declaration: $ => seq($.function_declaration, $.identifier, '(',
    //                                 optional(optional(seq($.parameter_declaration, ',')), $.parameter_declaration), ')',
    //                                 optional(seq('->', $._datatype)), '{', $.codeblock,
    //                                 optional(seq($.return_keyword, $.expression)), '}'),


    function_call: $ => {

      const parameter = choice($.identifier, $._primitive);
      const _parameter_in_list = optional(
                                  field("parameter", 
                                    seq(parameter, ','))
                                  );

      const parameter_list = optional(
                                  seq(_parameter_in_list,
                                    field("parameter",parameter))
                                  );
      
      return prec(precedences["sub_expression"],
                  seq(
                    field("function_name", $.identifier),
                    '(', parameter_list,
                    ')')
                    )
              },

    _assignment_keyword: _ => 'jẹki',
    _assignment_operator: _ => '=',
    assignment_statement: $ => seq(
                                $._assignment_keyword, 
                                field("variable_name", $.identifier), 
                                ':', 
                                field("variable_datatype", $._datatype), 
                                $._assignment_operator, 
                                field("assigned_expression", choice($._expression, $.function_call)),
                                ';'
                              ),


    










    // Integer Operations
    // Integer Arithmetic

    _number_expression: $ => choice(//$.identifier, 
                                    $._arithmetic_primitive,
                                    $._number_arithmetic, 
                                    // $._parenthesized_expression,
                                    $._number_comparison),

    _number_arithmetic: $ => choice($.numeric_addition,
                                    $.numeric_subtraction,
                                    $.numeric_division,
                                    $.numeric_multiplication,
                                    $.numeric_modulus,
                                    $.numeric_exponent),

    _number_comparison: $ => choice($.numeric_equals,
                                    $.numeric_not_equals,
                                    $.numeric_greater_than,
                                    $.numeric_greater_than_or_equals,
                                    $.numeric_less_than,
                                    $.numeric_less_than_or_equals
                                    ),

    numeric_addition: $ => prec.left(precedences["addition_subtraction"],
                                      seq(
                                      field("left", $._number_expression),
                                      field("operator", $.addition_operator),
                                      field("right", $._number_expression)
                                      )
    ),

    numeric_subtraction: $ => prec.left(precedences["addition_subtraction"],
                                          seq(
                                          field("left", $._number_expression),
                                          field("operator", $.subtraction_operator),
                                          field("right", $._number_expression)
                                          )
    ),

    numeric_multiplication: $ => prec.left(precedences["multiply_divide"],
                                            seq(
                                            field("left", $._number_expression),
                                            field("operator", $.multiplication_operator),
                                            field("right", $._number_expression)
                                            )
    ),

    numeric_division: $ => prec.left(precedences["multiply_divide"],
                                      seq(
                                      field("left", $._number_expression),
                                      field("operator", $.division_operator),
                                      field("right", $._number_expression)
                                      )
    ),

    numeric_modulus: $ => prec.left(precedences["modulus"],
                                      seq(
                                      field("left", $._number_expression),
                                      field("operator", $.modulus_operator),
                                      field("right", $._number_expression)
                                      )
          ),

    numeric_exponent: $ => prec.left(precedences["exponent"],
                                      seq(
                                      field("left", $._number_expression),
                                      field("operator", $.exponent_operator),
                                      field("right", $._number_expression)
                                      )
                                      ),
    
    
    // Integer Comparison
    numeric_equals: $ => prec.left(precedences["equality"],
                          seq(
                          field("left", $._number_expression),
                          field("operator", $.equals_operator),
                          field("right", $._number_expression)
                          )
                        ),


    numeric_not_equals: $ => prec.left(precedences["equality"],
                          seq(
                          field("left", $._number_expression),
                          field("operator", $.not_equals_operator),
                          field("right", $._number_expression)
                          )
                        ),


    numeric_greater_than: $ => prec.left(precedences["comparison"],
                          seq(
                          field("left", $._number_expression),
                          field("operator", $.greater_than_operator),
                          field("right", $._number_expression)
                          )
                        ),


    numeric_greater_than_or_equals: $ => prec.left(precedences["comparison"],
                          seq(
                          field("left", $._number_expression),
                          field("operator", $.greater_than_equal_operator),
                          field("right", $._number_expression)
                          )
                        ),


    numeric_less_than: $ => prec.left(precedences["comparison"],
                            seq(
                            field("left", $._number_expression),
                            field("operator", $.less_than_operator),
                            field("right", $._number_expression)
                            )
                          ),


    numeric_less_than_or_equals: $ => prec.left(precedences["comparison"],
                          seq(
                            field("left", $._number_expression),
                            field("operator", $.less_than_equal_operator),
                            field("right", $._number_expression)
                          )
                        ),


    // String and Character Operations 
    // String concatenation

    _string_char_expression: $ => choice(//$.identifier, 
                                            $._concatenation_primitive,
                                            $.string_char_concatenation,
                                            // $._parenthesized_expression,
                                            $._string_char_comparison
                                          ),


    string_char_concatenation: $ => prec.left(
                                      seq(
                                      field("left", $._string_char_expression),
                                      field("operator", $.addition_operator),
                                      field("right", $._string_char_expression)
                                      )
                                    ),


    _string_char_comparison: $ => choice($.string_char_equals,
    $.string_char_not_equals,
    $.string_char_greater_than,
    $.string_char_greater_than_or_equals,
    $.string_char_less_than,
    $.string_char_less_than_or_equals
    ),


    string_char_equals: $ => prec.left(precedences["equality"],
      seq(
      field("left", $._string_char_expression),
      field("operator", $.equals_operator),
      field("right", $._string_char_expression)
      )
    ),


    string_char_not_equals: $ => prec.left(precedences["equality"],
        seq(
        field("left", $._string_char_expression),
        field("operator", $.not_equals_operator),
        field("right", $._string_char_expression)
        )
    ),

// $._parenthesized_expression,
    string_char_greater_than: $ => prec.left(precedences["comparison"],
                  seq(
                  field("left", $._string_char_expression),
                  field("operator", $.greater_than_operator),
                  field("right", $._string_char_expression)
                  )
                ),


    string_char_greater_than_or_equals: $ => prec.left(precedences["comparison"],
                  seq(
                  field("left", $._string_char_expression),
                  field("operator", $.greater_than_equal_operator),
                  field("right", $._string_char_expression)
                  )
                ),


    string_char_less_than: $ => prec.left(precedences["comparison"],
        seq(
        field("left", $._string_char_expression),
        field("operator", $.less_than_operator),
        field("right", $._string_char_expression)
        )
      ),


    string_char_less_than_or_equals: $ => prec.left(precedences["comparison"],
                  seq(
                    field("left", $._string_char_expression),
                    field("operator", $.less_than_equal_operator),
                    field("right", $._string_char_expression)
                  )
                ),

  }
});
