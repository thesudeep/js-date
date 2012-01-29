/**
 * Defines a time period specified in terms of individual duration fields
 * such as years and days.
 * <p>
 * The implementation of this interface may be mutable or immutable. This
 * interface only gives access to retrieve data, never to change it.
 * <p>
 * Periods are split up into multiple fields, for example days and seconds.
 * Implementations are not required to evenly distribute the values across the fields.
 * The value for each field may be positive or negative.
 * <p>
 * When a time period is added to an instant, the effect is to add each field in turn.
 * For example, a time period could be defined as 3 months, 2 days and -1 hours.
 * In most circumstances this would be the same as 3 months, 1 day, and 23 hours.
 * However, when adding across a daylight savings boundary, a day may be 23 or 25 hours long.
 * Thus, the time period is always added field by field to the datetime.
 * <p>
 * Periods are independent of chronology, and can only be treated as durations
 * when paired with a time via an interval.
 *
 * @see ReadableDuration
 * @see ReadableInterval
 * @author Brian S O'Neill
 * @author Stephen Colebourne
 * @since 1.0
 */
ReadablePeriod = function() {
};

/**
 * Gets the period type that defines which fields are included in the period.
 *
 * @return {PeriodType} the period type
 */
ReadablePeriod.prototype.getPeriodType = function() {
    abstractMethod();
};

/**
 * Gets the number of fields that this period supports.
 *
 * @return {number} the number of fields supported
 */
ReadablePeriod.prototype.size = function() {
    abstractMethod();
};

/**
 * Gets the field type at the specified index.
 *
 * @param {number} index  the index to retrieve
 * @return {DurationFieldType} the field at the specified index
 * @throws IndexOutOfBoundsException if the index is invalid
 */

ReadablePeriod.prototype.getFieldType = function(index) {
    abstractMethod();
};

/**
 * Gets the value at the specified index.
 *
 * @param {number} index  the index to retrieve
 * @return {number} the value of the field at the specified index
 * @throws IndexOutOfBoundsException if the index is invalid
 */
ReadablePeriod.prototype.getValue = function(index) {
    abstractMethod();
};

/**
 * Gets the value of one of the fields.
 * <p>
 * If the field type specified is not supported by the period then zero
 * is returned.
 *
 * @param {DurationFieldType} field  the field type to query, null returns zero
 * @return {number} the value of that field, zero if field not supported
 */
ReadablePeriod.prototype.get = function(field) {
    abstractMethod();
};

/**
 * Checks whether the field type specified is supported by this period.
 *
 * @param {DurationFieldType} field  the field to check, may be null which returns false
 * @return {boolean} true if the field is supported
 */
ReadablePeriod.prototype.isSupported = function(field) {
    abstractMethod();
};

//-----------------------------------------------------------------------
/**
 * Get this period as an immutable <code>Period</code> object.
 * <p>
 * This will either typecast this instance, or create a new <code>Period</code>.
 *
 * @return {Period} a Duration using the same field set and values
 */
ReadablePeriod.prototype.toPeriod = function() {
    abstractMethod();
};

/**
 * Compares this object with the specified object for equality based
 * on the value and type of each supported field.
 * All ReadablePeriod instances are accepted.
 * <p>
 * Note that a period of 1 day is not equal to a period of 24 hours,
 * nor is 1 hour equal to 60 minutes. Only periods with the same amount
 * in each field are equal.
 * <p>
 * This is because periods represent an abstracted definition of a time
 * period (eg. a day may not actually be 24 hours, it might be 23 or 25
 * at daylight savings boundary).
 * <p>
 * To compare the actual duration of two periods, convert both to
 * {@link Duration}s, an operation that emphasises that the result may
 * differ according to the date you choose.
 *
 * @param {ReadablePeriod} readablePeriod  a readable period to check against
 * @return {boolean} true if all the field values and types are equal, false if
 *  not or the period is null or of an incorrect type
 */
ReadablePeriod.prototype.equals = function(readablePeriod) {
    abstractMethod();
};

/**
 * Gets the value as a String in the style of the ISO8601 duration format.
 * Technically, the output can breach the ISO specification as weeks may be included.
 * <p>
 * For example, "PT6H3M5S" represents 6 hours, 3 minutes, 5 seconds.
 *
 * @return {String} the value as an ISO8601 style string
 */
ReadablePeriod.prototype.toString = function() {
    abstractMethod();
};
