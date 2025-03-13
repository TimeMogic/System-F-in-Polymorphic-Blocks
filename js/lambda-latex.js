Blockly.Latex['arithmetic'] = function(block) {
  /* Number comparisons: equal, not equal, less than, etc */
  var op = block.getFieldValue('OP');
  var operator = Blockly.Latex.symbolToLatex[op][0];
  var order = Blockly.Latex.symbolToLatex[op][1];
  var argument0 = Blockly.Latex.valueToCode(block, 'A', order) || Blockly.Latex.blank;
  var argument1 = Blockly.Latex.valueToCode(block, 'B', order) || Blockly.Latex.blank;
  var code;
  if( op == "POWER" ) {
    code = argument0 + "^{" + argument1 + "}";  /* Need braces around argument */
  } else {
    code = argument0 + ' ' + operator + ' ' + argument1;
  }
  return [code, order];
};
Blockly.Latex['number'] = function(block) {
  return [block.getFieldValue( "NUM" ), Blockly.Latex.ORDER_ATOMIC];
};
Blockly.Latex['bool'] = function(block) {
  return [block.getFieldValue( "VAL" ), Blockly.Latex.ORDER_ATOMIC];
};
Blockly.Latex['comp'] = function(block) {
  var op = block.getFieldValue('OP');
  var operator = Blockly.Latex.symbolToLatex[op][0];
  var order = Blockly.Latex.symbolToLatex[op][1];
  var argument0 = Blockly.Latex.valueToCode(block, 'A', order) || Blockly.Latex.blank;
  var argument1 = Blockly.Latex.valueToCode(block, 'B', order) || Blockly.Latex.blank;
  return [argument0 + ' ' + operator + ' ' + argument1, Blockly.Latex.ORDER_ATOMIC];
};

Blockly.Latex['var'] = function(block) {
  return [block.getFieldValue( "VARNAME" ), Blockly.Latex.ORDER_ATOMIC];
};
Blockly.Latex['func'] = function(block) {
  return [block.getFieldValue( "VARNAME" ), Blockly.Latex.ORDER_ATOMIC];
};
Blockly.Latex['typeVari'] = function(block) {
  return [block.getFieldValue( "VARNAME" ), Blockly.Latex.ORDER_ATOMIC];
};
Blockly.Latex['types'] = function(block) {
  return [block.getFieldValue( "TYPE" ), Blockly.Latex.ORDER_ATOMIC];
};
Blockly.Latex['ctxVar'] = function(block) {
  return [block.getFieldValue( "VARNAME" ), Blockly.Latex.ORDER_ATOMIC];
};
Blockly.Latex['ctxEmpty'] = function(block) {
  return ["\\emptyset", Blockly.Latex.ORDER_ATOMIC];
};

Blockly.Latex['abs'] = function(block) {
  var str = "\\lambda " + (block.getFieldValue("VAR") || Blockly.Latex.blank) + ":" + (block.getFieldValue("TYPE") || Blockly.Latex.blank)
      + " . " + (Blockly.Latex.valueToCode(block, "TERM", Blockly.Latex.ORDER_SET_SET) || Blockly.Latex.blank);
  return [str, Blockly.Latex.ORDER_SET_MEMBERSHIP];
};
Blockly.Latex['absV'] = function(block) {
  var str = "\\lambda " + (block.getFieldValue("VAR") || Blockly.Latex.blank) + ":" + (block.getFieldValue("TYPE") || Blockly.Latex.blank)
      + " . " + (Blockly.Latex.valueToCode(block, "TERM", Blockly.Latex.ORDER_SET_SET) || Blockly.Latex.blank);
  return [str, Blockly.Latex.ORDER_SET_MEMBERSHIP];
};
Blockly.Latex['absF'] = function(block) {
  var str = "\\lambda " + (block.getFieldValue("VAR") || Blockly.Latex.blank) + ":" + (block.getFieldValue("TYPE") || Blockly.Latex.blank)
      + " . " + (Blockly.Latex.valueToCode(block, "TERM", Blockly.Latex.ORDER_SET_SET) || Blockly.Latex.blank);
  return [str, Blockly.Latex.ORDER_SET_MEMBERSHIP];
};
Blockly.Latex['app'] = function(block) {
  var str = (Blockly.Latex.valueToCode(block, "TERM1", Blockly.Latex.ORDER_SET_ELEMENT) || Blockly.Latex.blank)
    + (Blockly.Latex.valueToCode(block, "TERM2", Blockly.Latex.ORDER_SET_ELEMENT) || Blockly.Latex.blank);
  return [str, Blockly.Latex.ORDER_SET_MEMBERSHIP];
};
Blockly.Latex['typeAbs'] = function(block) {
  var str = "\\Lambda " + (block.getFieldValue("VAR") || Blockly.Latex.blank)
    + " . " + (Blockly.Latex.valueToCode(block, "TERM", Blockly.Latex.ORDER_SET_SET) || Blockly.Latex.blank);
  return [str, Blockly.Latex.ORDER_SET_MEMBERSHIP];
};
Blockly.Latex['typeApp'] = function(block) {
  var str = (Blockly.Latex.valueToCode(block, "TERM", Blockly.Latex.ORDER_SET_ELEMENT) || Blockly.Latex.blank)
    + " [ " + (Blockly.Latex.valueToCode(block, "TYPE", Blockly.Latex.ORDER_SET_ELEMENT) || Blockly.Latex.blank) + " ] ";
  return [str, Blockly.Latex.ORDER_SET_MEMBERSHIP];
};
Blockly.Latex['typeFunc'] = function(block) {
  var str = (Blockly.Latex.valueToCode(block, "TYPE1", Blockly.Latex.ORDER_SET_ELEMENT) || Blockly.Latex.blank)
    + " \\rightarrow " + (Blockly.Latex.valueToCode(block, "TYPE2", Blockly.Latex.ORDER_SET_ELEMENT) || Blockly.Latex.blank) ;
  return [str, Blockly.Latex.ORDER_SET_MEMBERSHIP];
};
Blockly.Latex['typeUniv'] = function(block) {
  var str = "\\forall " + (block.getFieldValue("VAR") || Blockly.Latex.blank)
    + " . " + (Blockly.Latex.valueToCode(block, "TERM", Blockly.Latex.ORDER_SET_SET) || Blockly.Latex.blank);
  return [str, Blockly.Latex.ORDER_SET_MEMBERSHIP];
};
Blockly.Latex['ctxBindTerm'] = function(block) {
  var str = (Blockly.Latex.valueToCode(block, "CTX", Blockly.Latex.ORDER_SET_ELEMENT) || Blockly.Latex.blank)
    + " , " + (Blockly.Latex.valueToCode(block, "VAR", Blockly.Latex.ORDER_SET_ELEMENT) || Blockly.Latex.blank)
    + " : " + (Blockly.Latex.valueToCode(block, "TYPE", Blockly.Latex.ORDER_SET_SET) || Blockly.Latex.blank);
  return [str, Blockly.Latex.ORDER_SET_MEMBERSHIP];
};
Blockly.Latex['ctxBindType'] = function(block) {
  var str = (Blockly.Latex.valueToCode(block, "CTX", Blockly.Latex.ORDER_SET_ELEMENT) || Blockly.Latex.blank)
    + " , " + (Blockly.Latex.valueToCode(block, "VAR", Blockly.Latex.ORDER_SET_ELEMENT) || Blockly.Latex.blank);
  return [str, Blockly.Latex.ORDER_SET_MEMBERSHIP];
};