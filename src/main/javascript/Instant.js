/**
 * Simple presentation of a time instant. Does not contain time zone or chronology,
 * only milliseconds from/to Unix EPOCH.
 *
 * @author Victor Polischuk
 * @since 26.01.12
 * @class Simple presentation of a time instant.
 * @constructor
 */
Instant = function(instant) {
    /**
     * @type {number}
     * @private
     */
    this._instant = Utils.getMillis(instant);
};

/**
 * Returns number of milliseconds of the instant.
 *
 * @return {number} milliseconds
 * @public
 */
Instant.prototype.toMillis = function() {
    return this._instant;
};

/**
 * Returns {@link DateTime} instance using default {@link DateTimeZone} and {@link Chronology}.
 *
 * @return {DateTime} fully operational instance of {@link DateTime}.
 * @public
 * @see DateTime
 */
Instant.prototype.toDateTime = function() {
    return null; //TODO<vpolischuk>: use DateTime here.
};

/**
 * Returns itself. The method can be overridden in children implementation.
 *
 * @return {Instant} time instant as {@link Instant} object.
 * @public
 */
Instant.prototype.toInstant = function() {
    return this;
};

/**
 * Returns standard ECMAScript {@link Date} instance.
 *
 * @return {Date} standard {@link Date} object.
 * @public
 * @see Date
 */
Instant.prototype.toDate = function() {
    return new Date(this._instant);
};

