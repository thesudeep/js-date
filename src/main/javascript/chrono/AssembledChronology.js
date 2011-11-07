/**
 * Constructor calls the assemble method, enabling subclasses to define its
 * supported fields. If a base chronology is supplied, the field set
 * initially contains references to each base chronology field.
 * <p>
 * Other methods in this class will delegate to the base chronology, if it
 * can be determined that the base chronology will produce the same results
 * as AbstractChronology.
 *
 * @param base optional base chronology to copy initial fields from
 * @param param optional param object avalable for assemble method
 * @constructor
 * @class Abstract Chronology that enables chronologies to be assembled from a container of fields. AssembledChronology is immutable.
 */
AssembledChronology = function (base, param) {
    /** @type {Chronology} */ this._base = base;
    /** @type {Object} */ this._param = param;
    /** @type {number} */ this._baseFlags = 0;

    this.millis = function() {
        return iMillis;
    };

    this.millisOfSecond = function() {
        return iMillisOfSecond;
    };

    this.millisOfDay = function() {
        return iMillisOfDay;
    };

    this.seconds = function() {
        return iSeconds;
    };

    this.secondOfMinute = function() {
        return iSecondOfMinute;
    };

    this.secondOfDay = function() {
        return iSecondOfDay;
    };

    this.minutes = function() {
        return iMinutes;
    };

    this.minuteOfHour = function() {
        return iMinuteOfHour;
    };

    this.minuteOfDay = function() {
        return iMinuteOfDay;
    };

    this.hours = function() {
        return iHours;
    };

    this.hourOfDay = function() {
        return iHourOfDay;
    };

    this.clockhourOfDay = function() {
        return iClockhourOfDay;
    };

    this.halfdays = function() {
        return iHalfdays;
    };

    this.hourOfHalfday = function() {
        return iHourOfHalfday;
    };

    this.clockhourOfHalfday = function() {
        return iClockhourOfHalfday;
    };

    this.halfdayOfDay = function() {
        return iHalfdayOfDay;
    };

    this.days = function() {
        return iDays;
    };

    this.dayOfWeek = function() {
        return iDayOfWeek;
    };

    this.dayOfMonth = function() {
        return iDayOfMonth;
    };

    this.dayOfYear = function() {
        return iDayOfYear;
    };

    this.weeks = function() {
        return iWeeks;
    };

    this.weekOfWeekyear = function() {
        return iWeekOfWeekyear;
    };

    this.weekyears = function() {
        return iWeekyears;
    };

    this.weekyear = function() {
        return iWeekyear;
    };

    this.weekyearOfCentury = function() {
        return iWeekyearOfCentury;
    };

    this.months = function() {
        return iMonths;
    };

    this.monthOfYear = function() {
        return iMonthOfYear;
    };

    this.years = function() {
        return iYears;
    };

    this.year = function() {
        return iYear;
    };

    this.yearOfEra = function() {
        return iYearOfEra;
    };

    this.yearOfCentury = function() {
        return iYearOfCentury;
    };

    this.centuries = function() {
        return iCenturies;
    };

    this.centuryOfEra = function() {
        return iCenturyOfEra;
    };

    this.eras = function() {
        return iEras;
    };

    this.era = function() {
        return iEra;
    };

    var f, fields = {};

    if (this._base != null) {
        var chrono = this._base;

        function isSupported(v) {
            return hasValue(v) && v.isSupported();
        }

        isSupported(f = chrono.millis())    && (fields.millis = f);
        isSupported(f = chrono.seconds())   && (fields.seconds = f);
        isSupported(f = chrono.minutes())   && (fields.minutes = f);
        isSupported(f = chrono.hours())     && (fields.hours = f);
        isSupported(f = chrono.halfdays())  && (fields.halfdays = f);
        isSupported(f = chrono.days())      && (fields.days = f);
        isSupported(f = chrono.weeks())     && (fields.weeks = f);
        isSupported(f = chrono.weekyears()) && (fields.weekyears = f);
        isSupported(f = chrono.months())    && (fields.months = f);
        isSupported(f = chrono.years())     && (fields.years = f);
        isSupported(f = chrono.centuries()) && (fields.centuries = f);
        isSupported(f = chrono.eras())      && (fields.eras = f);

        isSupported(f = chrono.millisOfSecond())     && (fields.millisOfSecond = f);
        isSupported(f = chrono.millisOfDay())        && (fields.millisOfDay = f);
        isSupported(f = chrono.secondOfMinute())     && (fields.secondOfMinute = f);
        isSupported(f = chrono.secondOfDay())        && (fields.secondOfDay = f);
        isSupported(f = chrono.minuteOfHour())       && (fields.minuteOfHour = f);
        isSupported(f = chrono.minuteOfDay())        && (fields.minuteOfDay = f);
        isSupported(f = chrono.hourOfDay())          && (fields.hourOfDay = f);
        isSupported(f = chrono.clockhourOfDay())     && (fields.clockhourOfDay = f);
        isSupported(f = chrono.hourOfHalfday())      && (fields.hourOfHalfday = f);
        isSupported(f = chrono.clockhourOfHalfday()) && (fields.clockhourOfHalfday = f);
        isSupported(f = chrono.halfdayOfDay()) && (fields.halfdayOfDay = f);
        isSupported(f = chrono.dayOfWeek()) && (fields.dayOfWeek = f);
        isSupported(f = chrono.dayOfMonth()) && (fields.dayOfMonth = f);
        isSupported(f = chrono.dayOfYear()) && (fields.dayOfYear = f);
        isSupported(f = chrono.weekOfWeekyear()) && (fields.weekOfWeekyear = f);
        isSupported(f = chrono.weekyear()) && (fields.weekyear = f);
        isSupported(f = chrono.weekyearOfCentury()) && (fields.weekyearOfCentury = f);
        isSupported(f = chrono.monthOfYear()) && (fields.monthOfYear = f);
        isSupported(f = chrono.year()) && (fields.year = f);
        isSupported(f = chrono.yearOfEra()) && (fields.yearOfEra = f);
        isSupported(f = chrono.yearOfCentury()) && (fields.yearOfCentury = f);
        isSupported(f = chrono.centuryOfEra()) && (fields.centuryOfEra = f);
        isSupported(f = chrono.era()) && (fields.era = f);
    }

    this.assemble(fields);

    /** @type {DurationField} */ var iMillis = hasValue(f = fields.millis) ? f : this._super.millis();
    /** @type {DurationField} */ var iSeconds = hasValue(f = fields.seconds) ? f : this._super.seconds();
    /** @type {DurationField} */ var iMinutes = hasValue(f = fields.minutes) ? f : this._super.minutes();
    /** @type {DurationField} */ var iHours = hasValue(f = fields.hours) ? f : this._super.hours();
    /** @type {DurationField} */ var iHalfdays = hasValue(f = fields.halfdays) ? f : this._super.halfdays();
    /** @type {DurationField} */ var iDays = hasValue(f = fields.days) ? f : this._super.days();
    /** @type {DurationField} */ var iWeeks = hasValue(f = fields.weeks) ? f : this._super.weeks();
    /** @type {DurationField} */ var iWeekyears = hasValue(f = fields.weekyears) ? f : this._super.weekyears();
    /** @type {DurationField} */ var iMonths = hasValue(f = fields.months) ? f : this._super.months();
    /** @type {DurationField} */ var iYears = hasValue(f = fields.years) ? f : this._super.years();
    /** @type {DurationField} */ var iCenturies = hasValue(f = fields.centuries) ? f : this._super.centuries();
    /** @type {DurationField} */ var iEras = hasValue(f = fields.eras) ? f : this._super.eras();

    /** @type {DateTimeField} */ var iMillisOfSecond = hasValue(f = fields.millisOfSecond) ? f : this._super.millisOfSecond();
    /** @type {DateTimeField} */ var iMillisOfDay = hasValue(f = fields.millisOfDay) ? f : this._super.millisOfDay();
    /** @type {DateTimeField} */ var iSecondOfMinute = hasValue(f = fields.secondOfMinute) ? f : this._super.secondOfMinute();
    /** @type {DateTimeField} */ var iSecondOfDay = hasValue(f = fields.secondOfDay) ? f : this._super.secondOfDay();
    /** @type {DateTimeField} */ var iMinuteOfHour = hasValue(f = fields.minuteOfHour) ? f : this._super.minuteOfHour();
    /** @type {DateTimeField} */ var iMinuteOfDay = hasValue(f = fields.minuteOfDay) ? f : this._super.minuteOfDay();
    /** @type {DateTimeField} */ var iHourOfDay = hasValue(f = fields.hourOfDay) ? f : this._super.hourOfDay();
    /** @type {DateTimeField} */ var iClockhourOfDay = hasValue(f = fields.clockhourOfDay) ? f : this._super.clockhourOfDay();
    /** @type {DateTimeField} */ var iHourOfHalfday = hasValue(f = fields.hourOfHalfday) ? f : this._super.hourOfHalfday();
    /** @type {DateTimeField} */ var iClockhourOfHalfday = hasValue(f = fields.clockhourOfHalfday) ? f : this._super.clockhourOfHalfday();
    /** @type {DateTimeField} */ var iHalfdayOfDay = hasValue(f = fields.halfdayOfDay) ? f : this._super.halfdayOfDay();
    /** @type {DateTimeField} */ var iDayOfWeek = hasValue(f = fields.dayOfWeek) ? f : this._super.dayOfWeek();
    /** @type {DateTimeField} */ var iDayOfMonth = hasValue(f = fields.dayOfMonth) ? f : this._super.dayOfMonth();
    /** @type {DateTimeField} */ var iDayOfYear = hasValue(f = fields.dayOfYear) ? f : this._super.dayOfYear();
    /** @type {DateTimeField} */ var iWeekOfWeekyear = hasValue(f = fields.weekOfWeekyear) ? f : this._super.weekOfWeekyear();
    /** @type {DateTimeField} */ var iWeekyear = hasValue(f = fields.weekyear) ? f : this._super.weekyear();
    /** @type {DateTimeField} */ var iWeekyearOfCentury = hasValue(f = fields.weekyearOfCentury) ? f : this._super.weekyearOfCentury();
    /** @type {DateTimeField} */ var iMonthOfYear = hasValue(f = fields.monthOfYear) ? f : this._super.monthOfYear();
    /** @type {DateTimeField} */ var iYear = hasValue(f = fields.year) ? f : this._super.year();
    /** @type {DateTimeField} */ var iYearOfEra = hasValue(f = fields.yearOfEra) ? f : this._super.yearOfEra();
    /** @type {DateTimeField} */ var iYearOfCentury = hasValue(f = fields.yearOfCentury) ? f : this._super.yearOfCentury();
    /** @type {DateTimeField} */ var iCenturyOfEra = hasValue(f = fields.centuryOfEra) ? f : this._super.centuryOfEra();
    /** @type {DateTimeField} */ var iEra = hasValue(f = fields.era) ? f : this._super.era();

    var flags;

    if (this._base == null) {
        flags = 0;
    } else {
        flags =
                ((iHourOfDay == this._base.hourOfDay() &&
                        iMinuteOfHour == this._base.minuteOfHour() &&
                        iSecondOfMinute == this._base.secondOfMinute() &&
                        iMillisOfSecond == this._base.millisOfSecond()   ) ? 1 : 0) |

                        ((iMillisOfDay == this._base.millisOfDay()) ? 2 : 0) |

                        ((iYear == this._base.year() &&
                                iMonthOfYear == this._base.monthOfYear() &&
                                iDayOfMonth == this._base.dayOfMonth()    ) ? 4 : 0);
    }

    this._baseFlags = flags;
};

