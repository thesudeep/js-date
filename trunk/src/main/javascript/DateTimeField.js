/**
 * Defines the calculation engine for date and time fields.
 * The interface defines a set of methods that manipulate a millisecond datetime
 * with regards to a single field, such as monthOfYear or secondOfMinute.
 * <p>
 * This design is extensible so, if you wish, you can extract a different field from
 * the milliseconds. A number of standard implementations are provided to assist.
 *
 * @author Guy Allard
 * @author Stephen Colebourne
 * @author Brian S O'Neill
 * @since 1.0
 */
DateTimeField = function() {
};

/**
 * Get the type of the field.
 *
 * @return {DateTimeFieldType} field type
 */
DateTimeField.prototype.getType = function() {
    abstractMethod();
};

/**
 * Get the name of the field.
 * <p>
 * By convention, names follow a pattern of "dddOfRrr", where "ddd" represents
 * the (singular) duration unit field name and "Rrr" represents the (singular)
 * duration range field name. If the range field is not applicable, then
 * the name of the field is simply the (singular) duration field name.
 *
 * @return {String} field name
 */
DateTimeField.prototype.getName = function() {
    abstractMethod();
};

/**
 * Returns true if this field is supported.
 *
 * @return {boolean} true if this field is supported
 */
DateTimeField.prototype.isSupported = function() {
    abstractMethod();
};

/**
 * Returns true if the set method is lenient. If so, it accepts values that
 * are out of bounds. For example, a lenient day of month field accepts 32
 * for January, converting it to February 1.
 *
 * @return {boolean} true if this field is lenient
 */
DateTimeField.prototype.isLenient = function() {
    abstractMethod();
};

// Main access API
//------------------------------------------------------------------------
/**
 * Get the value of this field from the milliseconds.
 *
 * @param {number} instant  the milliseconds from 1970-01-01T00:00:00Z to query
 * @return {number} the value of the field, in the units of the field
 */
DateTimeField.prototype.get = function(instant) {
    abstractMethod();
};

/**
 * Get the human-readable, text value of this field from the milliseconds.
 * If the specified locale is null, the default locale is used.
 *
 * @param {number} instant  the milliseconds from 1970-01-01T00:00:00Z to query
 * @param {Locale=} locale the locale to use for selecting a text symbol, null for default
 * @return {String} the text value of the field
 */
DateTimeField.prototype.toText = function(instant, locale) {
    abstractMethod();
};

/**
 * Get the human-readable, text value of this field from the field value.
 * If the specified locale is null, the default locale is used.
 *
 * @param {number} fieldValue  the numeric value to convert to text
 * @param {Locale=} locale the locale to use for selecting a text symbol, null for default
 * @return {String} the text value of the field
 */
DateTimeField.prototype.getAsText = function(fieldValue, locale) {
    abstractMethod();
};

/**
 * Get the human-readable, short text value of this field from the
 * milliseconds.  If the specified locale is null, the default locale is used.
 *
 * @param {number} instant  the milliseconds from 1970-01-01T00:00:00Z to query
 * @param {Locale=} locale the locale to use for selecting a text symbol, null for default
 * @return {String} the short text value of the field
 */
DateTimeField.prototype.toShortText = function(instant, locale) {
    abstractMethod();
};

/**
 * Get the human-readable, short text value of this field from the field value.
 * If the specified locale is null, the default locale is used.
 *
 * @param {number} fieldValue  the numeric value to convert to text
 * @param {Locale=} locale the locale to use for selecting a text symbol, null for default
 * @return {String} the text value of the field
 */
DateTimeField.prototype.getAsShortText = function(fieldValue, locale) {
    abstractMethod();
};

/**
 * Adds a value (which may be negative) to the millis value,
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
DateTimeField.prototype.add = function(instant, value) {
    abstractMethod();
};

/**
 * Adds a value (which may be negative) to the millis value,
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
 *
 * @param {number} instant  the milliseconds from 1970-01-01T00:00:00Z to add to
 * @param {number} value  the value to add, in the units of the field
 * @return {number} the updated milliseconds
 */
