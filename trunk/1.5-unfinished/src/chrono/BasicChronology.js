/**
 * Abstract implementation for calendar systems that use a typical
 * day/month/year/leapYear model.
 * Most of the utility methods required by subclasses are package-private,
 * reflecting the intention that they be defined in the same package.
 * <p>
 * BasicChronology is thread-safe and immutable, and all subclasses must
 * be as well.
 *
 * @author Stephen Colebourne
 * @author Brian S O'Neill
 * @author Guy Allard
 * @since 1.2, renamed from BaseGJChronology
 * @param {Chronology} base
 * @param {Object} param
 * @param {number} minDaysInFirstWeek
 */
BasicChronology = function(base, param, minDaysInFirstWeek) {
    this._super.constructor(base, param);

    assertTrue(minDaysInFirstWeek > 0 && minDaysInFirstWeek <= 7, "Invalid min days in first week: " + minDaysInFirstWeek);

    this._minDaysInFirstWeek = minDaysInFirstWeek;
};

inherits(BasicChronology, AssembledChronology);

(function() {
    var HalfdayField = function() {
        this._super.constructor(DateTimeFieldType.halfdayOfDay(), cHalfdaysField, cDaysField);
    };

    HalfdayField.prototype.getAsText = function(fieldValue, locale) {
        return GJLocaleSymbols.forLocale(locale).halfdayValueToText(fieldValue);
    };

    HalfdayField.prototype.set = function(millis, text, locale) {
        return this._super.set(millis, GJLocaleSymbols.forLocale(locale).halfdayTextToValue(text), locale);
    };

    HalfdayField.prototype.getMaximumTextLength = function(locale) {
        return GJLocaleSymbols.forLocale(locale).getHalfdayMaxTextLength();
    };

    inherits(HalfdayField, PreciseDateTimeField);

    /** @type {DurationField} */ var cMillisField = MillisDurationField.INSTANCE;
    /** @type {DurationField} */ var cSecondsField = new PreciseDurationField(DurationFieldType.seconds(), Chronology.MILLIS_PER_SECOND);
    /** @type {DurationField} */ var cMinutesField = new PreciseDurationField(DurationFieldType.minutes(), Chronology.MILLIS_PER_MINUTE);
    /** @type {DurationField} */ var cHoursField = new PreciseDurationField(DurationFieldType.hours(), Chronology.MILLIS_PER_HOUR);
    /** @type {DurationField} */ var cHalfdaysField = new PreciseDurationField(DurationFieldType.halfdays(), Chronology.MILLIS_PER_DAY / 2);
    /** @type {DurationField} */ var cDaysField = new PreciseDurationField(DurationFieldType.days(), Chronology.MILLIS_PER_DAY);
    /** @type {DurationField} */ var cWeeksField = new PreciseDurationField(DurationFieldType.weeks(), Chronology.MILLIS_PER_WEEK);

    /** @type {DateTimeField} */ var cMillisOfSecondField = new PreciseDateTimeField(DateTimeFieldType.millisOfSecond(), cMillisField, cSecondsField);
    /** @type {DateTimeField} */ var cMillisOfDayField = new PreciseDateTimeField(DateTimeFieldType.millisOfDay(), cMillisField, cDaysField);
    /** @type {DateTimeField} */ var cSecondOfMinuteField = new PreciseDateTimeField(DateTimeFieldType.secondOfMinute(), cSecondsField, cMinutesField);
    /** @type {DateTimeField} */ var cSecondOfDayField = new PreciseDateTimeField(DateTimeFieldType.secondOfDay(), cSecondsField, cDaysField);
    /** @type {DateTimeField} */ var cMinuteOfHourField = new PreciseDateTimeField(DateTimeFieldType.minuteOfHour(), cMinutesField, cHoursField);
    /** @type {DateTimeField} */ var cMinuteOfDayField = new PreciseDateTimeField(DateTimeFieldType.minuteOfDay(), cMinutesField, cDaysField);
    /** @type {DateTimeField} */ var cHourOfDayField = new PreciseDateTimeField(DateTimeFieldType.hourOfDay(), cHoursField, cDaysField);
    /** @type {DateTimeField} */ var cHourOfHalfdayField = new PreciseDateTimeField(DateTimeFieldType.hourOfHalfday(), cHoursField, cHalfdaysField);
    /** @type {DateTimeField} */ var cClockhourOfDayField = new ZeroIsMaxDateTimeField(cHourOfDayField, DateTimeFieldType.clockhourOfDay());
    /** @type {DateTimeField} */ var cClockhourOfHalfdayField = new ZeroIsMaxDateTimeField(cHourOfHalfdayField, DateTimeFieldType.clockhourOfHalfday());
    /** @type {DateTimeField} */ var cHalfdayOfDayField = new HalfdayField();

    /**
     * @return {DateTimeZone}
     */
    BasicChronology.prototype.getZone = function() {
        var base;

        if ((base = this.getBase()) != null) {
            return base.getZone();
        }

        return DateTimeZone.UTC;
    };

    /**
     *
     * @param {number} year
     * @param {number} monthOfYear
     * @param {number} dayOfMonth
     * @param {number} millisOfDay
     * @return {number}
     */
    BasicChronology.prototype.getDateTimeMillis = function(year, monthOfYear, dayOfMonth, millisOfDay) {
        var base;

        if ((base = this.getBase()) != null) {
            return base.getDateTimeMillis(year, monthOfYear, dayOfMonth, millisOfDay);
        }

        FieldUtils.verifyValueBounds(DateTimeFieldType.millisOfDay(), millisOfDay, 0, Chronology.MILLIS_PER_DAY);

        return this.getDateMidnightMillis(year, monthOfYear, dayOfMonth) + millisOfDay;
    };

    /**
     *
     * @param {number} year
     * @param {number} monthOfYear
     * @param {number} dayOfMonth
     * @param {number} hourOfDay
     * @param {number} minuteOfHour
     * @param {number} secondOfMinute
     * @param {number} millisOfSecond
     * @return {number}
     */
    BasicChronology.prototype.getDateTimeMillis = function(year, monthOfYear, dayOfMonth, hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond) {
        var base;

        if ((base = this.getBase()) != null) {
            return base.getDateTimeMillis(year, monthOfYear, dayOfMonth, hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond);
        }

        FieldUtils.verifyValueBounds(DateTimeFieldType.hourOfDay(), hourOfDay, 0, 23);
        FieldUtils.verifyValueBounds(DateTimeFieldType.minuteOfHour(), minuteOfHour, 0, 59);
        FieldUtils.verifyValueBounds(DateTimeFieldType.secondOfMinute(), secondOfMinute, 0, 59);
        FieldUtils.verifyValueBounds(DateTimeFieldType.millisOfSecond(), millisOfSecond, 0, 999);

        return this.getDateMidnightMillis(year, monthOfYear, dayOfMonth)
                + hourOfDay * Chronology.MILLIS_PER_HOUR
                + minuteOfHour * Chronology.MILLIS_PER_MINUTE
                + secondOfMinute * Chronology.MILLIS_PER_SECOND
                + millisOfSecond;
    };

    /**
     * @return {number}
     */
    BasicChronology.prototype.getMinimumDaysInFirstWeek = function() {
        return this._minDaysInFirstWeek;
    };

    /**
     * Gets a debugging toString.
     *
     * @return {String} a debugging string
     */
    BasicChronology.prototype.toString = function() {
        return "BasicChronology[" + this.getZone().getID() + ",mdfw=" + this._minDaysInFirstWeek + "]";
    };

    /**
     *
     * @param {Object} fields
     */
    BasicChronology.prototype._assemble = function(fields) {
        // First copy fields that are the same for all Gregorian and Julian
        // chronologies.

        fields.millis = cMillisField;
        fields.seconds = cSecondsField;
        fields.minutes = cMinutesField;
        fields.hours = cHoursField;
        fields.halfdays = cHalfdaysField;
        fields.days = cDaysField;
        fields.weeks = cWeeksField;

        fields.millisOfSecond = cMillisOfSecondField;
        fields.millisOfDay = cMillisOfDayField;
        fields.secondOfMinute = cSecondOfMinuteField;
        fields.secondOfDay = cSecondOfDayField;
        fields.minuteOfHour = cMinuteOfHourField;
        fields.minuteOfDay = cMinuteOfDayField;
        fields.hourOfDay = cHourOfDayField;
        fields.hourOfHalfday = cHourOfHalfdayField;
        fields.clockhourOfDay = cClockhourOfDayField;
        fields.clockhourOfHalfday = cClockhourOfHalfdayField;
        fields.halfdayOfDay = cHalfdayOfDayField;

        // Now create fields that have unique behavior for Gregorian and Julian
        // chronologies.

        fields.year = new BasicYearDateTimeField(this);
        fields.yearOfEra = new GJYearOfEraDateTimeField(fields.year, this);

        // Define one-based centuryOfEra and yearOfCentury.
        var field = new OffsetDateTimeField(fields.yearOfEra, 99);

        fields.centuryOfEra = new DividedDateTimeField(field, DateTimeFieldType.centuryOfEra(), 100);

        field = new RemainderDateTimeField(fields.centuryOfEra);
        fields.yearOfCentury = new OffsetDateTimeField(field, DateTimeFieldType.yearOfCentury(), 1);

        fields.era = new GJEraDateTimeField(this);
        fields.dayOfWeek = new GJDayOfWeekDateTimeField(this, fields.days);
        fields.dayOfMonth = new BasicDayOfMonthDateTimeField(this, fields.days);
        fields.dayOfYear = new BasicDayOfYearDateTimeField(this, fields.days);
        fields.monthOfYear = new GJMonthOfYearDateTimeField(this);
        fields.weekyear = new BasicWeekyearDateTimeField(this);
        fields.weekOfWeekyear = new BasicWeekOfWeekyearDateTimeField(this, fields.weeks);

        field = new RemainderDateTimeField(fields.weekyear, DateTimeFieldType.weekyearOfCentury(), 100);
        fields.weekyearOfCentury = new OffsetDateTimeField(field, DateTimeFieldType.weekyearOfCentury(), 1);

        // The remaining (imprecise) durations are available from the newly
        // created datetime fields.

        fields.years = fields.year.getDurationField();
        fields.centuries = fields.centuryOfEra.getDurationField();
        fields.months = fields.monthOfYear.getDurationField();
        fields.weekyears = fields.weekyear.getDurationField();
    };

/**
 * Get the number of days in the year.
 *
 * @return {number} 366
 */

BasicChronology.prototype.getDaysInYearMax = function() {
    return 366;
};

/**
 * Get the number of days in the year.
 *
 * @param {number} year  the year to use
 * @return {number} 366 if a leap year, otherwise 365
 */

BasicChronology.prototype.getDaysInYear = function(year) {
    return this.isLeapYear(year) ? 366 : 365;
};

/**
 * Get the number of weeks in the year.
 *
 * @param {number} year  the year to use
 * @return {number} number of weeks in the year
 */

BasicChronology.prototype.getWeeksInYear = function(year) {
    var firstWeekMillis1 = this.getFirstWeekOfYearMillis(year);
    var firstWeekMillis2 = this.getFirstWeekOfYearMillis(year + 1);

    return Math.floor((firstWeekMillis2 - firstWeekMillis1) / Chronology.MILLIS_PER_WEEK);
};

/**
 * Get the millis for the first week of a year.
 *
 * @param {number} year  the year to use
 * @return {number} millis
 */

BasicChronology.prototype.getFirstWeekOfYearMillis = function(year) {
    var jan1millis = this.getYearMillis(year);
    var jan1dayOfWeek = this.getDayOfWeek(jan1millis);

    if (jan1dayOfWeek > (8 - this._withMonthInvoced)) {
        // First week is end of previous year because it doesn't have enough days.
        return jan1millis + (8 - jan1dayOfWeek) * Chronology.MILLIS_PER_DAY;
    } else {
        // First week is start of this year because it has enough days.
        return jan1millis - (jan1dayOfWeek - 1) * Chronology.MILLIS_PER_DAY;
    }
};

/**
 * Get the milliseconds for the start of a year.
 *
 * @param {number} year The year to use.
 * @return {number} millis from 1970-01-01T00:00:00Z
 */

BasicChronology.prototype.getYearMillis = function(year) {
    return this.calculateFirstDayOfYearMillis(year);
};

/**
 * Get the milliseconds for the start of a month.
 *
 * @param {number} year The year to use.
 * @param {number} month The month to use
 * @return {number} millis from 1970-01-01T00:00:00Z
 */

BasicChronology.prototype.getYearMonthMillis = function(year, month) {
    var millis = this.getYearMillis(year);
    millis += this.getTotalMillisByYearMonth(year, month);
    return millis;
};

/**
 * Get the milliseconds for a particular date.
 *
 * @param {number} year The year to use.
 * @param {number} month The month to use
 * @param {number} dayOfMonth The day of the month to use
 * @return {number} millis from 1970-01-01T00:00:00Z
 */

BasicChronology.prototype.getYearMonthDayMillis = function(year, month, dayOfMonth) {
    var millis = this.getYearMillis(year);

    millis += this.getTotalMillisByYearMonth(year, month);

    return millis + (dayOfMonth - 1) * Chronology.MILLIS_PER_DAY;
};

/**
 * @param {number} instant millis from 1970-01-01T00:00:00Z
 * @return {number}
 */

BasicChronology.prototype.getYear = function(instant) {  //TODO
    // Get an initial estimate of the year, and the millis value that
    // represents the start of that year. Then verify estimate and fix if
    // necessary.

    // Initial estimate uses values divided by two to avoid overflow.
    var unitMillis = this.getAverageMillisPerYearDividedByTwo();
    var i2 = (instant >> 1) + this.getApproxMillisAtEpochDividedByTwo();
    if (i2 < 0) {
        i2 = i2 - unitMillis + 1;
    }
    var year = Math.floor(i2 / unitMillis);

    var yearStart = this.getYearMillis(year);
    var diff = instant - yearStart;

    if (diff < 0) {
        year--;
    } else if (diff >= Chronology.MILLIS_PER_DAY * 365) {
        // One year may need to be added to fix estimate.
        var oneYear;
        if (this.isLeapYear(year)) {
            oneYear = Chronology.MILLIS_PER_DAY * 366;
        } else {
            oneYear = Chronology.MILLIS_PER_DAY * 365;
        }

        yearStart += oneYear;

        if (yearStart <= instant) {
            // Didn't go too far, so actually add one year.
            year++;
        }
    }

    return year;
};

/**
 * @param {number} millis from 1970-01-01T00:00:00Z
 * @return {number}
 */

BasicChronology.prototype.getMonthOfYear = function(millis) {
    return this.getMonthOfYear(millis, this.getYear(millis));
};

/**
 * @param {number}  millis from 1970-01-01T00:00:00Z
 * @param {number} year precalculated year of millis
 * @return {number}
 */

BasicChronology.prototype.getMonthOfYear = function(millis, year) {
    abstractMethod();
};

/**
 * @param {number} millis from 1970-01-01T00:00:00Z
 * @return {number}
 */

BasicChronology.prototype.getDayOfMonth = function(millis) {
    var year = this.getYear(millis);

    var month = this.getMonthOfYear(millis, year);

    return this.getDayOfMonth(millis, year, month);
};

/**
 * @param {number} millis from 1970-01-01T00:00:00Z
 * @param {number} year precalculated year of millis
 * @return {number}
 */

BasicChronology.prototype.getDayOfMonth = function(millis, year) {
    var month = this.getMonthOfYear(millis, year);

    return this.getDayOfMonth(millis, year, month);
};

/**
 * @param {number} millis from 1970-01-01T00:00:00Z
 * @param {number} year precalculated year of millis
 * @param {number} month precalculated month of millis
 * @return {number}
 */

BasicChronology.prototype.getDayOfMonth = function(millis, year, month) {
    var dateMillis = this.getYearMillis(year);

    dateMillis += this.getTotalMillisByYearMonth(year, month);

    return Math.floor((millis - dateMillis) / Chronology.MILLIS_PER_DAY) + 1;
};

/**
 * @param {number} instant millis from 1970-01-01T00:00:00Z
 * @return {number}
 */

BasicChronology.prototype.getDayOfYear = function(instant) {
    return this.getDayOfYear(instant, this.getYear(instant));
};

/**
 * @param {number} instant millis from 1970-01-01T00:00:00Z
 * @param {number} year precalculated year of millis
 * @return {number}
 */

BasicChronology.prototype.getDayOfYear = function(instant, year) {
    var yearStart = this.getYearMillis(year);

    return Math.floor((instant - yearStart) / Chronology.MILLIS_PER_DAY) + 1;
};

/**
 * @param {number} instant millis from 1970-01-01T00:00:00Z
 * @return {number}
 */

BasicChronology.prototype.getWeekyear = function(instant) {
    var year = this.getYear(instant);

    var week = this.getWeekOfWeekyear(instant, year);

    if (week == 1) {
        return this.getYear(instant + Chronology.MILLIS_PER_WEEK);
    } else if (week > 51) {
        return this.getYear(instant - (2 * Chronology.MILLIS_PER_WEEK));
    } else {
        return year;
    }
};

/**
 * @param instant millis from 1970-01-01T00:00:00Z
 * @return {number}
 */

BasicChronology.prototype.getWeekOfWeekyear = function(instant) {
    return this.getWeekOfWeekyear(instant, this.getYear(instant));
};

/**
 * @param {number} instant millis from 1970-01-01T00:00:00Z
 * @param {number} year precalculated year of millis
 * @return {number}
 */

BasicChronology.prototype.getWeekOfWeekyear = function(instant, year) {
    var firstWeekMillis1 = this.getFirstWeekOfYearMillis(year);
    if (instant < firstWeekMillis1) {
        return this.getWeeksInYear(year - 1);
    }
    var firstWeekMillis2 = this.getFirstWeekOfYearMillis(year + 1);
    if (instant >= firstWeekMillis2) {
        return 1;
    }
    return Math.floor((instant - firstWeekMillis1) / Chronology.MILLIS_PER_WEEK) + 1;
};

/**
 * @param {number} instant millis from 1970-01-01T00:00:00Z
 * @return {number}
 */

BasicChronology.prototype.getDayOfWeek = function(instant) {
    // 1970-01-01 is day of week 4, Thursday.

    var daysSince19700101;

    if (instant >= 0) {
        daysSince19700101 = Math.floor(instant / Chronology.MILLIS_PER_DAY);
    } else {
        daysSince19700101 = Math.floor((instant - (Chronology.MILLIS_PER_DAY - 1)) / Chronology.MILLIS_PER_DAY);

        if (daysSince19700101 < -3) {
            return 7 + ((daysSince19700101 + 4) % 7);
        }
    }

    return 1 + ((daysSince19700101 + 3) % 7);
};

/**
 * @param {number} instant millis from 1970-01-01T00:00:00Z
 * @return {number}
 */

BasicChronology.prototype.getMillisOfDay = function(instant) {
    if (instant >= 0) {
        return instant % Chronology.MILLIS_PER_DAY;
    } else {
        return (Chronology.MILLIS_PER_DAY - 1) + ((instant + 1) % Chronology.MILLIS_PER_DAY);
    }
};

/**
 * Gets the maximum number of days in any month.
 *
 * @return {number} 31
 */

BasicChronology.prototype.getDaysInMonthMax = function() {
    return 31;
};

/**
 * Gets the maximum number of days in the month specified by the instant.
 *
 * @param {number} instant  millis from 1970-01-01T00:00:00Z
 * @return {number} the maximum number of days in the month
 */

BasicChronology.prototype.getDaysInMonthMax = function(instant) {
    var thisYear = this.getYear(instant);

    var thisMonth = this.getMonthOfYear(instant, thisYear);

    return this.getDaysInYearMonth(thisYear, thisMonth);
};

/**
 * Gets the maximum number of days in the month specified by the instant.
 * The value represents what the user is trying to set, and can be
 * used to optimise this method.
 *
 * @param {number} instant  millis from 1970-01-01T00:00:00Z
 * @param {number} value  the value being set
 * @return {number} the maximum number of days in the month
 */

BasicChronology.prototype.getDaysInMonthMaxForSet = function(instant, value) {
    return this.getDaysInMonthMax(instant);
};

//-----------------------------------------------------------------------
/**
 * Gets the milliseconds for a date at midnight.
 *
 * @param {number} year  the year
 * @param {number} monthOfYear  the month
 * @param {number} dayOfMonth  the day
 * @return {number} the milliseconds
 */

BasicChronology.prototype.getDateMidnightMillis = function(year, monthOfYear, dayOfMonth) {
    FieldUtils.verifyValueBounds(DateTimeFieldType.year(), year, this.getMinYear(), this.getMaxYear());
    FieldUtils.verifyValueBounds(DateTimeFieldType.monthOfYear(), monthOfYear, 1, this.getMaxMonth(year));
    FieldUtils.verifyValueBounds(DateTimeFieldType.dayOfMonth(), dayOfMonth, 1, this.getDaysInYearMonth(year, monthOfYear));

    return this.getYearMonthDayMillis(year, monthOfYear, dayOfMonth);
};

/**
 * Gets the difference between the two instants in years.
 *
 * @param {number} minuendInstant  the first instant
 * @param {number} subtrahendInstant  the second instant
 * @return {number} the difference
 */

BasicChronology.prototype.getYearDifference = function(minuendInstant, subtrahendInstant) {
    abstractMethod();
};

/**
 * Is the specified year a leap year?
 *
 * @param {number} year  the year to test
 * @return {number} true if leap
 */
BasicChronology.prototype.isLeapYear = function(year) {
    abstractMethod();
};

/**
 * Gets the number of days in the specified month and year.
 *
 * @param {number} year  the year
 * @param {number} month  the month
 * @return {number} the number of days
 */

BasicChronology.prototype.getDaysInYearMonth = function(year, month) {
    abstractMethod();
};

/**
 * Gets the maximum days in the specified month.
 *
 * @param {number} month  the month
 * @return {number} the max days
 */

BasicChronology.prototype.getDaysInMonthMax = function(month) {
    abstractMethod();
};

/**
 * Gets the total number of millis elapsed in this year at the start
 * of the specified month, such as zero for month 1.
 *
 * @param {number} year  the year
 * @param {number} month  the month
 * @return {number} the elapsed millis at the start of the month
 */

BasicChronology.prototype.getTotalMillisByYearMonth = function(year, month) {
    abstractMethod();
};

/**
 * Gets the millisecond value of the first day of the year.
 *
 * @return {number} the milliseconds for the first of the year
 */

BasicChronology.prototype.calculateFirstDayOfYearMillis = function(year) {
    abstractMethod();
};

/**
 * Gets the minimum supported year.
 *
 * @return {number} the year
 */

BasicChronology.prototype.getMinYear = function() {
    abstractMethod();
};

/**
 * Gets the maximum supported year.
 *
 * @return {number} the year
 */

BasicChronology.prototype.getMaxYear = function() {
    abstractMethod();
};

/**
 * Gets the maximum month for the specified year.
 * This implementation calls getMaxMonth().
 *
 * @param {number} year  the year
 * @return {number} the maximum month value
 */

BasicChronology.prototype.getMaxMonth = function(year) {
    return this.getMaxMonth();
};

/**
 * Gets the maximum number of months.
 *
 * @return {number} 12
 */

BasicChronology.prototype.getMaxMonth = function() {
    return 12;
};

/**
 * Gets an average value for the milliseconds per year.
 *
 * @return {number} the millis per year
 */

BasicChronology.prototype.getAverageMillisPerYear = function() {
    abstractMethod();
};

/**
 * Gets an average value for the milliseconds per year, divided by two.
 *
 * @return {number} the millis per year divided by two
 */

BasicChronology.prototype.getAverageMillisPerYearDividedByTwo = function() {
    abstractMethod();
};

/**
 * Gets an average value for the milliseconds per month.
 *
 * @return {number} the millis per month
 */
BasicChronology.prototype.getAverageMillisPerMonth = function() {
    abstractMethod();
};

/**
 * Returns a constant representing the approximate number of milliseconds
 * elapsed from year 0 of this chronology, divided by two. This constant
 * <em>must</em> be defined as:
 * <pre>
 *    (yearAtEpoch * averageMillisPerYear + millisOfYearAtEpoch) / 2
 * </pre>
 * where epoch is 1970-01-01 (Gregorian).
 * @return {number}
 */
BasicChronology.prototype.getApproxMillisAtEpochDividedByTwo = function() {
    abstractMethod();
};

/**
 * Sets the year from an instant and year.
 *
 * @param {number} instant  millis from 1970-01-01T00:00:00Z
 * @param {number} year  the year to set
 * @return {number} the updated millis
 */
BasicChronology.prototype.setYear = function(instant, year) {
    abstractMethod();
};
})();
