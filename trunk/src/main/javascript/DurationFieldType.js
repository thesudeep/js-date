/**
 * Identifies a duration field, such as years or minutes, in a chronology-neutral way.
 * <p>
 * A duration field type defines the type of the field, such as hours.
 * If does not directly enable any calculations, however it does provide a
 * {@link DurationFieldType#getField(Chronology)} method that returns the actual calculation engine
 * for a particular chronology.
 * <p>
 * Instances of <code>DurationFieldType</code> are singletons.
 * They can be compared using <code>==</code>.
 * <p>
 * If required, you can create your own field, for example a quarters.
 * You must create a subclass of <code>DurationFieldType</code> that defines the field type.
 * This class returns the actual calculation engine from {@link DurationFieldType#getField(Chronology)}.
 *
 * @author Stephen Colebourne
 * @author Brian S O'Neill
 * @since 1.0
 */
DurationFieldType = function (name, ordinal) {
    this._name = name;
    this._ordinal = ordinal;
};

/**
 * Get the name of the field.
 * By convention, names are plural.
 *
 * @return {String} field name
 */
DurationFieldType.prototype.getName = function () {
    return this._name;
};

/**
 * Gets a suitable field for this type from the given Chronology.
 *
 * @param {Chronology} chronology  the chronology to use, null means ISOChronology in default zone
 * @return {DurationField} a suitable field
 */
DurationFieldType.prototype.getField = function(chronology) {
    chronology = DateTimeUtils.getChronology(chronology);

    switch (this._ordinal) {
        case DurationFieldType._ERAS:
            return chronology.eras();
        case DurationFieldType._CENTURIES:
            return chronology.centuries();
        case DurationFieldType._WEEKYEARS:
            return chronology.weekyears();
        case DurationFieldType._YEARS:
            return chronology.years();
        case DurationFieldType._MONTHS:
            return chronology.months();
        case DurationFieldType._WEEKS:
            return chronology.weeks();
        case DurationFieldType._DAYS:
            return chronology.days();
        case DurationFieldType._HALFDAYS:
            return chronology.halfdays();
        case DurationFieldType._HOURS:
            return chronology.hours();
        case DurationFieldType._MINUTES:
            return chronology.minutes();
        case DurationFieldType._SECONDS:
            return chronology.seconds();
        case DurationFieldType._MILLIS:
            return chronology.millis();
        default:
            throw new Error("Shouldn't happen.");
    }
};

/**
 * Checks whether this field supported in the given Chronology.
 *
 * @param {Chronology} chronology  the chronology to use, null means ISOChronology in default zone
 * @return {boolean} true if supported
 */
DurationFieldType.prototype.isSupported = function(chronology) {
    return this.getField(chronology).isSupported();
};

/**
 * Get a suitable debug string.
 *
 * @return {String} debug string
 */
DurationFieldType.prototype.toString = function() {
    return this.getName();
};

DurationFieldType._ERAS = 1,
DurationFieldType._CENTURIES = 2,
DurationFieldType._WEEKYEARS = 3,
DurationFieldType._YEARS = 4,
DurationFieldType._MONTHS = 5,
DurationFieldType._WEEKS = 6,
DurationFieldType._DAYS = 7,
DurationFieldType._HALFDAYS = 8,
DurationFieldType._HOURS = 9,
DurationFieldType._MINUTES = 10,
DurationFieldType._SECONDS = 11,
DurationFieldType._MILLIS = 12;

