/**
 * BaseDurationField provides the common behaviour for DurationField
 * implementations.
 * <p>
 * This class should generally not be used directly by API users. The
 * DurationField class should be used when different kinds of DurationField
 * objects are to be referenced.
 * <p>
 * BaseDurationField is thread-safe and immutable, and its subclasses must
 * be as well.
 *
 * @author Brian S O'Neill
 * @see DecoratedDurationField
 * @since 1.0
 */
BaseDurationField = function(type) {
    this._super();
    /**
     * A descriptive name for the field.
     * @type {DurationFieldType}
     * @private
     */
    this._type = type;
};

/**
 *
 * @return {DurationFieldType}
 */
BaseDurationField.prototype.getType = function() {
    return this._type;
};

/**
 * @return {String}
 */
BaseDurationField.prototype.getName = function() {
    return this._type.getName();
};

/**
 * @return {boolean} true always
 */
BaseDurationField.prototype.isSupported = function() {
    return true;
};

/**
 * Get the value of this field from the milliseconds relative to an
 * instant.
 *
 * <p>If the milliseconds is positive, then the instant is treated as a
 * "start instant". If negative, the instant is treated as an "end
 * instant".
 *
 * <p>The default implementation returns
 * <code>Utils.safeToInt(getAsLong(millisDuration, instant))</code>.
 *
 * @param {number} duration  the milliseconds to query, which may be negative
 * @param {number} instant  the start instant to calculate relative to
 * @return {number} the value of the field, in the units of the field, which may be negative
 */
BaseDurationField.prototype.getValue = function(duration, instant) {
    return FieldUtils.safeToInt(this.getValue(duration, instant));
};

/**
 * Get the millisecond duration of this field from its value, which is
 * approximate if this field is imprecise.
 *
 * @param {number} value  the value of the field, which may be negative
 * @return {number} the milliseconds that the field represents, which may be negative
 */
BaseDurationField.prototype.getMillis = function(value) {
    return value * this.getUnitMillis();  // safe
};

/**
 *
 * @param {number} minuendInstant
 * @param {number} subtrahendInstant
 * @return {number}
 */
BaseDurationField.prototype.getDifference = function(minuendInstant,subtrahendInstant) {
    return FieldUtils.safeToInt(this.getDifference(minuendInstant, subtrahendInstant));
};

/**
 *
 * @param {DurationField} otherField
 * @return {number}
 */
BaseDurationField.prototype.compareTo = function(otherField) {
    var otherMillis = otherField.getUnitMillis();
    var thisMillis = this.getUnitMillis();

    // cannot do (thisMillis - otherMillis) as can overflow
    if (thisMillis == otherMillis) {
        return 0;
    }

    if (thisMillis < otherMillis) {
        return -1;
    } else {
        return 1;
    }
};

/**
 * Get a suitable debug string.
 *
 * @return {String} debug string
 */
BaseDurationField.prototype.toString = function() {
    return "DurationField[" + this.getName() + ']';
};

inherits(BaseDurationField, DurationField);