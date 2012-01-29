/**
 * DateTime is the standard implementation of an unmodifiable datetime class.
 * <p>
 * <code>DateTime</code> is the most widely used implementation of
 * {@link ReadableInstant}. As with all instants, it represents an exact
 * point on the time-line, but limited to the precision of milliseconds.
 * A <code>DateTime</code> calculates its fields with respect to a
 * {@link DateTimeZone time zone}.
 * <p>
 * Internally, the class holds two pieces of data. Firstly, it holds the
 * datetime as milliseconds from the Java epoch of 1970-01-01T00:00:00Z.
 * Secondly, it holds a {@link Chronology} which determines how the
 * millisecond instant value is converted into the date time fields.
 * The default Chronology is {@link ISOChronology} which is the agreed
 * international standard and compatible with the modern Gregorian calendar.
 * <p>
 * Each individual field can be queried in two ways:
 * <ul>
 * <li><code>getHourOfDay()</code>
 * <li><code>hourOfDay().get()</code>
 * </ul>
 * The second technique also provides access to other useful methods on the
 * field:
 * <ul>
 * <li>numeric value
 * <li>text value
 * <li>short text value
 * <li>maximum/minimum values
 * <li>add/subtract
 * <li>set
 * <li>rounding
 * </ul>
 * <p>
 * DateTime is thread-safe and immutable, provided that the Chronology is as well.
 * All standard Chronology classes supplied are thread-safe and immutable.
 *
 * @author Stephen Colebourne
 * @author Kandarp Shah
 * @author Brian S O'Neill
 * @since 1.0
 * @see MutableDateTime
 * @param {number=} instant
 * @param {DateTimeZone|Chronology} [zc]
 */

DateTime = function(instant, zc) {
    this._super.constructor(instant, zc);
};

inherits(DateTime, BaseDateTime);

/**
 * Obtains a {@code DateTime} set to the current system millisecond time
 * using <code>ISOChronology</code> in the default time zone.
 *
 * @param {DateTimeZone|Chronology} [zc]  the time zone or the chronology.
 * @return {DateTime} the current date-time, not null
 */
DateTime.now = function(zc) {
    return new DateTime(null, zc);
};

/**
 * Parses a {@code DateTime} from the specified string using a formatter.
 *
 * @param {String} str  the string to parse, not null
 * @param {DateTimeFormatter} formatter  the formatter to use, not null
 * @return {DateTime} the datetime
 */
DateTime.parse = function(str, formatter) {
    formatter = hasValue(formatter) ? formatter : ISODateTimeFormat.dateTimeParser().withOffsetParsed();

    return formatter.parseDateTime(str);
};

/**
 * Get this object as a DateTime by returning <code>this</code>.
 *
 * @return <code>this</code>
 */
/** DateTime */
DateTime.prototype.toDateTime = function() {
    return this;
};

/**
 * Get this object as a DateTime using ISOChronology in the default zone,
 * returning <code>this</code> if possible.
 *
 * @return {DateTime} a DateTime using the same millis
 */
DateTime.prototype.toDateTimeISO = function() {
    if (this.getChronology() === ISOChronology.getInstance()) {
        return this;
    }
    return this._super.toDateTimeISO();
};

/**
 * Get this object as a DateTime, returning <code>this</code> if possible.
 *
 * @param {DateTimeZone} zone time zone to apply, or default if null
 * @return {DateTime} a DateTime using the same millis
 */
DateTime.prototype.toDateTime = function(zone) {
    zone = DateTimeUtils.getZone(zone);

    if (this.getZone() === zone) {
        return this;
    }

    return this._super.toDateTime(zone);
};

/**
 * Get this object as a DateTime, returning <code>this</code> if possible.
 *
 * @param {Chronology} chronology chronology to apply, or ISOChronology if null
 * @return {DateTime} a DateTime using the same millis
 */
DateTime.prototype.toDateTime = function(chronology) {
    chronology = DateTimeUtils.getChronology(chronology);

    if (this.getChronology() === chronology) {
        return this;
    }

    return this._super.toDateTime(chronology);
};

//-----------------------------------------------------------------------
/**
 * Returns a copy of this datetime with different millis.
 * <p>
 * The returned object will be either be a new instance or <code>this</code>.
 * Only the millis will change, the chronology and time zone are kept.
 *
 * @param {number} newMillis  the new millis, from 1970-01-01T00:00:00Z
 * @return {DateTime} a copy of this datetime with different millis
 */
DateTime.prototype.withMillis = function(newMillis) {
    return (newMillis === this.getMillis() ? this : new DateTime(newMillis, this.getChronology()));
};

/**
 * Returns a copy of this datetime with a different chronology.
 * <p>
 * The returned object will be either be a new instance or <code>this</code>.
 * Only the chronology will change, the millis are kept.
 *
 * @param {Chronology} newChronology  the new chronology, null means ISO default
 * @return {DateTime} a copy of this datetime with a different chronology
 */
DateTime.prototype.withChronology = function(newChronology) {
    newChronology = DateTimeUtils.getChronology(newChronology);

    return (newChronology == this.getChronology() ? this : new DateTime(this.getMillis(), newChronology));
};

