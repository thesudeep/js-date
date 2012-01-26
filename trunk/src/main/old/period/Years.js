/**
 * Creates years period object.
 *
 * @param {number} quantity number of years
 * @constructor
 * @class Represents years period.
 * @extends Object
 */
Years = function(quantity) {
    this._super(quantity);
};

/**
 * Abstract method with must be overrided in children
 *
 * @param instant
 * @this Period
 * @throws {Error} it is an abstract method.
 */
Years.prototype.duration = function(instant) {
    var years = Chronology.getYearsOfEra(instant);

    var leapYears = Chronology.getLeapYears(year);

    var instant = (year * 365 + (leapYears - Chronology.DAYS_TO_EPOCH)) * Chronology.MILLIS_PER_DAY;

    if (Chronology.isLeapYear(year)) {
        instant += Chronology.MILLIS_PER_REGULAR_YEAR - Chronology.MILLIS_PER_LEAP_YEAR;
    }

    return instant;
};

inherits(Years, Period);
