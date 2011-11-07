/**
 * BaseDateTime is an abstract implementation of ReadableDateTime that stores
 * data in <code>long</code> and <code>Chronology</code> fields.
 * <p>
 * This class should generally not be used directly by API users.
 * The {@link ReadableDateTime} interface should be used when different
 * kinds of date/time objects are to be referenced.
 * <p>
 * BaseDateTime subclasses may be mutable and not thread-safe.
 *
 * @author Stephen Colebourne
 * @author Kandarp Shah
 * @author Brian S O'Neill
 * @since 1.0
 * @param {number=} instant
 * @param {DateTimeZone|Chronology} [zc]
 */
BaseDateTime = function(instant, zc) {
    this._super.constructor();

    /** @type {number} */
    this._millis = hasValue(instant) ? instant : DateTimeUtils.currentTimeMillis();
    /** @type {Chronology} */
    this._chronology = hasValue(zc) ? (zc instanceof Chronology ? zc : ISOChronology.getInstance(zc)) : ISOChronology.getInstance();
};

inherits(BaseDateTime, AbstractDateTime);

/**
 * Gets the milliseconds of the datetime instant from the Java epoch
 * of 1970-01-01T00:00:00Z.
 *
 * @return {number} the number of milliseconds since 1970-01-01T00:00:00Z
 */
BaseDateTime.prototype.getMillis = function() {
    return this._millis;
};

/**
 * Gets the chronology of the datetime.
 *
 * @return {Chronology} the Chronology that the datetime is using
 */
BaseDateTime.prototype.getChronology = function() {
    return this._chronology;
};

/**
 * Checks the specified chronology before storing it, potentially altering it.
 * This method must not access any instance variables.
 * <p>
 * This implementation converts nulls to ISOChronology in the default zone.
 *
 * @param {Chronology} chronology  the chronology to use, may be null
 * @return {Chronology} the chronology to store in this datetime, not null
 */
BaseDateTime.prototype._checkChronology = function(chronology) {
    return DateTimeUtils.getChronology(chronology);
};

/**
 * Checks the specified instant before storing it, potentially altering it.
 * This method must not access any instance variables.
 * <p>
 * This implementation simply returns the instant.
 *
 * @param {number} instant  the milliseconds from 1970-01-01T00:00:00Z to round
 * @param {Chronology} chronology  the chronology to use, not null
 * @return {number} the instant to store in this datetime
 */
BaseDateTime.prototype._checkInstant = function(instant, chronology) {
    return instant;
};

/**
 * Sets the milliseconds of the datetime.
 * <p>
 * All changes to the millisecond field occurs via this method.
 * Override and block this method to make a subclass immutable.
 *
 * @param {number} instant  the milliseconds since 1970-01-01T00:00:00Z to set the datetime to
 */
BaseDateTime.prototype._setMillis = function(instant) {
    this._millis = this._checkInstant(instant, this._chronology);
};

/**
 * Sets the chronology of the datetime.
 * <p>
 * All changes to the chronology field occurs via this method.
 * Override and block this method to make a subclass immutable.
 *
 * @param {Chronology} chronology  the chronology to set
 */
BaseDateTime.prototype._setChronology = function(chronology) {
    this._chronology = this._checkChronology(chronology);
};
