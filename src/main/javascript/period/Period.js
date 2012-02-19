goog.provide("Period");

goog.require("PeriodType");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description

 * @param {PeriodType} type
 * @constructor
 * @public
 */
var Period = function (type) {

}

/**
 *
 * @param {number} instant
 * @param {?Chronology} chronology
 * @return {number}
 * @public
 */
Period.prototype.toMillis = goog.abstractMethod;