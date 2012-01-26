/**
 *
 */
Chronology = {};

/** Constant (0) representing BC, years before zero (from Calendar) */
Chronology.BC = 0;
/** Alternative constant (0) representing BCE, Before Common Era (secular) */
Chronology.BCE = 0;
/**
 * Constant (1) representing AD, years after zero (from Calendar).
 * <p>
 * All new chronologies with differrent Era values should try to assign
 * eras as follows. The era that was in force at 1970-01-01 (ISO) is assigned
 * the value 1. Earlier eras are assigned sequentially smaller numbers.
 * Later eras are assigned sequentially greater numbers.
 */
Chronology.AD = 1;
/**
 * Alternative constant (1) representing CE, Common Era (secular).
 * <p>
 * All new chronologies with differrent Era values should try to assign
 * eras as follows. The era that was in force at 1970-01-01 (ISO) is assigned
 * the value 1. Earlier eras are assigned sequentially smaller numbers.
 * Later eras are assigned sequentially greater numbers.
 */
Chronology.CE = 1;

/** Constant (1) representing Monday, the first day of the week (ISO) */
Chronology.MONDAY = 1;
/** Constant (2) representing Tuesday, the second day of the week (ISO) */
Chronology.TUESDAY = 2;
/** Constant (3) representing Wednesday, the third day of the week (ISO) */
Chronology.WEDNESDAY = 3;
/** Constant (4) representing Thursday, the fourth day of the week (ISO) */
Chronology.THURSDAY = 4;
/** Constant (5) representing Friday, the fifth day of the week (ISO) */
Chronology.FRIDAY = 5;
/** Constant (6) representing Saturday, the sixth day of the week (ISO) */
Chronology.SATURDAY = 6;
/** Constant (7) representing Sunday, the seventh day of the week (ISO) */
Chronology.SUNDAY = 7;


/** Milliseconds in one second (1000) (ISO) */
Chronology.MILLIS_PER_SECOND = 1000;
/** Seconds in one minute (60) (ISO) */
Chronology.SECONDS_PER_MINUTE = 60;
/** Milliseconds in one minute (ISO) */
Chronology.MILLIS_PER_MINUTE = Chronology.MILLIS_PER_SECOND * Chronology.SECONDS_PER_MINUTE;
/** Minutes in one hour (ISO) */
Chronology.MINUTES_PER_HOUR = 60;
/** Seconds in one hour (ISO) */
Chronology.SECONDS_PER_HOUR = Chronology.SECONDS_PER_MINUTE * Chronology.MINUTES_PER_HOUR;
/** Milliseconds in one hour (ISO) */
Chronology.MILLIS_PER_HOUR = Chronology.MILLIS_PER_MINUTE * Chronology.MINUTES_PER_HOUR;
/** Hours in a typical day (24) (ISO). Due to time zone offset changes, the number of hours per day can vary. */
Chronology.HOURS_PER_DAY = 24;
/** Minutes in a typical day (ISO). Due to time zone offset changes, the number of minutes per day can vary. */
Chronology.MINUTES_PER_DAY = Chronology.MINUTES_PER_HOUR * Chronology.HOURS_PER_DAY;
/** Seconds in a typical day (ISO). Due to time zone offset changes, the number of seconds per day can vary. */
Chronology.SECONDS_PER_DAY = Chronology.SECONDS_PER_HOUR * Chronology.HOURS_PER_DAY;
/** Milliseconds in a typical day (ISO). Due to time zone offset changes, the number of milliseconds per day can vary. */
Chronology.MILLIS_PER_DAY = Chronology.MILLIS_PER_HOUR * Chronology.HOURS_PER_DAY;
/** Days in one week (7) (ISO) */
Chronology.DAYS_PER_WEEK = 7;
/** Days in one regular year (365) (ISO) */
Chronology.DAYS_PER_REGULAR_YEAR = 365;
/** Days in one leap year (366) (ISO) */
Chronology.DAYS_PER_LEAP_YEAR = Chronology.DAYS_PER_REGULAR_YEAR + 1;
/** Hours in a typical week. Due to time zone offset changes, the number of hours per week can vary. */
Chronology.HOURS_PER_WEEK = Chronology.HOURS_PER_DAY * Chronology.DAYS_PER_WEEK;
/** Minutes in a typical week (ISO). Due to time zone offset changes, the number of minutes per week can vary. */
Chronology.MINUTES_PER_WEEK = Chronology.MINUTES_PER_DAY * Chronology.DAYS_PER_WEEK;
/** Seconds in a typical week (ISO). Due to time zone offset changes, the number of seconds per week can vary. */
Chronology.SECONDS_PER_WEEK = Chronology.SECONDS_PER_DAY * Chronology.DAYS_PER_WEEK;
/** Milliseconds in a typical week (ISO). Due to time zone offset changes, the number of milliseconds per week can vary. */
Chronology.MILLIS_PER_WEEK = Chronology.MILLIS_PER_DAY * Chronology.DAYS_PER_WEEK;
/** Months in one year (12) (ISO) */
Chronology.MONTHS_PER_YEAR = 12;


