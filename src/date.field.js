Date.Field = {};
// These are ints not enumerations as they represent genuine int values
/** Constant (1) representing Monday, the first day of the week (ISO) */
Date.Field.MONDAY = 1;
/** Constant (2) representing Tuesday, the second day of the week (ISO) */
Date.Field.TUESDAY = 2;
/** Constant (3) representing Wednesday, the third day of the week (ISO) */
Date.Field.WEDNESDAY = 3;
/** Constant (4) representing Thursday, the fourth day of the week (ISO) */
Date.Field.THURSDAY = 4;
/** Constant (5) representing Friday, the fifth day of the week (ISO) */
Date.Field.FRIDAY = 5;
/** Constant (6) representing Saturday, the sixth day of the week (ISO) */
Date.Field.SATURDAY = 6;
/** Constant (7) representing Sunday, the seventh day of the week (ISO) */
Date.Field.SUNDAY = 7;
/** Constant (0) representing AM, the morning (from Calendar) */
Date.Field.AM = 0;
/** Constant (1) representing PM, the afternoon (from Calendar) */
Date.Field.PM = 1;
/** Constant (0) representing BC, years before zero (from Calendar) */
Date.Field.BC = 0;
/** Alternative constant (0) representing BCE, Before Common Era (secular) */
Date.Field.BCE = 0;
/**
 * Constant (1) representing AD, years after zero (from Calendar).
 * <p>
 * All new chronologies with differrent Era values should try to assign
 * eras as follows. The era that was in force at 1970-01-01 (ISO) is assigned
 * the value 1. Earlier eras are assigned sequentially smaller numbers.
 * Later eras are assigned sequentially greater numbers.
 */
Date.Field.AD = 1;
/**
 * Alternative constant (1) representing CE, Common Era (secular).
 * <p>
 * All new chronologies with differrent Era values should try to assign
 * eras as follows. The era that was in force at 1970-01-01 (ISO) is assigned
 * the value 1. Earlier eras are assigned sequentially smaller numbers.
 * Later eras are assigned sequentially greater numbers.
 */
Date.Field.CE = 1;
/** Milliseconds in one second (1000) (ISO) */
Date.Field.MILLS_PER_SECOND = 1000;
/** Seconds in one minute (60) (ISO) */
Date.Field.SECONDS_PER_MINUTE = 60;
/** Milliseconds in one minute (ISO) */
Date.Field.MILLS_PER_MINUTE = Date.Field.MILLS_PER_SECOND * Date.Field.SECONDS_PER_MINUTE;
/** Minutes in one hour (ISO) */
Date.Field.MINUTES_PER_HOUR = 60;
/** Seconds in one hour (ISO) */
Date.Field.SECONDS_PER_HOUR = Date.Field.SECONDS_PER_MINUTE * Date.Field.MINUTES_PER_HOUR;
/** Milliseconds in one hour (ISO) */
Date.Field.MILLS_PER_HOUR = Date.Field.MILLS_PER_MINUTE * Date.Field.MINUTES_PER_HOUR;
/** Hours in a typical day (24) (ISO). Due to time zone offset changes, the number of hours per day can vary. */
Date.Field.HOURS_PER_DAY = 24;
/** Minutes in a typical day (ISO). Due to time zone offset changes, the number of minutes per day can vary. */
Date.Field.MINUTES_PER_DAY = Date.Field.MINUTES_PER_HOUR * Date.Field.HOURS_PER_DAY;
/** Seconds in a typical day (ISO). Due to time zone offset changes, the number of seconds per day can vary. */
Date.Field.SECONDS_PER_DAY = Date.Field.SECONDS_PER_HOUR * Date.Field.HOURS_PER_DAY;
/** Milliseconds in a typical day (ISO). Due to time zone offset changes, the number of milliseconds per day can vary. */
Date.Field.MILLS_PER_DAY = Date.Field.MILLS_PER_HOUR * Date.Field.HOURS_PER_DAY;
/** Days in one week (7) (ISO) */
Date.Field.DAYS_PER_WEEK = 7;
/** Hours in a typical week. Due to time zone offset changes, the number of hours per week can vary. */
Date.Field.HOURS_PER_WEEK = Date.Field.HOURS_PER_DAY * Date.Field.DAYS_PER_WEEK;
/** Minutes in a typical week (ISO). Due to time zone offset changes, the number of minutes per week can vary. */
Date.Field.MINUTES_PER_WEEK = Date.Field.MINUTES_PER_DAY * Date.Field.DAYS_PER_WEEK;
/** Seconds in a typical week (ISO). Due to time zone offset changes, the number of seconds per week can vary. */
Date.Field.SECONDS_PER_WEEK = Date.Field.SECONDS_PER_DAY * Date.Field.DAYS_PER_WEEK;
/** Milliseconds in a typical week (ISO). Due to time zone offset changes, the number of milliseconds per week can vary. */
Date.Field.MILLS_PER_WEEK = Date.Field.MILLS_PER_DAY * Date.Field.DAYS_PER_WEEK;

Date.Field.quotRem = function(divisor, divider) {
    var rem = (divider + (divisor % divider)) % divider;

    return {
        quot: Math.floor((divisor - rem) / divider),
        rem: rem
    };
}

Date.Field.assertTrue = function(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
};
Date.Field.validateInt = function(value) {
    var i = parseInt(value, 10);

    Date.Field.assertTrue(!isNaN(i) && String(value).match(/^-?\d+$/), "Expected integer but was: " + value);

    return i;
};
