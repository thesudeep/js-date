goog.provide("ZeroPeriod");

goog.require("PeriodType");
goog.require("Period");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description

 * @constructor
 * @private
 * @extends {Period}
 */
var ZeroPeriod = function () {
    ZeroPeriod.superClass_.constructor.call(this);
};

goog.inherits(ZeroPeriod, Period);

/**
 * @return {number}
 * @public
 * @override
 */
ZeroPeriod.prototype.get = function () {
    return 0;
};

/**
 * @return {number}
 * @public
 * @override
 */
ZeroPeriod.prototype.toMillis = function () {
    return 0;
};

/**
 * @type {!Period}
 * @const
 * @static
 * @private
 */
ZeroPeriod.INSTANCE = new ZeroPeriod();

/**
 *
 * @return {!Period}
 * @const
 * @public
 */
PeriodType.prototype.zero = function() {
    return ZeroPeriod.INSTANCE;
};