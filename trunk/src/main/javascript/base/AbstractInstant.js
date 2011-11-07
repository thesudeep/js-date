/**
 * AbstractInstant provides the common behaviour for instant classes.
 * <p>
 * This class has no concept of a chronology, all methods work on the
 * millisecond instant.
 * <p>
 * This class should generally not be used directly by API users. The
 * {@link ReadableInstant} interface should be used when different
 * kinds of date/time objects are to be referenced.
 * <p>
 * Whenever you want to implement <code>ReadableInstant</code> you should
 * extend this class.
 * <p>
 * AbstractInstant itself is thread-safe and immutable, but subclasses may be
 * mutable and not thread-safe.
 *
 * @author Stephen Colebourne
 * @author Brian S O'Neill
 * @since 1.0
 */
AbstractInstant = function() {
    this._super.constructor();
};

inherits(AbstractInstant, ReadableInstant);


/**
 * Gets the time zone of the instant from the chronology.
 *
 * @return {DateTimeZone} the DateTimeZone that the instant is using, never null
 */
AbstractInstant.prototype.getZone = function() {
    return this.getChronology().getZone();
};

/**
 * Get the value of one of the fields of a datetime using the chronology of the instant.
 * <p>
 * This method uses the chronology of the instant to obtain the value.
 * For example:
 * <pre>
 * DateTime dt = new DateTime();
 * int year = dt.get(DateTimeFieldType.year());
 * </pre>
 *
 * @param {DateTimeFieldType} type  a field type, usually obtained from DateTimeFieldType, not null
 * @return {number} the value of that field
 * @throws {Error} if the field type is null
 */
AbstractInstant.prototype.get = function(type) {
    assertHasValue(type, "The DateTimeFieldType must not be null");

    return type.getField(this.getChronology()).get(this.getMillis());
};

/**
 * Checks if the field type specified is supported by this instant and chronology.
 * This can be used to avoid exceptions in {@link #get(DateTimeFieldType)}.
 *
 * @param {DateTimeFieldType} type  a field type, usually obtained from DateTimeFieldType
 * @return {boolean} true if the field type is supported
 */
AbstractInstant.prototype.isSupported = function(type) {
    return hasValue(type) && type.getField(this.getChronology()).isSupported();
};

/**
 * Get the value of one of the fields of a datetime.
 * <p>
 * This could be used to get a field using a different Chronology.
 * For example:
 * <pre>
 * Instant dt = new Instant();
 * int gjYear = dt.get(Chronology.getCoptic().year());
 * </pre>
 *
 * @param {DateTimeField} field  the DateTimeField to use, not null
 * @return {number} the value
 * @throws {Error} if the field is null
 */
AbstractInstant.prototype.get = function(field) {
    assertHasValue(field, "The DateTimeField must not be null");

    return field.get(this.getMillis());
};

/**
 * Get this object as a DateTime in the same zone.
 *
 * @return {DateTime} a DateTime using the same millis
 */
AbstractInstant.prototype.toDateTime = function() {
    return new DateTime(this.getMillis(), this.getZone());
};

/**
 * Get this object as a DateTime using ISOChronology in the same zone.
 *
 * @return {DateTime} a DateTime using the same millis with ISOChronology
 */
AbstractInstant.prototype.toDateTimeISO = function() {
    return new DateTime(this.getMillis(), ISOChronology.getInstance(this.getZone()));
};

/**
 * Get this object as a DateTime using the same chronology but a different zone.
 *
 * @param {DateTimeZone} zone time zone to apply, or default if null
 * @return {DateTime} a DateTime using the same millis
 */
AbstractInstant.prototype.toDateTime = function(zone) {
    var chrono = DateTimeUtils.getChronology(this.getChronology());

    chrono = chrono.withZone(zone);

    return new DateTime(this.getMillis(), chrono);
};

/**
 * Get this object as a DateTime using the given chronology and its zone.
 *
 * @param {Chronology} chronology chronology to apply, or ISOChronology if null
 * @return {DateTime} a DateTime using the same millis
 */
/**  */
AbstractInstant.prototype.toDateTime = function(chronology) {
    return new DateTime(this.getMillis(), chronology);
};

/**
 * Get the date time as a <code>java.util.Date</code>.
 * <p>
 * The <code>Date</code> object created has exactly the same millisecond
 * instant as this object.
 *
 * @return {Date} a Date initialised with this datetime
 */
AbstractInstant.prototype.toDate = function() {
    return new Date(this.getMillis());
};

