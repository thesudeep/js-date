/**
 * Instant API
 * @externs
 */

/**
 * @interface
 */
var _Instant = function () {
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
_Instant.prototype.compareTo = function(instant) {
};

/**
 * Indicates whether some other object is "equal to" this one.
 *
 * @param {?(number|string|Date|Instant)} instant milliseconds, {@link Instant} or {@link Date} object.
 * @return {boolean} <code>true</code> if this object is equal to given argument; <code>false</code> otherwise.
 * @public
 */
_Instant.prototype.equals = function(instant) {
};

/**
 * Returns text representation of an instant. Optional argument <code>pattern</code> can be specified to use custom
 * date format, by default ISO format is used. Keep in mind that formatted date would be in UTC time zone.
 *
 * @param {?string} pattern pattern of the output string.
 * @return {string} string representation of the instant.
 * @public
 */
_Instant.prototype.toString = function(pattern) {
};

/**
 * Returns number of milliseconds of the instant.
 *
 * @return {!number} milliseconds
 * @public
 */
_Instant.prototype.toMillis = function() {
};

/**
 * Returns itself. The method can be overridden in children implementation.
 *
 * @return {!Instant} time instant as {@link Instant} object.
 * @public
 */
_Instant.prototype.toInstant = function() {
};

/**
 * Returns standard ECMAScript {@link Date} instance.
 *
 * @return {!Date} standard {@link Date} object.
 * @public
 * @see Date
 */
_Instant.prototype.toDate = function() {
};