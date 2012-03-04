/**
 * Chronology API
 * @externs
 */

/**
 * @interface
 */
var _Chronology = function () {
};

/**
 *
 * @param {number} instant
 * @param {!Period} period
 * @return {number}
 * @public
 */
_Chronology.prototype.computePeriod = function(instant, period) {
};

/**
 *
 * @param {number} instant
 * @param {!FieldType} fieldType
 * @param {?PartialInstant} context
 * @return {!PartialInstant}
 * @public
 */
_Chronology.prototype.toPartialInstant = function(instant, fieldType, context) {
};