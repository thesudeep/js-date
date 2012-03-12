goog.provide("PeriodType");

goog.require("Enum");
goog.require("ZeroPeriod");
goog.require("SinglePeriod");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description
 *
 * @param {number} ordinal
 * @param {string} name

 * @constructor
 * @implements {_PeriodType}
 * @extends {Enum}
 * @public
 */
var PeriodType = function (ordinal, name) {
    PeriodType.superClass_.constructor.call(this, ordinal, name);

    /**
     * @type {!Period}
     * @private
     */
    this._one;
};

goog.inherits(PeriodType, Enum);
registerClass(PeriodType, "PeriodType");

/**
 * @type {!Period}
 * @private
 */
PeriodType.ZERO = new ZeroPeriod();

/**
 *
 * @return {!Array.<PeriodType>}
 * @static
 * @public
 */
PeriodType.values = function () {
    return Enum.values(obtainClass(PeriodType));
};

/**
 * @param {string} name
 * @return {PeriodType}
 * @static
 * @public
 */
PeriodType.valueOf = function (name) {
    return /** @type {PeriodType} */ (Enum.valueOf(name, obtainClass(PeriodType)));
};

/**
 * @return {!Period}
 * @public
 * @override
 */
PeriodType.prototype.zero = function () {
    return PeriodType.ZERO;
};

/**
 * @return {!Period}
 * @public
 * @override
 */
PeriodType.prototype.one = function () {
    return this._one || (this._one = new SinglePeriod(this, 1));
};

/**
 *
 * @param {number} value
 * @return {!Period}
 * @public
 * @override
 */
PeriodType.prototype.toPeriod = function (value) {
    var negative = value < 0;

    value = Math.abs(value);

    /**
     * @type {!Period}
     */
    var period;

    switch (value) {
        case 0:
            return this.zero();
        case 1:
            period = this.one();
            break;
        default:
            period = new SinglePeriod(this, value);
    }

    return negative ? period.negate() : period;
};

/**
 * @type {!PeriodType}
 * @const
 * @static
 * @public
 */
PeriodType.MILLENNIUM = new PeriodType(1000, "MILLENNIUM");
/**
 * @type {!PeriodType}
 * @const
 * @static
 * @public
 */
PeriodType.CENTURY = new PeriodType(1100, "CENTURY");
/**
 * @type {!PeriodType}
 * @const
 * @static
 * @public
 */
PeriodType.DECADE = new PeriodType(1200, "DECADE");
/**
 * @type {!PeriodType}
 * @const
 * @static
 * @public
 */
PeriodType.YEAR = new PeriodType(1300, "YEAR");
/**
 * @type {!PeriodType}
 * @const
 * @static
 * @public
 */
PeriodType.HALF_YEAR = new PeriodType(1400, "HALF_YEAR");
/**
 * @type {!PeriodType}
 * @const
 * @static
 * @public
 */
PeriodType.QUARTER_YEAR = new PeriodType(1500, "QUARTER_YEAR");
/**
 * @type {!PeriodType}
 * @const
 * @static
 * @public
 */
PeriodType.MONTH = new PeriodType(1600, "MONTH");
/**
 * @type {!PeriodType}
 * @const
 * @static
 * @public
 */
PeriodType.WEEK = new PeriodType(1700, "WEEK");
/**
 * @type {!PeriodType}
 * @const
 * @static
 * @public
 */
PeriodType.DAY = new PeriodType(2000, "DAY");
/**
 * @type {!PeriodType}
 * @const
 * @static
 * @public
 */
PeriodType.HALF_DAY = new PeriodType(2100, "HALF_DAY");
/**
 * @type {!PeriodType}
 * @const
 * @static
 * @public
 */
PeriodType.HOUR = new PeriodType(2200, "HOUR");
/**
 * @type {!PeriodType}
 * @const
 * @static
 * @public
 */
PeriodType.HALF_HOUR = new PeriodType(2300, "HALF_HOUR");
/**
 * @type {!PeriodType}
 * @const
 * @static
 * @public
 */
PeriodType.QUARTER_HOUR = new PeriodType(2400, "QUARTER_HOUR");
/**
 * @type {!PeriodType}
 * @const
 * @static
 * @public
 */
PeriodType.MINUTE = new PeriodType(2500, "MINUTE");
/**
 * @type {!PeriodType}
 * @const
 * @static
 * @public
 */
PeriodType.SECOND = new PeriodType(2600, "SECOND");
/**
 * @type {!PeriodType}
 * @const
 * @static
 * @public
 */
PeriodType.MILLISECOND = new PeriodType(2700, "MILLISECOND");
