/**
 * BaseDateTimeField provides the common behaviour for DateTimeField
 * implementations.
 * <p>
 * This class should generally not be used directly by API users. The
 * DateTimeField class should be used when different kinds of DateTimeField
 * objects are to be referenced.
 * <p>
 * BaseDateTimeField is thread-safe and immutable, and its subclasses must
 * be as well.
 *
 * @author Brian S O'Neill
 * @since 1.0
 * @see DecoratedDateTimeField
 */
BaseDateTimeField = function(type) {
    this._super.constructor();

    assertTrue(type != null, "The type must not be null");
    /** @type {DateTimeFieldType} */
    this._type = type;
};

/**
 * @return {DateTimeFieldType}
 */
BaseDateTimeField.prototype.getType = function() {
    return this._type;
};

/**
 * @return {String}
 */
BaseDateTimeField.prototype.getName = function() {
    return this._type.getName();
};

/**
 * @return {boolean} true always
 */
BaseDateTimeField.prototype.isSupported = function() {
    return true;
};

/**
 * Get the human-readable, text value of this field from the milliseconds.
 * If the specified locale is null, the default locale is used.
 * <p>
 * The default implementation returns getAsText(get(instant), locale).
 *
 * @param {number} instant  the milliseconds from 1970-01-01T00:00:00Z to query
 * @param {Locale=} locale the locale to use for selecting a text symbol, null means default
 * @return {String} the text value of the field
 */
BaseDateTimeField.prototype.toText = function(instant, locale) {
    return this.getAsText(this.get(instant), locale);
};

/**
 * Get the human-readable, text value of this field from the field value.
 * If the specified locale is null, the default locale is used.
 * <p>
 * The default implementation returns Integer.toString(get(instant)).
 * <p>
 * Note: subclasses that override this method should also override
 * getMaximumTextLength.
 *
 * @param {number} fieldValue  the numeric value to convert to text
 * @param {Locale=} locale the locale to use for selecting a text symbol, null for default
 * @return {String} the text value of the field
 */
/**  */
BaseDateTimeField.prototype.getAsText = function(fieldValue, locale) {
    return String(fieldValue);
};

/**
 * Get the human-readable, short text value of this field from the milliseconds.
 * If the specified locale is null, the default locale is used.
 * <p>
 * The default implementation returns getAsShortText(get(instant), locale).
 *
 * @param {number} instant  the milliseconds from 1970-01-01T00:00:00Z to query
 * @param {Locale=} locale the locale to use for selecting a text symbol, null means default
 * @return {String} the text value of the field
 */
BaseDateTimeField.prototype.toShortText = function(instant, locale) {
    return this.getAsShortText(this.get(instant), locale);
};

/**
 * Get the human-readable, short text value of this field from the field value.
 * If the specified locale is null, the default locale is used.
 * <p>
 * The default implementation returns getAsText(fieldValue, locale).
 * <p>
 * Note: subclasses that override this method should also override
 * getMaximumShortTextLength.
 *
 * @param {number} fieldValue  the numeric value to convert to text
 * @param {Locale=} locale the locale to use for selecting a text symbol, null for default
 * @return {String} the text value of the field
 */
BaseDateTimeField.prototype.getAsShortText = function(fieldValue, locale) {
    return this.getAsText(fieldValue, locale);
};

/**
 * Adds a value (which may be negative) to the instant value,
 * overflowing into larger fields if necessary.
 * <p>
 * The value will be added to this field. If the value is too large to be
 * added solely to this field, larger fields will increase as required.
 * Smaller fields should be unaffected, except where the result would be
 * an invalid value for a smaller field. In this case the smaller field is
 * adjusted to be in range.
 * <p>
 * For example, in the ISO chronology:<br>
 * 2000-08-20 add six months is 2001-02-20<br>
 * 2000-08-20 add twenty months is 2002-04-20<br>
 * 2000-08-20 add minus nine months is 1999-11-20<br>
 * 2001-01-31 add one month  is 2001-02-28<br>
 * 2001-01-31 add two months is 2001-03-31<br>
 *
 * @param {number} instant  the milliseconds from 1970-01-01T00:00:00Z to add to
 * @param {number} value  the value to add, in the units of the field
 * @return {number} the updated milliseconds
 */
BaseDateTimeField.prototype.add = function(instant, value) {
    return this.getDurationField().add(instant, value);
};

