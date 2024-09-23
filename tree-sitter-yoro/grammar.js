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
  // subtype_parenthesis : 12,  // (  )
  primitive: 13,    // primitive datatypes
};


module.exports = grammar({
  name: 'yoro',


  rules: {

    source_file: $ => repeat(
                            choice($._comment,
                                  $.statement,
                                  $.codeblock,
                                  // $.function_declaration,
                                )
                            ),

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
                                          $.integer_primitive, 
                                          $.floating_point_primitive,
                                          $.boolean_primitive,
                                          $.character_primitive, 
                                          $.string_primitive)
                              ),


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
    _addition_operator: _ => '+',
    _subtraction_operator: _ => '-',
    _multiplication_operator: _ => '*',
    _division_operator: _ => '/',
    _modulus_operator: _ => '%',
    _exponent_operator: _ => '**',


    // Comparison Operator Symbols
    
    _equals_operator: _ => '==',
    _not_equals_operator: _ => '!=',
    _less_than_operator: _ => '<',
    _greater_than_operator: _ => '>',
    _less_than_equal_operator: _ => '<=',
    _greater_than_equal_operator: _ => '>=',


    // Add the below to expressions
    not_operator: _ => '!', // Also use + and - as unary operators
    logical_or_operator: _ => '||',
    logical_and_operator: _ => '&&',


    _binary_expression: $ => choice(
                                $.arithmetic,
                                $.comparison,
                              ),

    arithmetic: $ => choice($.addition,
                              $.subtraction,
                              $.division,
                              $.multiplication,
                              $.modulus,
                              $.exponent),

    comparison: $ => choice($.equals,
                            $.not_equals,
                            $.greater_than,
                            $.greater_than_or_equals,
                            $.less_than,
                            $.less_than_or_equals
                            ),

    addition: $ => prec.left(precedences["addition_subtraction"],
                                      seq(
                                        field("left", $._expression),
                                        field("operator", $._addition_operator),
                                        field("right", $._expression)
                                      )
    ),

    subtraction: $ => prec.left(precedences["addition_subtraction"],
                                      seq(
                                        field("left", $._expression),
                                        field("operator", $._subtraction_operator),
                                        field("right", $._expression)
                                      )
    ),

    multiplication: $ => prec.left(precedences["multiply_divide"],
                                      seq(
                                        field("left", $._expression),
                                        field("operator", $._multiplication_operator),
                                        field("right", $._expression)
                                      )
    ),

    division: $ => prec.left(precedences["multiply_divide"],
                                      seq(
                                      field("left", $._expression),
                                      field("operator", $._division_operator),
                                      field("right", $._expression)
                                      )
    ),

    modulus: $ => prec.left(precedences["modulus"],
                              seq(
                              field("left", $._expression),
                              field("operator", $._modulus_operator),
                              field("right", $._expression)
                              )
    ),

    exponent: $ => prec.left(precedences["exponent"],
                            seq(
                              field("left", $._expression),
                              field("operator", $._exponent_operator),
                              field("right", $._expression)
                            )
    ),
    
    // Comparison
    equals: $ => prec.left(precedences["equality"],
                              seq(
                                field("left", $._expression),
                                field("operator", $._equals_operator),
                                field("right", $._expression)
                              )
    ),

    not_equals: $ => prec.left(precedences["equality"],
                            seq(
                              field("left", $._expression),
                              field("operator", $._not_equals_operator),
                              field("right", $._expression)
                            )
    ),

    greater_than: $ => prec.left(precedences["comparison"],
                                seq(
                                  field("left", $._expression),
                                  field("operator", $._greater_than_operator),
                                  field("right", $._expression)
                                )
    ),

    greater_than_or_equals: $ => prec.left(precedences["comparison"],
                                seq(
                                  field("left", $._expression),
                                  field("operator", $._greater_than_equal_operator),
                                  field("right", $._expression)
                                )
    ),

    less_than: $ => prec.left(precedences["comparison"],
                                seq(
                                  field("left", $._expression),
                                  field("operator", $._less_than_operator),
                                  field("right", $._expression)
                                )
    ),

    less_than_or_equals: $ => prec.left(precedences["comparison"],
                                        seq(
                                          field("left", $._expression),
                                          field("operator", $._less_than_equal_operator),
                                          field("right", $._expression)
                                        )
    ),

    // TODO: Parenthesis, not and logical OR/AND expressions
    //       For loop
    parenthesis_expression: $ => prec.left(precedences["parenthesis"],
                                            seq(
                                                '(',
                                                $._expression,
                                                ')'
                                              )
                                            ),


    // _expression: $ => prec(precedences["expression"], 
    _expression: $ => choice($.identifier,
                                    $._primitive, 
                                    $._binary_expression, 
                                    // $.parenthesis_expression
                            // )
                          ),

  
    statement: $ => 
      // prec(precedences[""], 
                          choice(
                            seq(choice($._expression, 
                                      $.function_call,
                                      $.break_keyword,
                                      $.assignment_statement,
                                      $.continue_keyword
                                    ), 
                                ';'),
                            $.if_statement,
                            $.while_loop,
                            // $.for_loop,
                          ),
                      // ),


    _control_flow_keywords: $ => choice($._if_statement_keyword, 
                                        $._else_statement_keyword,
                                        $.for_loop_keyword,
                                        $._while_loop_keyword,
                                        $.break_keyword,
                                        $.continue_keyword,
                                    ),

    _declarator_keywords: $ => choice($._function_decleration_keyword,
                                      $._return_keyword,
                                      $._variable_declaration_keyword
                                    ),

    _if_statement_keyword: _ => 'ṣe',
    _else_statement_keyword: _ => 'tabi',
    for_loop_keyword: _ => 'fun',
    _while_loop_keyword: _ => 'nigbati',
    break_keyword: _ => 'kuro',  // Choose new keyword kuro is leave, fọ is break
    continue_keyword: _ => 'tẹsiwaju',
    _function_decleration_keyword: _ => 'iṣẹ',
    _return_keyword: _ => 'pada',


    // return_expression: $ => prec( precedences["sub_expression"],
    return_expression: $ => seq(
                                  $._return_keyword,
                                  field('return_expression', $._expression),
                                  ';'
                                // )
                              ),


    // Validity of return expressions, break and 
    // continue keywords would be checked at the
    // semantic level
    codeblock: $ => seq(
                        '{',
                        repeat(
                          choice(
                            $.statement,
                            $._comment,
                            $.return_expression
                          )
                        ),
                        '}'
                      ),


    _branch_expression: $ => $._expression,

    if_statement: $ => seq($._if_statement_keyword, 
                            field("if_statement_condition", $._branch_expression),
                            field("if_statement_codeblock", $.codeblock), 
                            optional(
                              seq(
                                repeat($._else_if_block),
                                $._else_block
                              )
                            )
                          ),

    _else_if_block: $ => seq(
                            $._else_statement_keyword,
                            $._if_statement_keyword,
                            field("else_if_statement_condition", $._branch_expression),
                            field("else_if_statement_codeblock", $.codeblock)
                          ),

    _else_block: $ => seq(
                        $._else_statement_keyword,
                        field("else_statement_codeblock", $.codeblock)
                        ), 

    while_loop: $ => seq(
                        $._while_loop_keyword,
                        field("while_loop_condition", $._branch_expression),
                        field("while_loop_codeblock", $.codeblock),
                      ),

    for_loop: $ => seq(
                      $.for_loop_keyword, 
                      // '(', 
                      $.assignment_statement,
                      ';',
                      $.comparison, // Conditional expression ??
                      ';',
                      $.statement,          // Normal expression ??
                      // ')',
                      $.codeblock
                    ),


    parameter: $ => choice($.identifier, $._primitive),
    parameter_declaration: $ => seq($.parameter, ':', $._datatype ),
    

    // function_declaration: $ => {

    //   const _parameter_decleration_in_list = repeat(
    //                                 seq(field("parameter_declaration", $.parameter_declaration), ',')
    //                               );

    //   const parameter_declaration_list = optional(
    //                               seq(_parameter_decleration_in_list,
    //                                 field("parameter_declaration", $.parameter_declaration))
    //                               );

    //   const _return_type = seq('->',
    //                           field('return_datatype', $._datatype)
    //                         );

      
      
    //   // return prec(precedences["sub_expression"],
    //   return seq(
    //                     $._function_decleration_keyword,
    //                     field("function_name", $.identifier),
    //                     '(', parameter_declaration_list,
    //                     ')',
    //                     optional(_return_type),
    //                     $.codeblock
    //                   )
    //                 // )
    // },


    function_call: $ => {
      const _parameter_in_list = repeat(
                                    seq(field("parameter", $.parameter), ',')
                                  );

      const parameter_list = optional(
                                  seq(_parameter_in_list,
                                    field("parameter", $.parameter))
                                  );
      
      // return prec(precedences["sub_expression"],
      return seq(
                    field("function_name", $.identifier),
                    '(', parameter_list,
                    ')'
                    )
                  // )
              },


    _variable_declaration_keyword: _ => 'jẹki',
    _assignment_operator: _ => '=',
    variable_initialization: $ => seq(
                                $._variable_declaration_keyword, 
                                field("variable_name", $.identifier), 
                                ':', 
                                field("variable_datatype", $._datatype), 
                                $._assignment_operator, 
                                field("assigned_expression", choice($._expression, $.function_call)),
                              ),

    variable_reassignment: $ => seq(
                                    field("variable_name", $.identifier),
                                    $._assignment_operator, 
                                    field("assigned_expression", choice($._expression, $.function_call)),
                                  ),

    assignment_statement: $ => choice(
                                $.variable_reassignment,
                                $.variable_initialization, 
                            ),

  }
});