//-----------------------------------------------------------------------
/**
 * Returns a copy of this datetime with a different time zone, preserving the
 * millisecond instant.
 * <p>
 * This method is useful for finding the local time in another timezone.
 * For example, if this instant holds 12:30 in Europe/London, the result
 * from this method with Europe/Paris would be 13:30.
 * <p>
 * The returned object will be a new instance of the same implementation type.
 * This method changes the time zone, and does not change the
 * millisecond instant, with the effect that the field values usually change.
 * The returned object will be either be a new instance or <code>this</code>.
 *
 * @param {DateTimeZone} newZone  the new time zone
 * @return {DateTime} a copy of this datetime with a different time zone
 * @see #withZoneRetainFields
 */
DateTime.prototype.withZone = function(newZone) {
    return this.withChronology(this.getChronology().withZone(newZone));
};

/**
 * Returns a copy of this datetime with a different time zone, preserving the
 * field values.
 * <p>
 * This method is useful for finding the millisecond time in another timezone.
 * For example, if this instant holds 12:30 in Europe/London (ie. 12:30Z),
 * the result from this method with Europe/Paris would be 12:30 (ie. 11:30Z).
 * <p>
 * The returned object will be a new instance of the same implementation type.
 * This method changes the time zone and the millisecond instant to keep
 * the field values the same.
 * The returned object will be either be a new instance or <code>this</code>.
 *
 * @param {DateTimeZone} newZone  the new time zone, null means default
 * @return {DateTime} a copy of this datetime with a different time zone
 * @see #withZone
 */
DateTime.prototype.withZoneRetainFields = function(newZone) {
    newZone = DateTimeUtils.getZone(newZone);

    var originalZone = DateTimeUtils.getZone(this.getZone());

    if (newZone == originalZone) {
        return this;
    }

    var millis = originalZone.getMillisKeepLocal(newZone, this.getMillis());

    return new DateTime(millis, this.getChronology().withZone(newZone));
};

/**
 * Returns a copy of this ZonedDateTime changing the zone offset to the earlier
 * of the two valid offsets at a local time-line overlap.
 * <p>
 * This method only has any effect when the local time-line overlaps, such as at
 * an autumn daylight savings cutover. In this scenario, there are two valid offsets
 * for the local date-time. Calling this method will return a date-time with the
 * earlier of the two selected.
 * <p>
 * If this method is called when it is not an overlap, this is returned.
 * <p>
 * This instance is immutable and unaffected by this method call.
 *
 * @return {DateTime} a copy of this datetime with the earliest valid offset for the local datetime
 */
DateTime.prototype.withEarlierOffsetAtOverlap = function() {
    var newMillis = this.getZone().adjustOffset(getMillis(), false);

    return this.withMillis(newMillis);
};

/**
 * Returns a copy of this ZonedDateTime changing the zone offset to the later
 * of the two valid offsets at a local time-line overlap.
 * <p>
 * This method only has any effect when the local time-line overlaps, such as at
 * an autumn daylight savings cutover. In this scenario, there are two valid offsets
 * for the local date-time. Calling this method will return a date-time with the
 * later of the two selected.
 * <p>
 * If this method is called when it is not an overlap, this is returned.
 * <p>
 * This instance is immutable and unaffected by this method call.
 *
 * @return {DateTime} a copy of this datetime with the latest valid offset for the local datetime
 */
DateTime.prototype.withLaterOffsetAtOverlap = function() {
    var newMillis = this.getZone().adjustOffset(this.getMillis(), true);

    return this.withMillis(newMillis);
};

//-----------------------------------------------------------------------
/**
 * Returns a copy of this datetime with the specified date, retaining the time fields.
 * <p>
 * If the date is already the date passed in, then <code>this</code> is returned.
 * <p>
 * To set a single field use the properties, for example:
 * <pre>
 * DateTime set = monthOfYear().setCopy(6);
 * </pre>
 * <p>
 * This instance is immutable and unaffected by this method call.
 *
 * @param {number} year  the new year value
 * @param {number} monthOfYear  the new monthOfYear value
 * @param {number} dayOfMonth  the new dayOfMonth value
 * @return {DateTime} a copy of this datetime with a different date
 * @throws {Error} if any value if invalid
 */
DateTime.prototype.withDate = function(year, monthOfYear, dayOfMonth) {
    var chrono = this.getChronology();
    var instant = this.getMillis();

    instant = chrono.year().set(instant, year);
    instant = chrono.monthOfYear().set(instant, monthOfYear);
    instant = chrono.dayOfMonth().set(instant, dayOfMonth);

    return this.withMillis(instant);
};

/**
 * Returns a copy of this datetime with the specified time, retaining the date fields.
 * <p>
 * If the time is already the time passed in, then <code>this</code> is returned.
 * <p>
 * To set a single field use the properties, for example:
 * <pre>
 * DateTime set = dt.hourOfDay().setCopy(6);
 * </pre>
 * <p>
 * This instance is immutable and unaffected by this method call.
 *
 * @param {number} hourOfDay  the hour of the day
 * @param {number} minuteOfHour  the minute of the hour
 * @param {number} secondOfMinute  the second of the minute
 * @param {number} millisOfSecond  the millisecond of the second
 * @return {DateTime} a copy of this datetime with a different time
 * @throws {Error} if any value if invalid
 */
DateTime.prototype.withTime = function(hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond) {
    var chrono = this.getChronology();
    var instant = this.getMillis();

    instant = chrono.hourOfDay().set(instant, hourOfDay);
    instant = chrono.minuteOfHour().set(instant, minuteOfHour);
    instant = chrono.secondOfMinute().set(instant, secondOfMinute);
    instant = chrono.millisOfSecond().set(instant, millisOfSecond);

    return this.withMillis(instant);
};

