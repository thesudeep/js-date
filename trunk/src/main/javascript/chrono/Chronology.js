/**
 * Chronology provides access to the individual date time fields for a
 * chronological calendar system.
 * <p>
 * Various chronologies are supported by subclasses including ISO
 * and GregorianJulian. To construct a Chronology you should use the
 * factory methods on the chronology subclass in the chrono package.
 * <p>
 * For example, to obtain the current time in the coptic calendar system:
 * <pre>
 * DateTime dt = new DateTime(CopticChronology.prototype.getInstance());
 * </pre>
 * <p>
 * The provided chronology implementations are:
 * <ul>
 * <li>ISO - Based on the ISO8601 standard and suitable for use after about 1600
 * <li>GJ - Historically accurate calendar with Julian followed by Gregorian
 * <li>Gregorian - The Gregorian calendar system used for all time (proleptic)
 * <li>Julian - The Julian calendar system used for all time (proleptic)
 * <li>Buddhist - The Buddhist calendar system which is an offset in years from GJ
 * <li>Coptic - The Coptic calendar system which defines 30 day months
 * <li>Ethiopic - The Ethiopic calendar system which defines 30 day months
 * </ul>
 * Hopefully future releases will contain more chronologies.
 * <p>
 * This class defines a number of fields with names from the ISO8601 standard.
 * It does not 'strongly' define these fields however, thus implementations
 * are free to interpret the field names as they wish.
 * For example, a week could be defined as 10 days and a month as 40 days in a
 * special WeirdChronology implementation. Clearly the GJ and ISO
 * implementations provided use the field names as you would expect.
 *
 * @see org.joda.time.chrono.ISOChronology
 * @see org.joda.time.chrono.GJChronology
 * @see org.joda.time.chrono.GregorianChronology
 * @see org.joda.time.chrono.JulianChronology
 * @see org.joda.time.chrono.CopticChronology
 * @see org.joda.time.chrono.BuddhistChronology
 * @see org.joda.time.chrono.EthiopicChronology
 *
 * @author Stephen Colebourne
 * @author Brian S O'Neill
 * @since 1.0
 * @constructor
 * @extends Object
 */
Chronology = function() {
};


/**
 * Returns the DateTimeZone that this Chronology operates in, or null if
 * unspecified.
 *
 * @return {DateTimeZone} the DateTimeZone, null if unspecified
 */
Chronology.prototype.getZone = function() {
    abstractMethod();
};

/**
 * Returns an instance of this Chronology that operates in the UTC time
 * zone. Chronologies that do not operate in a time zone or are already
 * UTC must return themself.
 *
 * @return {Chronology} a version of this chronology that ignores time zones
 */
Chronology.prototype.withUTC = function() {
    abstractMethod();
};

/**
 * Returns an instance of this Chronology that operates in any time zone.
 *
 * @param {DateTimeZone} zone to use, or default if null
 * @return {Chronology} a version of this chronology with a specific time zone
 * @see ZonedChronology
 */
Chronology.prototype.withZone = function(zone) {
    abstractMethod();
};

/**
 * Returns a datetime millisecond instant, formed from the given year,
 * month, day, hour, minute, second, and millisecond values. The set of
 * given values must refer to a valid datetime, or else an
 * IllegalArgumentException is thrown.
 * <p>
 * The default implementation calls upon separate DateTimeFields to
 * determine the result. Subclasses are encouraged to provide a more
 * efficient implementation.
 *
 * @param {number=} year year to use
 * @param {number=} monthOfYear month to use
 * @param {number=} dayOfMonth day of month to use
 * @param {number=} hourOfDay hour to use
 * @param {number=} minuteOfHour minute to use
 * @param {number=} secondOfMinute second to use
 * @param {number=} millisOfSecond millisecond to use
 * @return {number=} millisecond instant from 1970-01-01T00:00:00Z
 */
Chronology.prototype.getDateTimeMillis = function(year, monthOfYear, dayOfMonth, hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond) {
    abstractMethod();
};

/**
 * Returns a datetime millisecond instant, from from the given instant,
 * hour, minute, second, and millisecond values. The set of given values
 * must refer to a valid datetime, or else an IllegalArgumentException is
 * thrown.
 * <p>
 * The default implementation calls upon separate DateTimeFields to
 * determine the result. Subclasses are encouraged to provide a more
 * efficient implementation.
 *
 * @param {number} instant instant to start from
 * @param {number=} hourOfDay hour to use
 * @param {number=} minuteOfHour minute to use
 * @param {number=} secondOfMinute second to use
 * @param {number=} millisOfSecond millisecond to use
 * @return {number} millisecond instant from 1970-01-01T00:00:00Z
 * @throws IllegalArgumentException if the values are invalid
 */
Chronology.prototype.getInstantTimeMillis = function(instant, hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond) {
    abstractMethod();
};


//-----------------------------------------------------------------------
/**
 * Gets the values of a period from an interval.
 *
 * @param {ReadablePeriod} period  the period instant to use
 * @param {number} startInstant  the start instant of an interval to query
 * @param {number} endInstant  the start instant of an interval to query
 * @return {number[]} the values of the period extracted from the interval
 */
