goog.provide("BasePeriod");
goog.provide("BasePeriod.Negative");

goog.require("Chronology");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description

 * @constructor
 * @public
 * @extends {Period}
 */
var BasePeriod = function () {
    BasePeriod.superClass_.constructor.call(this);
    /**
     * @type {Period}
     * @protected
     */
    this._negative = null;
};

goog.inherits(BasePeriod, Period);

/** @override */
BasePeriod.prototype.negate = function() {
    return this._negative || (this._negative = new BasePeriod.Negative(this));
};

/**
 *
 * @param {number} instant
 * @param {Chronology=} chronology
 * @return {number}
 * @public
 * @override
 */
BasePeriod.prototype.toMillis = function (instant, chronology) {
    /**
     * @type {!Chronology}
     */
    var chrono = chronology || Chronology.getDefault();

    return chrono.computePeriod(instant, this);
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
 * @extends {BasePeriod}
 */
BasePeriod.Negative = function(period) {
    BasePeriod.Negative.superClass_.constructor.call(this);

    (period instanceof BasePeriod.Negative) && Errors.throwProgrammerError();

    /**
     * @type {!Period}
     * @protected
     */
    this._negative = period;
};

goog.inherits(BasePeriod.Negative, BasePeriod);

/** @override */
BasePeriod.Negative.prototype.negate = function () {
    return this._negative;
};

/** @override */
BasePeriod.Negative.prototype.list = function () {
    /**
     * @param {!Period} period
     * @return {!Period}
     */
    var f = function (period) {
        return period.negate();
    };

    return this._negative.list().map(f);
};

/** @override */
BasePeriod.Negative.prototype.get = function (type) {
    return -this._negative.get(type);
};