"use strict";

/**
 * Text element without background.
 * 
 * @class Text
 * @extends {Element}
 * @param {DOM} parent Parent element.
 */
function Text(parent)
{
	Element.call(this, parent);

	this.element.style.pointerEvents = "none";
	this.element.style.color = Editor.theme.textColor;
	this.element.style.display = "flex";

	//Span
	this.span = document.createElement("span");
	this.span.style.whiteSpace = "pre";
	this.element.appendChild(this.span);

	//Text
	this.text = document.createTextNode("");
	this.span.appendChild(this.text);

	this.setVerticalAlignment(Text.CENTER);
	this.setAlignment(Text.CENTER);

	//Attributes
	this.fitContent = false;
}

Text.CENTER = 0;
Text.LEFT = 1;
Text.RIGHT = 2;
Text.TOP = 3;
Text.BOTTOM = 4;

Text.CLIP = 10;
Text.ELLIPSIS = 11;

Text.prototype = Object.create(Element.prototype);

/**
 * Enable of disable word breaking.
 *
 * @method allowWordBreak
 * @param {Boolean} line If true words can be breaked.
 */
Text.prototype.allowWordBreak = function(line)
{
	this.span.style.wordWrap = (line === true) ? "break-word" : "normal";
};

/**
 * Set text.
 *
 * @method setText
 * @param {String} text Text. 
 */
Text.prototype.setText = function(text)
{
	this.text.data = text;
};

/**
 * Set text border.
 *
 * @method setTextBorder
 * @param {Number} size Border size in pixels.
 * @param {String} color CSS Color. 
 */
Text.prototype.setTextBorder = function(size, color)
{
	this.span.style.textShadow = "-" + size + "px 0 " + color + ", 0 " + size + "px " + color + ", " + size + "px 0 " + color + ", 0 -" + size + "px " + color;
};

/**
 * Set Text size, in pixels.
 * 
 * @method setTextSize
 * @param {Number} size Size in pixel for this text element.
 */
Text.prototype.setTextSize = function(size)
{
	this.element.style.fontSize = size + "px";
};

/**
 * Set text color.
 * 
 * @method setTextColor
 * @param {String} color Color code.
 */
Text.prototype.setTextColor = function(color)
{
	this.span.style.color = color;
};

/**
 * Set text overflow handling
 *
 * @method setOverflow
 * @param {Number} overflow
 */
Text.prototype.setOverflow = function(overflow)
{
	this.span.style.textOverflow = overflow === Text.ELLIPSIS ? "ellipsis" : "clip";
};

/**
 * Set text horizontal alignment.
 *  - Text.CENTER
 *  - Text.LEFT
 *  - Text.RIGHT
 * 
 * @method setAlignment
 * @param {Number} align Alingment mode.
 */
Text.prototype.setAlignment = function(align)
{
	if(align === Text.CENTER)
	{
		this.element.style.justifyContent = "center";
		this.element.style.textAlign = "center";
	}
	else if(align === Text.LEFT)
	{
		this.element.style.justifyContent = "flex-start";
		this.element.style.textAlign = "left";
	}
	else if(align === Text.RIGHT)
	{
		this.element.style.justifyContent = "flex-end";
		this.element.style.textAlign = "right";
	}
};

/**
 * Set text vertical alignment.
 *  - Text.CENTER
 *  - Text.TOP
 *  - Text.BOTTOM
 * 
 * @method setVerticalAlignment
 * @param {Number} align Alingment mode.
 */
Text.prototype.setVerticalAlignment = function(align)
{
	if(align === Text.CENTER)
	{
		this.element.style.alignItems = "center";
	}
	else if(align === Text.TOP)
	{
 		this.element.style.alignItems = "flex-start";
	}
	else if(align === Text.BOTTOM)
	{
		this.element.style.alignItems = "flex-end";
	}
};

/**
 * Set text internal margin in pixels.
 * 
 * @method setMargin
 * @param {Number} margin Margin size in pixels.
 */
Text.prototype.setMargin = function(margin)
{
	this.span.style.margin = margin + "px";
};

Text.prototype.updateVisibility = function()
{
	this.element.style.visibility = this.visible ? "visible" : "hidden";
}

Text.prototype.updateSize = function()
{
	if(this.fitContent)
	{
		this.size.x = this.span.clientWidth;
		this.size.y = this.span.clientHeight;
	}
	
	Element.prototype.updateSize.call(this);
};