Chronology.prototype.get = function(period, startInstant, endInstant) {
    abstractMethod();
};

/**
 * Gets the values of a period from an interval.
 *
 * @param {ReadablePeriod} period  the period instant to use
 * @param {number} duration  the duration to query
 * @return {number[]} the values of the period extracted from the duration
 */
Chronology.prototype.get = function(period, duration) {
    abstractMethod();
};

/**
 * Adds the period or the duration to the instant, specifying the number of times to add.
 *
 * @param {ReadablePeriod|number} period  the period to add, null means add nothing
 * @param {number} instant  the instant to add to
 * @param {number} scalar  the number of times to add
 * @return {number} the updated instant
 */
Chronology.prototype.add = function(period, instant, scalar) {
    abstractMethod();
};

// Millis
//-----------------------------------------------------------------------
/**
 * Get the millis duration field for this Chronology.prototype.
 *
 * @return {DurationField} DurationField or UnsupportedDurationField if unsupported
 */
Chronology.prototype.millis = function() {
    abstractMethod();
};

/**
 * Get the millis of second field for this Chronology.prototype.
 *
 * @return {DateTimeField} DateTimeField or UnsupportedDateTimeField if unsupported
 */
Chronology.prototype.millisOfSecond = function() {
    abstractMethod();
};

/**
 * Get the millis of day field for this Chronology.prototype.
 *
 * @return {DateTimeField} DateTimeField or UnsupportedDateTimeField if unsupported
 */
Chronology.prototype.millisOfDay = function() {
    abstractMethod();
};

// Second
//-----------------------------------------------------------------------
/**
 * Get the seconds duration field for this Chronology.prototype.
 *
 * @return {DurationField} DurationField or UnsupportedDurationField if unsupported
 */
Chronology.prototype.seconds = function() {
    abstractMethod();
};

/**
 * Get the second of minute field for this Chronology.prototype.
 *
 * @return {DateTimeField} DateTimeField or UnsupportedDateTimeField if unsupported
 */
Chronology.prototype.secondOfMinute = function() {
    abstractMethod();
};

/**
 * Get the second of day field for this Chronology.prototype.
 *
 * @return {DateTimeField} DateTimeField or UnsupportedDateTimeField if unsupported
 */
Chronology.prototype.secondOfDay = function() {
    abstractMethod();
};

// Minute
//-----------------------------------------------------------------------
/**
 * Get the minutes duration field for this Chronology.prototype.
 *
 * @return {DurationField} DurationField or UnsupportedDurationField if unsupported
 */
Chronology.prototype.minutes = function() {
    abstractMethod();
};

/**
 * Get the minute of hour field for this Chronology.prototype.
 *
 * @return {DateTimeField} DateTimeField or UnsupportedDateTimeField if unsupported
 */
Chronology.prototype.minuteOfHour = function() {
    abstractMethod();
};

/**
 * Get the minute of day field for this Chronology.prototype.
 *
 * @return {DateTimeField} DateTimeField or UnsupportedDateTimeField if unsupported
 */
Chronology.prototype.minuteOfDay = function() {
    abstractMethod();
};

// Hour
//-----------------------------------------------------------------------
/**
 * Get the hours duration field for this Chronology.prototype.
 *
 * @return {DurationField} DurationField or UnsupportedDurationField if unsupported
 */
Chronology.prototype.hours = function() {
    abstractMethod();
};

/**
 * Get the hour of day (0-23) field for this Chronology.prototype.
 *
 * @return {DateTimeField} DateTimeField or UnsupportedDateTimeField if unsupported
 */
Chronology.prototype.hourOfDay = function() {
    abstractMethod();
};

/**
 * Get the hour of day (offset to 1-24) field for this Chronology.prototype.
 *
 * @return {DateTimeField} DateTimeField or UnsupportedDateTimeField if unsupported
 */
Chronology.prototype.clockhourOfDay = function() {
    abstractMethod();
};

// Halfday
//-----------------------------------------------------------------------
/**
 * Get the halfdays duration field for this Chronology.prototype.
 *
 * @return {DurationField} DurationField or UnsupportedDurationField if unsupported
 */
Chronology.prototype.halfdays = function() {
    abstractMethod();
};

/**
 * Get the hour of am/pm (0-11) field for this Chronology.prototype.
 *
 * @return {DateTimeField} DateTimeField or UnsupportedDateTimeField if unsupported
 */
Chronology.prototype.hourOfHalfday = function() {
    abstractMethod();
};

/**
 * Get the hour of am/pm (offset to 1-12) field for this Chronology.prototype.
 *
 * @return {DateTimeField} DateTimeField or UnsupportedDateTimeField if unsupported
 */
Chronology.prototype.clockhourOfHalfday = function() {
    abstractMethod();
};

/**
 * Get the AM(0) PM(1) field for this Chronology.prototype.
 *
 * @return {DateTimeField} DateTimeField or UnsupportedDateTimeField if unsupported
 */
Chronology.prototype.halfdayOfDay = function() {
    abstractMethod();
};