/** The eras field type. */
DurationFieldType.ERAS_TYPE = new DurationFieldType("eras", DurationFieldType._ERAS);
/** The centuries field type. */
DurationFieldType.CENTURIES_TYPE = new DurationFieldType("centuries", DurationFieldType._CENTURIES);
/** The weekyears field type. */
DurationFieldType.WEEKYEARS_TYPE = new DurationFieldType("weekyears", DurationFieldType._WEEKYEARS);
/** The years field type. */
DurationFieldType.YEARS_TYPE = new DurationFieldType("years", DurationFieldType._YEARS);
/** The months field type. */
DurationFieldType.MONTHS_TYPE = new DurationFieldType("months", DurationFieldType._MONTHS);
/** The weeks field type. */
DurationFieldType.WEEKS_TYPE = new DurationFieldType("weeks", DurationFieldType._WEEKS);
/** The days field type. */
DurationFieldType.DAYS_TYPE = new DurationFieldType("days", DurationFieldType._DAYS);
/** The halfdays field type. */
DurationFieldType.HALFDAYS_TYPE = new DurationFieldType("halfdays", DurationFieldType._HALFDAYS);
/** The hours field type. */
DurationFieldType.HOURS_TYPE = new DurationFieldType("hours", DurationFieldType._HOURS);
/** The minutes field type. */
DurationFieldType.MINUTES_TYPE = new DurationFieldType("minutes", DurationFieldType._MINUTES);
/** The seconds field type. */
DurationFieldType.SECONDS_TYPE = new DurationFieldType("seconds", DurationFieldType._SECONDS);
/** The millis field type. */
DurationFieldType.MILLIS_TYPE = new DurationFieldType("millis", DurationFieldType._MILLIS);

/**
 * Get the millis field type.
 *
 * @return {DurationFieldType} the DateTimeFieldType constant
 */
DurationFieldType.millis = function() {
    return DurationFieldType.MILLIS_TYPE;
};

/**
 * Get the seconds field type.
 *
 * @return {DurationFieldType} the DateTimeFieldType constant
 */
DurationFieldType.seconds = function() {
    return DurationFieldType.SECONDS_TYPE;
};

/**
 * Get the minutes field type.
 *
 * @return {DurationFieldType} the DateTimeFieldType constant
 */
DurationFieldType.minutes = function() {
    return DurationFieldType.MINUTES_TYPE;
};

/**
 * Get the hours field type.
 *
 * @return {DurationFieldType} the DateTimeFieldType constant
 */
DurationFieldType.hours = function() {
    return DurationFieldType.HOURS_TYPE;
};

/**
 * Get the halfdays field type.
 *
 * @return {DurationFieldType} the DateTimeFieldType constant
 */
DurationFieldType.halfdays = function() {
    return DurationFieldType.HALFDAYS_TYPE;
};

/**
 * Get the days field type.
 *
 * @return {DurationFieldType} the DateTimeFieldType constant
 */
DurationFieldType.days = function() {
    return DurationFieldType.DAYS_TYPE;
};

/**
 * Get the weeks field type.
 *
 * @return {DurationFieldType} the DateTimeFieldType constant
 */
DurationFieldType.weeks = function() {
    return DurationFieldType.WEEKS_TYPE;
};

/**
 * Get the weekyears field type.
 *
 * @return {DurationFieldType} the DateTimeFieldType constant
 */
DurationFieldType.weekyears = function() {
    return DurationFieldType.WEEKYEARS_TYPE;
};

/**
 * Get the months field type.
 *
 * @return {DurationFieldType} the DateTimeFieldType constant
 */
DurationFieldType.months = function() {
    return DurationFieldType.MONTHS_TYPE;
};

/**
 * Get the years field type.
 *
 * @return {DurationFieldType} the DateTimeFieldType constant
 */
DurationFieldType.years = function() {
    return DurationFieldType.YEARS_TYPE;
};

/**
 * Get the centuries field type.
 *
 * @return {DurationFieldType} the DateTimeFieldType constant
 */
DurationFieldType.centuries = function() {
    return DurationFieldType.CENTURIES_TYPE;
};

/**
 * Get the eras field type.
 *
 * @return {DurationFieldType} the DateTimeFieldType constant
 */
DurationFieldType.eras = function() {
    return DurationFieldType.ERAS_TYPE;
};
