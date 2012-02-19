goog.provide("BasicField");

goog.require("Field");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description
 *
 * @param {FieldType} type
 * @param {number} value
 * @constructor
 * @public
 * @extends Field
 */
var BasicField = function (type, value) {
    BasicField.superClass_.constructor.call(this, type);

    /**
     * @type {number}
     * @private
     */
    this._value = value;
}

goog.inherits(BasicField, Field);
