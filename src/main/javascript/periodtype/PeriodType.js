/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description
 *
 * @param {Number} ordinal
 * @param {String} name
 * @constant
 * @constructor
 * @public
 */
function PeriodType(ordinal, name) {
    this.chain(ordinal, name);
}

inherits(PeriodType, Enum);

/**
 *
 * @return {PeriodType[]}
 * @constant
 * @static
 * @public
 */
PeriodType.values = function () {
    return Enum.values(PeriodType);
};

/**
 * @param {String} name
 * @return {Enum}
 * @constant
 * @static
 * @public
 */
PeriodType.valueOf = function (name) {
    return Enum.valueOf(PeriodType, name);
};

/**
 *
 * @param {PeriodType} periodType
 * @return {Number}
 */
PeriodType.prototype.compareTo = function (periodType) {
    return this.overridden().compareTo.call(this, periodType);
};

/**
 * @constant
 * @public
 */
PeriodType.MILLENIUM = new PeriodType(1000, "MILLENIUM");
/**
 * @constant
 * @public
 */
PeriodType.CENTURY = new PeriodType(1100, "CENTURY");
/**
 * @constant
 * @public
 */
PeriodType.DECADE = new PeriodType(1200, "DECADE");
/**
 * @constant
 * @public
 */
PeriodType.YEAR = new PeriodType(1300, "YEAR");
/**
 * @constant
 * @public
 */
PeriodType.HALF_YEAR = new PeriodType(1400, "HALF_YEAR");
/**
 * @constant
 * @public
 */
PeriodType.QUARTER_YEAR = new PeriodType(1500, "QUARTER_YEAR");
/**
 * @constant
 * @public
 */
PeriodType.MONTH = new PeriodType(1600, "MONTH");
/**
 * @constant
 * @public
 */
PeriodType.WEEK = new PeriodType(1700, "WEEK");
/**
 * @constant
 * @public
 */
PeriodType.DAY = new PeriodType(2000, "DAY");
/**
 * @constant
 * @public
 */
PeriodType.HALF_DAY = new PeriodType(2100, "HALF_DAY");
/**
 * @constant
 * @public
 */
PeriodType.HOUR = new PeriodType(2200, "HOUR");
/**
 * @constant
 * @public
 */
PeriodType.HALF_HOUR = new PeriodType(2300, "HALF_HOUR");
/**
 * @constant
 * @public
 */
PeriodType.QUARTER_HOUR = new PeriodType(2400, "QUARTER_HOUR");
/**
 * @constant
 * @public
 */
PeriodType.MINUTE = new PeriodType(2500, "MINUTE");
/**
 * @constant
 * @public
 */
PeriodType.SECOND = new PeriodType(2600, "SECOND");
/**
 * @constant
 * @public
 */
PeriodType.MILLISECOND = new PeriodType(2700, "MILLISECOND");
