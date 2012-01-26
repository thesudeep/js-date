/**
 * A DateTimeField that decorates another to add timezone behaviour.
 * <p>
 * This class converts passed in instants to local wall time, and vice
 * versa on output.
 *
 * @param {DateTimeField} field
 * @param {DateTimeZone} zone
 * @param {DurationField} durationField
 * @param {DurationField} rangeDurationField
 * @param {DurationField} leapDurationField
 */
ZonedDateTimeField = function(field, zone, durationField, rangeDurationField, leapDurationField) {
    this._super.constructor(field.getType());

    assertTrue(field.isSupported(), "Unsupported field");
    /** @type {DateTimeField} */
    this._field = field;
    /** @type {DateTimeZone} */
    this._zone = zone;
    /** @type {DurationField} */
    this._durationField = durationField;
    /** @type {boolean} */
    this._timeField = useTimeArithmetic(durationField);
    /** @type {DurationField} */
    this._rangeDurationField = rangeDurationField;
    /** @type {DurationField} */
    this._leapDurationField = leapDurationField;
};

inherits(ZonedDateTimeField, BaseDateTimeField);

(function() {
    /**
     *
     * @param {number} instant
     * @return {number}
     * @private
     */
    var getOffsetToAdd = function(instant) {
        var offset = this._zone.getOffset(instant);
        var sum = instant + offset;
        // If there is a sign change, but the two values have the same sign...
        if ((instant ^ sum) < 0 && (instant ^ offset) >= 0) {
            throw new Error("Adding time zone offset caused overflow");
        }
        return offset;
    };

    /**
     * @return {boolean}
     */
    ZonedDateTimeField.prototype.isLenient = function() {
        return this._field.isLenient();
    };

    /**
     * @param {number}
     * @return {number}
     */
    ZonedDateTimeField.prototype.get = function(instant) {
        var localInstant = this._zone.convertUTCToLocal(instant);

        return this._field.get(localInstant);
    };

    /**
     *
     * @param {number} instant
     * @param {Locale=} locale
     * @return {String}
     */
    ZonedDateTimeField.prototype.toText = function(instant, locale) {
        var localInstant = this._zone.convertUTCToLocal(instant);

        return this._field.getAsText(localInstant, locale);
    };

    /** String */
    ZonedDateTimeField.prototype.toShortText = function(instant, locale) {
        var localInstant = this._zone.convertUTCToLocal(instant);

        return this._field.getAsShortText(localInstant, locale);
    };

    /** String */
    ZonedDateTimeField.prototype.getAsText = function(fieldValue, locale) {
        return this._field.getAsText(fieldValue, locale);
    };

    /** String */
    ZonedDateTimeField.prototype.getAsShortText = function(fieldValue, locale) {
        return this._field.getAsShortText(fieldValue, locale);
    };

    /** long */
    ZonedDateTimeField.prototype.add = function(instant, value) {
        var localInstant;

        if (this._timeField) {
            var offset = getOffsetToAdd(instant);

            localInstant = this._field.add(instant + offset, value);

            return localInstant - offset;
        } else {
            localInstant = this._zone.convertUTCToLocal(instant);

            localInstant = this._field.add(localInstant, value);

            return this._zone.convertLocalToUTC(localInstant, false, instant);
        }
    };

    /** long */
    ZonedDateTimeField.prototype.addWrapField = function(instant, value) {
        var localInstant;

        if (this._timeField) {
            var offset = getOffsetToAdd(instant);
            localInstant = this._field.addWrapField(instant + offset, value);
            return localInstant - offset;
        } else {
            localInstant = this._zone.convertUTCToLocal(instant);
            localInstant = this._field.addWrapField(localInstant, value);
            return this._zone.convertLocalToUTC(localInstant, false, instant);
        }
    };

    /** long */
    ZonedDateTimeField.prototype.set = function(instant, value) {
        var localInstant = this._zone.convertUTCToLocal(instant);

        localInstant = this._field.set(localInstant, value);

        var result = this._zone.convertLocalToUTC(localInstant, false, instant);

        if (this.get(result) != value) {
            throw new IllegalFieldValueException(this._field.getType(), value);
        }

        return result;
    };

    /** long */
    ZonedDateTimeField.prototype.from = function(instant, text, locale) {
        // cannot verify that new value stuck because set may be lenient
        var localInstant = this._zone.convertUTCToLocal(instant);

        localInstant = this._field.set(localInstant, text, locale);

        return this._zone.convertLocalToUTC(localInstant, false, instant);
    };

    /** int */
    ZonedDateTimeField.prototype.getDifference = function(minuendInstant, subtrahendInstant) {
        var offset = getOffsetToAdd(subtrahendInstant);

        return this._field.getDifference(minuendInstant + (this._timeField ? offset : getOffsetToAdd(minuendInstant)), subtrahendInstant + offset);
    };

    /** DurationField */
    ZonedDateTimeField.prototype.getDurationField = function() {
        return this._durationField;
    };

    /** DurationField */
    ZonedDateTimeField.prototype.getRangeDurationField = function() {
        return this._rangeDurationField;
    };

    /** boolean */
    ZonedDateTimeField.prototype.isLeap = function(instant) {
        var localInstant = this._zone.convertUTCToLocal(instant);

        return this._field.isLeap(localInstant);
    };

    /** int */
    ZonedDateTimeField.prototype.getLeapAmount = function(instant) {
        var localInstant = this._zone.convertUTCToLocal(instant);

        return this._field.getLeapAmount(localInstant);
    };

    /** DurationField */
    ZonedDateTimeField.prototype.getLeapDurationField = function() {
        return this._leapDurationField;
    };

    /** long */
    ZonedDateTimeField.prototype.roundFloor = function(instant) {
        if (this._timeField) {
            var offset = getOffsetToAdd(instant);

            instant = this._field.roundFloor(instant + offset);

            return instant - offset;
        } else {
            var localInstant = this._zone.convertUTCToLocal(instant);

            localInstant = this._field.roundFloor(localInstant);

            return this._zone.convertLocalToUTC(localInstant, false, instant);
        }
    };

    /** long */
    ZonedDateTimeField.prototype.roundCeiling = function(instant) {
        if (this._timeField) {
            var offset = getOffsetToAdd(instant);

            instant = this._field.roundCeiling(instant + offset);

            return instant - offset;
        } else {
            var localInstant = this._zone.convertUTCToLocal(instant);

            localInstant = this._field.roundCeiling(localInstant);

            return this._zone.convertLocalToUTC(localInstant, false, instant);
        }
    };

    /** long */
    ZonedDateTimeField.prototype.remainder = function(instant) {
        var localInstant = this._zone.convertUTCToLocal(instant);

        return this._field.remainder(localInstant);
    };

    /** int */
    ZonedDateTimeField.prototype.getMinimumValue = function() {
        return this._field.getMinimumValue();
    };

    /** int */
    ZonedDateTimeField.prototype.getMinimumValue = function(instant) {
        var localInstant = this._zone.convertUTCToLocal(instant);

        return this._field.getMinimumValue(localInstant);
    };

    /** int */
    ZonedDateTimeField.prototype.getMaximumValue = function(instant) {
        var localInstant = this._zone.convertUTCToLocal(instant);

        return this._field.getMaximumValue(localInstant);
    };

    /** int */
    ZonedDateTimeField.prototype.getMaximumTextLength = function(locale) {
        return this._field.getMaximumTextLength(locale);
    };

    /** int */
    ZonedDateTimeField.prototype.getMaximumShortTextLength = function(locale) {
        return this._field.getMaximumShortTextLength(locale);
    };
})();
