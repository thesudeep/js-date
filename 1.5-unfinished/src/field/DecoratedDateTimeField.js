/**
 * <code>DecoratedDateTimeField</code> extends {@link BaseDateTimeField},
 * implementing only the minimum required set of methods. These implemented
 * methods delegate to a wrapped field.
 * <p>
 * This design allows new DateTimeField types to be defined that piggyback on
 * top of another, inheriting all the safe method implementations from
 * BaseDateTimeField. Should any method require pure delegation to the
 * wrapped field, simply override and use the provided getWrappedField method.
 * <p>
 * DecoratedDateTimeField is thread-safe and immutable, and its subclasses must
 * be as well.
 *
 * @author Brian S O'Neill
 * @since 1.0
 * @see DelegatedDateTimeField
 * @param {DateTimeFieldType} type  allow type to be overridden
 * @param {DateTimeField} field  the field being decorated
 */
DecoratedDateTimeField = function(type, field) {
    this._super.constructor(type);

    assertHasValue(field, "The field must not be null");
    assertTrue(field.isSupported(), "The field must be supported");

    /**
     * The DateTimeField being wrapped
     * @type {DateTimeField}
     */
    this._field = field;
};

/**
 * Gets the wrapped date time field.
 *
 * @return {DateTimeField} the wrapped DateTimeField
 */
DecoratedDateTimeField.prototype.getWrappedField = function() {
    return this._field;
};

/**
 * @return {boolean}
 */
DecoratedDateTimeField.prototype.isLenient = function() {
    return this._field.isLenient();
};

/**
 * @return {number}
 */
DecoratedDateTimeField.prototype.get = function(instant) {
    return this._field.get(instant);
};

/**
 * @param {number} instant
 * @param {number} value
 * @return {number}
 */
DecoratedDateTimeField.prototype.set = function(instant, value) {
    return this._field.set(instant, value);
};

/**
 * @return {DurationField}
 */
DecoratedDateTimeField.prototype.getDurationField = function() {
    return this._field.getDurationField();
};

/**
 * @return {DurationField}
 */
DecoratedDateTimeField.prototype.getRangeDurationField = function() {
    return this._field.getRangeDurationField();
};

/**
 * @return {number}
 */
DecoratedDateTimeField.prototype.getMinimumValue = function() {
    return this._field.getMinimumValue();
};

/**
 * @return {number}
 */
DecoratedDateTimeField.prototype.getMaximumValue = function() {
    return this._field.getMaximumValue();
};

/**
 * @param {number} instant
 * @return {number}
 */
DecoratedDateTimeField.prototype.roundFloor = function(instant) {
    return this._field.roundFloor(instant);
};

inherits(DecoratedDateTimeField, BaseDateTimeField);