DateTimeField.prototype.addWrapField = function(instant, value) {
    abstractMethod();
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
DateTimeField.prototype.getDifference = function(minuendInstant, subtrahendInstant) {
    abstractMethod();
};

/**
 * Sets a value in the milliseconds supplied.
 * <p>
 * The value of this field will be set.
 * If the value is invalid, an exception if thrown.
 * <p>
 * If setting this field would make other fields invalid, then those fields
 * may be changed. For example if the current date is the 31st January, and
 * the month is set to February, the day would be invalid. Instead, the day
 * would be changed to the closest value - the 28th/29th February as appropriate.
 *
 * @param {number} instant  the milliseconds from 1970-01-01T00:00:00Z to set in
 * @param {number} value  the value to set, in the units of the field
 * @return {number} the updated milliseconds
 * @throws {Error} if the value is invalid
 */
/** long */
DateTimeField.prototype.set = function(instant, value) {
    abstractMethod();
};

/**
 * Sets a value in the milliseconds supplied from a human-readable, text value.
 * If the specified locale is null, the default locale is used.
 * <p>
 * If setting this field would make other fields invalid, then those fields
 * may be changed. For example if the current date is the 31st January, and
 * the month is set to February, the day would be invalid. Instead, the day
 * would be changed to the closest value - the 28th/29th February as appropriate.
 *
 * @param {number} instant  the milliseconds from 1970-01-01T00:00:00Z to set in
 * @param {String} text  the text value to set
 * @param {Locale=} locale the locale to use for selecting a text symbol, null for default
 * @return {number} the updated milliseconds
 * @throws {Error} if the text value is invalid
 */
DateTimeField.prototype.from = function(instant, text, locale) {
    abstractMethod();
};

/**
 * Returns the duration per unit value of this field. For example, if this
 * field represents "hour of day", then the duration is an hour.
 *
 * @return {DurationField} the duration of this field, or UnsupportedDurationField if field has no duration
 */
DateTimeField.prototype.getDurationField = function() {
    abstractMethod();
};

/**
 * Returns the range duration of this field. For example, if this field
 * represents "hour of day", then the range duration is a day.
 *
 * @return {DurationField} the range duration of this field, or null if field has no range
 */
DateTimeField.prototype.getRangeDurationField = function() {
    abstractMethod();
};

/**
 * Returns whether this field is 'leap' for the specified instant.
 * <p>
 * For example, a leap year would return true, a non leap year would return
 * false.
 *
 * @param {number} instant  the instant to check for leap status
 * @return {boolean} true if the field is 'leap'
 */
DateTimeField.prototype.isLeap = function(instant) {
    abstractMethod();
};

/**
 * Gets the amount by which this field is 'leap' for the specified instant.
 * <p>
 * For example, a leap year would return one, a non leap year would return
 * zero.
 *
 * @param {number} instant  the instant to check for leap status
 * @return {number} the amount, in units of the leap duration field, that the field is leap
 */
DateTimeField.prototype.getLeapAmount = function(instant) {
    abstractMethod();
};

/**
 * If this field were to leap, then it would be in units described by the
 * returned duration. If this field doesn't ever leap, null is returned.
 *
 * @return {DurationField} the leap duration field if field can be leap, null if it can't
 */
DateTimeField.prototype.getLeapDurationField = function() {
    abstractMethod();
};

/**
 * Get the minimum value for this field evaluated at the specified time.
 *
 * @param {number=} instant  the milliseconds from 1970-01-01T00:00:00Z to query
 * @return {number} the minimum value for this field, in the units of the field
 */
DateTimeField.prototype.getMinimumValue = function(instant) {
    abstractMethod();
};

/**
 * Get the maximum value for this field evaluated at the specified time.
 *
 * @param {number=} instant  the milliseconds from 1970-01-01T00:00:00Z to query
 * @return {number} the maximum value for this field, in the units of the field
 */
DateTimeField.prototype.getMaximumValue = function(instant) {
    abstractMethod();
};

/**
 * Get the maximum text value for this field.
 *
 * @param {Locale} locale  the locale to use for selecting a text symbol
 * @return {number} the maximum text length
 */
DateTimeField.prototype.getMaximumTextLength = function(locale) {
    abstractMethod();
};

/**
 * Get the maximum short text value for this field.
 *
 * @param {Locale} locale  the locale to use for selecting a text symbol
 * @return {number} the maximum short text length
 */
DateTimeField.prototype.getMaximumShortTextLength = function(locale) {
    abstractMethod();
};

/**
 * Round to the lowest whole unit of this field. After rounding, the value
 * of this field and all fields of a higher magnitude are retained. The
 * fractional millis that cannot be expressed in whole increments of this
 * field are set to minimum.
 * <p>
 * For example, a datetime of 2002-11-02T23:34:56.789, rounded to the
 * lowest whole hour is 2002-11-02T23:00:00.000.
 *
 * @param {number} instant  the milliseconds from 1970-01-01T00:00:00Z to round
 * @return {number} rounded milliseconds
 */
DateTimeField.prototype.roundFloor = function(instant) {
    abstractMethod();
};

/**
 * Round to the highest whole unit of this field. The value of this field
 * and all fields of a higher magnitude may be incremented in order to
 * achieve this result. The fractional millis that cannot be expressed in
 * whole increments of this field are set to minimum.
 * <p>
 * For example, a datetime of 2002-11-02T23:34:56.789, rounded to the
 * highest whole hour is 2002-11-03T00:00:00.000.
 *
 * @param {number} instant  the milliseconds from 1970-01-01T00:00:00Z to round
 * @return {number} rounded milliseconds
 */
DateTimeField.prototype.roundCeiling = function(instant) {
    abstractMethod();
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
DateTimeField.prototype.roundHalfFloor = function(instant) {
    abstractMethod();
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
DateTimeField.prototype.roundHalfCeiling = function(instant) {
    abstractMethod();
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
DateTimeField.prototype.roundHalfEven = function(instant) {
    abstractMethod();
};

/**
 * Returns the fractional duration milliseconds of this field. In other
 * words, calling remainder returns the duration that roundFloor would
 * subtract.
 * <p>
 * For example, on a datetime of 2002-11-02T23:34:56.789, the remainder by
 * hour is 34 minutes and 56.789 seconds.
 *
 * @param {number} instant the milliseconds from 1970-01-01T00:00:00Z to get the remainder
 * @return {number} remainder duration, in milliseconds
 */
DateTimeField.prototype.remainder = function(instant) {
    abstractMethod();
};

/**
 * Get a suitable debug string.
 *
 * @return {String} debug string
 */
DateTimeField.prototype.toString = function() {
    abstractMethod();
};
