goog.provide("PeriodType");

goog.require("Enum");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description
 *
 * @param {number} ordinal
 * @param {string} name
 * @const
 * @constructor
 * @public
 * @extends Enum
 */
var PeriodType = function (ordinal, name) {
    PeriodType.superClass_.constructor.call(this, ordinal, name);
}

goog.inherits(PeriodType, Enum);

/**
 *
 * @return {Array.<PeriodType>}
 * @const
 * @static
 * @public
 */
PeriodType.values = function () {
    return Enum.values(PeriodType);
};

/**
 * @param {string} name
 * @return {PeriodType}
 * @const
 * @static
 * @public
 */
PeriodType.valueOf = function (name) {
    return /** @type {PeriodType} */ (Enum.valueOf(PeriodType, name));
};

/**
 *
 * @param {PeriodType} periodType
 * @return {number}
 */
PeriodType.prototype.compareTo = function (periodType) {
    return PeriodType.superClass_.compareTo.call(this, periodType);
};

/**
 * @type {PeriodType}
 * @const
 * @public
 */
PeriodType.MILLENIUM = new PeriodType(1000, "MILLENIUM");
/**
 * @type {PeriodType}
 * @const
 * @public
 */
PeriodType.CENTURY = new PeriodType(1100, "CENTURY");
/**
 * @type {PeriodType}
 * @const
 * @public
 */
PeriodType.DECADE = new PeriodType(1200, "DECADE");
/**
 * @type {PeriodType}
 * @const
 * @public
 */
PeriodType.YEAR = new PeriodType(1300, "YEAR");
/**
 * @type {PeriodType}
 * @const
 * @public
 */
PeriodType.HALF_YEAR = new PeriodType(1400, "HALF_YEAR");
/**
 * @type {PeriodType}
 * @const
 * @public
 */
PeriodType.QUARTER_YEAR = new PeriodType(1500, "QUARTER_YEAR");
/**
 * @type {PeriodType}
 * @const
 * @public
 */
PeriodType.MONTH = new PeriodType(1600, "MONTH");
/**
 * @type {PeriodType}
 * @const
 * @public
 */
PeriodType.WEEK = new PeriodType(1700, "WEEK");
/**
 * @type {PeriodType}
 * @const
 * @public
 */
PeriodType.DAY = new PeriodType(2000, "DAY");
/**
 * @type {PeriodType}
 * @const
 * @public
 */
PeriodType.HALF_DAY = new PeriodType(2100, "HALF_DAY");
/**
 * @type {PeriodType}
 * @const
 * @public
 */
PeriodType.HOUR = new PeriodType(2200, "HOUR");
/**
 * @type {PeriodType}
 * @const
 * @public
 */
PeriodType.HALF_HOUR = new PeriodType(2300, "HALF_HOUR");
/**
 * @type {PeriodType}
 * @const
 * @public
 */
PeriodType.QUARTER_HOUR = new PeriodType(2400, "QUARTER_HOUR");
/**
 * @type {PeriodType}
 * @const
 * @public
 */
PeriodType.MINUTE = new PeriodType(2500, "MINUTE");
/**
 * @type {PeriodType}
 * @const
 * @public
 */
PeriodType.SECOND = new PeriodType(2600, "SECOND");
/**
 * @type {PeriodType}
 * @const
 * @public
 */
PeriodType.MILLISECOND = new PeriodType(2700, "MILLISECOND");
