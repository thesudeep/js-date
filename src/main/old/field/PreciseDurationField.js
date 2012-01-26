/**
 * Duration field class representing a field with a fixed unit length.
 * <p>
 * PreciseDurationField is thread-safe and immutable.
 *
 * @author Stephen Colebourne
 * @author Brian S O'Neill
 * @since 1.0
 * @param {DurationFieldType} type  the field type
 * @param {number} unitMillis  the unit milliseconds
 */
PreciseDurationField = function(type, unitMillis) {
    this._super.constructor(type);
    /** @type {number} */
    this._unitMillis = unitMillis;
};

inherits(PreciseDurationField, BaseDurationField);

/**
 * This field is precise.
 *
 * @return {boolean} true always
 */
PreciseDurationField.prototype.isPrecise = function() {
    return true;
};

/**
 * Returns the amount of milliseconds per unit value of this field.
 *
 * @return {number} the unit size of this field, in milliseconds
 */
PreciseDurationField.prototype.getUnitMillis = function() {
    return this._unitMillis;
};

/**
 * Get the millisecond duration of this field from its value.
 *
 * @param {number} value  the value of the field, which may be negative
 * @param {number} instant  ignored
 * @return {number} the milliseconds that the field represents, which may be negative
 */
PreciseDurationField.prototype.getMillis = function(value, instant) {
    return FieldUtils.safeMultiply(value, this._unitMillis);
};

/**
 *
 * @param {number} instant
 * @param {number} value
 * @return {number}
 */
PreciseDurationField.prototype.add = function(instant, value) {
    var addition = FieldUtils.safeMultiply(value, this._unitMillis);

    return FieldUtils.safeAdd(instant, addition);
};

PreciseDurationField.prototype.getDifference = function(minuendInstant, subtrahendInstant) {
    var difference = FieldUtils.safeSubtract(minuendInstant, subtrahendInstant);

    return Math.floor(difference / this._unitMillis);
}

/**
 * Compares this duration field to another.
 * Two fields are equal if of the same type and duration.
 *
 * @param {DurationField} obj  the object to compare to
 * @return {boolean} if equal
 */
/** boolean */
PreciseDurationField.prototype.equals = function(obj) {
    if (this === obj) {
        return true;
    }

    if (obj instanceof PreciseDurationField) {
        return this.getType() == obj.getType() && this._unitMillis == obj._unitMillis;
    }

    return false;
};