/**
 *
 * @return {DateTimeZone}
 */
AssembledChronology.prototype.getZone = function() {
    var base;

    if (hasValue(base = this._base)) {
        return base.getZone();
    }

    return null;
};

/**
 * @param {number=} year
 * @param {number=} monthOfYear
 * @param {number=} dayOfMonth
 * @param {number=} millisOfDay
 * @return {number}
 */
AssembledChronology.prototype.getDateTimeMillis = function(year, monthOfYear, dayOfMonth, millisOfDay) {
    var base;

    if ((base = this._base) != null && (this._baseFlags & 6) == 6) {
        // Only call specialized implementation if applicable fields are the same.
        return base.getDateTimeMillis(year, monthOfYear, dayOfMonth, millisOfDay);
    }

    return this._super.getDateTimeMillis(year, monthOfYear, dayOfMonth, millisOfDay);
};

AssembledChronology.prototype.getInstantTimeMillis = function(instant, hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond) {
    var base;

    if ((base = this._base) != null && (this._baseFlags & 1) == 1) {
        // Only call specialized implementation if applicable fields are the same.
        return base.getDateTimeMillis(instant, hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond);
    }

    return this._super.getDateTimeMillis(instant, hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond);
};

/**
 * Invoked by the constructor and after deserialization to allow subclasses
 * to define all of its supported fields. All unset fields default to
 * unsupported instances.
 *
 * @param {Object} fields container of fields
 */
AssembledChronology.prototype.assemble = function(fields) {
    abstractMethod();
};

/**
 * Returns the same base chronology as passed into the constructor.
 * @return {Chronology}
 */
AssembledChronology.prototype.getBase = function() {
    return this._base;
};

/**
 * Returns the same param object as passed into the constructor.
 * @return {Object}
 */
AssembledChronology.prototype.getParam = function() {
    return this._param;
};

inherits(AssembledChronology, BaseChronology);