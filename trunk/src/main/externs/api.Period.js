/**
 * Period API
 * @externs
 */

/**
 * @interface
 */
var _Period = function () {
};

/**
 * @return {!Period}
 */
_Period.prototype.negate = function () {
};
/**
 * @return {!Array.<Period>}
 */
_Period.prototype.list = function () {
};
/**
 * @param {PeriodType=} type
 * @return {number}
 */
_Period.prototype.get = function (type) {
};
/**
 * @param {number} instant
 * @param {Chronology=} chronology
 * @return {number}
 */
_Period.prototype.toMillis = function (instant, chronology) {
};