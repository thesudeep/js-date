goog.provide("SinglePeriod");
goog.provide("SinglePeriod.Negative");

goog.require("BasePeriod");
goog.require("BasePeriod.Negative");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description

 * @param {!PeriodType} type
 * @param {number} value

 * @constructor
 * @public
 * @implements {PeriodField}
 * @extends {BasePeriod}
 */
var SinglePeriod = function (type, value) {
    SinglePeriod.superClass_.constructor.call(this);

    /**
     * @type {!PeriodType}
     */
    this._type = type;
    /**
     * @type {number}
     */
    this._value = value;
};

goog.inherits(SinglePeriod, BasePeriod);

/** @override */
SinglePeriod.prototype.getType = function () {
    return this._type;
};

/** @override */
SinglePeriod.prototype.negate = function() {
    return this._negative || (this._negative = new SinglePeriod.Negative(this));
};

/** @override */
SinglePeriod.prototype.list = function () {
    return [this]
};

/** @override */
SinglePeriod.prototype.get = function (type) {
    type && type !== this._type && Errors.throwUnsupportedPeriodType();

    return this._value;
};

//------------------------ Inner class section -----------------------

/**
 * JSDoc here
 *
 * @class Private implementation of negative period
 * @param {!Period} period
 *
 * @constructor
 * @public
 * @implements {PeriodField}
 * @extends {BasePeriod.Negative}
 */
SinglePeriod.Negative = function(period) {
    SinglePeriod.Negative.superClass_.constructor.call(this, period);
};

goog.inherits(SinglePeriod.Negative, BasePeriod.Negative);

/** @override */
SinglePeriod.Negative.prototype.getType = function () {
    return this._negative.getType();
};

/** @override */
SinglePeriod.Negative.prototype.list = function () {
    return [this];
};

/** @override */
SinglePeriod.Negative.prototype.get = function () {
    return -this._negative.get();
};