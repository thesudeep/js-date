/**
 * Basic DateTimeZone implementation that has a fixed name key and offsets.
 * <p>
 * FixedDateTimeZone is thread-safe and immutable.
 *
 * @author Brian S O'Neill
 * @since 1.0
 */
FixedDateTimeZone = function(id, nameKey, wallOffset, standardOffset) {
    this._super.constructor(id);
    /** @type {String} */
    this._nameKey = nameKey;
    /** @type {number} */
    this._wallOffset = wallOffset;
    /** @type {number} */
    this._standardOffset = standardOffset;
};

inherits(FixedDateTimeZone, DateTimeZone);

/**
 *
 * @return {String}
 */
FixedDateTimeZone.prototype.getNameKey = function() {
    return this._nameKey;
};

/**
 *
 * @return {number}
 */
FixedDateTimeZone.prototype.getOffset = function() {
    return this._wallOffset;
};

/**
 *
 * @return {number}
 */
FixedDateTimeZone.prototype.getStandardOffset = function() {
    return this._standardOffset;
};

/**
 *
 * @return {number}
 */
FixedDateTimeZone.prototype.getOffsetFromLocal = function() {
    return this._wallOffset;
};

/**
 *
 * @return {boolean}
 */
FixedDateTimeZone.prototype.isFixed = function() {
    return true;
};

/**
 *
 * @param {number} instant
 * @return {number}
 */
FixedDateTimeZone.prototype.nextTransition = function(instant) {
    return instant;
};

/**
 *
 * @param {number} instant
 * @return {number}
 */
FixedDateTimeZone.prototype.previousTransition = function(instant) {
    return instant;
};

/**
 *
 * @param {DateTimeZone} tz
 * @return {boolean}
 */
FixedDateTimeZone.prototype.equals = function(tz) {
    if (this == tz) {
        return true;
    }

    if (tz instanceof FixedDateTimeZone) {
        return this.getID().equals(tz.getID()) && this._standardOffset == tz._standardOffset && this._wallOffset == tz._wallOffset;
    }

    return false;
};
