
module.exports = grammar({
  name: 'yoro',


  rules: {

    source_file: $ => repeat(choice($._primitive, $.identifier)),

    identifier: $ => /(\p{Letter}|_)(\p{Letter}|\p{Number}|_)+/,
    
    // Integer literals
    binary_literal: $ => /[+|-]?0[b|B][0|1]+/,
    octal_literal: $ => /[+|-]?0[o|O][0-7]+/,
    decimal_literal: $ => /[+|-]?[0-9]+/,
    hexadecimal_literal: $ => /[+|-]?0[x|X][0-9A-Fa-f]+/,
    floating_point_literal: _ => /[+|-]?[0-9]+\.[0-9]+/,

    // Character literal
    _character_literal: _ => /'(\p{Letter}|\p{Number}|\p{Symbol}|\p{Punctuation}|\p{Separator}|\p{Emoji})'/,
    _string_literal: _ => /"(\p{Letter}|\p{Number}|\p{Symbol}|\p{Punctuation}|\p{Separator}|\p{Emoji})*""/,
    /* Update to represent 
    - escaped characters e.g \n, \t etc.
    */

    // _primitive: $ => choice( $.boolean, $.character, $.integer, $.floating_point, $.string),
    _primitive: $ => choice( $.boolean, $.character, $.integer, $.floating_point),

    // Boolean primitives
    boolean: $ => choice($.true, $.false),
    true: _ => 'ootọ',
    false: _ => 'irọ',

    // Integers
    integer: $ => choice($.binary_literal, $.octal_literal,$.decimal_literal, $.hexadecimal_literal),
    floating_point: $ => $.floating_point_literal,
    
    // Characters and letters
    character: $ => $._character_literal,
    string: $ => $._string_literal,

    // _datatype: $ => choice($.int, $.single_precision_floating_point, $.double_precision_floating_point, $.boolean, $.character, $.string),

    // int: _ => 'int',
    // single_precision_floating_point: _ => 'f32',
    // double_precision_floating_point: _ => 'f64',
    // boolean: _ => 'bool',
    // character: _ => 'char',
    // string: _ => 'str',

    // $binary_operator: $ => ,
    // $arithmetic_operator: $ => ,
    // $comparison_operator: $ => ,


    // binary_expression: $ => seq($._primitive, $.binary_operator, $._primitive),
    // conditional_expression: $ => seq($._primitive, $.conditional_operator, $._primitive),


    // if_keyword: _ => 'ṣe',  //Update to use unicode regex when adding diacritcs
    // else_keyword: _ => 'tabi',
    // if_statement: $ => seq($.if_keyword, '(', choice($.conditional_expression, $.boolean), ')', '{', repeat($.statement), '}' , optional(optional($._else_if_block), $._else_block)),
    // _else_if_block: _ => seq($.else_keyword, $.if_keyword, '{', repeat($.statement), '}'),
    // _else_block: _ => seq($.else_keyword, '{', repeat($.statement), '}'), 

    // expression: choice($._primitive, $.binary_expression),

    // statement: $ => choice($.assignment, $.expression),
    // assignment: $ => seq('jẹki', $.identifier, $._datatype, '=', choice($._primitive, $.expression, $.function_call)),

    
  }
});
