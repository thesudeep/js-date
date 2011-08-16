DateTime = {
    currentTimeMillis: function() {
        return new Date().getTime();
    },
    exists: function(parameter, replacement) {
        var b = parameter !== undefined && parameter !== null;

        if (arguments.length === 2) {
            return b ? parameter : replacement;
        }

        return b;
    },
    quotRem: function(divisor, divider) {
        var rem = (divider + (divisor % divider)) % divider;

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

Date.prototype.calendar = function(timeZone) {
    timeZone = DateTime.exists(timeZone, DateTime.TimeZone.DEFAULT);

    return new DateTime.Calendar(this.getTime(), timeZone);
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