goog.provide("Period");

goog.require("Class");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description
 *
 * @constructor
 * @public
 * @extends {Class}
 * @implements {_Period}
 */
var Period = function () {
};

goog.inherits(Period, Class);
registerClass(Period, "Period");

/**
 *
 * @return {!Period}
 * @public
 * @override
 */
Period.prototype.negate = goog.abstractMethod;

/**
 *
 * @return {!Array.<PeriodField>}
 * @public
 * @override
 */
Period.prototype.list = goog.abstractMethod;

/**
 *
 * @param {PeriodType=} type
 * @return {number}
 * @throws {Error} in case given period type is unsupported by the implementation
 * @public
 * @override
 */
Period.prototype.get = goog.abstractMethod;

/**
 *
 * @param {number} instant
 * @param {Chronology=} chronology
 * @return {number}
 * @public
 * @override
 */
Period.prototype.toMillis = goog.abstractMethod;