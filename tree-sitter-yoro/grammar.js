
module.exports = grammar({
  name: 'yoro',

  rules: {

    source_file: $ => repeat(choice($._primitive, $.identifier)),

    _grapheme: $ => token(/[a-zA-ZẹọṣẸỌṢ_]+/), 
    
    /* Update to represent 
    
    - any unicode character
    - escaped characters e.g \n, \t etc.
    - special characters ? e.g. $

    */

    _binary_digit: $ => token(/[0-1]/),
    _octal_digit: $ => token(/[0-7]/),
    _decimal_digit: $ => token(/[0-9]/),
    _hexadecimal_digit: $ => /[0-9a-fA-F]/,

    // identifier: $ => seq($._grapheme, repeat(choice($._grapheme, $._decimal_digit))),
    identifier: $ => seq(repeat1(choice($._grapheme, $._decimal_digit))),

    // _primitive: $ => choice( $.integer, $.floating_point, 
    //                     $.boolean, $.character, $.string),

    _primitive: $ => choice( $.boolean, $.character),

    // Boolean primitives
    boolean: $ => choice($.true, $.false),
    true: _ => 'ootọ',
    false: _ => 'irọ',

    // Integer characters
    // _positive_or_negative: $ => choice('+', '-'),

    // integer: $ => choice($.binary_integer, $.octal_integer, $.decimal_integer, $.hexadecimal_integer),
    // floating_point: $ => seq($._decimal_digit, '.', $._decimal_digit),

    // binary_integer: $ => seq(optional($._positive_or_negative), choice('0b', '0B'), repeat1($._binary_digit)),
    // octal_integer: $ => seq(optional($._positive_or_negative), choice('0o', '0O'), repeat1($._octal_digit)),
    // decimal_integer: $ => seq(optional($._positive_or_negative), repeat1($._decimal_digit)),
    // hexadecimal_integer: $ => seq(optional($._positive_or_negative), choice('0x', '0X'), repeat1($._hexadecimal_digit)),


    character: $ => seq('\'', $._grapheme, '\''),
    // string: $ => seq('\"', repeat(choice($._grapheme, $.integer)), '\"'),
    string: $ => seq('\"', repeat($._grapheme), '\"'),


  }
});
