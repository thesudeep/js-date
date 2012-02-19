goog.provide("Field");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description

 * @param {FieldType} type
 * @constructor
 * @public
 */
var Field = function (type) {
    /**
     * @type {FieldType}
     * @private
     */
    this._type = type;
}

/**
 *
 * @param {number} instant
 * @param {?Chronology} chronology
 * @return {number}
 * @public
 */
Field.prototype.toMillis = goog.abstractMethod;