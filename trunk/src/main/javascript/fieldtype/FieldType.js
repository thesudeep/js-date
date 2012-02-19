goog.provide("FieldType");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description
 *
 * @param {string} name
 * @constructor
 * @public
 */
var FieldType = function (name) {
    /**
     * @type {string}
     * @private
     */
    this._name = name;
}

/**
 *
 * @param {number} fieldValue
 * @return {!Field}
 * @public
 */
FieldType.prototype.toField = goog.abstractMethod;

/**
 *
 * @param {number} instant
 * @param {PartialInstant} context
 * @return {!Field}
 * @private
 */
FieldType.prototype.withMillis = goog.abstractMethod;