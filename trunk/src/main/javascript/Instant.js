/**
 * Simple presentation of a time instant. Does not contain time zone or chronology,
 * only milliseconds from/to Unix EPOCH.
 *
 * @author Victor Polischuk
 * @class Simple presentation of a time instant.
 *
 * @param {Number} instant milliseconds.
 * @constructor
 * @public
 */
function Instant(instant) {
    /**
     * @type {Number}
     * @private
     */
    this._instant = instant;
}

/**
 * Convenient method for new {@link Instant} instances creation. Use it rather than direct constructor execution.
 *
 * @param {Number|String|Date|Instant|DateTime} [instant] milliseconds, {@link Instant}, {@link Date} or {@link DateTime} object.
 * @return {Instant} new or recycled instance of the class.
 * @throws {Error} in case given instant parameter cannot be converted.
 * @static
 * @public
 */
Instant.to = function(instant) {
    if (instant instanceof DateTime) {
        return instant.toInstant();
    }

    if (instant instanceof Instant) {
        return instant;
    }

    return new Instant(getMillis(instant));
};


/**
 * Comparator method. Uses general comparator convention. Optional argument can be skipped, in this case instance will
 * be compared to current time.
 *
 * @param {Number|String|Date|Instant|DateTime} [instant] milliseconds, {@link Instant}, {@link Date} or {@link DateTime} object.
 * @return {Number} <code>1</code> - in case passed instant is after this instance,
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
 * Returns number of milliseconds of the instant.
 *
 * @param {Number|String|Date|Instant|DateTime} instant milliseconds, {@link Instant}, {@link Date} or {@link DateTime} object.
 * @return {Number} milliseconds
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
 * @param {String} [pattern] pattern of the output string.
 * @return {Number} milliseconds
 * @public
 */
Instant.prototype.toString = function(pattern) {
    return String(this._instant); //TODO<vpolischuk>: Replace it by formatter
};

/**
 * Returns number of milliseconds of the instant.
 *
 * @return {Number} milliseconds
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