/**
 * Returns a copy of this datetime with the time set to the start of the day.
 * <p>
 * The time will normally be midnight, as that is the earliest time on
 * any given day. However, in some time zones when Daylight Savings Time
 * starts, there is no midnight because time jumps from 11:59 to 01:00.
 * This method handles that situation by returning 01:00 on that date.
 * <p>
 * This instance is immutable and unaffected by this method call.
 *
 * @return {DateTime} a copy of this datetime with the time set to the start of the day, not null
 */
DateTime.prototype.withTimeAtStartOfDay = function() {
    return this.toLocalDate().toDateTimeAtStartOfDay(this.getZone());
};

/**
 * Returns a copy of this datetime with the specified field set to a new value.
 * <p>
 * For example, if the field type is <code>hourOfDay</code> then the hour of day
 * field would be changed in the returned instance.
 * If the field type is null, then <code>this</code> is returned.
 * <p>
 * These three lines are equivalent:
 * <pre>
 * DateTime updated = dt.withField(DateTimeFieldType.dayOfMonth(), 6);
 * DateTime updated = dt.dayOfMonth().setCopy(6);
 * DateTime updated = dt.property(DateTimeFieldType.dayOfMonth()).setCopy(6);
 * </pre>
 *
 * @param {DateTimeFieldType} fieldType  the field type to set, not null
 * @param {number} value  the value to set
 * @return {DateTime} a copy of this datetime with the field set
 * @throws {Error} if the value is null or invalid
 */
DateTime.prototype.withField = function(fieldType, value) {
    assertHasValue(fieldType, "Field must not be null");

    var instant = fieldType.getField(this.getChronology()).set(this.getMillis(), value);

    return this.withMillis(instant);
};

/**
 * Returns a copy of this datetime with the value of the specified field increased.
 * <p>
 * If the addition is zero or the field is null, then <code>this</code> is returned.
 * <p>
 * These three lines are equivalent:
 * <pre>
 * DateTime added = dt.withFieldAdded(DurationFieldType.years(), 6);
 * DateTime added = dt.plusYears(6);
 * DateTime added = dt.plus(Period.years(6));
 * </pre>
 *
 * @param {DurationFieldType} fieldType  the field type to add to, not null
 * @param {number} amount  the amount to add
 * @return {DateTime} a copy of this datetime with the field updated
 * @throws {Error} if the value is null or invalid or if the new datetime exceeds the capacity of a long
 */
DateTime.prototype.withFieldAdded = function(fieldType, amount) {
    assertHasValue(fieldType, "Field must not be null");

    if (amount === 0) {
        return this;
    }

    var instant = fieldType.getField(this.getChronology()).add(this.getMillis(), amount);

    return this.withMillis(instant);
};

/**
 * Returns a copy of this datetime with the specified duration added.
 * <p>
 * If the addition is zero, then <code>this</code> is returned.
 *
 * @param {ReadableDuration|number} durationToAdd  the duration to add to this one
 * @param {number} scalar  the amount of times to add, such as -1 to subtract once
 * @return {DateTime} a copy of this datetime with the duration added
 * @throws {Error} if the new datetime exceeds the capacity of a long
 */
DateTime.prototype.withDurationAdded = function(durationToAdd, scalar) {
    if (!durationToAdd || scalar === 0) {
        return this;
    }

    if (durationToAdd instanceof ReadableDuration) {
        durationToAdd = durationToAdd.getMillis();
    }

    var instant = this.getChronology().add(this.getMillis(), durationToAdd, scalar);

    return this.withMillis(instant);
};

/**
 * Returns a copy of this datetime with the specified period added.
 * <p>
 * If the addition is zero, then <code>this</code> is returned.
 * <p>
 * This method is typically used to add multiple copies of complex
 * period instances. Adding one field is best achieved using methods
 * like {@link #withFieldAdded(DurationFieldType, int)}
 * or {@link #plusYears(int)}.
 *
 * @param {ReadablePeriod} period  the period to add to this one, null means zero
 * @param {number} scalar  the amount of times to add, such as -1 to subtract once
 * @return {DateTime} a copy of this datetime with the period added
 * @throws {Error} if the new datetime exceeds the capacity of a long
 */
DateTime.prototype.withPeriodAdded = function(period, scalar) {
    if (period == null || scalar === 0) {
        return this;
    }

    var instant = this.getChronology().add(period, this.getMillis(), scalar);

    return this.withMillis(instant);
};

//-----------------------------------------------------------------------
/**
 * Returns a copy of this datetime with the specified duration added.
 * <p>
 * If the amount is zero or null, then <code>this</code> is returned.
 * This datetime instance is immutable and unaffected by this method call.
 *
 * @param {ReadablePeriod|ReadableDuration|number} value  the duration, millis, or the period to add to this one
 * @return {DateTime} a copy of this datetime with the duration added
 * @throws {Error} if the new datetime exceeds the capacity of a long
 */
DateTime.prototype.plus = function(value) {
    if (value instanceof ReadablePeriod) {
        return this.withPeriodAdded(value, 1);
    } else {
        return this.withDurationAdded(value, 1);
    }
};

