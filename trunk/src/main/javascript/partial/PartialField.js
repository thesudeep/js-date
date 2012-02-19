goog.provide("PartialField");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description
 *
 * @param {number=} fieldValue
 * @param {number=} millisValue
 * @param {boolean=} leap
 * @constructor
 * @public
 */
var PartialField = function (fieldValue, millisValue, leap) {
    /**
     * @type {number}
     * @private
     */
    this._f = fieldValue || 0;
    /**
     * @type {number}
     * @private
     */
    this._m = millisValue || 0;
    /**
     * @type {boolean}
     * @private
     */
    this._l = leap === true;
};

/**
 * @return {number}
 */
PartialField.prototype.getField = function() {
    return this._f;
};

/**
 * @param {number} fieldValue
 * @return {PartialField}
 */
PartialField.prototype.setField = function(fieldValue) {
    this._f = fieldValue;
    return this;
};

/**
 * @return {number}
 */
PartialField.prototype.getMillis = function() {
    return this._m;
};

/**
 * @param {number} millisValue
 * @return {PartialField}
 */
PartialField.prototype.setMillis = function(millisValue) {
    this._m = millisValue;
    return this;
};

/**
 * @return {boolean}
 */
PartialField.prototype.isLeap = function() {
    return this._l;
};

/**
 * @param {boolean} leap
 * @return {PartialField}
 */
PartialField.prototype.setLeap = function(leap) {
    this._l = leap;
    return this;
};