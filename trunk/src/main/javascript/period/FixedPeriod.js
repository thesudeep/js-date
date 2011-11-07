/**
 * Creates fixed period which does not depend on time instance.
 *
 * @param {number} quantity number of fixed intervals.
 * @param {number} duration length of s fixed interval in milliseconds.
 * @constructor
 * @class Represents general period.
 * @extends Period
 */
FixedPeriod = function(quantity, duration) {
    this._super(quantity);
    /**
     * @private
     * @type {number}
     */
    this._duration = duration * quantity;
};

/**
 * Returns fixed duration.
 *
 * @param {number} instant not used.
 * @returns {number} fixed duration.
 */
FixedPeriod.prototype.duration = function(instant) {
    return this._duration;
};

/**
 * Represents period in milliseconds.
 *
 * @constructor
 * @extends FixedPeriod
 */
Millis = function(quantity) {
    this._super(quantity, 1);
};

/**
 * Represents period in seconds.
 *
 * @constructor
 * @extends FixedPeriod
 */
Seconds = function(quantity) {
    this._super(quantity, Chronology.MILLIS_PER_SECOND);
};

/**
 * Represents period in minutes.
 *
 * @constructor
 * @extends FixedPeriod
 */
Minutes = function(quantity) {
    this._super(quantity, Chronology.MILLIS_PER_MINUTE);
};

/**
 * Represents period in hours.
 *
 * @constructor
 * @extends FixedPeriod
 */
Hours = function(quantity) {
    this._super(quantity, Chronology.MILLIS_PER_HOUR);
};

inherits(FixedPeriod, Period);

inherits(Millis, FixedPeriod);
inherits(Seconds, FixedPeriod);
inherits(Minutes, FixedPeriod);
inherits(Hours, FixedPeriod);