/**
 * Returns a copy of this datetime plus the specified number of years.
 * <p>
 * The calculation will do its best to only change the year field
 * retaining the same month of year.
 * However, in certain circumstances, it may be necessary to alter
 * smaller fields. For example, 2008-02-29 plus one year cannot result
 * in 2009-02-29, so the day of month is adjusted to 2009-02-28.
 * <p>
 * The following three lines are identical in effect:
 * <pre>
 * DateTime added = dt.plusYears(6);
 * DateTime added = dt.plus(Period.years(6));
 * DateTime added = dt.withFieldAdded(DurationFieldType.years(), 6);
 * </pre>
 * <p>
 * This datetime instance is immutable and unaffected by this method call.
 *
 * @param {number} years  the amount of years to add, may be negative
 * @return {DateTime} the new datetime plus the increased years
 * @since 1.1
 */
DateTime.prototype.plusYears = function(years) {
    if (years === 0) {
        return this;
    }

    var instant = this.getChronology().years().add(this.getMillis(), years);

    return this.withMillis(instant);
};

/**
 * Returns a copy of this datetime plus the specified number of months.
 * <p>
 * The calculation will do its best to only change the month field
 * retaining the same day of month.
 * However, in certain circumstances, it may be necessary to alter
 * smaller fields. For example, 2007-03-31 plus one month cannot result
 * in 2007-04-31, so the day of month is adjusted to 2007-04-30.
 * <p>
 * The following three lines are identical in effect:
 * <pre>
 * DateTime added = dt.plusMonths(6);
 * DateTime added = dt.plus(Period.months(6));
 * DateTime added = dt.withFieldAdded(DurationFieldType.months(), 6);
 * </pre>
 * <p>
 * This datetime instance is immutable and unaffected by this method call.
 *
 * @param {number} months  the amount of months to add, may be negative
 * @return {DateTime} the new datetime plus the increased months
 * @since 1.1
 */
DateTime.prototype.plusMonths = function(months) {
    if (months === 0) {
        return this;
    }

    var instant = this.getChronology().months().add(this.getMillis(), months);

    return this.withMillis(instant);
};

/**
 * Returns a copy of this datetime plus the specified number of weeks.
 * <p>
 * The calculation operates as if it were adding the equivalent in days.
 * <p>
 * The following three lines are identical in effect:
 * <pre>
 * DateTime added = dt.plusWeeks(6);
 * DateTime added = dt.plus(Period.weeks(6));
 * DateTime added = dt.withFieldAdded(DurationFieldType.weeks(), 6);
 * </pre>
 * <p>
 * This datetime instance is immutable and unaffected by this method call.
 *
 * @param weeks  the amount of weeks to add, may be negative
 * @return {DateTime} the new datetime plus the increased weeks
 * @since 1.1
 */
DateTime.prototype.plusWeeks = function(weeks) {
    if (weeks === 0) {
        return this;
    }

    var instant = this.getChronology().weeks().add(this.getMillis(), weeks);

    return this.withMillis(instant);
};

/**
 * Returns a copy of this datetime plus the specified number of days.
 * <p>
 * The calculation will do its best to only change the day field
 * retaining the same time of day.
 * However, in certain circumstances, typically daylight savings cutover,
 * it may be necessary to alter the time fields.
 * <p>
 * In spring an hour is typically removed. If adding one day results in
 * the time being within the cutover then the time is adjusted to be
 * within summer time. For example, if the cutover is from 01:59 to 03:00
 * and the result of this method would have been 02:30, then the result
 * will be adjusted to 03:30.
 * <p>
 * The following three lines are identical in effect:
 * <pre>
 * DateTime added = dt.plusDays(6);
 * DateTime added = dt.plus(Period.days(6));
 * DateTime added = dt.withFieldAdded(DurationFieldType.days(), 6);
 * </pre>
 * <p>
 * This datetime instance is immutable and unaffected by this method call.
 *
 * @param {number} days  the amount of days to add, may be negative
 * @return {DateTime} the new datetime plus the increased days
 * @since 1.1
 */
DateTime.prototype.plusDays = function(days) {
    if (days === 0) {
        return this;
    }

    var instant = this.getChronology().days().add(this.getMillis(), days);

    return this.withMillis(instant);
};

/**
 * Returns a copy of this datetime plus the specified number of hours.
 * <p>
 * The calculation will add a duration equivalent to the number of hours
 * expressed in milliseconds.
 * <p>
 * For example, if a spring daylight savings cutover is from 01:59 to 03:00
 * then adding one hour to 01:30 will result in 03:30. This is a duration
 * of one hour later, even though the hour field value changed from 1 to 3.
 * <p>
 * The following three lines are identical in effect:
 * <pre>
 * DateTime added = dt.plusHours(6);
 * DateTime added = dt.plus(Period.hours(6));
 * DateTime added = dt.withFieldAdded(DurationFieldType.hours(), 6);
 * </pre>
 * <p>
 * This datetime instance is immutable and unaffected by this method call.
 *
 * @param {number} hours  the amount of hours to add, may be negative
 * @return {DateTime} the new datetime plus the increased hours
 * @since 1.1
 */
DateTime.prototype.plusHours = function(hours) {
    if (hours === 0) {
        return this;
    }

    var instant = this.getChronology().hours().add(this.getMillis(), hours);

    return this.withMillis(instant);
};

