goog.provide("Chronology");

goog.require("FieldType");
goog.require("PartialInstant");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @constructor
 * @class Class description
 * @public
 */
var Chronology = function () {
}

/**
 *
 * @param {number} instant
 * @param {!FieldType} fieldType
 * @param {?PartialInstant} context
 * @return {!PartialInstant}
 * @private
 */
Chronology.prototype.toPartialInstant = goog.abstractMethod;
