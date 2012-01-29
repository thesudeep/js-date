/**
 * Wraps another field such that zero values are replaced with one more than
 * it's maximum. This is particularly useful for implementing an clockhourOfDay
 * field, where the midnight value of 0 is replaced with 24.
 * <p>
 * ZeroIsMaxDateTimeField is thread-safe and immutable.
 *
 * @author Brian S O'Neill
 * @since 1.0
 * @param {DateTimeFieldType} type  the field type this field will actually use
 * @param {DateTimeField} field  the base field
 */
ZeroIsMaxDateTimeField = function (type, field) {
    this._super.constructor(type, field);

    assertTrue(field.getMinimumValue() === 0, "Wrapped field's minumum value must be zero");
};

inherits(ZeroIsMaxDateTimeField, DecoratedDateTimeField);

/**
 *
 * @param {number} instant
 * @return {number}
 */
ZeroIsMaxDateTimeField.prototype.get = function(instant) {
    var value = this.getWrappedField().get(instant);
    if (value == 0) {
        value = this.getMaximumValue();
    }
    return value;
};

/** long */
/**
 *
 * @param {number} instant
 * @param {number} value
 * @return {number}
 */
ZeroIsMaxDateTimeField.prototype.add = function(instant, value) {
    return this.getWrappedField().add(instant, value);
};

/**
 *
 * @param {number} instant
 * @param {number} value
 * @return {number}
 */
ZeroIsMaxDateTimeField.prototype.addWrapField = function(instant, value) {
    return this.getWrappedField().addWrapField(instant, value);
};

/**
 *
 * @param {number} minuendInstant
 * @param {number} subtrahendInstant
 * @return {number}
 */
ZeroIsMaxDateTimeField.prototype.getDifference = function(minuendInstant, subtrahendInstant) {
    return this.getWrappedField().getDifference(minuendInstant, subtrahendInstant);
};

/**
 *
 * @param {number} instant
 * @param {number} value
 * @return {number}
 */
ZeroIsMaxDateTimeField.prototype.set = function(instant, value) {
    var max = this.getMaximumValue();

    FieldUtils.verifyValueBounds(this, value, 1, max);

    if (value == max) {
        value = 0;
    }
    return this.getWrappedField().set(instant, value);
};

/**
 *
 * @param {number} instant
 * @return {boolean}
 */
ZeroIsMaxDateTimeField.prototype.isLeap = function(instant) {
    return this.getWrappedField().isLeap(instant);
};

/**
 *
 * @param {number}  instant
 * @return {number}
 */
ZeroIsMaxDateTimeField.prototype.getLeapAmount = function(instant) {
    return this.getWrappedField().getLeapAmount(instant);
};

/**
 * @return {DurationField}
 */
ZeroIsMaxDateTimeField.prototype.getLeapDurationField = function() {
    return this.getWrappedField().getLeapDurationField();
};

/**
 * Always returns 1.
 *
 * @return {number} the minimum value of 1
 */
ZeroIsMaxDateTimeField.prototype.getMinimumValue = function() {
    return 1;
};

/**
 * Get the maximum value for the field, which is one more than the wrapped
 * field's maximum value.
 *
 * @param {number} instant
 * @return {number} the maximum value
 */
ZeroIsMaxDateTimeField.prototype.getMaximumValue = function(instant) {
    return this.getWrappedField().getMaximumValue(instant) + 1;
};

/**
 * @param {number} instant
 * @return {number}
 */
ZeroIsMaxDateTimeField.prototype.roundFloor = function(instant) {
    return this.getWrappedField().roundFloor(instant);
};

/**
 * @param {number} instant
 * @return {number}
 */
ZeroIsMaxDateTimeField.prototype.roundCeiling = function(instant) {
    return this.getWrappedField().roundCeiling(instant);
};

/**
 * @param {number} instant
 * @return {number}
 */
ZeroIsMaxDateTimeField.prototype.roundHalfFloor = function(instant) {
    return this.getWrappedField().roundHalfFloor(instant);
};

/**
 * @param {number} instant
 * @return {number}
 */
ZeroIsMaxDateTimeField.prototype.roundHalfCeiling = function(instant) {
    return this.getWrappedField().roundHalfCeiling(instant);
};

/**
 * @param {number} instant
 * @return {number}
 */
ZeroIsMaxDateTimeField.prototype.roundHalfEven = function(instant) {
    return this.getWrappedField().roundHalfEven(instant);
};

/**
 * @param {number} instant
 * @return {number}
 */
ZeroIsMaxDateTimeField.prototype.remainder = function(instant) {
    return this.getWrappedField().remainder(instant);
};