/**
 * Returns a copy of this datetime plus the specified number of minutes.
 * <p>
 * The calculation will add a duration equivalent to the number of minutes
 * expressed in milliseconds.
 * <p>
 * The following three lines are identical in effect:
 * <pre>
 * DateTime added = dt.plusMinutes(6);
 * DateTime added = dt.plus(Period.minutes(6));
 * DateTime added = dt.withFieldAdded(DurationFieldType.minutes(), 6);
 * </pre>
 * <p>
 * This datetime instance is immutable and unaffected by this method call.
 *
 * @param {number} minutes  the amount of minutes to add, may be negative
 * @return {DateTime} the new datetime plus the increased minutes
 * @since 1.1
 */
DateTime.prototype.plusMinutes = function(minutes) {
    if (minutes === 0) {
        return this;
    }

    var instant = this.getChronology().minutes().add(this.getMillis(), minutes);

    return this.withMillis(instant);
};

/**
 * Returns a copy of this datetime plus the specified number of seconds.
 * <p>
 * The calculation will add a duration equivalent to the number of seconds
 * expressed in milliseconds.
 * <p>
 * The following three lines are identical in effect:
 * <pre>
 * DateTime added = dt.plusSeconds(6);
 * DateTime added = dt.plus(Period.seconds(6));
 * DateTime added = dt.withFieldAdded(DurationFieldType.seconds(), 6);
 * </pre>
 * <p>
 * This datetime instance is immutable and unaffected by this method call.
 *
 * @param {number} seconds  the amount of seconds to add, may be negative
 * @return {DateTime} the new datetime plus the increased seconds
 * @since 1.1
 */
DateTime.prototype.plusSeconds = function(seconds) {
    if (seconds === 0) {
        return this;
    }

    var instant = this.getChronology().seconds().add(this.getMillis(), seconds);

    return this.withMillis(instant);
};

/**
 * Returns a copy of this datetime plus the specified number of millis.
 * <p>
 * The calculation will add a duration equivalent to the number of milliseconds.
 * <p>
 * The following three lines are identical in effect:
 * <pre>
 * DateTime added = dt.plusMillis(6);
 * DateTime added = dt.plus(Period.millis(6));
 * DateTime added = dt.withFieldAdded(DurationFieldType.millis(), 6);
 * </pre>
 * <p>
 * This datetime instance is immutable and unaffected by this method call.
 *
 * @param {number} millis  the amount of millis to add, may be negative
 * @return {DateTime} the new datetime plus the increased millis
 * @since 1.1
 */
DateTime.prototype.plusMillis = function(millis) {
    if (millis === 0) {
        return this;
    }

    var instant = this.getChronology().millis().add(this.getMillis(), millis);

    return this.withMillis(instant);
};

/**
 * Returns a copy of this datetime with the specified duration taken away.
 * <p>
 * If the amount is zero or null, then <code>this</code> is returned.
 * This datetime instance is immutable and unaffected by this method call.
 *
 * @param {ReadablePeriod|ReadableDuration|number} value  the duration, millis, or the period to reduce this instant by
 * @return {DateTime} a copy of this datetime with the duration taken away
 * @throws {Error} if the new datetime exceeds the capacity of a long
 */
DateTime.prototype.minus = function(value) {
    if (value instanceof ReadablePeriod) {
        return this.withPeriodAdded(value, -1);
    } else {
        return this.withDurationAdded(value, -1);
    }
};

/**
 * Returns a copy of this datetime minus the specified number of years.
 * <p>
 * The calculation will do its best to only change the year field
 * retaining the same month of year.
 * However, in certain circumstances, it may be necessary to alter
 * smaller fields. For example, 2008-02-29 minus one year cannot result
 * in 2007-02-29, so the day of month is adjusted to 2007-02-28.
 * <p>
 * The following three lines are identical in effect:
 * <pre>
 * DateTime subtracted = dt.minusYears(6);
 * DateTime subtracted = dt.minus(Period.years(6));
 * DateTime subtracted = dt.withFieldAdded(DurationFieldType.years(), -6);
 * </pre>
 * <p>
 * This datetime instance is immutable and unaffected by this method call.
 *
 * @param {number} years  the amount of years to subtract, may be negative
 * @return {DateTime} the new datetime minus the increased years
 * @since 1.1
 */
DateTime.prototype.minusYears = function(years) {
    if (years === 0) {
        return this;
    }

    var instant = this.getChronology().years().subtract(this.getMillis(), years);

    return this.withMillis(instant);
};

/**
 * Returns a copy of this datetime minus the specified number of months.
 * <p>
 * The calculation will do its best to only change the month field
 * retaining the same day of month.
 * However, in certain circumstances, it may be necessary to alter
 * smaller fields. For example, 2007-05-31 minus one month cannot result
 * in 2007-04-31, so the day of month is adjusted to 2007-04-30.
 * <p>
 * The following three lines are identical in effect:
 * <pre>
 * DateTime subtracted = dt.minusMonths(6);
 * DateTime subtracted = dt.minus(Period.months(6));
 * DateTime subtracted = dt.withFieldAdded(DurationFieldType.months(), -6);
 * </pre>
 * <p>
 * This datetime instance is immutable and unaffected by this method call.
 *
 * @param {number} months  the amount of months to subtract, may be negative
 * @return {DateTime} the new datetime minus the increased months
 * @since 1.1
 */
