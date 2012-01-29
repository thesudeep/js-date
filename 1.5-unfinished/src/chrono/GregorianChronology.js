/**
 * Implements a pure proleptic Gregorian calendar system, which defines every
 * fourth year as leap, unless the year is divisible by 100 and not by 400.
 * This improves upon the Julian calendar leap year rule.
 * <p>
 * Although the Gregorian calendar did not exist before 1582 CE, this
 * chronology assumes it did, thus it is proleptic. This implementation also
 * fixes the start of the year at January 1, and defines the year zero.
 * <p>
 * GregorianChronology is thread-safe and immutable.
 *
 * @see <a href="http://en.wikipedia.org/wiki/Gregorian_calendar">Wikipedia</a>
 * @see JulianChronology
 * @see GJChronology
 *
 * @author Guy Allard
 * @author Stephen Colebourne
 * @author Brian S O'Neill
 * @since 1.0
 * @param {Chronology} base
 * @param {Object} param
 * @param {number} minDaysInFirstWeek

 */
GregorianChronology = function (base, param, minDaysInFirstWeek) {
    this._super.constructor(base, param, minDaysInFirstWeek);
};

inherits(GregorianChronology, BasicGJChronology);

(function() {
    /**
     * Cache of zone to chronology arrays
     * @type {Object}
     */
    var CACHE = {};

    var MILLIS_PER_YEAR = Math.floor(365.2425 * Chronology.MILLIS_PER_DAY);
    var MILLIS_PER_MONTH = Math.floor(365.2425 * Chronology.MILLIS_PER_DAY / 12);
    var DAYS_0000_TO_1970 = 719527;
    /** The lowest year that can be fully supported. */
    var MIN_YEAR = -271821;
    /** The highest year that can be fully supported. */
    var MAX_YEAR = 275759;

    /**
     * Gets an instance of the GregorianChronology.
     * The time zone of the returned instance is UTC.
     *
     * @return {GregorianChronology} a singleton UTC instance of the chronology
     */
    GregorianChronology.getInstanceUTC = function() {
        return INSTANCE_UTC;
    };

    /**
     * Gets an instance of the GregorianChronology in the given time zone.
     *
     * @param {DateTimeZone=} zone  the time zone to get the chronology in, null is default
     * @param {number=4} minDaysInFirstWeek  minimum number of days in first week of the year; default is 4
     * @return {GregorianChronology} a chronology in the specified time zone
     */
    GregorianChronology.getInstance = function(zone, minDaysInFirstWeek) {
        if (!hasValue(zone)) {
            zone = DateTimeZone.getDefault();
        }

        if (!hasValue(minDaysInFirstWeek)) {
            minDaysInFirstWeek = 4;
        }

        var key = zone.getID() + "#" + minDaysInFirstWeek;
        var chrono = CACHE[key];

        if (!hasValue(chrono)) {
            if (zone === DateTimeZone.UTC) {
                chrono = new GregorianChronology(null, null, minDaysInFirstWeek)
            } else {
                chrono = GregorianChronology.getInstance(DateTimeZone.UTC, minDaysInFirstWeek);
                chrono = new GregorianChronology(ZonedChronology.getInstance(chrono, zone), null, minDaysInFirstWeek);
            }

            CACHE[key] = chrono;
        }

        return chrono;
    };

    /**
     * Gets the Chronology in the UTC time zone.
     *
     * @return {GregorianChronology} the chronology in UTC
     */
    GregorianChronology.prototype.withUTC = function() {
        return INSTANCE_UTC;
    };

    /**
     * Gets the Chronology in a specific time zone.
     *
     * @param {DateTimeZone} zone  the zone to get the chronology in, null is default
     * @return {GregorianChronology} the chronology
     */
    GregorianChronology.prototype.withZone = function(zone) {
        if (!hasValue(zone)) {
            zone = DateTimeZone.getDefault();
        }

        if (zone === this.getZone()) {
            return this;
        }

        return GregorianChronology.getInstance(zone);
    };

    GregorianChronology.prototype._assemble = function(fields) {
        if (!hasValue(this.getBase())) {
            this._super._assemble(fields);
        }
    };

    GregorianChronology.prototype.isLeapYear = function(year) {
        return ((year & 3) == 0) && ((year % 100) != 0 || (year % 400) == 0);
    };

    GregorianChronology.prototype.calculateFirstDayOfYearMillis = function(year) {
        var leapYears = Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400);

        if (year > 0 && this.isLeapYear(year)) {
            leapYears--;
        }

        return (year * 365 + (leapYears - DAYS_0000_TO_1970)) * Chronology.MILLIS_PER_DAY;
    };

    GregorianChronology.prototype.getMinYear = function() {
        return MIN_YEAR;
    };

    GregorianChronology.prototype.getMaxYear = function() {
        return MAX_YEAR;
    };

    GregorianChronology.prototype.getAverageMillisPerYear = function() {
        return MILLIS_PER_YEAR;
    };

    GregorianChronology.prototype.getAverageMillisPerYearDividedByTwo = function() {
        return Math.floor(MILLIS_PER_YEAR / 2);
    };

    GregorianChronology.prototype.getAverageMillisPerMonth = function() {
        return MILLIS_PER_MONTH;
    };

    GregorianChronology.prototype.getApproxMillisAtEpochDividedByTwo = function() {
        return Math.floor((1970 * MILLIS_PER_YEAR) / 2);
    };

    /**
     * Singleton instance of a UTC GregorianChronology
     * @type {GregorianChronology}
     */
    var INSTANCE_UTC = GregorianChronology.getInstance(DateTimeZone.UTC);
})();
