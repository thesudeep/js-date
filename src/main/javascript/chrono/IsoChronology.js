/**
 * Implements a chronology that follows the rules of the ISO8601 standard,
 * which is compatible with Gregorian for all modern dates.
 * When ISO does not define a field, but it can be determined (such as AM/PM)
 * it is included.
 * <p>
 * With the exception of century related fields, ISOChronology is exactly the
 * same as {@link GregorianChronology}. In this chronology, centuries and year
 * of century are zero based. For all years, the century is determined by
 * dropping the last two digits of the year, ignoring sign. The year of century
 * is the value of the last two year digits.
 * <p>
 * ISOChronology is thread-safe and immutable.
 *
 * @author Stephen Colebourne
 * @author Brian S O'Neill
 * @since 1.0
 */

ISOChronology = function (chronology) {
    this._super.constructor(chronology, null);
};

inherits(ISOChronology, AssembledChronology);

(function() {
    /** @type {ISOChronology} */
    var INSTANCE_UTC = new ISOChronology(GregorianChronology.getInstanceUTC());
    /** @type {Object} */
    var CACHE = {};

    /**
     * Gets an instance of the ISOChronology.
     * The time zone of the returned instance is UTC.
     *
     * @return {ISOChronology} a singleton UTC instance of the chronology
     */
    ISOChronology.getInstanceUTC = function() {
        return INSTANCE_UTC;
    }

    /**
     * Gets an instance of the ISOChronology in the given time zone.
     *
     * @param {DateTimeZone=} zone  the time zone to get the chronology in, null is default
     * @return {ISOChronology} a chronology in the specified time zone
     */
    ISOChronology.getInstance = function(zone) {
        if (zone == null) {
            zone = DateTimeZone.getDefault();
        }

        var chrono = CACHE[zone.getID()];

        if (!hasValue(chrono)) {
            chrono = new ISOChronology(ZonedChronology.getInstance(INSTANCE_UTC, zone));

            CACHE[zone.getID()] = chrono;
        }

        return chrono;
    }

    // Conversion
    //-----------------------------------------------------------------------
    /**
     * Gets the Chronology in the UTC time zone.
     *
     * @return {ISOChronology} the chronology in UTC
     */
    ISOChronology.prototype.withUTC = function() {
        return INSTANCE_UTC;
    }

    /**
     * Gets the Chronology in a specific time zone.
     *
     * @param {DateTimeZone=} zone  the zone to get the chronology in, null is default
     * @return {ISOChronology} the chronology
     */
    ISOChronology.prototype.withZone = function(zone) {
        if (zone == null) {
            zone = DateTimeZone.getDefault();
        }

        if (zone === this.getZone()) {
            return this;
        }

        return ISOChronology.getInstance(zone);
    }

    /**
     * Gets a debugging toString.
     *
     * @return {String} a debugging string
     */
    ISOChronology.prototype.toString = function() {
        var str = "ISOChronology";
        var zone = this.getZone();

        if (zone != null) {
            str = str + '[' + zone.getID() + ']';
        }

        return str;
    }

    ISOChronology.prototype._assemble = function(fields) {
        if (this.getBase().getZone() === DateTimeZone.UTC) {
            // Use zero based century and year of century.
            fields.centuryOfEra = new DividedDateTimeField(ISOYearOfEraDateTimeField.INSTANCE, DateTimeFieldType.centuryOfEra(), 100);
            fields.yearOfCentury = new RemainderDateTimeField(fields.centuryOfEra, DateTimeFieldType.yearOfCentury());
            fields.weekyearOfCentury = new RemainderDateTimeField(fields.centuryOfEra, DateTimeFieldType.weekyearOfCentury());

            fields.centuries = fields.centuryOfEra.getDurationField();
        }
    }
})();
