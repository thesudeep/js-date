/**
 * Defines the calculation engine for duration fields.
 * The interface defines a set of methods that manipulate a millisecond duration
 * with regards to a single field, such as months or seconds.
 * <p>
 * This design is extensible so, if you wish, you can extract a different field from
 * the millisecond duration. A number of standard implementations are provided to assist.
 *
 * @author Stephen Colebourne
 * @author Brian S O'Neill
 * @since 1.0
 */
DurationField = function () {
};

/**
 * Get the type of the field.
 *
 * @return {DurationFieldType} field type
 */
DurationField.prototype.getType = function() {
    abstractMethod();
};

/**
 * Get the name of the field.
 * <p>
 * By convention, names are plural.
 *
 * @return {String} field name
 */
DurationField.prototype.getName = function() {
    abstractMethod();
};

/**
 * Returns true if this field is supported.
 *
 * @return {boolean} true if this field is supported
 */
DurationField.prototype.isSupported = function() {
    abstractMethod();
};

/**
 * Is this field precise. A precise field can calculate its value from
 * milliseconds without needing a reference date. Put another way, a
 * precise field's unit size is not variable.
 *
 * @return {boolean} true if precise
 * @see DurationField#getUnitMillis()
 */
DurationField.prototype.isPrecise = function() {
    abstractMethod();
};

/**
 * Returns the amount of milliseconds per unit value of this field. For
 * example, if this field represents "seconds", then this returns the
 * milliseconds in one second.
 * <p>
 * For imprecise fields, the unit size is variable, and so this method
 * returns a suitable average value.
 *
 * @return {number} the unit size of this field, in milliseconds
 * @see DurationField#isPrecise()
 */
DurationField.prototype.getUnitMillis = function() {
    abstractMethod();
};

/**
 * Get the value of this field from the milliseconds relative to an
 * instant. For precise fields this method produces the same result as for
 * the single argument get method.
 * <p>
 * If the millisecond duration is positive, then the instant is treated as a
 * "start instant". If negative, the instant is treated as an "end instant".
 *
 * @param {number} duration  the milliseconds to query, which may be negative
 * @param {number=} instant  the start instant to calculate relative to
 * @return {number} the value of the field, in the units of the field, which may be
 * negative
 */
DurationField.prototype.getValue = function(duration, instant) {
    abstractMethod();
};

/**
 * Get the millisecond duration of this field from its value relative to an
 * instant. For precise fields this method produces the same result as for
 * the single argument getMillis method.
 * <p>
 * If the value is positive, then the instant is treated as a "start
 * instant". If negative, the instant is treated as an "end instant".
 *
 * @param {number} value  the value of the field, which may be negative
 * @param {number=} instant  the instant to calculate relative to
 * @return {number} the millisecond duration that the field represents, which may be negative
 */
DurationField.prototype.getMillis = function(value, instant) {
    abstractMethod();
};

/**
 * Adds a duration value (which may be negative) to the instant.
 *
 * @param {number} instant  the milliseconds from 1970-01-01T00:00:00Z to add to
 * @param {number} value  the value to add, in the units of the field
 * @return {number} the updated milliseconds
 */
DurationField.prototype.add = function(instant, value) {
    abstractMethod();
};

/**
 * Subtracts a duration value (which may be negative) from the instant.
 *
 * @param {number} instant  the milliseconds from 1970-01-01T00:00:00Z to subtract from
 * @param {number} value  the value to subtract, in the units of the field
 * @return {number} the updated milliseconds
 * @since 1.1
 */
DurationField.prototype.subtract = function(instant, value) {
    if (value == Integer.MIN_VALUE) {
        return this.subtract(instant, value);
    }

    return this.add(instant, -value);
}

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
DurationField.prototype.getDifference = function(minuendInstant, subtrahendInstant) {
    abstractMethod();
};

/**
 * Get a suitable debug string.
 *
 * @return {String} debug string
 */
DurationField.prototype.toString = function() {
    abstractMethod();
};

