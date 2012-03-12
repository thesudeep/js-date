goog.provide("SystemChronology");

goog.require("Chronology");
goog.require("PeriodType");
goog.require("PartialInstant");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description
 *
 * @constructor
 * @extends {Chronology}
 * @private
 */
var SystemChronology = function() {
    SystemChronology.superClass_.constructor.call(this);
};

goog.inherits(SystemChronology, Chronology);

/**
 *
 * @param {number} instant
 * @param {!Period} period
 * @return {number}
 * @public
 * @override
 */
SystemChronology.prototype.computePeriod = function(instant, period) {
    /**
     * @type {!Date}
     */
    var result = new Date(instant);
    /**
     * @type {Array.<PeriodField>}
     */
    var list = period.list();

    for (var i = 0, len = list.length; i < len; i++) {
        var periodType = list[i].getType();
        var value = list[i].get();

        switch (periodType.ordinal()) {
            case PeriodType.MILLENNIUM.ordinal() :
                result.setFullYear(result.getFullYear() + value * 1000);
                break;
            case PeriodType.CENTURY.ordinal() :
                result.setFullYear(result.getFullYear() + value * 100);
                break;
            case PeriodType.DECADE.ordinal() :
                result.setFullYear(result.getFullYear() + value * 10);
                break;
            case PeriodType.YEAR.ordinal() :
                result.setFullYear(result.getFullYear() + value);
                break;
            case PeriodType.HALF_YEAR.ordinal() :
                result.setMonth(result.getMonth() + value * 6);
                break;
            case PeriodType.QUARTER_YEAR.ordinal() :
                result.setMonth(result.getMonth() + value * 3);
                break;
            case PeriodType.MONTH.ordinal() :
                result.setMonth(result.getMonth() + value);
                break;
            case PeriodType.WEEK.ordinal() :
                result.setDate(result.getDate() + value * 7);
                break;
            case PeriodType.DAY.ordinal() :
                result.setDate(result.getDate() + value);
                break;
            case PeriodType.HALF_DAY.ordinal() :
                result.setHours(result.getHours() + value * 12);
                break;
            case PeriodType.HOUR.ordinal() :
                result.setHours(result.getHours() + value);
                break;
            case PeriodType.HALF_HOUR.ordinal() :
                result.setMinutes(result.getMinutes() + value * 30);
                break;
            case PeriodType.QUARTER_HOUR.ordinal() :
                result.setMinutes(result.getMinutes() + value * 15);
                break;
            case PeriodType.MINUTE.ordinal() :
                result.setMinutes(result.getMinutes() + value);
                break;
            case PeriodType.SECOND.ordinal() :
                result.setSeconds(result.getSeconds() + value);
                break;
            case PeriodType.MILLISECOND.ordinal() :
                result.setMilliseconds(result.getMilliseconds() + value);
                break;
        }
    }


    return result.getTime() - instant;
};

SystemChronology.prototype.toPartialInstant = function() {
    return new PartialInstant();
};

/**
 * @type {!Chronology}
 * @const
 * @static
 * @private
 */
SystemChronology.INSTANCE = new SystemChronology();


/**
 * @return {!Chronology}
 * @static
 * @public
 */
Chronology.getSystemDefault = function() {
    return SystemChronology.INSTANCE;
};

// Define public overrides in private class.

SystemChronology.prototype["computePeriod"] = SystemChronology.prototype.computePeriod;
