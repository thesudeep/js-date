/**
 * Because time durations are typically smaller than time zone offsets, the
 * arithmetic methods subtract the original offset. This produces a more
 * expected behavior when crossing time zone offset transitions. For dates,
 * the new offset is subtracted off. This behavior, if applied to time
 * fields, can nullify or reverse an add when crossing a transition.
 */
ZonedDurationField = function(field, zone) {
    this._super.constructor(field.getType());

    if (!field.isSupported()) {
        throw new Error("Unsupported field");
    }

    /** @type {DurationField} */
    this._field = field;
    /** @type {boolean} */
    this._timeField = useTimeArithmetic(field);
    /** @type {DateTimeZone} */
    this._zone = zone;
};

inherits(ZonedDurationField, BaseDurationField);


/**
 *
 * @return {boolean}
 */
ZonedDurationField.prototype.isPrecise = function() {
    return iTimeField ? iField.isPrecise() : iField.isPrecise() && this.iZone.isFixed();
};

/**
 *
 * @return {number}
 */
ZonedDurationField.prototype.getUnitMillis = function() {
    return iField.getUnitMillis();
};

/**
 *
 * @param {number} duration
 * @param {number=} instant
 * @return {number}
 */
ZonedDurationField.prototype.getValue = function(duration, instant) {
    return iField.getValue(duration, this._addOffset(instant));
};

/**
 *
 * @param {number} value
 * @param {number=} instant
 * @return {number}
 */
ZonedDurationField.prototype.getMillis = function(value, instant) {
    return iField.getMillis(value, this._addOffset(instant));
};

/**
 *
 * @param {number} instant
 * @param {number} value
 * @return {number}
 */
ZonedDurationField.prototype.add = function(instant, value) {
    var offset = this._getOffsetToAdd(instant);

    instant = iField.add(instant + offset, value);

    return instant - (iTimeField ? offset : this._getOffsetFromLocalToSubtract(instant));
};

/**
 *
 * @param {number} instant
 * @param {number} value
 * @return {number}
 */
ZonedDurationField.prototype.getDifference = function(minuendInstant, subtrahendInstant) {
    var offset = this._getOffsetToAdd(subtrahendInstant);

    return iField.getDifference(minuendInstant + (iTimeField ? offset : this._getOffsetToAdd(minuendInstant)), subtrahendInstant + offset);
};


/**
 *
 * @param {number} instant
 * @return {number}
 * @private
 */
ZonedDurationField.prototype._getOffsetToAdd = function(instant) {
    var offset = this.iZone.getOffset(instant);

    var sum = instant + offset;

    // If there is a sign change, but the two values have the same sign...
    if ((instant ^ sum) < 0 && (instant ^ offset) >= 0) {
        throw new Error("Adding time zone offset caused overflow");
    }

    return offset;
};

/**
 *
 * @param {number} instant
 * @return {number}
 * @private
 */
ZonedDurationField.prototype._getOffsetFromLocalToSubtract = function(instant) {
    var offset = this.iZone.getOffsetFromLocal(instant);

    var diff = instant - offset;

    // If there is a sign change, but the two values have different signs...
    if ((instant ^ diff) < 0 && (instant ^ offset) < 0) {
        throw new Error("Subtracting time zone offset caused overflow");
    }

    return offset;
};

/**
 *
 * @param {number} instant
 * @return {number}
 * @private
 */
ZonedDurationField.prototype._addOffset = function(instant) {
    return iZone.convertUTCToLocal(instant);
};
