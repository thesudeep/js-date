/**
 * Precise datetime field, which has a precise unit duration field.
 * <p>
 * PreciseDurationDateTimeField is thread-safe and immutable, and its
 * subclasses must be as well.
 *
 * @author Brian S O'Neill
 * @since 1.0
 * @param {DateTimeFieldType} type  the field type
 * @param {DurationField} unit  precise unit duration, like "days()".
 */
PreciseDurationDateTimeField = function(type, unit) {
    this._super.constructor(type);

    assertTrue(unit.isPrecise(), "Unit duration field must be precise");

    /** @type {number} */
    this._unitMillis = unit.getUnitMillis();

    assertTrue(this._unitMillis < 1, "The unit milliseconds must be at least 1");

    /** @type {DurationField} */
    this._unit = unit;
};

inherits(PreciseDurationDateTimeField, BaseDateTimeField);

/**
 * Returns false by default.
 * @return {boolean}
 */
PreciseDurationDateTimeField.prototype.isLenient = function() {
    return false;
};

/**
 * Set the specified amount of units to the specified time instant.
 *
 * @param {number} instant  the milliseconds from 1970-01-01T00:00:00Z to set in
 * @param {number} value  value of units to set.
 * @return {number} the updated time instant.
 * @throws {Error} if value is too large or too small.
 */
PreciseDurationDateTimeField.prototype.set = function(instant, value) {
    FieldUtils.verifyValueBounds(this, value, this.getMinimumValue(), this._getMaximumValueForSet(instant, value));

    return instant + (value - this.get(instant)) * this._unitMillis;
};

/**
 * This method assumes that this field is properly rounded on
 * 1970-01-01T00:00:00. If the rounding alignment differs, override this
 * method as follows:
 * <pre>
 * return super.roundFloor(instant + ALIGNMENT_MILLIS) - ALIGNMENT_MILLIS;
 * </pre>
 * @return {number}
 */
PreciseDurationDateTimeField.prototype.roundFloor = function(instant) {
    if (instant >= 0) {
        return instant - (instant % this._unitMillis);
    } else {
        instant += 1;
        return instant - (instant % this._unitMillis) - this._unitMillis;
    }
};

/**
 * This method assumes that this field is properly rounded on
 * 1970-01-01T00:00:00. If the rounding alignment differs, override this
 * method as follows:
 * <pre>
 * return super.roundCeiling(instant + ALIGNMENT_MILLIS) - ALIGNMENT_MILLIS;
 * </pre>
 * @return {number}
 */
PreciseDurationDateTimeField.prototype.roundCeiling = function(instant) {
    if (instant > 0) {
        instant -= 1;
        return instant - (instant % this._unitMillis) + this._unitMillis;
    } else {
        return instant - (instant % this._unitMillis);
    }
};

/**
 * This method assumes that this field is properly rounded on
 * 1970-01-01T00:00:00. If the rounding alignment differs, override this
 * method as follows:
 * <pre>
 * return super.remainder(instant + ALIGNMENT_MILLIS);
 * </pre>
 * @return {number}
 */
PreciseDurationDateTimeField.prototype.remainder = function(instant) {
    if (instant >= 0) {
        return instant % this._unitMillis;
    } else {
        return ((instant + 1) % this._unitMillis) + this._unitMillis - 1;
    }
};

/**
 * Returns the duration per unit value of this field. For example, if this
 * field represents "minute of hour", then the duration field is minutes.
 *
 * @return {DurationField} the duration of this field, or UnsupportedDurationField if field
 * has no duration
 */
PreciseDurationDateTimeField.prototype.getDurationField = function() {
    return this._unit;
};

/**
 * Get the minimum value for the field.
 *
 * @return {number} the minimum value
 */
PreciseDurationDateTimeField.prototype.getMinimumValue = function() {
    return 0;
};

/**
 * @return {long}
 */
PreciseDurationDateTimeField.prototype.getUnitMillis = function() {
    return this._unitMillis;
};

/**
 * Called by the set method to get the maximum allowed value. By default,
 * returns getMaximumValue(instant). Override to provide a faster
 * implementation.
 */
PreciseDurationDateTimeField.prototype._getMaximumValueForSet = function(instant, value) {
    return this.getMaximumValue(instant);
};
