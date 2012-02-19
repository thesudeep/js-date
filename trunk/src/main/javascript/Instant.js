goog.provide("Instant");

/**
 * Simple presentation of a time instant. Does not contain time zone or chronology,
 * only milliseconds from/to Unix EPOCH.
 *
 * @author Victor Polischuk
 * @class Simple presentation of a time instant.
 *
 * @param {number} instant milliseconds.
 * @constructor
 * @public
 */
var Instant = function(instant) {
    /**
     * @type {number}
     * @private
     */
    this._instant = instant;
};

/**
 * Convenient method for new {@link Instant} instances creation. Use it rather than direct constructor execution.
 *
 * @param {?(number|string|Date|Instant)} instant milliseconds, {@link Instant} or {@link Date} object.
 * @return {!Instant} new or recycled instance of the class.
 * @throws {Error} in case given instant parameter cannot be converted.
 * @static
 * @public
 */
Instant.to = function(instant) {
    if (instant instanceof Instant) {
        return instant.toInstant();
    }

    return new Instant(getMillis(instant));
};

/**
 * Comparator method. Uses general comparator convention. Optional argument can be skipped, in this case instance will
 * be compared to current time.
 *
 * @param {?(number|string|Date|Instant)} instant milliseconds, {@link Instant} or {@link Date} object.
 * @return {number} <code>1</code> - in case passed instant is after this instance,
 *                  <code>0</code> - if they are equal,
 *                  <code>-1</code> - otherwise.
 * @throws {Error} in case given instant parameter cannot be converted.
 * @public
 */
Instant.prototype.compareTo = function(instant) {
    var millis = getMillis(instant);

    instant = this._instant;

    return instant === millis ? 0 : (instant < millis ? -1 : 1);
};

/**
 * Indicates whether some other object is "equal to" this one.
 *
 * @param {?(number|string|Date|Instant)} instant milliseconds, {@link Instant} or {@link Date} object.
 * @return {boolean} <code>true</code> if this object is equal to given argument; <code>false</code> otherwise.
 * @public
 */
Instant.prototype.equals = function(instant) {
    try {
        return this._instant === getMillis(instant);
    } catch (e) {
        return false;
    }
};

/**
 * Returns text representation of an instant. Optional argument <code>pattern</code> can be specified to use custom
 * date format, by default ISO format is used. Keep in mind that formatted date would be in UTC time zone.
 *
 * @param {?string} pattern pattern of the output string.
 * @return {string} string representation of the instant.
 * @public
 */
Instant.prototype.toString = function(pattern) {
    return String(this._instant); //TODO<vpolischuk>: Replace it by formatter
};

/**
 * Returns number of milliseconds of the instant.
 *
 * @return {!number} milliseconds
 * @public
 */
Instant.prototype.toMillis = function() {
    return this._instant;
};

/**
 * Returns itself. The method can be overridden in children implementation.
 *
 * @return {!Instant} time instant as {@link Instant} object.
 * @public
 */
Instant.prototype.toInstant = function() {
    return this;
};

/**
 * Returns standard ECMAScript {@link Date} instance.
 *
 * @return {!Date} standard {@link Date} object.
 * @public
 * @see Date
 */
Instant.prototype.toDate = function() {
    return new Date(this._instant);
};

