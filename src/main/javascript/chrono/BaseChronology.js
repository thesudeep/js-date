/**
 * BaseChronology provides a skeleton implementation for chronology
 * classes. Many utility methods are defined, but all fields are unsupported.
 * <p>
 * BaseChronology is thread-safe and immutable, and all subclasses must be
 * as well.
 *
 * @author Brian S O'Neill
 * @since 1.0
 * @constructor
 * @extends Chronology
 */
BaseChronology = function () {
    this._super();
};

inherits(BaseChronology, Chronology);

/**
 * Returns a datetime millisecond instant, formed from the given year,
 * month, day, hour, minute, second, and millisecond values. The set of
 * given values must refer to a valid datetime, or else an
 * IllegalArgumentException is thrown.
 * <p>
 * The default implementation calls upon separate DateTimeFields to
 * determine the result. Subclasses are encouraged to provide a more
 * efficient implementation.
 *
 * @param {number=} year year to use
 * @param {number=} monthOfYear month to use
 * @param {number=} dayOfMonth day of month to use
 * @param {number=} hourOfDay hour to use
 * @param {number=} minuteOfHour minute to use
 * @param {number=} secondOfMinute second to use
 * @param {number=} millisOfSecond millisecond to use
 * @return {number} millisecond instant from 1970-01-01T00:00:00Z
 */
BaseChronology.prototype.getDateTimeMillis = function(year, monthOfYear, dayOfMonth, hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond) {
    var instant = 0;

    arguments.length > 0 && (instant = this.year().set(0, year)) &&
            arguments.length > 1 && (instant = this.monthOfYear().set(instant, monthOfYear)) &&
            arguments.length > 2 && (instant = this.dayOfMonth().set(instant, dayOfMonth)) &&
            arguments.length > 3 && (instant = this.hourOfDay().set(instant, hourOfDay)) &&
            arguments.length > 4 && (instant = this.minuteOfHour().set(instant, minuteOfHour)) &&
            arguments.length > 5 && (instant = this.secondOfMinute().set(instant, secondOfMinute)) &&
            arguments.length > 6 && (instant = this.millisOfSecond().set(instant, millisOfSecond));

    return instant;
};

/**
 * Returns a datetime millisecond instant, from from the given instant,
 * hour, minute, second, and millisecond values. The set of given values
 * must refer to a valid datetime, or else an IllegalArgumentException is
 * thrown.
 * <p>
 * The default implementation calls upon separate DateTimeFields to
 * determine the result. Subclasses are encouraged to provide a more
 * efficient implementation.
 *
 * @param {number} instant instant to start from
 * @param {number=} hourOfDay hour to use
 * @param {number=} minuteOfHour minute to use
 * @param {number=} secondOfMinute second to use
 * @param {number=} millisOfSecond millisecond to use
 * @return {number} millisecond instant from 1970-01-01T00:00:00Z
 */
BaseChronology.prototype.getInstantTimeMillis = function(instant, hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond) {
    arguments.length > 0 && (instant = this.hourOfDay().set(instant, hourOfDay)) &&
            arguments.length > 1 && (instant = this.minuteOfHour().set(instant, minuteOfHour)) &&
            arguments.length > 2 && (instant = this.secondOfMinute().set(instant, secondOfMinute)) &&
            arguments.length > 3 && (instant = this.millisOfSecond().set(instant, millisOfSecond));

    return instant;
};

//-----------------------------------------------------------------------
/**
 * Validates whether the fields stored in a partial instant are valid.
 * <p>
 * This implementation uses {@link DateTimeField#getMinimumValue(ReadablePartial, int[])}
 * and {@link DateTimeField#getMaximumValue(ReadablePartial, int[])}.
 *
 * @param {ReadablePartial} partial  the partial instant to validate
 * @param {number[]} values  the values to validate, not null
 * @throws {IllegalFieldValueException} if the instant is invalid
 */
BaseChronology.prototype.validate = function(partial, values) {
    var size = partial.size();

    for (var i = 0; i < size; i++) {
        var value = values[i];
        var field = partial.getField(i);

        var minValue = field.getMinimumValue(partial, values);
        var maxValue = field.getMaximumValue(partial, values);

        if (value < minValue || value > maxValue) {
            throw new IllegalFieldValueException(field.getType(), value, minValue, maxValue);
        }
    }
};

/**
 * Gets the values of a partial from an instant.
 *
 * @param partial  the partial instant to use
 * @param instant  the instant to query
 * @return the values of the partial extracted from the instant
 */
BaseChronology.prototype.get = function(partial, instant) {
    var size = partial.size();
    var values = [];

    for (var i = 0; i < size; i++) {
        values[i] = partial.getFieldType(i).getField(this).get(instant);
    }

    return values;
};

/**
 * Sets the partial into the instant.
 *
 * @param partial  the partial instant to use
 * @param instant  the instant to update
 * @return the updated instant
 */
BaseChronology.prototype.set = function(partial, instant) {
    for (var i = 0, isize = partial.size(); i < isize; i++) {
        instant = partial.getFieldType(i).getField(this).set(instant, partial.getValue(i));
    }

    return instant;
};

//-----------------------------------------------------------------------
/**
 * Gets the values of a period from an interval.
 *
 * @param period  the period instant to use
 * @param startInstant  the start instant of an interval to query
 * @param endInstant  the start instant of an interval to query
 * @return the values of the period extracted from the interval
 */
BaseChronology.prototype.get = function(period, startInstant, endInstant) {
    var size = period.size();
    var values = [];

    if (startInstant != endInstant) {
        for (var i = 0; i < size; i++) {
            var field = period.getFieldType(i).getField(this);
            var value = field.getDifference(endInstant, startInstant);

            startInstant = field.add(startInstant, value);

            values[i] = value;
        }
    }

    return values;
};

/**
 * Gets the values of a period from an interval.
 *
 * @param period  the period instant to use
 * @param duration  the duration to query
 * @return the values of the period extracted from the duration
 */
BaseChronology.prototype.get = function(period, duration) {
    var size = period.size();
    var values = [];

    if (duration != 0) {
        var current = 0;

        for (var i = 0; i < size; i++) {
            var field = period.getFieldType(i).getField(this);

            if (field.isPrecise()) {
                var value = field.getDifference(duration, current);

                current = field.add(current, value);

                values[i] = value;
            }
        }
    }

    return values;
};

/**
 * Adds the period to the instant, specifying the number of times to add.
 *
 * @param period  the period to add, null means add nothing
 * @param instant  the instant to add to
 * @param scalar  the number of times to add
 * @return the updated instant
 */
BaseChronology.prototype.add = function(period, instant, scalar) {
    if (period && scalar !== 0) {
        if (period instanceof ReadablePeriod) {
            for (var i = 0, isize = period.size(); i < isize; i++) {
                var value = period.getValue(i); // use long to allow for multiplication (fits OK)

                if (value != 0) {
                    instant = period.getFieldType(i).getField(this).add(instant, value * scalar);
                }
            }
        } else {
            var add = FieldUtils.safeMultiply(duration, scalar);

            return FieldUtils.safeAdd(instant, add);
        }
    }

    return instant;
};