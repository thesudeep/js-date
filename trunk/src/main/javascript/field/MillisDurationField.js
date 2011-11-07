/**
 * Duration field class representing a field with a fixed unit length of one
 * millisecond.
 * <p>
 * MillisDurationField is thread-safe and immutable.
 *
 * @author Brian S O'Neill
 * @since 1.0
 */
MillisDurationField = function() {
};

/** Singleton instance. */
MillisDurationField.INSTANCE = new MillisDurationField();

/**
 * @return {DurationFieldType}
 */
MillisDurationField.prototype.getType = function() {
    return DurationFieldType.millis();
};

/**
 * @return {String}
 */
MillisDurationField.prototype.getName = function() {
    return "millis";
};

/**
 * Returns true as this field is supported.
 *
 * @return {boolean} true always
 */
MillisDurationField.prototype.isSupported = function() {
    return true;
};

/**
 * Returns true as this field is precise.
 *
 * @return {boolean} true always
 */
MillisDurationField.prototype.isPrecise = function() {
    return true;
};

/**
 * Returns the amount of milliseconds per unit value of this field.
 *
 * @return {number} one always
 */
MillisDurationField.prototype.getUnitMillis = function() {
    return 1;
};

/**
 *
 * @param {number} duration
 * @param {number} instant
 * @return {number}
 */
MillisDurationField.prototype.getValue = function(duration, instant) {
    return duration;
};

/**
 *
 * @param {number} value
 * @param {number} instant
 * @return {number}
 */
MillisDurationField.prototype.getMillis = function(value, instant) {
    return value;
};

/**
 *
 * @param {number} instant
 * @param {number} value
 * @return {number}
 */
MillisDurationField.prototype.add = function(instant, value) {
    return FieldUtils.safeAdd(instant, value);
};

/**
 *
 * @param {number} minuendInstant
 * @param {number} subtrahendInstant
 * @return {number}
 */
MillisDurationField.prototype.getDifference = function(minuendInstant, subtrahendInstant) {
    return FieldUtils.safeSubtract(minuendInstant, subtrahendInstant);
};

/**
 *
 * @param {DurationField} otherField
 * @return {number}
 */
MillisDurationField.prototype.compareTo = function(otherField) {
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
 *
 * @param {DurationField} obj
 * @return {boolean}
 */
MillisDurationField.prototype.equals = function(obj) {
    if (obj instanceof MillisDurationField) {
        return this.getUnitMillis() == obj.getUnitMillis();
    }

    return false;
};

/**
 * Get a suitable debug string.
 *
 * @return {String} debug string
 */
MillisDurationField.prototype.toString = function() {
    return "DurationField[millis]";
};

inherits(MillisDurationField, DurationField);