/**
 * Adds a value (which may be negative) to the instant value,
 * wrapping within this field.
 * <p>
 * The value will be added to this field. If the value is too large to be
 * added solely to this field then it wraps. Larger fields are always
 * unaffected. Smaller fields should be unaffected, except where the
 * result would be an invalid value for a smaller field. In this case the
 * smaller field is adjusted to be in range.
 * <p>
 * For example, in the ISO chronology:<br>
 * 2000-08-20 addWrapField six months is 2000-02-20<br>
 * 2000-08-20 addWrapField twenty months is 2000-04-20<br>
 * 2000-08-20 addWrapField minus nine months is 2000-11-20<br>
 * 2001-01-31 addWrapField one month  is 2001-02-28<br>
 * 2001-01-31 addWrapField two months is 2001-03-31<br>
 * <p>
 * The default implementation internally calls set. Subclasses are
 * encouraged to provide a more efficient implementation.
 *
 * @param {number} instant  the milliseconds from 1970-01-01T00:00:00Z to add to
 * @param {number} value  the value to add, in the units of the field
 * @return {number} the updated milliseconds
 */
BaseDateTimeField.prototype.addWrapField = function(instant, value) {
    var current = this.get(instant);
    var wrapped = FieldUtils.getWrappedValue(current, value, this.getMinimumValue(instant), this.getMaximumValue(instant));

    return this.set(instant, wrapped);
};

/**
 * Computes the difference between two instants, as measured in the units
 * of this field. Any fractional units are dropped from the result. Calling
 * getDifference reverses the effect of calling add. In the following code:
 *
 * <pre>
 * long instant = ...
 * int v = ...
 * int age = getDifference(add(instant, v), instant);
 * </pre>
 *
 * The value 'age' is the same as the value 'v'.
 *
 * @param {number} minuendInstant the milliseconds from 1970-01-01T00:00:00Z to subtract from
 * @param {number} subtrahendInstant the milliseconds from 1970-01-01T00:00:00Z to subtract off the minuend
 * @return {number} the difference in the units of this field
 */
BaseDateTimeField.prototype.getDifference = function(minuendInstant, subtrahendInstant) {
    return this.getDurationField().getDifference(minuendInstant, subtrahendInstant);
};

/**
 * Sets a value in the milliseconds supplied from a human-readable, text value.
 * If the specified locale is null, the default locale is used.
 * <p>
 * This implementation uses <code>convertText(String, Locale)</code> and
 * {@link #set(long, int)}.
 * <p>
 * Note: subclasses that override this method should also override
 * getAsText.
 *
 * @param {number} instant  the milliseconds from 1970-01-01T00:00:00Z to set in
 * @param {String} text  the text value to set
 * @param {Locale=} locale the locale to use for selecting a text symbol, null for default
 * @return {number} the updated milliseconds
 * @throws {Error} if the text value is invalid
 */
BaseDateTimeField.prototype.from = function(instant, text, locale) {
    var value = this._convertText(text, locale);

    return this.set(instant, value);
};

/**
 * Convert the specified text and locale into a value.
 *
 * @param {String} text  the text to convert
 * @param {Locale=} locale  the locale to convert using
 * @return {number} the value extracted from the text
 * @throws {Error} if the text is invalid
 * @private
 */
BaseDateTimeField.prototype._convertText = function(text, locale) {
    return toInt(text);
};

/**
 * Returns whether this field is 'leap' for the specified instant.
 * <p>
 * For example, a leap year would return true, a non leap year would return
 * false.
 * <p>
 * This implementation returns false.
 *
 * @param {number}
        * @return {boolean} true if the field is 'leap'
 */
BaseDateTimeField.prototype.isLeap = function(instant) {
    return false;
};

/**
 * Gets the amount by which this field is 'leap' for the specified instant.
 * <p>
 * For example, a leap year would return one, a non leap year would return
 * zero.
 * <p>
 * This implementation returns zero.
 * @param {number}
        * @return {number}
 */
BaseDateTimeField.prototype.getLeapAmount = function(instant) {
    return 0;
};

/**
 * If this field were to leap, then it would be in units described by the
 * returned duration. If this field doesn't ever leap, null is returned.
 * <p>
 * This implementation returns null.
 * @return {DurationField}
 */
BaseDateTimeField.prototype.getLeapDurationField = function() {
    return null;
};

/**
 * Get the maximum text value for this field. The default implementation
 * returns the equivalent of Integer.toString(getMaximumValue()).length().
 *
 * @param {Locale=} locale  the locale to use for selecting a text symbol
 * @return {number} the maximum text length
 */
BaseDateTimeField.prototype.getMaximumTextLength = function(locale) {
    var max = this.getMaximumValue();

    if (max >= 0) {
        if (max < 10) {
            return 1;
        } else if (max < 100) {
            return 2;
        } else if (max < 1000) {
            return 3;
        }
    }

    return String(max).length;
};

/**
 * Get the maximum short text value for this field. The default
 * implementation returns getMaximumTextLength().
 *
 * @param {Locale=} locale  the locale to use for selecting a text symbol
 * @return {number} the maximum short text length
 */
BaseDateTimeField.prototype.getMaximumShortTextLength = function(locale) {
    return this.getMaximumTextLength(locale);
};

