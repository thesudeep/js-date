/**
 * Provides time calculations for the era component of time.
 *
 * @author Stephen Colebourne
 * @author Brian S O'Neill
 * @since 1.0
 * @param {BasicChronology} chronology
 */

GJEraDateTimeField = function(chronology) {
    this._super.constructor(DateTimeFieldType.era());

    /** @type {BasicChronology} */
    this._chronology = chronology;
};

inherits(GJEraDateTimeField, BaseDateTimeField);

/**
 * @return {boolean}
 */
GJEraDateTimeField.prototype.isLenient = function() {
    return false;
};

/**
 * Get the Era component of the specified time instant.
 *
 * @param {number} instant  the time instant in millis to query.
 * @return {number}
 */
GJEraDateTimeField.prototype.get = function(instant) {
    if (this._chronology.getYear(instant) <= 0) {
        return Chronology.BCE;
    } else {
        return Chronology.CE;
    }
};

/**
 *
 * @param {number} fieldValue
 * @param {Locale} locale
 * @return {String}
 */
GJEraDateTimeField.prototype.getAsText = function(fieldValue, locale) {
    return GJLocaleSymbols.forLocale(locale).eraValueToText(fieldValue);
};
/**
 * Set the Era component of the specified time instant.
 *
 * @param {number} instant
 * @param {number} era  the era to update the time to.
 * @return {number}
 * @throws IllegalArgumentException  if era is invalid.
 */
GJEraDateTimeField.prototype.set = function(instant, era) {
    FieldUtils.verifyValueBounds(this, era, Chronology.BCE, Chronology.CE);

    var oldEra = this.get(instant);

    if (oldEra !== era) {
        var year = this._chronology.getYear(instant);

        return this._chronology.setYear(instant, -year);
    } else {
        return instant;
    }
};
/**
 *
 * @param {number} instantthe time instant in millis to update.
 * @param {String} text
 * @param {Locale} locale
 * @return {number} the updated time instant.
 */
GJEraDateTimeField.prototype.set = function(instant, text, locale) {
    var era = GJLocaleSymbols.forLocale(locale).eraTextToValue(text);

    FieldUtils.verifyValueBounds(this, era, Chronology.BCE, Chronology.CE);

    var oldEra = this.get(instant);

    if (oldEra !== era) {
        var year = this._chronology.getYear(instant);

        return this._chronology.setYear(instant, -year);
    } else {
        return instant;
    }
};
/** long */
GJEraDateTimeField.prototype.roundFloor = function(instant) {
    if (this.get(instant) === Chronology.CE) {
        return this._chronology.setYear(0, 1);
    } else {
        return Long.MIN_VALUE;
    }
};
/** long */
GJEraDateTimeField.prototype.roundCeiling = function(instant) {
    if (this.get(instant) === Chronology.BCE) {
        return this._chronology.setYear(0, 1);
    } else {
        return Long.MAX_VALUE;
    }
};
/** long */
GJEraDateTimeField.prototype.roundHalfFloor = function(instant) {
    // In reality, the era is infinite, so there is no halfway point.
    return this.roundFloor(instant);
};
/** long */
GJEraDateTimeField.prototype.roundHalfCeiling = function(instant) {
    // In reality, the era is infinite, so there is no halfway point.
    return this.roundFloor(instant);
};
/** long */
GJEraDateTimeField.prototype.roundHalfEven = function(instant) {
    // In reality, the era is infinite, so there is no halfway point.
    return this.roundFloor(instant);
};
/** DurationField */
GJEraDateTimeField.prototype.getDurationField = function() {
    return UnsupportedDurationField.getInstance(DurationFieldType.eras());
};
/** DurationField */
GJEraDateTimeField.prototype.getRangeDurationField = function() {
    return null;
};
/** int */
GJEraDateTimeField.prototype.getMinimumValue = function() {
    return Chronology.BCE;
};
/** int */
GJEraDateTimeField.prototype.getMaximumValue = function() {
    return Chronology.CE;
};
/** int */
GJEraDateTimeField.prototype.getMaximumTextLength = function(locale) {
    return GJLocaleSymbols.forLocale(locale).getEraMaxTextLength();
};