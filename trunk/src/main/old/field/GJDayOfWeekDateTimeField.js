/**
 * GJDayOfWeekDateTimeField provides time calculations for the
 * day of the week component of time.
 *
 * @since 1.0
 * @author Guy Allard
 * @author Stephen Colebourne
 * @author Brian S O'Neill
 * @param {BasicChronology} chronology
 * @param {DurationField} days
 */
GJDayOfWeekDateTimeField = function(chronology, days) {
    this._super.constructor(DateTimeFieldType.dayOfWeek(), days);

    /** @type {BasicChronology} */
    this._chronology = chronology;
};

inherits(GJDayOfWeekDateTimeField, PreciseDurationDateTimeField);

/**
 * Get the value of the specified time instant.
 *
 * @param {number} instant  the time instant in millis to query
 * @return {number} the day of the week extracted from the input
 */
GJDayOfWeekDateTimeField.prototype.get = function(instant) {
    return this._chronology.getDayOfWeek(instant);
};

/**
 * Get the textual value of the specified time instant.
 *
 * @param {number} fieldValue  the field value to query
 * @param {Locale} locale  the locale to use
 * @return {String} the day of the week, such as 'Monday'
 */
GJDayOfWeekDateTimeField.prototype.getAsText = function(fieldValue, locale) {
    return GJLocaleSymbols.forLocale(locale).dayOfWeekValueToText(fieldValue);
};

/**
 * Get the abbreviated textual value of the specified time instant.
 *
 * @param {number} fieldValue  the field value to query
 * @param {Locale} locale  the locale to use
 * @return {String} the day of the week, such as 'Mon'
 */
GJDayOfWeekDateTimeField.prototype.getAsShortText = function(fieldValue, locale) {
    return GJLocaleSymbols.forLocale(locale).dayOfWeekValueToShortText(fieldValue);
};

/**
 * Convert the specified text and locale into a value.
 *
 * @param {String} text  the text to convert
 * @param {Locale} locale  the locale to convert using
 * @return {number} the value extracted from the text
 * @throws IllegalArgumentException if the text is invalid
 */
GJDayOfWeekDateTimeField.prototype._convertText = function(text, locale) {
    return GJLocaleSymbols.forLocale(locale).dayOfWeekTextToValue(text);
};

/**
 * @return {DurationField}
 */
GJDayOfWeekDateTimeField.prototype.getRangeDurationField = function() {
    return this._chronology.weeks();
};

/**
 * Get the minimum value that this field can have.
 *
 * @return {number} the field's minimum value
 */
GJDayOfWeekDateTimeField.prototype.getMinimumValue = function() {
    return Chronology.MONDAY;
};

/**
 * Get the maximum value that this field can have.
 *
 * @return {number} the field's maximum value
 */
GJDayOfWeekDateTimeField.prototype.getMaximumValue = function() {
    return Chronology.SUNDAY;
};

/**
 * Get the maximum length of the text returned by this field.
 *
 * @param {Locale} locale  the locale to use
 * @return {number} the maximum textual length
 */
/** int */
GJDayOfWeekDateTimeField.prototype.getMaximumTextLength = function(locale) {
    return GJLocaleSymbols.forLocale(locale).getDayOfWeekMaxTextLength();
};

/**
 * Get the maximum length of the abbreviated text returned by this field.
 *
 * @param {Locale} locale  the locale to use
 * @return {number} the maximum abbreviated textual length
 */
GJDayOfWeekDateTimeField.prototype.getMaximumShortTextLength = function(locale) {
    return GJLocaleSymbols.forLocale(locale).getDayOfWeekMaxShortTextLength();
};
