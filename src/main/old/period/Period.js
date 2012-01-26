/**
 * Creates general period object.
 *
 * @param {number} quantity number of base intervals
 * @constructor
 * @class Represents general period.
 * @extends Object
 */
Period = function(quantity) {
    /**
     * @private
     * @type {number}
     */
    this._quantity = quantity;
};

/**
 * Abstract method with must be overrided in children
 *
 * @param instant
 * @this Period
 * @throws {Error} it is an abstract method.
 */
Period.prototype.duration = function(instant) {
    abstractMethod();
};

/**
 * Returns number of base intervals for the period instance.
 *
 * @returns {number} number of base intervals
 * @this Period
 */
Period.prototype.get = function() {
    return this._quantity;
};