DateTime.prototype.minusMonths = function(months) {
    if (months === 0) {
        return this;
    }

    var instant = this.getChronology().months().subtract(this.getMillis(), months);

    return this.withMillis(instant);
};

/**
 * Returns a copy of this datetime minus the specified number of weeks.
 * <p>
 * The calculation operates as if it were subtracting the equivalent in days.
 * <p>
 * The following three lines are identical in effect:
 * <pre>
 * DateTime subtracted = dt.minusWeeks(6);
 * DateTime subtracted = dt.minus(Period.weeks(6));
 * DateTime subtracted = dt.withFieldAdded(DurationFieldType.weeks(), -6);
 * </pre>
 * <p>
 * This datetime instance is immutable and unaffected by this method call.
 *
 * @param {number} weeks  the amount of weeks to subtract, may be negative
 * @return {DateTime} the new datetime minus the increased weeks
 * @since 1.1
 */
DateTime.prototype.minusWeeks = function(weeks) {
    if (weeks === 0) {
        return this;
    }

    var instant = this.getChronology().weeks().subtract(this.getMillis(), weeks);

    return this.withMillis(instant);
};

/**
 * Returns a copy of this datetime minus the specified number of days.
 * <p>
 * The calculation will do its best to only change the day field
 * retaining the same time of day.
 * However, in certain circumstances, typically daylight savings cutover,
 * it may be necessary to alter the time fields.
 * <p>
 * In spring an hour is typically removed. If subtracting one day results
 * in the time being within the cutover then the time is adjusted to be
 * within summer time. For example, if the cutover is from 01:59 to 03:00
 * and the result of this method would have been 02:30, then the result
 * will be adjusted to 03:30.
 * <p>
 * The following three lines are identical in effect:
 * <pre>
 * DateTime subtracted = dt.minusDays(6);
 * DateTime subtracted = dt.minus(Period.days(6));
 * DateTime subtracted = dt.withFieldAdded(DurationFieldType.days(), -6);
 * </pre>
 * <p>
 * This datetime instance is immutable and unaffected by this method call.
 *
 * @param {number} days  the amount of days to subtract, may be negative
 * @return {DateTime} the new datetime minus the increased days
 * @since 1.1
 */
DateTime.prototype.minusDays = function(days) {
    if (days === 0) {
        return this;
    }

    var instant = this.getChronology().days().subtract(this.getMillis(), days);

    return this.withMillis(instant);
};

/**
 * Returns a copy of this datetime minus the specified number of hours.
 * <p>
 * The calculation will subtract a duration equivalent to the number of
 * hours expressed in milliseconds.
 * <p>
 * For example, if a spring daylight savings cutover is from 01:59 to 03:00
 * then subtracting one hour from 03:30 will result in 01:30. This is a
 * duration of one hour earlier, even though the hour field value changed
 * from 3 to 1.
 * <p>
 * The following three lines are identical in effect:
 * <pre>
 * DateTime subtracted = dt.minusHours(6);
 * DateTime subtracted = dt.minus(Period.hours(6));
 * DateTime subtracted = dt.withFieldAdded(DurationFieldType.hours(), -6);
 * </pre>
 * <p>
 * This datetime instance is immutable and unaffected by this method call.
 *
 * @param {number} hours  the amount of hours to subtract, may be negative
 * @return {DateTime} the new datetime minus the increased hours
 * @since 1.1
 */
DateTime.prototype.minusHours = function(hours) {
    if (hours === 0) {
        return this;
    }

    var instant = this.getChronology().hours().subtract(this.getMillis(), hours);

    return this.withMillis(instant);
};

/**
 * Returns a copy of this datetime minus the specified number of minutes.
 * <p>
 * The calculation will subtract a duration equivalent to the number of
 * minutes expressed in milliseconds.
 * <p>
 * The following three lines are identical in effect:
 * <pre>
 * DateTime subtracted = dt.minusMinutes(6);
 * DateTime subtracted = dt.minus(Period.minutes(6));
 * DateTime subtracted = dt.withFieldAdded(DurationFieldType.minutes(), -6);
 * </pre>
 * <p>
 * This datetime instance is immutable and unaffected by this method call.
 *
 * @param {number} minutes  the amount of minutes to subtract, may be negative
 * @return {DateTime} the new datetime minus the increased minutes
 * @since 1.1
 */
DateTime.prototype.minusMinutes = function(minutes) {
    if (minutes == 0) {
        return this;
    }

    var instant = this.getChronology().minutes().subtract(this.getMillis(), minutes);

    return this.withMillis(instant);
};

/**
 * Returns a copy of this datetime minus the specified number of seconds.
 * <p>
 * The calculation will subtract a duration equivalent to the number of
 * seconds expressed in milliseconds.
 * <p>
 * The following three lines are identical in effect:
 * <pre>
 * DateTime subtracted = dt.minusSeconds(6);
 * DateTime subtracted = dt.minus(Period.seconds(6));
 * DateTime subtracted = dt.withFieldAdded(DurationFieldType.seconds(), -6);
 * </pre>
 * <p>
 * This datetime instance is immutable and unaffected by this method call.
 *
 * @param {number} seconds  the amount of seconds to subtract, may be negative
 * @return {DateTime} the new datetime minus the increased seconds
 * @since 1.1
 */
