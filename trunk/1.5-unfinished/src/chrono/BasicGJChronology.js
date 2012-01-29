/**
 * Abstract Chronology for implementing chronologies based on Gregorian/Julian formulae.
 * Most of the utility methods required by subclasses are package-private,
 * reflecting the intention that they be defined in the same package.
 * <p>
 * BasicGJChronology is thread-safe and immutable, and all subclasses must
 * be as well.
 *
 * @author Stephen Colebourne
 * @author Brian S O'Neill
 * @author Guy Allard
 * @since 1.2, refactored from CommonGJChronology
 * @param {Chronology} base
 * @param {Object} param
 * @param {number} minDaysInFirstWeek
 */

BasicGJChronology = function(base, param, minDaysInFirstWeek) {
    this._super.constructor(base, param, minDaysInFirstWeek)
};

inherits(BasicGJChronology, BasicChronology);

(function() {
    // These arrays are NOT public. We trust ourselves not to alter the array.
    // They use zero-based array indexes so the that valid range of months is
    // automatically checked.
    var MIN_DAYS_PER_MONTH_ARRAY = [31,28,31,30,31,30,31,31,30,31,30,31];
    var MAX_DAYS_PER_MONTH_ARRAY = [31,29,31,30,31,30,31,31,30,31,30,31];

    var FEB_29 = (31 + 29 - 1) * Chronology.MILLIS_PER_DAY;

    var MIN_TOTAL_MILLIS_BY_MONTH_ARRAY = [0];
    var MAX_TOTAL_MILLIS_BY_MONTH_ARRAY = [0];

    for (var i = 0; i < Chronology.MONTHS_PER_YEAR; i++) {
        MIN_TOTAL_MILLIS_BY_MONTH_ARRAY[MIN_TOTAL_MILLIS_BY_MONTH_ARRAY.length] = MIN_TOTAL_MILLIS_BY_MONTH_ARRAY[i] + MIN_DAYS_PER_MONTH_ARRAY[i] * Chronology.MILLIS_PER_DAY;
        MAX_TOTAL_MILLIS_BY_MONTH_ARRAY[MAX_TOTAL_MILLIS_BY_MONTH_ARRAY.length] = MAX_TOTAL_MILLIS_BY_MONTH_ARRAY[i] + MAX_DAYS_PER_MONTH_ARRAY[i] * Chronology.MILLIS_PER_DAY;
    }

    BasicGJChronology.prototype.getMonthOfYear = function(millis, year) {
        var i = millis - this.getYearMillis(year);
        var a = this.isLeapYear(year) ? MAX_TOTAL_MILLIS_BY_MONTH_ARRAY : MIN_TOTAL_MILLIS_BY_MONTH_ARRAY;

        return i < a[6]
                ? (i < a[3] ? (i < a[2] ? (i < a[1] ? 0 : 1) : 2 ) : (i < a[5] ? (i < a[4] ? 3 : 4) : 5))
                        : (i < a[9] ? (i < a[8] ? (i < a[7] ? 6 : 7) : 8 ) : (i < a[11] ? (i < a[10] ? 9 : 10) : 11));
    };

    /**
     * Gets the number of days in the specified month and year.
     *
     * @param year  the year
     * @param month  the month
     * @return the number of days
     */
    BasicGJChronology.prototype.getDaysInYearMonth = function(year, month) {
        if (this.isLeapYear(year)) {
            return MAX_DAYS_PER_MONTH_ARRAY[month - 1];
        } else {
            return MIN_DAYS_PER_MONTH_ARRAY[month - 1];
        }
    };

    BasicGJChronology.prototype.getDaysInMonthMax = function(month) {
        return MAX_DAYS_PER_MONTH_ARRAY[month - 1];
    };

    BasicGJChronology.prototype.getDaysInMonthMaxForSet = function(instant, value) {
        return (value > 28 ? this.getDaysInMonthMax(instant) : 28);
    };

    BasicGJChronology.prototype.getTotalMillisByYearMonth = function(year, month) {
        if (this.isLeapYear(year)) {
            return MAX_TOTAL_MILLIS_BY_MONTH_ARRAY[month - 1];
        } else {
            return MIN_TOTAL_MILLIS_BY_MONTH_ARRAY[month - 1];
        }
    };

    BasicGJChronology.prototype.getYearDifference = function(minuendInstant, subtrahendInstant) {
        var minuendYear = this.getYear(minuendInstant);
        var subtrahendYear = this.getYear(subtrahendInstant);

        // Inlined remainder method to avoid duplicate calls to get.
        var minuendRem = minuendInstant - this.getYearMillis(minuendYear);
        var subtrahendRem = subtrahendInstant - this.getYearMillis(subtrahendYear);

        // Balance leap year differences on remainders.
        if (subtrahendRem >= FEB_29) {
            if (this.isLeapYear(subtrahendYear)) {
                if (!this.isLeapYear(minuendYear)) {
                    subtrahendRem -= Chronology.MILLIS_PER_DAY;
                }
            } else if (minuendRem >= FEB_29 && this.isLeapYear(minuendYear)) {
                minuendRem -= Chronology.MILLIS_PER_DAY;
            }
        }

        var difference = minuendYear - subtrahendYear;

        if (minuendRem < subtrahendRem) {
            difference--;
        }

        return difference;
    };

    BasicGJChronology.prototype.setYear = function(instant, year) {
        var thisYear = this.getYear(instant);
        var dayOfYear = this.getDayOfYear(instant, thisYear);
        var millisOfDay = this.getMillisOfDay(instant);

        if (dayOfYear > (31 + 28)) { // after Feb 28
            if (this.isLeapYear(thisYear)) {
                // Current date is Feb 29 or later.
                if (!this.isLeapYear(year)) {
                    // Moving to a non-leap year, Feb 29 does not exist.
                    dayOfYear--;
                }
            } else {
                // Current date is Mar 01 or later.
                if (this.isLeapYear(year)) {
                    // Moving to a leap year, account for Feb 29.
                    dayOfYear++;
                }
            }
        }

        instant = this.getYearMonthDayMillis(year, 1, dayOfYear);
        instant += millisOfDay;

        return instant;
    };
})();