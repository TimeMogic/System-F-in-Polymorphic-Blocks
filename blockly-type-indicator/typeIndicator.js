/**
    @license
    Copyright 2015 Hendrik Diel
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
        http://www.apache.org/licenses/LICENSE-2.0
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    @fileoverview
    This file adds a indicator to all connections that shows if a dragging block is type compatible
    @author
    diel.hendrik@gmail.com (Hendrik Diel)
*/

(function() {
	"use strict";
 // keep in mind if we are dragging right now
 var draggingWorkspace = null;

 /**
  * This Event is beeing called when a block is droped. We then need to remove all
  * type indicators from the workspace.
  * @return {undefined}
  */
 // Store google's terminateDrag in a variable so we can expand it.
 var oldTerminateDrag = Blockly.BlockSvg.terminateDrag;
 Blockly.BlockSvg.terminateDrag = function() {
  // Only if the user was dragging
  if (draggingWorkspace) {
   // Go through all the blocks
   var allBlocks = draggingWorkspace.getAllBlocks();
   allBlocks.forEach(function(otherBlock) {
    // And all their visible connections
    var otherConnections = otherBlock.getConnections_(false);
    otherConnections.forEach(function(otherConn) {
     // remove the type highlight if it has one
     if (otherConn.typeHighlightSvgPath) {
      goog.dom.removeNode(otherConn.typeHighlightSvgPath);
      delete otherConn.typeHighlightSvgPath;
      otherConn.typeHighlightSvgPath = false;
     }
    });
   });
   //now theres no workspace in which the user is dragging
   draggingWorkspace = null;
  }
  // call the original terminateDrag so it can do its job
  oldTerminateDrag();
 };

 /**
  * Creates the indicators on the first mouse move of an drag since all the
  * blocks have moved we dont need to worry about moving the indicators
  * along with the blocks.
  * @type {undefined}
  */
 //save old onMouseMove_() for later call
 var oldOnMouseMove_ = Blockly.BlockSvg.prototype.onMouseMove_;
 Blockly.BlockSvg.prototype.onMouseMove_ = function(e) {
  var this_ = this; // we need to save the this context so the command beeing created can access it
   if (Blockly.dragMode_ == 2 && !draggingWorkspace) { // Only on first drag move
    draggingWorkspace = this_.workspace;
    // If this is a Value block we need to check the outputConnection,
    // otherwise its a statement connection so we need the previousConnection
    // or a block without relevant conenctions at all.
    var typ = "dummy";
    var outCon = null;
		var inCon = null;
    if (this_.outputConnection) {
     outCon = this_.outputConnection;
     typ = "input";
    }if (this_.previousConnection) {
     outCon = this_.previousConnection;
     typ = "statement";
	 }if(this_.nextConnection){
			inCon = this_.nextConnection;
			typ = "statement";
		}
    if (outCon) {
     // To get all potential connections by looking up the opposite type
     // and geting all connections of that type from the workspace
     var oppositeType = Blockly.OPPOSITE_TYPE[outCon.type];

     var cons = draggingWorkspace.connectionDBList[oppositeType];

     cons.forEach(function(otherConn) {
      if (outCon.checkType_(otherConn) && // type must match
       !otherConn.typeHighlightSvgPath && // only highlight if not already highlighted
       !this_.isParentOf(otherConn.sourceBlock_) // don't highlight childblocks
      ) {
       // Add the highlight and save the node so we can remove it later
       if (((typ == "statement") || (typ == "input") && !(otherConn.targetConnection)))
        otherConn.typeHighlightSvgPath = otherConn.typeHighlight();
       else
        otherConn.typeHighlightSvgPath = otherConn.typeHighlight('blocklyOccupiedTypeHighlightedConnectionPath');
      }
     });
    }
		if(inCon){
		 var oppositeInType = Blockly.OPPOSITE_TYPE[inCon.type];
		 var consIn = draggingWorkspace.connectionDBList[oppositeInType];
		 consIn.forEach(function(otherConn) {
			if (outCon.checkType_(otherConn) && // type must match
			 !otherConn.typeHighlightSvgPath && // only highlight if not already highlighted
			 !this_.isParentOf(otherConn.sourceBlock_) // don't highlight childblocks
			) {
			 // Add the highlight and save the node so we can remove it later
			 if (((typ == "statement") || (typ == "input") && !(otherConn.targetConnection)))
				otherConn.typeHighlightSvgPath = otherConn.typeHighlight();
			 else
				otherConn.typeHighlightSvgPath = otherConn.typeHighlight('blocklyOccupiedTypeHighlightedConnectionPath');
			}
		 });

		}
   }
  // Call googles onMouseMove_() so it can do the rest
  oldOnMouseMove_.call(this, e);
 };

 /**
  * Creates the svg path for a highlight on a connection
  * @return {SvgElement} the created path
  */
 Blockly.Connection.prototype.typeHighlight = function(type) {
  if (typeof type === 'undefined')
   type = 'blocklyTypeHighlightedConnectionPath';
  var steps;
  if (this.type == Blockly.INPUT_VALUE || this.type == Blockly.OUTPUT_VALUE) {
   steps = 'm 0,0 ' + Blockly.BlockSvg.getDownPath(this) + 'v 5';
  } else {
   if (this.sourceBlock_.RTL) {
    steps = 'm 20,0 h -5 ' + Blockly.BlockSvg.NOTCH_PATH_RIGHT + ' h -5';
   } else {
    steps = 'm -20,0 h 5 ' + Blockly.BlockSvg.NOTCH_PATH_LEFT + ' h 5';
   }
  }
  var xy = this.sourceBlock_.getRelativeToSurfaceXY();
  var x = this.x_ - xy.x;
  var y = this.y_ - xy.y;

  return Blockly.createSvgElement('path', {
    'class': type,
    'd': steps,
    transform: 'translate(' + x + ', ' + y + ')'
   },
   this.sourceBlock_.getSvgRoot()
  );
 };

 /**
  * Checks if the given block is a child of this block
  * @param  {Block}  block
  * @return {Boolean} true if block is a child of this or equals this. false otherwise
  */
 Blockly.Block.prototype.isParentOf = function(block) {
  if (block === null || block.parentBlock_ === undefined)
   return false;
  if (this === block)
   return true;
  else
   return this.isParentOf(block.parentBlock_);
 };

 // Add some styling to the type indicator
 Blockly.Css.CONTENT.push(
  '.blocklyTypeHighlightedConnectionPath {',
  '  fill: none;',
  '  stroke: #FC3;',
  '  stroke-width: 2px;',
	'  opacity: 1;',
  '}');

 // Change googles indicator color
 Blockly.Css.CONTENT.push(
  '.blocklyHighlightedConnectionPath {',
  '  stroke: #FC3;',
	'  stroke-width: 4px;',
	'  opacity: 1;',
  '}');

 // Add some styling to the occupied type indicator
 Blockly.Css.CONTENT.push(
  '.blocklyOccupiedTypeHighlightedConnectionPath {',
  '  fill: none;',
  '  stroke: #FC3;',
  '  stroke-width: 2px;',
  '  opacity: 1;',
  '}');


/**
 * Creates an array of CSSStyleDeclaration that contains all blockly styles that have exactly the given selector.
 * @param  {String} selector The selector
 * @return {Array}          Array containing the CSSStyleDeclarations
 */
Blockly.Css.getStylesBySelector = function(selector){
	var rules = Blockly.Css.styleSheet_.rules;
	var styles = [];
	for (var i = 0; i < rules.length; i++) {
		if(rules[i].selectorText === selector)
			styles.push(rules[i].style);
	}
	return styles.length>0?styles:false;
};

/**
 * Adds a rule to Blocklys css.
 * @param  {String} selector The rules selector
 * @param  {String} content  The content of the rule (without curly parenthesis)
 * @return {CSSStyleDeclaration} the css style of the rule.
 */
Blockly.Css.addRule = function(selector, content){
	var id = Blockly.Css.styleSheet_.insertRule(selector + "{\n" + content + "\n}\n", Blockly.Css.styleSheet_.length);
	return Blockly.Css.styleSheet_.rules[id].style;
};

/**
 * Sets the colour of the indicators
 * @param  {String} near     The colour for the indicator that appears on a connection to which a dregged block connects if released
 * @param  {String} far      The colour for the indicator that appears on type compatible blocks that are not occupied
 * @param  {String} occupied The colour for the indicator that appears on type compatible blocks that are occupied
 */
 Blockly.Css.setTypeIndicatorColours = function(near, far, occupied){
	 var nearStyles = Blockly.Css.getStylesBySelector(".blocklyTypeHighlightedConnectionPath");
	 var nearStyle;
	 if(!nearStyles){
			nearStyle = Blockly.Css.addRule(".blocklyTypeHighlightedConnectionPath", "");
			nearStyle.strokeWidth = "4px";
			nearStyle.fill = "none";
		} else
			nearStyle = nearStyles[nearStyles.length-1];
	 	nearStyle.stroke = near;

	 var farStyles = Blockly.Css.getStylesBySelector(".blocklyHighlightedConnectionPath");
	 var farStyle;
	 if(!farStyles){
		 farStyle = Blockly.Css.addRule(".blocklyHighlightedConnectionPath", "");
		 farStyle.fill = "none";
	 } else
	 	farStyle = farStyles[farStyles.length-1];
	 farStyle.stroke = far;

	 var occupiedStyles = Blockly.Css.getStylesBySelector(".blocklyOccupiedTypeHighlightedConnectionPath");
	 var occupiedStyle;
	 if(!occupiedStyles){
	 	occupiedStyle = Blockly.Css.addRule(".blocklyOccupiedTypeHighlightedConnectionPath", "");
		occupiedStyle.strokeWidth = "2px";
		occupiedStyle.fill = "none";
	} else
		occupiedStyle = occupiedStyles[occupiedStyles.length-1];
	occupiedStyle.stroke = occupied;
};
})();
