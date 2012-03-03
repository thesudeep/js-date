goog.provide("Period");

goog.require("PeriodType");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description

 * @constructor
 * @public
 */
var Period = function () {

};

/**
 *
 * @param {PeriodType=} type
 * @return {number}
 * @throws {Error} in case given period type is unsupported by the implementation
 * @public
 */
Period.prototype.get = goog.abstractMethod;

/**
 *
 * @param {number} instant
 * @param {?Chronology} chronology
 * @return {number}
 * @public
 */
Period.prototype.toMillis = goog.abstractMethod;