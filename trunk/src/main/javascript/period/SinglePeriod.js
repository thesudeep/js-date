goog.provide("SinglePeriod");

goog.require("PeriodType");
goog.require("Period");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description

 * @param {!PeriodType} type
 * @param {number} value
 * @constructor
 * @private
 * @extends {Period}
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

goog.inherits(SinglePeriod, Period);

/**
 * @param {PeriodType=} type
 * @return {number}
 * @public
 * @override
 */
SinglePeriod.prototype.get = function (type) {
    type && type !== this._type && Errors.throwUnsupportedPeriodType();

    return this._value;
};

/**
 *
 * @param {number} instant
 * @param {?Chronology} chronology
 * @return {number}
 * @public
 * @override
 */
SinglePeriod.prototype.toMillis = function (instant, chronology) {

};

/**
 *
 * @param {number} value
 * @return {!Period}
 * @throws {Error} in case period value is negative
 * @public
 */
PeriodType.prototype.toPeriod = function(value) {
    value < 0 && Errors.throwNegaivePeriodValue();

    switch (value) {
        case 0: return this.zero();
        case 1: return this.one();
        case 2: return this.two();
        case 3: return this.three();
        case 4: return this.four();
        case 5: return this.five();
        case 6: return this.six();
        case 7: return this.seven();
        case 8: return this.eight();
        case 9: return this.nine();
        case 10: return this.ten();
        case 11: return this.eleven();
        case 12: return this.twelve();
        default: return new SinglePeriod(this, value);
    }
};

/**
 * @return {!Period}
 * @const
 * @public
 */
PeriodType.prototype.one = singlePeriodTypeFactory(1);

/**
 * @return {!Period}
 * @const
 * @public
 */
PeriodType.prototype.two = singlePeriodTypeFactory(2);

/**
 * @return {!Period}
 * @const
 * @public
 */
PeriodType.prototype.three = singlePeriodTypeFactory(3);

/**
 * @return {!Period}
 * @const
 * @public
 */
PeriodType.prototype.four = singlePeriodTypeFactory(4);

/**
 * @return {!Period}
 * @const
 * @public
 */
PeriodType.prototype.five = singlePeriodTypeFactory(5);

/**
 * @return {!Period}
 * @const
 * @public
 */
PeriodType.prototype.six = singlePeriodTypeFactory(6);

/**
 * @return {!Period}
 * @const
 * @public
 */
PeriodType.prototype.seven = singlePeriodTypeFactory(7);

/**
 * @return {!Period}
 * @const
 * @public
 */
PeriodType.prototype.eight = singlePeriodTypeFactory(8);

/**
 * @return {!Period}
 * @const
 * @static
 * @public
 */
PeriodType.prototype.nine = singlePeriodTypeFactory(9);

/**
 * @return {!Period}
 * @const
 * @public
 */
PeriodType.prototype.ten = singlePeriodTypeFactory(10);

/**
 * @return {!Period}
 * @const
 * @static
 * @public
 */
PeriodType.prototype.eleven = singlePeriodTypeFactory(11);

/**
 * @return {!Period}
 * @const
 * @public
 */
PeriodType.prototype.twelve = singlePeriodTypeFactory(12);

/**
 *
 * @param {number} value
 * @return {function(this:PeriodType):!Period}
 * @private
 */
function singlePeriodTypeFactory(value) {
    return function () {
        var key = String(value);

        return this[key] || (this[key] = new SinglePeriod(this, value));
    };
}