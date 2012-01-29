/**
 * Wraps another Chronology to add support for time zones.
 * <p>
 * ZonedChronology is thread-safe and immutable.
 *
 * @author Brian S O'Neill
 * @author Stephen Colebourne
 * @since 1.0
 */
/**
 * Restricted constructor
 *
 * @param base base chronology to wrap
 * @param zone the time zone
 */
ZonedChronology = function (base, zone) {
    this._super.constructor(base, zone);
}

inherits(ZonedChronology, AssembledChronology);

/**
 * Create a ZonedChronology for any chronology, overriding any time zone it
 * may already have.
 *
 * @param {Chronology} base base chronology to wrap
 * @param {DateTimeZone} zone the time zone
 * @throws {Error} if chronology or time zone is null
 */
ZonedChronology.getInstance = function(base, zone) {
    assertTrue(base != null, "Must supply a chronology");

    base = base.withUTC();

    assertTrue(base != null, "UTC chronology must not be null");
    assertTrue(zone != null, "DateTimeZone must not be null");

    return new ZonedChronology(base, zone);
};

/**
 *
 * @param {DurationField}
        * @return {boolean}
 */
function useTimeArithmetic(field) {
    // Use time of day arithmetic rules for unit durations less than
    // typical time zone offsets.
    return field != null && field.getUnitMillis() < DateTimeConstants.MILLIS_PER_HOUR * 12;
}

/**
 * @param {number} instant instant from 1970-01-01T00:00:00 local time
 * @return {number} instant from 1970-01-01T00:00:00Z
 */
function localToUTC(instant) {
    var zone = getZone();
    var offset = zone.getOffsetFromLocal(instant);
    instant -= offset;

    if (offset != zone.getOffset(instant)) {
        throw new IllegalArgumentException
                ("Illegal instant due to time zone offset transition: " +
                        DateTimeFormat.forPattern("yyyy-MM-dd'T'HH:mm:ss.SSS").print(new Instant(instant)));
    }

    return instant;
}

/**
 *
 * @return {DateTimeZone}
 */
ZonedChronology.prototype.getZone = function() {
    return this.getParam();
};

/**
 * @return {Chronology}
 */
ZonedChronology.prototype.withUTC = function() {
    return this.getBase();
};

/**
 *
 * @param {DateTimeZone} zone
 * @return {Chronology}
 */
ZonedChronology.prototype.withZone = function(zone) {
    !hasValue(zone) && (zone = DateTimeZone.getDefault());

    if (zone === this.getZone()) {
        return this;
    }

    if (zone === DateTimeZone.UTC) {
        return this.getBase();
    }

    return new ZonedChronology(this.getBase(), zone);
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
ZonedChronology.prototype.getDateTimeMillis = function(year, monthOfYear, dayOfMonth, hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond) {
    return localToUTC(this.getBase().getDateTimeMillis(year, monthOfYear, dayOfMonth, hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond));
}

ZonedChronology.prototype.getInstantTimeMillis = function(instant, hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond) {
    return localToUTC(this.getBase().getInstantTimeMillis(instant + this.getZone().getOffset(instant), hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond));
}

ZonedChronology.prototype.assemble = function(fields) {
    function duration(field) {
        return field == null || !field.isSupported() ? field : new ZonedDurationField(field, this.getZone());
    }

    function datetime(field) {
        if (field == null || !field.isSupported()) {
            return field;
        }

        return new ZonedDateTimeField(field, getZone(), duration(field.getDurationField()), duration(field.getRangeDurationField()), duration(field.getLeapDurationField()));
    }

    // Convert duration fields...

    fields.eras = duration(fields.eras);
    fields.centuries = duration(fields.centuries);
    fields.years = duration(fields.years);
    fields.months = duration(fields.months);
    fields.weekyears = duration(fields.weekyears);
    fields.weeks = duration(fields.weeks);
    fields.days = duration(fields.days);

    fields.halfdays = duration(fields.halfdays);
    fields.hours = duration(fields.hours);
    fields.minutes = duration(fields.minutes);
    fields.seconds = duration(fields.seconds);
    fields.millis = duration(fields.millis);

    // Convert datetime fields...

    fields.year = datetime(fields.year);
    fields.yearOfEra = datetime(fields.yearOfEra);
    fields.yearOfCentury = datetime(fields.yearOfCentury);
    fields.centuryOfEra = datetime(fields.centuryOfEra);
    fields.era = datetime(fields.era);
    fields.dayOfWeek = datetime(fields.dayOfWeek);
    fields.dayOfMonth = datetime(fields.dayOfMonth);
    fields.dayOfYear = datetime(fields.dayOfYear);
    fields.monthOfYear = datetime(fields.monthOfYear);
    fields.weekOfWeekyear = datetime(fields.weekOfWeekyear);
    fields.weekyear = datetime(fields.weekyear);
    fields.weekyearOfCentury = datetime(fields.weekyearOfCentury);

    fields.millisOfSecond = datetime(fields.millisOfSecond);
    fields.millisOfDay = datetime(fields.millisOfDay);
    fields.secondOfMinute = datetime(fields.secondOfMinute);
    fields.secondOfDay = datetime(fields.secondOfDay);
    fields.minuteOfHour = datetime(fields.minuteOfHour);
    fields.minuteOfDay = datetime(fields.minuteOfDay);
    fields.hourOfDay = datetime(fields.hourOfDay);
    fields.hourOfHalfday = datetime(fields.hourOfHalfday);
    fields.clockhourOfDay = datetime(fields.clockhourOfDay);
    fields.clockhourOfHalfday = datetime(fields.clockhourOfHalfday);
    fields.halfdayOfDay = datetime(fields.halfdayOfDay);
};

/**
 * A zoned chronology is only equal to a zoned chronology with the
 * same base chronology and zone.
 *
 * @param {ZonedChronology} obj  the object to compare to
 * @return true if equal
 */
ZonedChronology.prototype.equals = function(obj) {
    if (this == obj) {
        return true;
    }
    if (!(obj instanceof ZonedChronology)) {
        return false;
    }

    return this.getBase().equals(obj.getBase()) && this.getZone().equals(obj.getZone());
};

/**
 * A debugging string for the chronology.
 *
 * @return {String} the debugging string
 */
ZonedChronology.prototype.toString = function() {
    return "ZonedChronology[" + this.getBase() + ", " + this.getZone().getID() + ']';
};
