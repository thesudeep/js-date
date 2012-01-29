/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description
 *
 * @param {Number} [fieldValue]
 * @param {Number} [millisValue]
 * @param {Boolean} [leap]
 * @constructor
 * @private
 */
function PartialField(fieldValue, millisValue, leap) {
    /**
     * @type {Number}
     * @private
     */
    this._f = fieldValue;
    /**
     * @type {Number}
     * @private
     */
    this._m = millisValue;
    /**
     * @type {Boolean}
     * @private
     */
    this._l = leap;
}

/**
 * @return {Number}
 */
PartialField.prototype.getField = function() {
    return this._f;
};

/**
 * @param {Number} fieldValue
 * @return {PartialField}
 */
PartialField.prototype.setField = function(fieldValue) {
    this._f = fieldValue;
    return this;
};

/**
 * @return {Number}
 */
PartialField.prototype.getMillis = function() {
    return this._m;
};

/**
 * @param {Number} millisValue
 * @return {PartialField}
 */
PartialField.prototype.setMillis = function(millisValue) {
    this._m = millisValue;
    return this;
};

/**
 * @return {Boolean}
 */
PartialField.prototype.isLeap = function() {
    return this._l;
};

/**
 * @param {Number} leap
 * @return {PartialField}
 */
PartialField.prototype.setLeap = function(leap) {
    this._l = leap;
    return this;
};