/** Years from the very beginning of the chronology to EPOCH */
Chronology.YEARS_TO_EPOCH = 1970;
/** Days from the very beginning of the chronology to EPOCH */
Chronology.DAYS_TO_EPOCH = 719527;
/** Milliseconds from the very beginning of the chronology to EPOCH */
Chronology.MILLIS_TO_EPOCH = Chronology.DAYS_TO_EPOCH * Chronology.MILLIS_PER_DAY;

Chronology.MILLIS_PER_YEAR = 365.2425 * Chronology.MILLIS_PER_DAY;
Chronology.MILLIS_PER_REGULAR_YEAR = Chronology.DAYS_PER_REGULAR_YEAR * Chronology.MILLIS_PER_DAY;
Chronology.MILLIS_PER_LEAP_YEAR = Chronology.DAYS_PER_LEAP_YEAR * Chronology.MILLIS_PER_DAY;

Chronology.DAYS_BY_REGULAR_MONTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
Chronology.DAYS_BY_LEAP_MONTHS = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

(function() {
    Chronology.HALF_MILLIS_TO_EPOCH = Math.floor(Chronology.MILLIS_TO_EPOCH / 2);
    Chronology.HALF_MILLIS_PER_YEAR = Math.floor(Chronology.MILLIS_PER_YEAR / 2);

    Chronology.MILLIS_BY_REGULAR_MONTHS = [0];
    Chronology.MILLIS_BY_LEAP_MONTHS = [0];

    Chronology.DURATION_OF_REGULAR_MONTHS = [];
    Chronology.DURATION_OF_LEAP_MONTHS = [];

    for (var i = 0; i < Chronology.MONTHS_PER_YEAR; i++) {
        Chronology.DURATION_OF_REGULAR_MONTHS[Chronology.DURATION_OF_REGULAR_MONTHS.length] = Chronology.DAYS_BY_REGULAR_MONTHS[i] * Chronology.MILLIS_PER_DAY;
        Chronology.DURATION_OF_LEAP_MONTHS[Chronology.DURATION_OF_LEAP_MONTHS.length] = Chronology.DAYS_BY_LEAP_MONTHS[i] * Chronology.MILLIS_PER_DAY;

        Chronology.MILLIS_BY_REGULAR_MONTHS[Chronology.MILLIS_BY_REGULAR_MONTHS.length] = Chronology.MILLIS_BY_REGULAR_MONTHS[i] + Chronology.DURATION_OF_REGULAR_MONTHS[i];
        Chronology.MILLIS_BY_LEAP_MONTHS[Chronology.MILLIS_BY_LEAP_MONTHS.length] = Chronology.MILLIS_BY_LEAP_MONTHS[i] + Chronology.DURATION_OF_LEAP_MONTHS[i];
    }
})();

/**
 *
 * @param year
 */
Chronology.isLeapYear = function(year) {
    year = toInt(year);

    if (year < 0) {
        year++;
    }

    return (year & 3) === 0 && (year % 100 !== 0 || year % 400 === 0);
};

/**
 *
 * @param year
 */
Chronology.getLeapYears = function(year) {
    year = toInt(year);

    return Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400);
};

/**
 *
 * @param year
 */
Chronology.getInstantOfYear = function(year) {
    year = toInt(year);

    var leapYears = Chronology.getLeapYears(year);

    var instant = (year * 365 + (leapYears - Chronology.DAYS_TO_EPOCH)) * Chronology.MILLIS_PER_DAY;

    if (Chronology.isLeapYear(year)) {
        instant += Chronology.MILLIS_PER_REGULAR_YEAR - Chronology.MILLIS_PER_LEAP_YEAR;
    }

    return instant;
};

/**
 *
 * @param instant
 */
Chronology.getYearsOfEra = function(instant) {
    instant = toInt(instant);

    var halfInstant = instant / 2 + Chronology.HALF_MILLIS_TO_EPOCH;

    var year = Math.floor(halfInstant / Chronology.HALF_MILLIS_PER_YEAR);

    var millisPerYear = Chronology.isLeapYear(year) ? Chronology.MILLIS_PER_LEAP_YEAR : Chronology.MILLIS_PER_REGULAR_YEAR;

    var diff = instant - Chronology.getInstantOfYear(year);

    if (diff < 0) {
        year--;
    } else if (diff >= millisPerYear) {
        year++;
    }

    if (year <= 0) {
        year--;
    }

    return year;
};

Chronology.getMonthsOfYear = function(instant) {
    instant = toInt(instant);

    var year = Chronology.getYearsOfEra(instant);

    var a = Chronology.isLeapYear(year) ? Chronology.MILLIS_BY_LEAP_MONTHS : Chronology.MILLIS_BY_REGULAR_MONTHS;

    var i = instant - Chronology.getInstantOfYear(year);

    var month =
            i < a[6]
                    ? (i < a[3] ? (i < a[2] ? (i < a[1] ? 0 : 1) : 2 ) : (i < a[5] ? (i < a[4] ? 3 : 4) : 5))
                    : (i < a[9] ? (i < a[8] ? (i < a[7] ? 6 : 7) : 8 ) : (i < a[11] ? (i < a[10] ? 9 : 10) : 11));

    return month + 1;
};

Chronology.daysOfMonth = function(instant) {
    return 3;
};