DateTime.prototype.minusSeconds = function(seconds) {
    if (seconds == 0) {
        return this;
    }

    var instant = this.getChronology().seconds().subtract(this.getMillis(), seconds);

    return this.withMillis(instant);
};

/**
 * Returns a copy of this datetime minus the specified number of millis.
 * <p>
 * The calculation will subtract a duration equivalent to the number of
 * milliseconds.
 * <p>
 * The following three lines are identical in effect:
 * <pre>
 * DateTime subtracted = dt.minusMillis(6);
 * DateTime subtracted = dt.minus(Period.millis(6));
 * DateTime subtracted = dt.withFieldAdded(DurationFieldType.millis(), -6);
 * </pre>
 * <p>
 * This datetime instance is immutable and unaffected by this method call.
 *
 * @param {number} millis  the amount of millis to subtract, may be negative
 * @return {DateTime} the new datetime minus the increased millis
 * @since 1.1
 */
DateTime.prototype.minusMillis = function(millis) {
    if (millis === 0) {
        return this;
    }

    var instant = this.getChronology().millis().subtract(this.getMillis(), millis);

    return this.withMillis(instant);
};

/**
 * Returns a copy of this datetime with the era field updated.
 * <p>
 * DateTime is immutable, so there are no set methods.
 * Instead, this method returns a new instance with the value of
 * era changed.
 *
 * @param  {number}   era  the era to set
 * @return {DateTime} a copy of this object with the field set
 * @throws {Error} if the value is invalid
 * @since 1.3
 */
DateTime.prototype.withEra = function(era) {
    return this.withMillis(this.getChronology().era().set(this.getMillis(), era));
};

/**
 * Returns a copy of this datetime with the century of era field updated.
 * <p>
 * DateTime is immutable, so there are no set methods.
 * Instead, this method returns a new instance with the value of
 * century of era changed.
 *
 * @param  {number}   centuryOfEra  the centurey of era to set
 * @return {DateTime}  a copy of this object with the field set
 * @throws {Error} if the value is invalid
 * @since 1.3
 */
DateTime.prototype.withCenturyOfEra = function(centuryOfEra) {
    return this.withMillis(this.getChronology().centuryOfEra().set(this.getMillis(), centuryOfEra));
};

/**
 * Returns a copy of this datetime with the year of era field updated.
 * <p>
 * DateTime is immutable, so there are no set methods.
 * Instead, this method returns a new instance with the value of
 * year of era changed.
 *
 * @param  {number}   yearOfEra  the year of era to set
 * @return {DateTime}  a copy of this object with the field set
 * @throws {Error} if the value is invalid
 * @since 1.3
 */
DateTime.prototype.withYearOfEra = function(yearOfEra) {
    return this.withMillis(this.getChronology().yearOfEra().set(this.getMillis(), yearOfEra));
};

/**
 * Returns a copy of this datetime with the year of century field updated.
 * <p>
 * DateTime is immutable, so there are no set methods.
 * Instead, this method returns a new instance with the value of
 * year of century changed.
 *
 * @param  {number}   yearOfCentury  the year of century to set
 * @return {DateTime}  a copy of this object with the field set
 * @throws {Error} if the value is invalid
 * @since 1.3
 */
DateTime.prototype.withYearOfCentury = function(yearOfCentury) {
    return this.withMillis(this.getChronology().yearOfCentury().set(this.getMillis(), yearOfCentury));
};

/**
 * Returns a copy of this datetime with the year field updated.
 * <p>
 * DateTime is immutable, so there are no set methods.
 * Instead, this method returns a new instance with the value of
 * year changed.
 *
 * @param  {number}   year  the year to set
 * @return {DateTime}  a copy of this object with the field set
 * @throws {Error} if the value is invalid
 * @since 1.3
 */
DateTime.prototype.withYear = function(year) {
    return this.withMillis(this.getChronology().year().set(this.getMillis(), year));
};

/**
 * Returns a copy of this datetime with the weekyear field updated.
 * <p>
 * The weekyear is the year that matches with the weekOfWeekyear field.
 * In the standard ISO8601 week algorithm, the first week of the year
 * is that in which at least 4 days are in the year. As a result of this
 * definition, day 1 of the first week may be in the previous year.
 * The weekyear allows you to query the effective year for that day.
 * <p>
 * DateTime is immutable, so there are no set methods.
 * Instead, this method returns a new instance with the value of
 * weekyear changed.
 *
 * @param  {number}   weekyear  the weekyear to set
 * @return {DateTime}  a copy of this object with the field set
 * @throws {Error} if the value is invalid
 * @since 1.3
 */
DateTime.prototype.withWeekyear = function(weekyear) {
    return this.withMillis(this.getChronology().weekyear().set(this.getMillis(), weekyear));
};

/**
 * Returns a copy of this datetime with the month of year field updated.
 * <p>
 * DateTime is immutable, so there are no set methods.
 * Instead, this method returns a new instance with the value of
 * month of year changed.
 *
 * @param  {number}   monthOfYear  the month of year to set
 * @return {DateTime}  a copy of this object with the field set
 * @throws {Error} if the value is invalid
 * @since 1.3
 */
DateTime.prototype.withMonthOfYear = function(monthOfYear) {
    return this.withMillis(this.getChronology().monthOfYear().set(this.getMillis(), monthOfYear));
};

