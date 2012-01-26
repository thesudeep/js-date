/**
 * Identifies a field, such as year or minuteOfHour, in a chronology-neutral way.
 * <p>
 * A field type defines the type of the field, such as hourOfDay.
 * If does not directly enable any calculations, however it does provide a
 * {@link #getField(Chronology)} method that returns the actual calculation engine
 * for a particular chronology.
 * It also provides access to the related {@link DurationFieldType}s.
 * <p>
 * Instances of <code>DateTimeFieldType</code> are singletons.
 * They can be compared using <code>==</code>.
 * <p>
 * If required, you can create your own field, for example a quarterOfYear.
 * You must create a subclass of <code>DateTimeFieldType</code> that defines the field type.
 * This class returns the actual calculation engine from {@link #getField(Chronology)}.
 * The subclass should implement equals and hashCode.
 *
 * @author Stephen Colebourne
 * @author Brian S O'Neill
 * @since 1.0
 */
DateTimeFieldType = function(name) {
    /** @type {String} */
    this._name = name;
};

(function() {
    /** Ordinal values for standard field types. */
    var ERA = 1,
            YEAR_OF_ERA = 2,
            CENTURY_OF_ERA = 3,
            YEAR_OF_CENTURY = 4,
            YEAR = 5,
            DAY_OF_YEAR = 6,
            MONTH_OF_YEAR = 7,
            DAY_OF_MONTH = 8,
            WEEKYEAR_OF_CENTURY = 9,
            WEEKYEAR = 10,
            WEEK_OF_WEEKYEAR = 11,
            DAY_OF_WEEK = 12,
            HALFDAY_OF_DAY = 13,
            HOUR_OF_HALFDAY = 14,
            CLOCKHOUR_OF_HALFDAY = 15,
            CLOCKHOUR_OF_DAY = 16,
            HOUR_OF_DAY = 17,
            MINUTE_OF_DAY = 18,
            MINUTE_OF_HOUR = 19,
            SECOND_OF_DAY = 20,
            SECOND_OF_MINUTE = 21,
            MILLIS_OF_DAY = 22,
            MILLIS_OF_SECOND = 23;

    /**
     * Constructor.
     *
     * @param name  the name to use
     * @param ordinal  the byte value for the oridinal index
     * @param unitType  the unit duration type
     * @param rangeType  the range duration type
     * @constructor
     * @private
     */
    var StandardDateTimeFieldType = function(name, ordinal, unitType, rangeType) {
        this._super.constructor(name);
        /** @type {number}*/
        this._ordinal = ordinal;
        /** @type {DurationFieldType}*/
        this._unitType = unitType;
        /** @type {DurationFieldType}*/
        this._rangeType = rangeType;
    };

    inherits(StandardDateTimeFieldType, DateTimeFieldType);

    StandardDateTimeFieldType.prototype.getDurationType = function() {
        return this._unitType;
    };

    StandardDateTimeFieldType.prototype.getRangeDurationType = function() {
        return this._rangeType;
    };

    StandardDateTimeFieldType.prototype.equals = function(obj) {
        if (this === obj) {
            return true;
        }
        if (obj instanceof StandardDateTimeFieldType) {
            return this._ordinal == obj._ordinal;
        }
        return false;
    };

    StandardDateTimeFieldType.prototype.getField = function(chronology) {
        chronology = DateTimeUtils.getChronology(chronology);

        switch (this._ordinal) {
            case ERA:
                return chronology.era();
            case YEAR_OF_ERA:
                return chronology.yearOfEra();
            case CENTURY_OF_ERA:
                return chronology.centuryOfEra();
            case YEAR_OF_CENTURY:
                return chronology.yearOfCentury();
            case YEAR:
                return chronology.year();
            case DAY_OF_YEAR:
                return chronology.dayOfYear();
            case MONTH_OF_YEAR:
                return chronology.monthOfYear();
            case DAY_OF_MONTH:
                return chronology.dayOfMonth();
            case WEEKYEAR_OF_CENTURY:
                return chronology.weekyearOfCentury();
            case WEEKYEAR:
                return chronology.weekyear();
            case WEEK_OF_WEEKYEAR:
                return chronology.weekOfWeekyear();
            case DAY_OF_WEEK:
                return chronology.dayOfWeek();
            case HALFDAY_OF_DAY:
                return chronology.halfdayOfDay();
            case HOUR_OF_HALFDAY:
                return chronology.hourOfHalfday();
            case CLOCKHOUR_OF_HALFDAY:
                return chronology.clockhourOfHalfday();
            case CLOCKHOUR_OF_DAY:
                return chronology.clockhourOfDay();
            case HOUR_OF_DAY:
                return chronology.hourOfDay();
            case MINUTE_OF_DAY:
                return chronology.minuteOfDay();
            case MINUTE_OF_HOUR:
                return chronology.minuteOfHour();
            case SECOND_OF_DAY:
                return chronology.secondOfDay();
            case SECOND_OF_MINUTE:
                return chronology.secondOfMinute();
            case MILLIS_OF_DAY:
                return chronology.millisOfDay();
            case MILLIS_OF_SECOND:
                return chronology.millisOfSecond();
            default:
                throw new Error("Shouldn't happen.");
        }
    };

    /** The era field type. */
    var ERA_TYPE = new StandardDateTimeFieldType("era", ERA, DurationFieldType.eras(), null);
    /** The yearOfEra field type. */
    var YEAR_OF_ERA_TYPE = new StandardDateTimeFieldType("yearOfEra", YEAR_OF_ERA, DurationFieldType.years(), DurationFieldType.eras());
    /** The centuryOfEra field type. */
    var CENTURY_OF_ERA_TYPE = new StandardDateTimeFieldType("centuryOfEra", CENTURY_OF_ERA, DurationFieldType.centuries(), DurationFieldType.eras());
    /** The yearOfCentury field type. */
    var YEAR_OF_CENTURY_TYPE = new StandardDateTimeFieldType("yearOfCentury", YEAR_OF_CENTURY, DurationFieldType.years(), DurationFieldType.centuries());
    /** The year field type. */
    var YEAR_TYPE = new StandardDateTimeFieldType("year", YEAR, DurationFieldType.years(), null);
    /** The dayOfYear field type. */
    var DAY_OF_YEAR_TYPE = new StandardDateTimeFieldType("dayOfYear", DAY_OF_YEAR, DurationFieldType.days(), DurationFieldType.years());
    /** The monthOfYear field type. */
    var MONTH_OF_YEAR_TYPE = new StandardDateTimeFieldType("monthOfYear", MONTH_OF_YEAR, DurationFieldType.months(), DurationFieldType.years());
    /** The dayOfMonth field type. */
    var DAY_OF_MONTH_TYPE = new StandardDateTimeFieldType("dayOfMonth", DAY_OF_MONTH, DurationFieldType.days(), DurationFieldType.months());
    /** The weekyearOfCentury field type. */
    var WEEKYEAR_OF_CENTURY_TYPE = new StandardDateTimeFieldType("weekyearOfCentury", WEEKYEAR_OF_CENTURY, DurationFieldType.weekyears(), DurationFieldType.centuries());
    /** The weekyear field type. */
    var WEEKYEAR_TYPE = new StandardDateTimeFieldType("weekyear", WEEKYEAR, DurationFieldType.weekyears(), null);
    /** The weekOfWeekyear field type. */
    var WEEK_OF_WEEKYEAR_TYPE = new StandardDateTimeFieldType("weekOfWeekyear", WEEK_OF_WEEKYEAR, DurationFieldType.weeks(), DurationFieldType.weekyears());
    /** The dayOfWeek field type. */
    var DAY_OF_WEEK_TYPE = new StandardDateTimeFieldType("dayOfWeek", DAY_OF_WEEK, DurationFieldType.days(), DurationFieldType.weeks());

    /** The halfday field type. */
    var HALFDAY_OF_DAY_TYPE = new StandardDateTimeFieldType("halfdayOfDay", HALFDAY_OF_DAY, DurationFieldType.halfdays(), DurationFieldType.days());
    /** The hourOfHalfday field type. */
    var HOUR_OF_HALFDAY_TYPE = new StandardDateTimeFieldType("hourOfHalfday", HOUR_OF_HALFDAY, DurationFieldType.hours(), DurationFieldType.halfdays());
    /** The clockhourOfHalfday field type. */
    var CLOCKHOUR_OF_HALFDAY_TYPE = new StandardDateTimeFieldType("clockhourOfHalfday", CLOCKHOUR_OF_HALFDAY, DurationFieldType.hours(), DurationFieldType.halfdays());
    /** The clockhourOfDay field type. */
    var CLOCKHOUR_OF_DAY_TYPE = new StandardDateTimeFieldType("clockhourOfDay", CLOCKHOUR_OF_DAY, DurationFieldType.hours(), DurationFieldType.days());
    /** The hourOfDay field type. */
    var HOUR_OF_DAY_TYPE = new StandardDateTimeFieldType("hourOfDay", HOUR_OF_DAY, DurationFieldType.hours(), DurationFieldType.days());
    /** The minuteOfDay field type. */
    var MINUTE_OF_DAY_TYPE = new StandardDateTimeFieldType("minuteOfDay", MINUTE_OF_DAY, DurationFieldType.minutes(), DurationFieldType.days());
    /** The minuteOfHour field type. */
    var MINUTE_OF_HOUR_TYPE = new StandardDateTimeFieldType("minuteOfHour", MINUTE_OF_HOUR, DurationFieldType.minutes(), DurationFieldType.hours());
    /** The secondOfDay field type. */
    var SECOND_OF_DAY_TYPE = new StandardDateTimeFieldType("secondOfDay", SECOND_OF_DAY, DurationFieldType.seconds(), DurationFieldType.days());
    /** The secondOfMinute field type. */
    var SECOND_OF_MINUTE_TYPE = new StandardDateTimeFieldType("secondOfMinute", SECOND_OF_MINUTE, DurationFieldType.seconds(), DurationFieldType.minutes());
    /** The millisOfDay field type. */
    var MILLIS_OF_DAY_TYPE = new StandardDateTimeFieldType("millisOfDay", MILLIS_OF_DAY, DurationFieldType.millis(), DurationFieldType.days());
    /** The millisOfSecond field type. */
    var MILLIS_OF_SECOND_TYPE = new StandardDateTimeFieldType("millisOfSecond", MILLIS_OF_SECOND, DurationFieldType.millis(), DurationFieldType.seconds());

    /**
     * Get the millis of second field type.
     *
     * @return {DateTimeFieldType} the DateTimeFieldType constant
     */
    DateTimeFieldType.millisOfSecond = function() {
        return MILLIS_OF_SECOND_TYPE;
    };

    /**
     * Get the millis of day field type.
     *
     * @return {DateTimeFieldType} the DateTimeFieldType constant
     */
    DateTimeFieldType.millisOfDay = function() {
        return MILLIS_OF_DAY_TYPE;
    };

    /**
     * Get the second of minute field type.
     *
     * @return {DateTimeFieldType} the DateTimeFieldType constant
     */
    DateTimeFieldType.secondOfMinute = function() {
        return SECOND_OF_MINUTE_TYPE;
    };

    /**
     * Get the second of day field type.
     *
     * @return {DateTimeFieldType} the DateTimeFieldType constant
     */
    DateTimeFieldType.secondOfDay = function() {
        return SECOND_OF_DAY_TYPE;
    };

    /**
     * Get the minute of hour field type.
     *
     * @return {DateTimeFieldType} the DateTimeFieldType constant
     */
    DateTimeFieldType.minuteOfHour = function() {
        return MINUTE_OF_HOUR_TYPE;
    };

    /**
     * Get the minute of day field type.
     *
     * @return {DateTimeFieldType} the DateTimeFieldType constant
     */
    DateTimeFieldType.minuteOfDay = function() {
        return MINUTE_OF_DAY_TYPE;
    };

    /**
     * Get the hour of day (0-23) field type.
     *
     * @return {DateTimeFieldType} the DateTimeFieldType constant
     */
    DateTimeFieldType.hourOfDay = function() {
        return HOUR_OF_DAY_TYPE;
    };

    /**
     * Get the hour of day (offset to 1-24) field type.
     *
     * @return {DateTimeFieldType} the DateTimeFieldType constant
     */
    DateTimeFieldType.clockhourOfDay = function() {
        return CLOCKHOUR_OF_DAY_TYPE;
    };

    /**
     * Get the hour of am/pm (0-11) field type.
     *
     * @return {DateTimeFieldType} the DateTimeFieldType constant
     */
    DateTimeFieldType.hourOfHalfday = function() {
        return HOUR_OF_HALFDAY_TYPE;
    };

    /**
     * Get the hour of am/pm (offset to 1-12) field type.
     *
     * @return {DateTimeFieldType} the DateTimeFieldType constant
     */
    DateTimeFieldType.clockhourOfHalfday = function() {
        return CLOCKHOUR_OF_HALFDAY_TYPE;
    };

    /**
     * Get the AM(0) PM(1) field type.
     *
     * @return {DateTimeFieldType} the DateTimeFieldType constant
     */
    DateTimeFieldType.halfdayOfDay = function() {
        return HALFDAY_OF_DAY_TYPE;
    };

//-----------------------------------------------------------------------
    /**
     * Get the day of week field type.
     *
     * @return {DateTimeFieldType} the DateTimeFieldType constant
     */
    DateTimeFieldType.dayOfWeek = function() {
        return DAY_OF_WEEK_TYPE;
    };

    /**
     * Get the day of month field type.
     *
     * @return {DateTimeFieldType} the DateTimeFieldType constant
     */
    DateTimeFieldType.dayOfMonth = function() {
        return DAY_OF_MONTH_TYPE;
    };

    /**
     * Get the day of year field type.
     *
     * @return {DateTimeFieldType} the DateTimeFieldType constant
     */
    DateTimeFieldType.dayOfYear = function() {
        return DAY_OF_YEAR_TYPE;
    };

    /**
     * Get the week of a week based year field type.
     *
     * @return {DateTimeFieldType} the DateTimeFieldType constant
     */
    DateTimeFieldType.weekOfWeekyear = function() {
        return WEEK_OF_WEEKYEAR_TYPE;
    };

    /**
     * Get the year of a week based year field type.
     *
     * @return {DateTimeFieldType} the DateTimeFieldType constant
     */
    DateTimeFieldType.weekyear = function() {
        return WEEKYEAR_TYPE;
    };

    /**
     * Get the year of a week based year within a century field type.
     *
     * @return {DateTimeFieldType} the DateTimeFieldType constant
     */
    DateTimeFieldType.weekyearOfCentury = function() {
        return WEEKYEAR_OF_CENTURY_TYPE;
    };

    /**
     * Get the month of year field type.
     *
     * @return {DateTimeFieldType} the DateTimeFieldType constant
     */
    DateTimeFieldType.monthOfYear = function() {
        return MONTH_OF_YEAR_TYPE;
    };

    /**
     * Get the year field type.
     *
     * @return {DateTimeFieldType} the DateTimeFieldType constant
     */
    DateTimeFieldType.year = function() {
        return YEAR_TYPE;
    };

    /**
     * Get the year of era field type.
     *
     * @return {DateTimeFieldType} the DateTimeFieldType constant
     */
    DateTimeFieldType.yearOfEra = function() {
        return YEAR_OF_ERA_TYPE;
    };

    /**
     * Get the year of century field type.
     *
     * @return {DateTimeFieldType} the DateTimeFieldType constant
     */
    DateTimeFieldType.yearOfCentury = function() {
        return YEAR_OF_CENTURY_TYPE;
    };

    /**
     * Get the century of era field type.
     *
     * @return {DateTimeFieldType} the DateTimeFieldType constant
     */
    DateTimeFieldType.centuryOfEra = function() {
        return CENTURY_OF_ERA_TYPE;
    };

    /**
     * Get the era field type.
     *
     * @return {DateTimeFieldType} the DateTimeFieldType constant
     */
    DateTimeFieldType.era = function() {
        return ERA_TYPE;
    };

    /**
     * Get the name of the field.
     * <p>
     * By convention, names follow a pattern of "dddOfRrr", where "ddd" represents
     * the (singular) duration unit field name and "Rrr" represents the (singular)
     * duration range field name. If the range field is not applicable, then
     * the name of the field is simply the (singular) duration field name.
     *
     * @return {String} field name
     */
    DateTimeFieldType.prototype.getName = function() {
        return this._name;
    };

    /**
     * Get the duration unit of the field.
     *
     * @return {DurationFieldType} duration unit of the field, never null
     */
    DateTimeFieldType.prototype.getDurationType = function() {
        abstractMethod();
    };

    /**
     * Get the duration range of the field.
     *
     * @return {DurationFieldType} duration range of the field, null if unbounded
     */
    DateTimeFieldType.prototype.getRangeDurationType = function() {
        abstractMethod();
    };

    /**
     * Gets a suitable field for this type from the given Chronology.
     *
     * @param {Chronology} chronology  the chronology to use, null means ISOChronology in default zone
     * @return {DateTimeField} a suitable field
     */
    DateTimeFieldType.prototype.getField = function(chronology) {
        abstractMethod();
    };

    /**
     * Checks whether this field supported in the given Chronology.
     *
     * @param {Chronology} chronology  the chronology to use, null means ISOChronology in default zone
     * @return {boolean} true if supported
     */
    DateTimeFieldType.prototype.isSupported = function(chronology) {
        return this.getField(chronology).isSupported();
    }

    /**
     * Get a suitable debug string.
     *
     * @return {String} debug string
     */
    DateTimeFieldType.prototype.toString = function() {
        return this.getName();
    }
})();