// Day
//-----------------------------------------------------------------------
/**
 * Get the days duration field for this Chronology.prototype.
 *
 * @return {DurationField} DurationField or UnsupportedDurationField if unsupported
 */
Chronology.prototype.days = function() {
    abstractMethod();
};

/**
 * Get the day of week field for this Chronology.prototype.
 *
 * <p>DayOfWeek values are defined in {@link DateTimeConstants}.
 * They use the ISO definitions, where 1 is Monday and 7 is Sunday.
 *
 * @return {DateTimeField} DateTimeField or UnsupportedDateTimeField if unsupported
 */
Chronology.prototype.dayOfWeek = function() {
    abstractMethod();
};

/**
 * Get the day of month field for this Chronology.prototype.
 *
 * @return {DateTimeField} DateTimeField or UnsupportedDateTimeField if unsupported
 */
Chronology.prototype.dayOfMonth = function() {
    abstractMethod();
};

/**
 * Get the day of year field for this Chronology.prototype.
 *
 * @return {DateTimeField} DateTimeField or UnsupportedDateTimeField if unsupported
 */
Chronology.prototype.dayOfYear = function() {
    abstractMethod();
};

// Week
//-----------------------------------------------------------------------
/**
 * Get the weeks duration field for this Chronology.prototype.
 *
 * @return {DurationField} DurationField or UnsupportedDurationField if unsupported
 */
Chronology.prototype.weeks = function() {
    abstractMethod();
};

/**
 * Get the week of a week based year field for this Chronology.prototype.
 *
 * @return {DateTimeField} DateTimeField or UnsupportedDateTimeField if unsupported
 */
Chronology.prototype.weekOfWeekyear = function() {
    abstractMethod();
};

// Weekyear
//-----------------------------------------------------------------------
/**
 * Get the weekyears duration field for this Chronology.prototype.
 *
 * @return {DurationField} DurationField or UnsupportedDurationField if unsupported
 */
Chronology.prototype.weekyears = function() {
    abstractMethod();
};

/**
 * Get the year of a week based year field for this Chronology.prototype.
 *
 * @return {DateTimeField} DateTimeField or UnsupportedDateTimeField if unsupported
 */
Chronology.prototype.weekyear = function() {
    abstractMethod();
};

/**
 * Get the year of a week based year in a century field for this Chronology.prototype.
 *
 * @return {DateTimeField} DateTimeField or UnsupportedDateTimeField if unsupported
 */
Chronology.prototype.weekyearOfCentury = function() {
    abstractMethod();
};

// Month
//-----------------------------------------------------------------------
/**
 * Get the months duration field for this Chronology.prototype.
 *
 * @return {DurationField} DurationField or UnsupportedDurationField if unsupported
 */
Chronology.prototype.months = function() {
    abstractMethod();
};

/**
 * Get the month of year field for this Chronology.prototype.
 *
 * @return {DateTimeField} DateTimeField or UnsupportedDateTimeField if unsupported
 */
Chronology.prototype.monthOfYear = function() {
    abstractMethod();
};

// Year
//-----------------------------------------------------------------------
/**
 * Get the years duration field for this Chronology.prototype.
 *
 * @return {DurationField} DurationField or UnsupportedDurationField if unsupported
 */
Chronology.prototype.years = function() {
    abstractMethod();
};

/**
 * Get the year field for this Chronology.prototype.
 *
 * @return {DateTimeField} DateTimeField or UnsupportedDateTimeField if unsupported
 */
Chronology.prototype.year = function() {
    abstractMethod();
};

/**
 * Get the year of era field for this Chronology.prototype.
 *
 * @return {DateTimeField} DateTimeField or UnsupportedDateTimeField if unsupported
 */
Chronology.prototype.yearOfEra = function() {
    abstractMethod();
};

/**
 * Get the year of century field for this Chronology.prototype.
 *
 * @return {DateTimeField} DateTimeField or UnsupportedDateTimeField if unsupported
 */
Chronology.prototype.yearOfCentury = function() {
    abstractMethod();
};

// Century
//-----------------------------------------------------------------------
/**
 * Get the centuries duration field for this Chronology.prototype.
 *
 * @return {DurationField} DurationField or UnsupportedDurationField if unsupported
 */
Chronology.prototype.centuries = function() {
    abstractMethod();
};

/**
 * Get the century of era field for this Chronology.prototype.
 *
 * @return {DateTimeField} DateTimeField or UnsupportedDateTimeField if unsupported
 */
Chronology.prototype.centuryOfEra = function() {
    abstractMethod();
};

// Era
//-----------------------------------------------------------------------
/**
 * Get the eras duration field for this Chronology.prototype.
 *
 * @return {DurationField} DurationField or UnsupportedDurationField if unsupported
 */
Chronology.prototype.eras = function() {
    abstractMethod();
};

/**
 * Get the era field for this Chronology.prototype.
 *
 * @return {DateTimeField} DateTimeField or UnsupportedDateTimeField if unsupported
 */
Chronology.prototype.era = function() {
    abstractMethod();
};

//-----------------------------------------------------------------------
/**
 * Gets a debugging toString.
 *
 * @return {String} a debugging string
 */
Chronology.prototype.toString = function() {
    abstractMethod();
};