/**
 * Returns a copy of this datetime with the week of weekyear field updated.
 * <p>
 * This field is associated with the "weekyear" via {@link #withWeekyear(int)}.
 * In the standard ISO8601 week algorithm, the first week of the year
 * is that in which at least 4 days are in the year. As a result of this
 * definition, day 1 of the first week may be in the previous year.
 * <p>
 * DateTime is immutable, so there are no set methods.
 * Instead, this method returns a new instance with the value of
 * week of weekyear changed.
 *
 * @param  {number}   weekOfWeekyear  the week of weekyear to set
 * @return {DateTime}  a copy of this object with the field set
 * @throws {Error} if the value is invalid
 * @since 1.3
 */
DateTime.prototype.withWeekOfWeekyear = function(weekOfWeekyear) {
    return this.withMillis(this.getChronology().weekOfWeekyear().set(this.getMillis(), weekOfWeekyear));
};

/**
 * Returns a copy of this datetime with the day of year field updated.
 * <p>
 * DateTime is immutable, so there are no set methods.
 * Instead, this method returns a new instance with the value of
 * day of year changed.
 *
 * @param  {number}   dayOfYear  the day of year to set
 * @return {DateTime}  a copy of this object with the field set
 * @throws {Error} if the value is invalid
 * @since 1.3
 */
DateTime.prototype.withDayOfYear = function(dayOfYear) {
    return this.withMillis(this.getChronology().dayOfYear().set(this.getMillis(), dayOfYear));
};

/**
 * Returns a copy of this datetime with the day of month field updated.
 * <p>
 * DateTime is immutable, so there are no set methods.
 * Instead, this method returns a new instance with the value of
 * day of month changed.
 *
 * @param  {number}   dayOfMonth  the day of month to set
 * @return {DateTime}  a copy of this object with the field set
 * @throws {Error} if the value is invalid
 * @since 1.3
 */
DateTime.prototype.withDayOfMonth = function(dayOfMonth) {
    return this.withMillis(this.getChronology().dayOfMonth().set(this.getMillis(), dayOfMonth));
};

/**
 * Returns a copy of this datetime with the day of week field updated.
 * <p>
 * DateTime is immutable, so there are no set methods.
 * Instead, this method returns a new instance with the value of
 * day of week changed.
 *
 * @param  {number}   dayOfWeek  the day of week to set
 * @return {DateTime}  a copy of this object with the field set
 * @throws {Error} if the value is invalid
 * @since 1.3
 */
DateTime.prototype.withDayOfWeek = function(dayOfWeek) {
    return this.withMillis(this.getChronology().dayOfWeek().set(this.getMillis(), dayOfWeek));
};

//-----------------------------------------------------------------------
/**
 * Returns a copy of this datetime with the hour of day field updated.
 * <p>
 * DateTime is immutable, so there are no set methods.
 * Instead, this method returns a new instance with the value of
 * hour of day changed.
 *
 * @param  {number}   hour  the hour of day to set
 * @return {DateTime}  a copy of this object with the field set
 * @throws {Error} if the value is invalid
 * @since 1.3
 */
DateTime.prototype.withHourOfDay = function(hour) {
    return this.withMillis(this.getChronology().hourOfDay().set(this.getMillis(), hour));
};

/**
 * Returns a copy of this datetime with the minute of hour updated.
 * <p>
 * DateTime is immutable, so there are no set methods.
 * Instead, this method returns a new instance with the value of
 * minute of hour changed.
 *
 * @param  {number}   minute  the minute of hour to set
 * @return {DateTime}  a copy of this object with the field set
 * @throws {Error} if the value is invalid
 * @since 1.3
 */
DateTime.prototype.withMinuteOfHour = function(minute) {
    return this.withMillis(this.getChronology().minuteOfHour().set(this.getMillis(), minute));
};

/**
 * Returns a copy of this datetime with the second of minute field updated.
 * <p>
 * DateTime is immutable, so there are no set methods.
 * Instead, this method returns a new instance with the value of
 * second of minute changed.
 *
 * @param  {number}   second  the second of minute to set
 * @return {DateTime}  a copy of this object with the field set
 * @throws {Error} if the value is invalid
 * @since 1.3
 */
DateTime.prototype.withSecondOfMinute = function(second) {
    return this.withMillis(this.getChronology().secondOfMinute().set(this.getMillis(), second));
};

/**
 * Returns a copy of this datetime with the millis of second field updated.
 * <p>
 * DateTime is immutable, so there are no set methods.
 * Instead, this method returns a new instance with the value of
 * millis of second changed.
 *
 * @param  {number}   millis  the millis of second to set
 * @return {DateTime}  a copy of this object with the field set
 * @throws {Error} if the value is invalid
 * @since 1.3
 */
DateTime.prototype.withMillisOfSecond = function(millis) {
    return this.withMillis(this.getChronology().millisOfSecond().set(this.getMillis(), millis));
};

/**
 * Returns a copy of this datetime with the millis of day field updated.
 * <p>
 * DateTime is immutable, so there are no set methods.
 * Instead, this method returns a new instance with the value of
 * millis of day changed.
 *
 * @param  {number}   millis  the millis of day to set
 * @return {DateTime}  a copy of this object with the field set
 * @throws {Error} if the value is invalid
 * @since 1.3
 */
DateTime.prototype.withMillisOfDay = function(millis) {
    return this.withMillis(this.getChronology().millisOfDay().set(this.getMillis(), millis));
};
