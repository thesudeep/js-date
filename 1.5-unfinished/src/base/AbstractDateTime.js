/**
 * AbstractDateTime provides the common behaviour for datetime classes.
 * <p>
 * This class should generally not be used directly by API users.
 * The {@link ReadableDateTime} interface should be used when different
 * kinds of date/time objects are to be referenced.
 * <p>
 * Whenever you want to implement <code>ReadableDateTime</code> you should
 * extend this class.
 * <p>
 * AbstractDateTime subclasses may be mutable and not thread-safe.
 *
 * @author Brian S O'Neill
 * @author Stephen Colebourne
 * @since 1.0
 */
AbstractDateTime = function() {
    this._super.constructor();
};

/**
 * Get the value of one of the fields of a datetime.
 * <p>
 * This method uses the chronology of the datetime to obtain the value.
 * It is essentially a generic way of calling one of the get methods.
 *
 * @param {DateTimeFieldType} type  a field type, usually obtained from DateTimeFieldType
 * @return {number} the value of that field
 * @throws {Error} if the field type is null
 */
AbstractDateTime.prototype.get = function(type) {
    assertHasValue(type, "The DateTimeFieldType must not be null");

    return type.getField(this.getChronology()).get(this.getMillis());
};

/**
 * Get the era field value.
 *
 * @return {number} the era
 */
AbstractDateTime.prototype.getEra = function() {
    return this.getChronology().era().get(this.getMillis());
};

/**
 * Get the year of era field value.
 *
 * @return {number} the year of era
 */
AbstractDateTime.prototype.getCenturyOfEra = function() {
    return this.getChronology().centuryOfEra().get(this.getMillis());
};

/**
 * Get the year of era field value.
 *
 * @return {number} the year of era
 */
AbstractDateTime.prototype.getYearOfEra = function() {
    return this.getChronology().yearOfEra().get(this.getMillis());
};

/**
 * Get the year of century field value.
 *
 * @return {number} the year of century
 */
AbstractDateTime.prototype.getYearOfCentury = function() {
    return this.getChronology().yearOfCentury().get(this.getMillis());
};

/**
 * Get the year field value.
 *
 * @return {number} the year
 */
AbstractDateTime.prototype.getYear = function() {
    return this.getChronology().year().get(this.getMillis());
};

/**
 * Get the weekyear field value.
 * <p>
 * The weekyear is the year that matches with the weekOfWeekyear field.
 * In the standard ISO8601 week algorithm, the first week of the year
 * is that in which at least 4 days are in the year. As a result of this
 * definition, day 1 of the first week may be in the previous year.
 * The weekyear allows you to query the effective year for that day.
 *
 * @return {number} the year of a week based year
 */
AbstractDateTime.prototype.getWeekyear = function() {
    return this.getChronology().weekyear().get(this.getMillis());
};

/**
 * Get the month of year field value.
 *
 * @return {number} the month of year
 */
AbstractDateTime.prototype.getMonthOfYear = function() {
    return this.getChronology().monthOfYear().get(this.getMillis());
};

/**
 * Get the week of weekyear field value.
 * <p>
 * This field is associated with the "weekyear" via {@link #getWeekyear()}.
 * In the standard ISO8601 week algorithm, the first week of the year
 * is that in which at least 4 days are in the year. As a result of this
 * definition, day 1 of the first week may be in the previous year.
 *
 * @return {number} the week of a week based year
 */
AbstractDateTime.prototype.getWeekOfWeekyear = function() {
    return this.getChronology().weekOfWeekyear().get(this.getMillis());
};

/**
 * Get the day of year field value.
 *
 * @return {number} the day of year
 */
AbstractDateTime.prototype.getDayOfYear = function() {
    return this.getChronology().dayOfYear().get(this.getMillis());
};

/**
 * Get the day of month field value.
 * <p>
 * The values for the day of month are defined in {@link org.joda.time.DateTimeConstants}.
 *
 * @return {number} the day of month
 */
AbstractDateTime.prototype.getDayOfMonth = function() {
    return this.getChronology().dayOfMonth().get(this.getMillis());
};

/**
 * Get the day of week field value.
 * <p>
 * The values for the day of week are defined in {@link org.joda.time.DateTimeConstants}.
 *
 * @return {number} the day of week
 */
AbstractDateTime.prototype.getDayOfWeek = function() {
    return this.getChronology().dayOfWeek().get(this.getMillis());
};

//-----------------------------------------------------------------------
/**
 * Get the hour of day field value.
 *
 * @return {number} the hour of day
 */
AbstractDateTime.prototype.getHourOfDay = function() {
    return this.getChronology().hourOfDay().get(this.getMillis());
};

/**
 * Get the minute of day field value.
 *
 * @return {number} the minute of day
 */
AbstractDateTime.prototype.getMinuteOfDay = function() {
    return this.getChronology().minuteOfDay().get(this.getMillis());
};

/**
 * Get the minute of hour field value.
 *
 * @return {number} the minute of hour
 */
AbstractDateTime.prototype.getMinuteOfHour = function() {
    return this.getChronology().minuteOfHour().get(this.getMillis());
};

/**
 * Get the second of day field value.
 *
 * @return {number} the second of day
 */
AbstractDateTime.prototype.getSecondOfDay = function() {
    return this.getChronology().secondOfDay().get(this.getMillis());
};

/**
 * Get the second of minute field value.
 *
 * @return {number} the second of minute
 */
AbstractDateTime.prototype.getSecondOfMinute = function() {
    return this.getChronology().secondOfMinute().get(this.getMillis());
};

/**
 * Get the millis of day field value.
 *
 * @return {number} the millis of day
 */
AbstractDateTime.prototype.getMillisOfDay = function() {
    return this.getChronology().millisOfDay().get(this.getMillis());
};

/**
 * Get the millis of second field value.
 *
 * @return {number} the millis of second
 */
AbstractDateTime.prototype.getMillisOfSecond = function() {
    return this.getChronology().millisOfSecond().get(this.getMillis());
};

/**
 * Output the instant using the specified format pattern.
 *
 * @param {String} pattern  the pattern specification, null means use <code>toString</code>
 * @param {Locale=} locale  Locale to use, null means default
 * @return {String}
 * @see  DateTimeFormat
 */
/** String */
AbstractDateTime.prototype.toString = function(pattern, locale) {
    if (pattern == null) {
        return toString();
    }
    return DateTimeFormat.forPattern(pattern).withLocale(locale).print(this);
};

inherits(AbstractDateTime, AbstractInstant);