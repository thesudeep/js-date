goog.provide("PartialInstant");

goog.require("PartialField");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description
 *
 * @constructor
 * @public
 */
var PartialInstant = function () {
};

/**
 * @param {number} instant
 * @param {Chronology=} chronology
 * @return {number}
 */
PartialInstant.prototype.toMillis = goog.abstractMethod;