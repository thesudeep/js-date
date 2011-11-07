/**
 * Defines an instant in the datetime continuum.
 * This interface expresses the datetime as milliseconds from 1970-01-01T00:00:00Z.
 * <p>
 * The implementation of this interface may be mutable or immutable.
 * This interface only gives access to retrieve data, never to change it.
 * <p>
 * Methods in your application should be defined using <code>ReadableInstant</code>
 * as a parameter if the method only wants to read the instant without needing to know
 * the specific datetime fields.
 * <p>
 * The {@code compareTo} method is no longer defined in this class in version 2.0.
 * Instead, the definition is simply inherited from the {@code Comparable} interface.
 * This approach is necessary to preserve binary compatibility.
 * The definition of the comparison is ascending order by millisecond instant.
 * Implementors are recommended to extend {@code AbstractInstant} instead of this interface.
 *
 * @author Stephen Colebourne
 * @since 1.0
 */
ReadableInstant = function() {
};


/**
 * Get the value as the number of milliseconds since
 * the epoch, 1970-01-01T00:00:00Z.
 *
 * @return {number} the value as milliseconds
 */
ReadableInstant.prototype.getMillis = function() {
    abstractMethod();
};

/**
 * Gets the chronology of the instant.
 * <p>
 * The {@link Chronology} provides conversion from the millisecond
 * value to meaningful fields in a particular calendar system.
 *
 * @return {Chronology} the Chronology, never null
 */
ReadableInstant.prototype.getChronology = function() {
    abstractMethod();
};

/**
 * Gets the time zone of the instant from the chronology.
 *
 * @return {DateTimeZone} the DateTimeZone that the instant is using, never null
 */
ReadableInstant.prototype.getZone = function() {
    abstractMethod();
};

/**
 * Get the value of one of the fields of a datetime.
 * <p>
 * This method uses the chronology of the instant to obtain the value.
 *
 * @param {DateTimeFieldType} type  a field type, usually obtained from DateTimeFieldType, not null
 * @return {number} the value of that field
 * @throws {Error} if the field type is null
 */
ReadableInstant.prototype.get = function(type) {
    abstractMethod();
};

/**
 * Checks whether the field type specified is supported by this implementation.
 *
 * @param {DateTimeFieldType} field  the field type to check, may be null which returns false
 * @return {boolean} true if the field is supported
 */
ReadableInstant.prototype.isSupported = function(field) {
    abstractMethod();
};

/**
 * Is this instant equal to the instant passed in
 * comparing solely by millisecond.
 *
 * @param {ReadableInstant} instant  an instant to check against, null means now
 * @return {boolean} true if the instant is equal to the instant passed in
 */
ReadableInstant.prototype.isEqual = function(instant) {
    abstractMethod();
};

/**
 * Is this instant after the instant passed in
 * comparing solely by millisecond.
 *
 * @param {ReadableInstant} instant  an instant to check against, null means now
 * @return {boolean} true if the instant is after the instant passed in
 */
ReadableInstant.prototype.isAfter = function(instant) {
    abstractMethod();
};

/**
 * Is this instant before the instant passed in
 * comparing solely by millisecond.
 *
 * @param {ReadableInstant} instant  an instant to check against, null means now
 * @return {boolean} true if the instant is before the instant passed in
 */
ReadableInstant.prototype.isBefore = function(instant) {
    abstractMethod();
};

//-----------------------------------------------------------------------
/**
 * Compares this object with the specified object for equality based
 * on the millisecond instant and the Chronology. All ReadableInstant
 * instances are accepted.
 * <p>
 * To compare two instants for absolute time (ie. UTC milliseconds
 * ignoring the chronology), use {@link #isEqual(ReadableInstant)} or
 * {@link #compareTo(Object)}.
 *
 * @param {ReadableInstant} readableInstant  a readable instant to check against
 * @return {boolean} true if millisecond and chronology are equal, false if not or the instant is null or of an incorrect type
 */
ReadableInstant.prototype.equals = function(readableInstant) {
    abstractMethod();
};

/**
 * Get the value as a String in a recognisable ISO8601 format.
 * <p>
 * The string output is in ISO8601 format to enable the String
 * constructor to correctly parse it.
 *
 * @return {String} the value as an ISO8601 string
 */
ReadableInstant.prototype.toString = function() {
    abstractMethod();
};

