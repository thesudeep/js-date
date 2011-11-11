/**
 * DateTimeUtils provide public utility methods for the date-time library.
 * <p>
 * DateTimeUtils is thread-safe although shared static variables are used.
 *
 * @author Stephen Colebourne
 * @since 1.0
 */

DateTimeUtils = function() {
    abstractMethod();
};


/**
 * Gets the current time in milliseconds.
 * <p>
 * By default this returns <code>System.currentTimeMillis()</code>.
 * This may be changed using other methods in this class.
 *
 * @return {number} the current time in milliseconds from 1970-01-01T00:00:00Z
 */
DateTimeUtils.currentTimeMillis = function() {
    return new Date().getTime();
};

/**
 * Gets the millisecond instant from the specified instant object handling null.
 * <p>
 * If the instant object is <code>null</code>, the {@link #currentTimeMillis()}
 * will be returned. Otherwise, the millis from the object are returned.
 *
 * @param {ReadableInstant} instant  the instant to examine, null means now
 * @return {number} the time in milliseconds from 1970-01-01T00:00:00Z
 */
DateTimeUtils.getInstantMillis = function(instant) {
    if (hasValue(instant)) {
        return instant.getMillis();
    }
    return DateTimeUtils.currentTimeMillis();
};

//-----------------------------------------------------------------------
/**
 * Gets the chronology from the specified instant object handling null.
 * <p>
 * If the instant object is <code>null</code>, or the instant's chronology is
 * <code>null</code>, {@link ISOChronology#getInstance()} will be returned.
 * Otherwise, the chronology from the object is returned.
 *
 * @param {ReadableInstant} instant  the instant to examine, null means ISO in the default zone
 * @return {Chronology} the chronology, never null
 */
DateTimeUtils.getInstantChronology = function(instant) {
    var chrono;

    if (hasValue(instant) && hasValue(chrono = instant.getChronology())) {
        return chrono;
    }

    return ISOChronology.getInstance();

};

//-----------------------------------------------------------------------
/**
 * Gets the chronology handling null.
 * <p>
 * If the chronology is <code>null</code>, {@link ISOChronology#getInstance()}
 * will be returned. Otherwise, the chronology is returned.
 *
 * @param {Chronology} chrono  the chronology to use, null means ISO in the default zone
 * @return {Chronology} the chronology, never null
 */
DateTimeUtils.getChronology = function(chrono) {
    if (hasValue(chrono)) {
        return chrono;
    }
    return ISOChronology.getInstance();
};

//-----------------------------------------------------------------------
/**
 * Gets the zone handling null.
 * <p>
 * If the zone is <code>null</code>, {@link DateTimeZone#getDefault()}
 * will be returned. Otherwise, the zone specified is returned.
 *
 * @param {DateTimeZone} zone  the time zone to use, null means the default zone
 * @return {DateTimeZone} the time zone, never null
 */
DateTimeUtils.getZone = function(zone) {
    if (hasValue(zone)) {
        return zone;
    }
    return DateTimeZone.getDefault();
};

//-----------------------------------------------------------------------
/**
 * Gets the period type handling null.
 * <p>
 * If the zone is <code>null</code>, {@link PeriodType#standard()}
 * will be returned. Otherwise, the type specified is returned.
 *
 * @param {PeriodType} type  the time zone to use, null means the standard type
 * @return {PeriodType} the type to use, never null
 */
DateTimeUtils.getPeriodType = function(type) {
    if (hasValue(type)) {
        return type;
    }
    return PeriodType.standard();
};

//-----------------------------------------------------------------------
/**
 * Gets the millisecond duration from the specified duration object handling null.
 * <p>
 * If the duration object is <code>null</code>, zero will be returned.
 * Otherwise, the millis from the object are returned.
 *
 * @param {ReadableDuration} duration  the duration to examine, null means zero
 * @return {number} the duration in milliseconds
 */
DateTimeUtils.getDurationMillis = function(duration) {
    if (hasValue(duration)) {
        return duration.getMillis();
    }
    return 0;
};