/**
 * Round to the highest whole unit of this field. The value of this field
 * and all fields of a higher magnitude may be incremented in order to
 * achieve this result. The fractional millis that cannot be expressed in
 * whole increments of this field are set to minimum.
 * <p>
 * For example, a datetime of 2002-11-02T23:34:56.789, rounded to the
 * highest whole hour is 2002-11-03T00:00:00.000.
 * <p>
 * The default implementation calls roundFloor, and if the instant is
 * modified as a result, adds one field unit. Subclasses are encouraged to
 * provide a more efficient implementation.
 *
 * @param {number} instant  the milliseconds from 1970-01-01T00:00:00Z to round
 * @return {number} rounded milliseconds
 */
BaseDateTimeField.prototype.roundCeiling = function(instant) {
    var newInstant = this.roundFloor(instant);

    if (newInstant != instant) {
        instant = this.add(newInstant, 1);
    }
    return instant;
};

/**
 * Round to the nearest whole unit of this field. If the given millisecond
 * value is closer to the floor or is exactly halfway, this function
 * behaves like roundFloor. If the millisecond value is closer to the
 * ceiling, this function behaves like roundCeiling.
 *
 * @param {number} instant  the milliseconds from 1970-01-01T00:00:00Z to round
 * @return {number} rounded milliseconds
 */
BaseDateTimeField.prototype.roundHalfFloor = function(instant) {
    var floor = this.roundFloor(instant);
    var ceiling = this.roundCeiling(instant);

    var diffFromFloor = instant - floor;
    var diffToCeiling = ceiling - instant;

    if (diffFromFloor <= diffToCeiling) {
        // Closer to the floor, or halfway - round floor
        return floor;
    } else {
        return ceiling;
    }
};

/**
 * Round to the nearest whole unit of this field. If the given millisecond
 * value is closer to the floor, this function behaves like roundFloor. If
 * the millisecond value is closer to the ceiling or is exactly halfway,
 * this function behaves like roundCeiling.
 *
 * @param {number} instant  the milliseconds from 1970-01-01T00:00:00Z to round
 * @return {number} rounded milliseconds
 */
BaseDateTimeField.prototype.roundHalfCeiling = function(instant) {
    var floor = this.roundFloor(instant);
    var ceiling = this.roundCeiling(instant);

    var diffFromFloor = instant - floor;
    var diffToCeiling = ceiling - instant;

    if (diffToCeiling <= diffFromFloor) {
        // Closer to the ceiling, or halfway - round ceiling
        return ceiling;
    } else {
        return floor;
    }
};

/**
 * Round to the nearest whole unit of this field. If the given millisecond
 * value is closer to the floor, this function behaves like roundFloor. If
 * the millisecond value is closer to the ceiling, this function behaves
 * like roundCeiling.
 * <p>
 * If the millisecond value is exactly halfway between the floor and
 * ceiling, the ceiling is chosen over the floor only if it makes this
 * field's value even.
 *
 * @param {number} instant  the milliseconds from 1970-01-01T00:00:00Z to round
 * @return {number} rounded milliseconds
 */
BaseDateTimeField.prototype.roundHalfEven = function(instant) {
    var floor = this.roundFloor(instant);
    var ceiling = this.roundCeiling(instant);

    var diffFromFloor = instant - floor;
    var diffToCeiling = ceiling - instant;

    if (diffFromFloor < diffToCeiling) {
        // Closer to the floor - round floor
        return floor;
    } else if (diffToCeiling < diffFromFloor) {
        // Closer to the ceiling - round ceiling
        return ceiling;
    } else {
        // Round to the instant that makes this field even. If both values
        // make this field even (unlikely), favor the ceiling.
        if ((this.get(ceiling) & 1) == 0) {
            return ceiling;
        }
        return floor;
    }
};

/**
 * Returns the fractional duration milliseconds of this field. In other
 * words, calling remainder returns the duration that roundFloor would
 * subtract.
 * <p>
 * For example, on a datetime of 2002-11-02T23:34:56.789, the remainder by
 * hour is 34 minutes and 56.789 seconds.
 * <p>
 * The default implementation computes
 * <code>instant - roundFloor(instant)</code>. Subclasses are encouraged to
 * provide a more efficient implementation.
 *
 * @param {number} instant the milliseconds from 1970-01-01T00:00:00Z to get the remainder
 * @return {number} remainder duration, in milliseconds
 */
BaseDateTimeField.prototype.remainder = function(instant) {
    return instant - this.roundFloor(instant);
};

/**
 * Get a suitable debug string.
 *
 * @return {String} debug string
 */
BaseDateTimeField.prototype.toString = function() {
    return "DateTimeField[" + this.getName() + ']';
};

inherits(BaseDateTimeField, DateTimeField);