//-----------------------------------------------------------------------
/**
 * Compares this object with the specified object for equality based
 * on the millisecond instant, chronology and time zone.
 * <p>
 * Two objects which represent the same instant in time, but are in
 * different time zones (based on time zone id), will be considered to
 * be different. Only two objects with the same {@link DateTimeZone},
 * {@link Chronology} and instant are equal.
 * <p>
 * See {@link #isEqual(ReadableInstant)} for an equals method that
 * ignores the Chronology and time zone.
 * <p>
 * All ReadableInstant instances are accepted.
 *
 * @param {ReadableInstant} readableInstant  a readable instant to check against
 * @return {boolean} true if millisecond and chronology are equal, false if not or the instant is null or of an incorrect type
 */
AbstractInstant.prototype.equals = function(readableInstant) {
    // must be to fulfil ReadableInstant contract
    if (this == readableInstant) {
        return true;
    }
    if (!(readableInstant instanceof ReadableInstant)) {
        return false;
    }
    return this.getMillis() == readableInstant.getMillis() && FieldUtils.equals(this.getChronology(), readableInstant.getChronology());
};

/**
 * Compares this object with the specified object for ascending
 * millisecond instant order. This ordering is inconsistent with
 * equals, as it ignores the Chronology.
 * <p>
 * All ReadableInstant instances are accepted.
 *
 * @param {ReadableInstant} other  a readable instant to check against
 * @return {number} negative value if this is less, 0 if equal, or positive value if greater
 */
AbstractInstant.prototype.compareTo = function(other) {
    if (this == other) {
        return 0;
    }

    var otherMillis = other.getMillis();
    var thisMillis = this.getMillis();

    // cannot do (thisMillis - otherMillis) as can overflow
    if (thisMillis == otherMillis) {
        return 0;
    }
    if (thisMillis < otherMillis) {
        return -1;
    } else {
        return 1;
    }
};

/**
 * Is this instant after the current instant
 * comparing solely by millisecond.
 *
 * @return {boolean} true if this instant is after the current instant
 */
AbstractInstant.prototype.isAfterNow = function() {
    return this.isAfter(DateTimeUtils.currentTimeMillis());
};

/**
 * Is this instant after the instant or the millisecond instant passed in comparing solely by millisecond.
 *
 * @param {ReadableInstant|number} instant  an instant to check against, null means now
 * @return {boolean} true if the instant is after the instant passed in
 */
AbstractInstant.prototype.isAfter = function(instant) {
    var millis = instant instanceof ReadableInstant ? DateTimeUtils.getInstantMillis(instant) : instant;

    return (this.getMillis() > millis);
};

/**
 * Is this instant before the current instant
 * comparing solely by millisecond.
 *
 * @return {boolean} true if this instant is before the current instant
 */
AbstractInstant.prototype.isBeforeNow = function() {
    return isBefore(DateTimeUtils.currentTimeMillis());
};

/**
 * Is this instant before the instant or the millisecond instant passed in
 * comparing solely by millisecond.
 *
 * @param {ReadableInstant|number} instant  an instant to check against, null means now
 * @return {boolean} true if the instant is before the instant passed in
 */
AbstractInstant.prototype.isBefore = function(instant) {
    var millis = instant instanceof ReadableInstant ? DateTimeUtils.getInstantMillis(instant) : instant;

    return (this.getMillis() < millis);
};

/**
 * Is this instant equal to the current instant
 * comparing solely by millisecond.
 *
 * @return true if this instant is before the current instant
 */
/** boolean */
AbstractInstant.prototype.isEqualNow = function() {
    return this.isEqual(DateTimeUtils.currentTimeMillis());
};

/**
 * Is this instant equal to the instant or the millisecond instant passed in
 * comparing solely by millisecond.
 *
 * @param {ReadableInstant|number} instant  an instant to check against, null means now
 * @return {boolean} true if the instant is equal to the instant passed in
 */
AbstractInstant.prototype.isEqual = function(instant) {
    var millis = instant instanceof ReadableInstant ? DateTimeUtils.getInstantMillis(instant) : instant;

    return (this.getMillis() === millis);
};

/**
 * Output the date time in ISO8601 format (yyyy-MM-ddTHH:mm:ss.SSSZZ).
 *
 * @return {String} ISO8601 time formatted string.
 */
AbstractInstant.prototype.toString = function() {
};

/**
 * Uses the specified formatter to convert this partial to a String.
 *
 * @param {DateTimeFormatter=} formatter  the formatter to use, null means use <code>toString()</code>.
 * @return {String} the formatted string
 */
AbstractInstant.prototype.toString = function(formatter) {
    if (formatter == null) {
        return ISODateTimeFormat.dateTime().print(this);
    }
    return formatter.print(this);
};
