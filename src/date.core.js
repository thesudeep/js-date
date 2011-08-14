Date.prototype.calendar = function(timeZone) {
    if (this._calendar === undefined) {
        this._calendar = new Date.Calendar();
    }

    if (timeZone !== undefined) {
        this._calendar.timeZone(timeZone);
    }

    if (this._time === undefined || this._time !== this.getTime()) {
        this._time = this.getTime();
        this._calendar.time(this._time)
    }

    return this._calendar;
};

/** Returns the year (four digits) */
Date.prototype.getFullYear = function () {
    return this.calendar().year();
};

/**
 * Returns the year (four digits)
 *
 * @deprecated use the getFullYear() method instead
 */
Date.prototype.getYear = function () {
    return this.getFullYear();
};

/** Returns the month (from 0-11) */
Date.prototype.getMonth = function () {
    return this.calendar().month();
};

/** Returns the day of the month (from 1-31) */
Date.prototype.getDate = function () {
    return this.calendar().date();
};

/** Returns the day of the week (from 0-6) */
Date.prototype.getDay = function () {
    return this.calendar().day();
};

/** Returns the hour (from 0-23) */
Date.prototype.getHours = function () {
    return this.calendar().hour();
};

/** Returns the minutes (from 0-59) */
Date.prototype.getMinutes = function () {
    return this.calendar().minute();
};

/** Returns the seconds (from 0-59) */
Date.prototype.getSeconds = function () {
    return this.calendar().second();
};

/** Returns the milliseconds (from 0-999) */
Date.prototype.getMilliseconds = function () {
    return this.calendar().mills();
};

/** Sets the year (four digits) */
Date.prototype.setFullYear = function (year, month, date) {
    this.calendar().year(year);
    month && this.calendar().month(month);
    date && this.calendar().date(date);

    this.setTime(this.calendar().time());
    this._time = this.getTime();
};

/**
 * Sets the year (four digits)
 *
 * @deprecated use the setFullYear() method instead
 */
Date.prototype.setYear = function (year) {
    this.setFullYear(year);
};

/** Sets the month (from 0-11) */
Date.prototype.setMonth = function (month, date) {
    this.calendar().month(month);
    date && this.calendar().date(date);

    this.setTime(this.calendar().time());
    this._time = this.getTime();
};

/** Sets the day of the month (from 1-31) */
Date.prototype.setDate = function (date) {
    this.calendar().date(date);

    this.setTime(this.calendar().time());
    this._time = this.getTime();
};

/** Sets the hour (from 0-23) */
Date.prototype.setHours = function (hour, min, sec, mills) {
    this.calendar().hour(hour);
    min && this.calendar().minute(min);
    sec && this.calendar().second(sec);
    mills && this.calendar().mills(mills);

    this.setTime(this.calendar().time());
    this._time = this.getTime();
};

/** Set the minutes (from 0-59) */
Date.prototype.setMinutes = function (min, sec, mills) {
    this.calendar().minute(min);
    sec && this.calendar().second(sec);
    mills && this.calendar().mills(mills);

    this.setTime(this.calendar().time());
    this._time = this.getTime();
};

/** Sets the seconds (from 0-59) */
Date.prototype.setSeconds = function (sec, mills) {
    this.calendar().second(sec);
    mills && this.calendar().mills(mills);

    this.setTime(this.calendar().time());
    this._time = this.getTime();
};

/** Sets the milliseconds (from 0-999) */
Date.prototype.setMilliseconds = function (mills) {
    this.calendar().mills(mills);

    this.setTime(this.calendar().time());
    this._time = this.getTime();
};

/** Returns the time difference between GMT and local time, in minutes */
Date.prototype.getTimezoneOffset = function () {
    return this._calendar.timeZone().offset();
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
    if (!this._utcFormatter) {
        this._utcFormatter = new Date.Formatter("yyyy-MM-dd");
    }

    return this._utcFormatter(this.calendar());
};

/** Returns the time portion of a Date object as a string, using locale conventions */
Date.prototype.toLocaleTimeString = function() {
    if (!this._utcFormatter) {
        this._utcFormatter = new Date.Formatter("HH:mm:ss");
    }

    return this._utcFormatter(this.calendar());
};

/** Converts the date portion of a Date object into a readable string */
Date.prototype.toDateString = function() {
    if (!this._utcFormatter) {
        this._utcFormatter = new Date.Formatter("yyyy-MM-dd");
    }

    return this._utcFormatter(this.calendar());
};

/** Converts a Date object to a string, using locale conventions */
Date.prototype.toLocaleString = function() {
    if (!this._utcFormatter) {
        this._utcFormatter = new Date.Formatter("yyyy-MM-ddTHH:mm:ss");
    }

    return this._utcFormatter(this.calendar());
};

/** Converts the time portion of a Date object to a string */
Date.prototype.toTimeString = function() {
    if (!this._utcFormatter) {
        this._utcFormatter = new Date.Formatter("HH:mm:ss");
    }

    return this._utcFormatter(this.calendar());
};

/** Converts a Date object to a string, according to universal time */
Date.prototype.toUTCString = function() {
    if (!this._utcFormatter) {
        this._utcFormatter = new Date.Formatter("yyyy-MM-ddTHH:mm:ss");
    }

    var tz = this.calendar().timeZone();

    try {
        return this._utcFormatter(this.calendar(Date.TimeZone.UTC));
    } finally {
        this.calendar(tz);
    }
};

/** Converts a Date object to a string */
Date.prototype.toString = function() {
    if (!this._utcFormatter) {
        this._utcFormatter = new Date.Formatter("yyyy-MM-ddTHH:mm:ss Z");
    }

    return this._utcFormatter(this.calendar());
}

//Date.UTC = function(year, month, date, hours, seconds, mills) {
//
//};
//
//Date.parse = function(dateString) {
//
//};