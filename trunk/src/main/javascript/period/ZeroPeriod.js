goog.provide("ZeroPeriod");

goog.require("Period");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Implementation of the NONE period
 * @constructor
 * @public
 * @extends {Period}
 */
var ZeroPeriod = function () {
};

goog.inherits(ZeroPeriod, Period)

/** @override */
ZeroPeriod.prototype.negate = function () {
    return this;
};

/** @override */
ZeroPeriod.prototype.list = function () {
    return [];
};

/** @override */
ZeroPeriod.prototype.get = function () {
    return 0;
};

/** @override */
ZeroPeriod.prototype.toMillis = function () {
    return 0;
};