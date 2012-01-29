/**
 * Precise datetime field, composed of two precise duration fields.
 * <p>
 * This DateTimeField is useful for defining DateTimeFields that are composed
 * of precise durations, like time of day fields. If either duration field is
 * imprecise, then an {@link ImpreciseDateTimeField} may be used instead.
 * <p>
 * PreciseDateTimeField is thread-safe and immutable.
 *
 * @author Brian S O'Neill
 * @author Stephen Colebourne
 * @since 1.0
 * @see ImpreciseDateTimeField
 * @param {DateTimeFieldType} type  the field type this field uses
 * @param {DurationField} unit  precise unit duration, like "seconds()".
 * @param {DurationField} range precise range duration, preferably a multiple of the unit, like "minutes()".
 */
PreciseDateTimeField = function(type, unit, range) {
    this._super.constructor(type, unit);

    assertTrue(range.isPrecise(), "Range duration field must be precise");

    /** @type {number} */
    this._range = Math.floor(range.getUnitMillis() / this.getUnitMillis());

    assertTrue(this._range < 2, "The effective range must be at least 2");

    /** @type {DurationField} */
    this._rangeField = range;
};

/**
 * Get the amount of fractional units from the specified time instant.
 *
 * @param {number} instant  the milliseconds from 1970-01-01T00:00:00Z to query
 * @return {number} the amount of fractional units extracted from the input.
 */
PreciseDateTimeField.prototype.get = function(instant) {
    if (instant >= 0) {
        return Math.floor(instant / this.getUnitMillis()) % this._range;
    } else {
        return this._range - 1 + (Math.floor((instant + 1) / this.getUnitMillis()) % this._range);
    }
};

/**
 * Add to the component of the specified time instant, wrapping around
 * within that component if necessary.
 *
 * @param {number} instant  the milliseconds from 1970-01-01T00:00:00Z to add to
 * @param {number} amount  the amount of units to add (can be negative).
 * @return {number} the updated time instant.
 */
PreciseDateTimeField.prototype.addWrapField = function(instant, amount) {
    var thisValue = this.get(instant);

    var wrappedValue = FieldUtils.getWrappedValue(thisValue, amount, this.getMinimumValue(), this.getMaximumValue());
    // copy code from set() to avoid repeat call to get()
    return instant + (wrappedValue - thisValue) * this.getUnitMillis();
};

/**
 * Set the specified amount of units to the specified time instant.
 *
 * @param {number} instant  the milliseconds from 1970-01-01T00:00:00Z to set in
 * @param {number} value  value of units to set.
 * @return {number} the updated time instant.
 * @throws IllegalArgumentException if value is too large or too small.
 */
PreciseDateTimeField.prototype.set = function(instant, value) {
    FieldUtils.verifyValueBounds(this, value, this.getMinimumValue(), this.getMaximumValue());

    return instant + (value - this.get(instant)) * this.getUnitMillis();
};

/**
 * Returns the range duration of this field. For example, if this field
 * represents "minute of hour", then the range duration field is an hours.
 *
 * @return the range duration of this field, or null if field has no range
 */
/** DurationField */
PreciseDateTimeField.prototype.getRangeDurationField = function() {
    return this._rangeField;
};

/**
 * Get the maximum value for the field.
 *
 * @return {number} the maximum value
 */
/** int */
PreciseDateTimeField.prototype.getMaximumValue = function() {
    return this._range - 1;
};

/**
 * Returns the range of the field in the field's units.
 * <p>
 * For example, 60 for seconds per minute. The field is allowed values
 * from 0 to range - 1.
 *
 * @return {number} unit range
 */
/** int */
PreciseDateTimeField.prototype.getRange = function() {
    return this._range;
};

inherits(PreciseDateTimeField, PreciseDurationDateTimeField);