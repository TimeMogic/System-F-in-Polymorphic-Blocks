
Blockly.Blocks['abs'] = {
  init: function() {
    var varField = new Blockly.FieldMathVariable("x", "Number", null, true);
    varField.addCSSClass( "blocklyQuantifierVarField" );
    var A = Blockly.TypeVar.getUnusedTypeVar();
    var B = Blockly.TypeVar.getUnusedTypeVar();
    this.appendDummyInput("V")
        .appendField("λ")
        .appendField(varField, "VAR");
    this.appendDummyInput("T")
        .appendField(":")
        .appendField(new Blockly.FieldDropdown([ ['Int', 'Int'],['Bool', 'Bool']],
            function(type) { this.sourceBlock_.changed_(type) }), 'TYPE');
    this.appendValueInput("TERM")
        .setTypeExpr(B)
        .appendField(".");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setOutputTypeExpr(new Blockly.TypeExpr ("fun", [A, B]));
    this.setColourByType();
    this.setTooltip("abstraction");
    this.changed_( this.getFieldValue( "TYPE" ) );
  },
  changed_: function(type) {
    if( type == "Bool" ) {
      var B = Blockly.TypeVar.getUnusedTypeVar();
      this.getInput("TERM").setTypeExpr(B);
      this.setOutputTypeExpr(new Blockly.TypeExpr ("fun", [new Blockly.TypeExpr('Boolean'), B]));
    } else if( type == "Int" ) {
      var B = Blockly.TypeVar.getUnusedTypeVar();
      this.getInput("TERM").setTypeExpr(B);
      this.setOutputTypeExpr(new Blockly.TypeExpr ("fun", [new Blockly.TypeExpr('Number'), B]));
    } else {
      var A = Blockly.TypeVar.getUnusedTypeVar();
      var B = Blockly.TypeVar.getUnusedTypeVar();
      this.getInput("TERM").setTypeExpr(B);
      this.setOutputTypeExpr(new Blockly.TypeExpr ("fun", [A, B]));
    }
  }
};
Blockly.JavaScript['abs'] = function(block) {
  var var_name = block.getFieldValue('VAR');
  var term_code = Blockly.JavaScript.valueToCode(block, 'TERM', Blockly.JavaScript.ORDER_NONE);
  var code = '(' + var_name + ' => ' + term_code + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['absV'] = {
  init: function() {
    var varField = new Blockly.FieldMathVariable("x", "Number", null, true);
    varField.addCSSClass( "blocklyQuantifierVarField" );
    var A = Blockly.TypeVar.getUnusedTypeVar();
    var B = Blockly.TypeVar.getUnusedTypeVar();
    this.appendDummyInput("V")
        .appendField("λ")
        .appendField(varField, "VAR");
    this.appendDummyInput("T")
        .appendField(":")
        .appendField(new Blockly.FieldMathVariable("X", "Vector"), "TYPE");
    this.appendValueInput("TERM")
        .setTypeExpr(B)
        .appendField(".");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setOutputTypeExpr(new Blockly.TypeExpr ("fun", [A, B]));
    this.setColourByType();
    this.setTooltip("abstraction");
  }
};
Blockly.JavaScript['absV'] = function(block) {
  var var_name = block.getFieldValue('VAR');
  var term_code = Blockly.JavaScript.valueToCode(block, 'TERM', Blockly.JavaScript.ORDER_NONE);
  var code = '(' + var_name + ' => ' + term_code + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['absF'] = {
  init: function() {
    var A = Blockly.TypeVar.getUnusedTypeVar();
    var B = Blockly.TypeVar.getUnusedTypeVar();
    this.appendDummyInput("V")
        .appendField("λ")
        .appendField(new Blockly.FieldMathVariable("f"), "VAR");
    this.appendDummyInput("T")
        .appendField(":")
        .appendField(new Blockly.FieldDropdown([['Int → Int', 'Int → Int'],['Bool → Bool', 'Bool → Bool'],['Int → Bool', 'Int → Bool'],['Bool → Int', 'Bool → Int']],
            function(type) { this.sourceBlock_.changed_(type) }), 'TYPE');
    this.appendValueInput("TERM")
        .setTypeExpr(B)
        .appendField(".");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setOutputTypeExpr(new Blockly.TypeExpr ("fun", [A, B]));
    this.setColourByType();
    this.setTooltip("abstraction");
    this.changed_( this.getFieldValue( "TYPE" ) );
  },
  changed_: function(type) {
    if( type == "Bool → Bool" ) {
      var B = Blockly.TypeVar.getUnusedTypeVar();
      this.getInput("TERM").setTypeExpr(B);
      this.setOutputTypeExpr(new Blockly.TypeExpr ("fun", [new Blockly.TypeExpr ("fun", [new Blockly.TypeExpr('Boolean'), new Blockly.TypeExpr('Boolean')]), B]));
    } else if( type == "Int → Int" ) {
      var B = Blockly.TypeVar.getUnusedTypeVar();
      this.getInput("TERM").setTypeExpr(B);
      this.setOutputTypeExpr(new Blockly.TypeExpr ("fun", [new Blockly.TypeExpr ("fun", [new Blockly.TypeExpr('Number'), new Blockly.TypeExpr('Number')]), B]));
    } else if( type == "Int → Bool" ) {
      var B = Blockly.TypeVar.getUnusedTypeVar();
      this.getInput("TERM").setTypeExpr(B);
      this.setOutputTypeExpr(new Blockly.TypeExpr ("fun", [new Blockly.TypeExpr ("fun", [new Blockly.TypeExpr('Number'), new Blockly.TypeExpr('Boolean')]), B]));
    } else if( type == "Bool → Int" ) {
      var B = Blockly.TypeVar.getUnusedTypeVar();
      this.getInput("TERM").setTypeExpr(B);
      this.setOutputTypeExpr(new Blockly.TypeExpr ("fun", [new Blockly.TypeExpr ("fun", [new Blockly.TypeExpr('Boolean'), new Blockly.TypeExpr('Number')]), B]));
    } else if ( type == "X → X" || type == "Y → Y" || type == "A → A" || type == "B → B" ) {
      var A = Blockly.TypeVar.getUnusedTypeVar();
      var C = Blockly.TypeVar.getUnusedTypeVar();
      this.getInput("TERM").setTypeExpr(C);
      this.setOutputTypeExpr(new Blockly.TypeExpr ("fun", [new Blockly.TypeExpr ("fun", [A, A]), C]));
    } else {
      var A = Blockly.TypeVar.getUnusedTypeVar();
      var B = Blockly.TypeVar.getUnusedTypeVar();
      var C = Blockly.TypeVar.getUnusedTypeVar();
      this.getInput("TERM").setTypeExpr(C);
      this.setOutputTypeExpr(new Blockly.TypeExpr ("fun", [new Blockly.TypeExpr ("fun", [A, B]), C]));
    }
  }
};
Blockly.JavaScript['absF'] = function(block) {
  var var_name = block.getFieldValue('VAR');
  var term_code = Blockly.JavaScript.valueToCode(block, 'TERM', Blockly.JavaScript.ORDER_NONE);
  var code = '(' + var_name + ' => ' + term_code + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.Blocks['absFv'] = {
  init: function() {
    var A = Blockly.TypeVar.getUnusedTypeVar();
    var B = Blockly.TypeVar.getUnusedTypeVar();
    var C = Blockly.TypeVar.getUnusedTypeVar();
    this.appendDummyInput("V")
        .appendField("λ")
        .appendField(new Blockly.FieldMathVariable("f"), "VAR");
    this.appendDummyInput("T1")
        .appendField(":")
        .appendField(new Blockly.FieldMathVariable("X", "Vector"), "TYPE1");
    this.appendDummyInput("T2")
        .appendField("→")
        .appendField(new Blockly.FieldMathVariable("Y", "Vector"), "TYPE2");
    this.appendValueInput("TERM")
        .setTypeExpr(C)
        .appendField(".");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setOutputTypeExpr(new Blockly.TypeExpr ("fun", [new Blockly.TypeExpr ("fun", [A, B]), C]));
    this.setColourByType();
    this.setTooltip("abstraction");
  }
};
Blockly.JavaScript['absFv'] = function(block) {
  var var_name = block.getFieldValue('VAR');
  var term_code = Blockly.JavaScript.valueToCode(block, 'TERM', Blockly.JavaScript.ORDER_NONE);
  var code = '(' + var_name + ' => ' + term_code + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.Blocks['app'] = {
  init: function() {
    var A = Blockly.TypeVar.getUnusedTypeVar();
    var B = Blockly.TypeVar.getUnusedTypeVar();
    this.appendValueInput("TERM1")
        .setTypeExpr(new Blockly.TypeExpr ("fun", [A, B]));
    this.appendValueInput("TERM2")
        .setTypeExpr(A)
        .appendField("(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setOutputTypeExpr(B);
    this.setColourByType();
    this.setTooltip("application");
  }
};
Blockly.JavaScript['app'] = function(block) {
  var term1_code = Blockly.JavaScript.valueToCode(block, 'TERM1', Blockly.JavaScript.ORDER_NONE);
  var term2_code = Blockly.JavaScript.valueToCode(block, 'TERM2', Blockly.JavaScript.ORDER_NONE);
  var code = '(' + term1_code + ')(' + term2_code + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['var'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldMathVariable("x", "Number"), "VARNAME");
    // this.appendDummyInput()
    //     .appendField(":")
    //     .appendField(new Blockly.FieldDropdown([ ['Int', 'Int'],['Bool', 'Bool'],['A','A'], ['B','B'],['X','X'], ['Y','Y']],
    //         function(type) { this.sourceBlock_.changed_(type) }), 'TYPE');
    this.setOutput(true);
    var A = Blockly.TypeVar.getUnusedTypeVar();
    this.setOutputTypeExpr(A);
    this.setColourByType();
    this.setTooltip("variable");
    this.setInputsInline(true);
    // this.changed_( this.getFieldValue( "TYPE" ) );
  },
  // changed_: function(type) {
  //   if( type == "Bool" ) {
  //     this.setOutput(true, "Boolean");
  //   } else if( type == "Int" ) {
  //     this.setOutput(true, "Number");
  //   } else {
  //     var A = Blockly.TypeVar.getUnusedTypeVar();
  //     this.setOutput(true);
  //     this.setOutputTypeExpr(A);
  //   }
  //   this.setColourByType();
  // },
  getVars: function() {
    return [[this.getFieldValue('VARNAME'), "Number"]];
  }
};
Blockly.JavaScript['var'] = function(block) {
  var code = block.getFieldValue('VARNAME');
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['func'] = {
  init: function() {
    var A = Blockly.TypeVar.getUnusedTypeVar();
    var B = Blockly.TypeVar.getUnusedTypeVar();
    this.appendDummyInput()
        .appendField(new Blockly.FieldMathVariable("f"), "VARNAME");
    this.setOutput(true);
    this.setOutputTypeExpr(new Blockly.TypeExpr ("fun", [A, B]));
    this.setColourByType();
    this.setTooltip("function");
  },
  getVars: function() {
    return [[this.getFieldValue('VARNAME'), "Number"]];
  }
};
Blockly.JavaScript['func'] = function(block) {
  var code = block.getFieldValue('VARNAME');
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['typeAbs'] = {
  init: function() {
    var A = new Blockly.TypeExpr('Vector')
    var B = Blockly.TypeVar.getUnusedTypeVar();
    this.appendDummyInput()
        .appendField("Λ")
        .appendField(new Blockly.FieldMathVariable("X"), "VAR");
    this.appendValueInput("TERM")
        .setTypeExpr(B)
        .appendField(".");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setOutputTypeExpr(new Blockly.TypeExpr ("fun", [A, B]));
    this.setColourByType();
    this.setTooltip("abstraction");
  }
};
Blockly.JavaScript['typeAbs'] = function(block) {
  var var_name = block.getFieldValue('VAR');
  var term_code = Blockly.JavaScript.valueToCode(block, 'TERM', Blockly.JavaScript.ORDER_NONE);
  var code = '(' + var_name + ' => ' + term_code + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['typeApp'] = {
  init: function() {
    var A = new Blockly.TypeExpr('Vector')
    var B = Blockly.TypeVar.getUnusedTypeVar();
    this.appendValueInput("TERM")
        .setTypeExpr(new Blockly.TypeExpr ("fun", [A, B]))
    this.appendValueInput("TYPE")
        .setCheck("Vector")
        .appendField("[");
    this.appendDummyInput()
        .appendField("]");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setOutputTypeExpr(B);
    this.setColourByType();
    this.setTooltip("type application");
  }
};
Blockly.JavaScript['typeApp'] = function(block) {
  var term1_code = Blockly.JavaScript.valueToCode(block, 'TERM', Blockly.JavaScript.ORDER_NONE);
  var term2_code = Blockly.JavaScript.valueToCode(block, 'TYPE', Blockly.JavaScript.ORDER_NONE);
  var code = '(' + term1_code + ')(' + term2_code + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['typeVari'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldMathVariable("A", "Vector"), "VARNAME");
    this.setOutput(true, "Vector");
    this.setColourByType();
    this.setTooltip("type variable");
  },
  getVars: function() {
    return [['type',"Vector"]];
  }
};
Blockly.JavaScript['typeVari'] = function(block) {
  var t = block.getFieldValue('VARNAME');
  return [t+'=\''+t+"\'", Blockly.JavaScript.ORDER_ATOMIC];
  // return ["type = \'" + t + "\'", Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['typeFunc'] = {
  init: function() {
    this.appendValueInput('TYPE1')
        .setCheck("Vector")
    this.appendValueInput('TYPE2')
        .setCheck("Vector")
        .appendField("→");
    this.setInputsInline(true);
    this.setOutput(true, "Vector");
    this.setColourByType();
    this.setTooltip("type of functions");
  },
  getVars: function() {
    return [['type',"Vector"]];
  }
};
Blockly.JavaScript['typeFunc'] = function(block) {
  var t1 = block.getInputTargetBlock('TYPE1');
  var t2 = block.getInputTargetBlock('TYPE2');
  return [t1+'+\' → \'+'+t2, Blockly.JavaScript.ORDER_ASSIGNMENT];
};

Blockly.Blocks['typeUniv'] = {
  init: function() {
    var B = Blockly.TypeVar.getUnusedTypeVar();
    this.appendDummyInput()
        .appendField("∀")
        .appendField(new Blockly.FieldMathVariable("X"), "VAR");
    this.appendValueInput("TERM")
        .setTypeExpr(B)
        .appendField(".");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setOutputTypeExpr(B);
    this.setColourByType();
    this.setTooltip("universal type");
  }
};
Blockly.JavaScript['typeUniv'] = function(block) {
  var var_name = block.getFieldValue('VAR');
  var term_code = Blockly.JavaScript.valueToCode(block, 'TERM', Blockly.JavaScript.ORDER_NONE);
  var code = '(' + var_name + ' => ' + term_code + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['types'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([['Bool', 'Bool'],
          ['Int', 'Int']]), 'TYPE');
    this.setOutput(true, "Vector");
    this.setColourByType();
    this.setTooltip('types');
  },
  getVars: function() {
    return [['type',"Vector"]];
  }
};
Blockly.JavaScript['types'] = function(block) {
  var t = block.getFieldValue('TYPE');
  return [t+'=\''+t+"\'", Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.Blocks['ctxEmpty'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("∅");
    this.setInputsInline(true);
    this.setOutput(true, "Set");
    this.setColourByType();
    this.setTooltip('empty context');
  }
};

Blockly.Blocks['ctxVar'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldMathVariable("Γ", "Set"), "VARNAME");
    this.setInputsInline(true);
    this.setOutput(true, "Set");
    this.setColourByType();
    this.setTooltip('contexts');
  },
  getVars: function() {
    return [[this.getFieldValue('VARNAME'),"Set"]];
  }
};

Blockly.Blocks['ctxBindTerm'] = {
  init: function() {
    this.appendValueInput("CTX")
        .setCheck("Set");
    this.appendValueInput("VAR")
        .setCheck("Number")
        .appendField(",");
    this.appendValueInput("TYPE")
        .setCheck("Vector")
        .appendField(":");
    this.setInputsInline(true);
    this.setOutput(true, "Set");
    this.setColourByType();
    this.setTooltip('term variable binding');
  }
};

Blockly.Blocks['ctxBindType'] = {
  init: function() {
    this.appendValueInput("CTX")
        .setCheck("Set");
    this.appendValueInput("VAR")
        .setCheck("Vector")
        .appendField(",");
    this.setInputsInline(true);
    this.setOutput(true, "Set");
    this.setColourByType();
    this.setTooltip('type variable binding');
  }
};


Blockly.Blocks['number'] = {
  /**
   * Block for numeric value.
   * @this {Blockly.Block}
   */
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldNumber('1',
        Blockly.FieldTextInput.numberValidator), 'NUM');
    this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.MATH_NUMBER_TOOLTIP);
    this.setColourByType();
  }
};
Blockly.JavaScript['number'] = function(block) {
  var num_value = block.getFieldValue('NUM');
  var code = num_value;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['arithmetic'] = {
  /**
   * Block for arithmetic operations.
   * @this {Blockly.Block}
   */
  init: function() {
    this.setOutput(true, 'Number');
    this.appendValueInput('A')
        .setCheck('Number');
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
            ['+', 'ADD'],
            ['-', 'MINUS'],
            ['\u00D7', 'MULTIPLY'],
            ['\u00F7', 'DIVIDE'],
            ['^', 'POWER']]), 'OP');
    this.appendValueInput('B')
        .setCheck('Number');
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.MATH_ARITHMETIC_TOOLTIP);
    this.setColourByType();
  }
};
Blockly.JavaScript['arithmetic'] = function(block) {
  var value_a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC);
  var value_b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC);
  var operator = block.getFieldValue('OP');
  
  var operations = {
    'ADD': '+',
    'MINUS': '-', 
    'MULTIPLY': '*',
    'DIVIDE': '/',
    'POWER': '**'
  };

  var code = '(' + value_a + ' ' + operations[operator] + ' ' + value_b + ')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['bool'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.LOGIC_BOOLEAN_TRUE, '☑'],
          [Blockly.Msg.LOGIC_BOOLEAN_FALSE, '☒']]), 'VAL');
    this.setOutput(true, "Boolean");
    this.setColourByType();
    this.setTooltip('boolean variable');
  },
};
Blockly.JavaScript['bool'] = function(block) {
  var var_name = block.getFieldValue('VAL');
  var code = var_name == '☑' ? 'true' : 'false';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['comp'] = {
  init: function() {
    var OPERATORS = [
      ['=', '='],
      ['\u2260', '≠'],
      ['<', '<'],
      ['\u2264', '≤'],
      ['>', '>'],
      ['\u2265', '≥']
    ];
    this.setOutput(true, 'Boolean');
    this.appendValueInput('A')
        .setCheck(['Number', 'Boolean','A']);
    this.appendValueInput('B')
        .setCheck(['Number', 'Boolean','A'])
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
    this.setColourByType();
  }
};
Blockly.JavaScript['comp'] = function(block) {
  var value_a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC);
  var value_b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC);
  var operator = block.getFieldValue('OP');
  var operations = {
    '=': '==',
    '≠': '!=',
    '<': '<',
    '≤': '<=',
    '>': '>',
    '≥': '>='
  };
  var code = '(' + value_a + ' ' + operations[operator] + ' ' + value_b + ')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};







