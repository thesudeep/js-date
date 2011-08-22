DateTime = {
    currentTimeMillis: function() {
        return new Date().getTime();
    },
    trail: function(value, count, symbol) {
        symbol = DateTime.exists(symbol, "0");

        var text = "";

        for (var i = 0; i < count; i++) {
            text += symbol;
        }

        text += value;

        return text.substr(text.length - count)
    },
    exists: function(parameter, replacement) {
        var b = parameter !== undefined && parameter !== null;

        if (arguments.length === 2) {
            return b ? parameter : replacement;
        }

        return b;
    },
    quotRem: function(divisor, divider) {
        var rem = divisor % divider;

        if (rem < 0) {
            rem += divider;
        }

        return {
            quot: Math.floor((divisor - rem) / divider),
            rem: rem
        };
    },
    assertTrue: function(condition, message) {
        if (!condition) {
            throw new Error(message);
        }
    },
    validateInt: function(value) {
        var i = parseInt(value, 10);

        DateTime.assertTrue(!isNaN(i) && String(value).match(/^-?\d+$/) && String(i).match(/^-?\d+$/), "Expected integer but was: " + value);

        return i;
    }
};

/** Milliseconds in one second (1000) (ISO) */
DateTime.MILLIS_PER_SECOND = 1000;
/** Seconds in one minute (60) (ISO) */
DateTime.SECONDS_PER_MINUTE = 60;
/** Milliseconds in one minute (ISO) */
DateTime.MILLIS_PER_MINUTE = DateTime.MILLIS_PER_SECOND * DateTime.SECONDS_PER_MINUTE;
/** Minutes in one hour (ISO) */
DateTime.MINUTES_PER_HOUR = 60;
/** Seconds in one hour (ISO) */
DateTime.SECONDS_PER_HOUR = DateTime.SECONDS_PER_MINUTE * DateTime.MINUTES_PER_HOUR;
/** Milliseconds in one hour (ISO) */
DateTime.MILLIS_PER_HOUR = DateTime.MILLIS_PER_MINUTE * DateTime.MINUTES_PER_HOUR;
/** Hours in a typical day (24) (ISO). Due to time zone offset changes, the number of hours per day can vary. */
DateTime.HOURS_PER_DAY = 24;
/** Minutes in a typical day (ISO). Due to time zone offset changes, the number of minutes per day can vary. */
DateTime.MINUTES_PER_DAY = DateTime.MINUTES_PER_HOUR * DateTime.HOURS_PER_DAY;
/** Seconds in a typical day (ISO). Due to time zone offset changes, the number of seconds per day can vary. */
DateTime.SECONDS_PER_DAY = DateTime.SECONDS_PER_HOUR * DateTime.HOURS_PER_DAY;
/** Milliseconds in a typical day (ISO). Due to time zone offset changes, the number of milliseconds per day can vary. */
DateTime.MILLIS_PER_DAY = DateTime.MILLIS_PER_HOUR * DateTime.HOURS_PER_DAY;
/** Days in one week (7) (ISO) */
DateTime.DAYS_PER_WEEK = 7;
/** Hours in a typical week. Due to time zone offset changes, the number of hours per week can vary. */
DateTime.HOURS_PER_WEEK = DateTime.HOURS_PER_DAY * DateTime.DAYS_PER_WEEK;
/** Minutes in a typical week (ISO). Due to time zone offset changes, the number of minutes per week can vary. */
DateTime.MINUTES_PER_WEEK = DateTime.MINUTES_PER_DAY * DateTime.DAYS_PER_WEEK;
/** Seconds in a typical week (ISO). Due to time zone offset changes, the number of seconds per week can vary. */
DateTime.SECONDS_PER_WEEK = DateTime.SECONDS_PER_DAY * DateTime.DAYS_PER_WEEK;
/** Milliseconds in a typical week (ISO). Due to time zone offset changes, the number of milliseconds per week can vary. */
DateTime.MILLIS_PER_WEEK = DateTime.MILLIS_PER_DAY * DateTime.DAYS_PER_WEEK;

Date.prototype.calendar = function(convert, timeZone) {
    timeZone = DateTime.exists(timeZone, DateTime.TimeZone.DEFAULT);

    var time = this.getTime();

    if (convert) {
        time -= timeZone.offset(time) + this.getTimezoneOffset();
    }

    return new DateTime.Calendar(time, timeZone);
};

/**
 * Converts a Date object to a string, according to universal time.
 *
 * @deprecated use the toUTCString() method instead
 */
Date.prototype.toGMTString = function() {
    return this.toUTCString();
};

/** Returns the date portion of a Date object as a string, using locale conventions */
Date.prototype.toLocaleDateString = function() {
    return this.calendar().toString("yyyy-MM-dd");
};

/** Returns the time portion of a Date object as a string, using locale conventions */
Date.prototype.toLocaleTimeString = function() {
    return this.calendar().toString("HH:mm:ss");
};

/** Converts the date portion of a Date object into a readable string */
Date.prototype.toDateString = function() {
    return this.calendar().toString("yyyy-MM-dd");
};

/** Converts a Date object to a string, using locale conventions */
Date.prototype.toLocaleString = function() {
    return this.calendar().toString("yyyy-MM-ddTHH:mm:ss");
};

/** Converts the time portion of a Date object to a string */
Date.prototype.toTimeString = function() {
    return this.calendar().toString("HH:mm:ss");
};

/** Converts a Date object to a string, according to universal time */
Date.prototype.toUTCString = function() {
    return this.calendar(DateTime.TimeZone.UTC).toString("yyyy-MM-ddTHH:mm:ss");
};

/** Converts a Date object to a string */
Date.prototype.toString = function(pattern) {
    pattern = DateTime.exists(pattern, "yyyy-MM-ddTHH:mm:ss Z");

    return this.calendar().toString(pattern);
};