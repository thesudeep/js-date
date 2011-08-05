DateFormat = function(pattern) {
    function trail(value, count) {
        var text = "";

        for (var i = 0; i < count; i++) {
            text += "0";
        }

        text += value;

        return text.substr(text.length - count)
    }

    function era(date) {
        return date.year() < 0 ? "BC" : "AD";
    }

    function year(date, count) {
        return trail(Math.abs(date.year()), count < 4 ? 2 : count);
    }

    function month(date, count) {
        var m = date.month();

        switch (count) {
            case 1 : return m;
            case 2 : return trail(m, 2);
            case 3 : return "Short-" + m;
            default: return "Long-" + m;
        }
    }

    function week(date, count) {
        var m = date.month();

        switch (count) {
            case 1 : return m;
            case 2 : return trail(m, 2);
            case 3 : return "Short-" + m;
            default: return "Long-" + m;
        }
    }

    var format = {
        G: era, // Era designator Text AD
        y: year, // Year Year 1996; 96
        M: month,// Month in year Month July; Jul; 07
        w: ,// Week in year Number 27
        W: ,// Week in month Number 2
        D: ,// Day in year Number 189
        d: ,// Day in month Number 10
        F: ,// Day of week in month Number 2
        E: ,// Day in week Text Tuesday; Tue
        a: ,// Am/pm marker Text PM
        H: ,// Hour in day (0-23) Number 0
        k: ,// Hour in day (1-24) Number 24
        K: ,// Hour in am/pm (0-11) Number 0
        h: ,// Hour in am/pm (1-12) Number 12
        m: ,// Minute in hour Number 30
        s: ,// Second in minute Number 55
        S: ,// Millisecond Number 978
        z: ,// Time zone General time zone Pacific Standard Time; PST; GMT-08:00
        Z: // Time zone RFC 822 time zone -0800
    };
}

/** Creates calendar object with UTC time zone. */
Calendar = function() {
    var SECOND = 1000;
    var MINUTE = 60 * SECOND;
    var HOUR = 60 * MINUTE;
    var DATE = 24 * HOUR;

    var data = {year: 0, month: 0, date: 0, hour: 0, minute: 0, second: 0, mills: 0};
    var normalize = {
        year: _normalizeYear,
        month: _normalizeMonth,
        date: function (i) {
            return _normalizeDate(i - 1)
        },
        hour: function (i) {
            return _normalizeMills(i * HOUR)
        },
        minute: function (i) {
            return _normalizeMills(i * MINUTE)
        },
        second: function (i) {
            return _normalizeMills(i * SECOND)
        },
        mills: _normalizeMills
    };
    var _self = this;
    var _sm = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var _lm = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    function _get(name, args) {
        if (args.length == 0) {
            return data[name];
        } else {
            var value = parseInt(args[0]);

            if (isNaN(value)) {
                throw new Error("Invalid calendar input for (" + name + ") field: " + args[0]);
            }

            data[name] = value;
            normalize[name].call(_self, 0);

            return _self;
        }
    }

    function month(delta) {
        var d = delta == 1 ? 0 : -1;

        return (isLeap() ? _lm : _sm)[(12 + data.month + d) % 12];
    }

    function quotRem(value, modificator) {
        var rem = (modificator + (value % modificator)) % modificator;

        return {
            rem: rem,
            quot: Math.floor((value - rem) / modificator)
        };
    }

    function isLeap() {
        return (data.year % 4) == 0 && ((data.year % 100) != 0 || (data.year % 400) == 0);
    }

    function _day() {
        return quotRem(Math.floor(_self.time() / DATE), 7).rem;
    }

    function _normalizeYear(i) {
        data.year += i;

        return i != 0;
    }

    function _normalizeMonth(i) {
        data.month += i;

        var tmp = Math.floor(data.month / 12);

        _normalizeYear(tmp);

        data.month = (data.month - tmp * 12) % 12;

        return i != 0;
    }

    function _normalizeDate(i) {
        data.date += i;

        var delta = data.date < 0 ? -1 : 1;

        while (data.date < 0 && delta === -1 || data.date >= month(delta) && delta === 1) {
            data.date -= delta * month(delta);
            _normalizeMonth(delta);
        }
    }

    function _normalizeMills(i) {
        data.mills += i;

        var tmp = quotRem(data.mills, 1000);

        data.mills = tmp.rem;
        data.second += tmp.quot;

        tmp = quotRem(data.second, 60);

        data.second = tmp.rem;
        data.minute += tmp.quot;

        tmp = quotRem(data.minute, 60);

        data.minute = tmp.rem;
        data.hour += tmp.quot;

        tmp = quotRem(data.hour, 24);

        data.hour = tmp.rem;
        _normalizeDate(tmp.quot);
    }

    /* -- Interface -- */

    this.year = function (year) {
        return _get("year", arguments);
    };

    this.month = function (month) {
        return _get("month", arguments);
    };

    this.date = function (date) {
        return _get("date", arguments);
    };

    this.hour = function (hour) {
        return _get("hour", arguments);
    };

    this.minute = function (minute) {
        return _get("minute", arguments);
    };

    this.second = function (second) {
        return _get("second", arguments);
    };

    this.mills = function (mills) {
        return _get("mills", arguments);
    };

    this.day = function (day) {
        if (arguments.length == 0) {
            return _day();
        } else {
            var value = parseInt(arguments[0]);

            if (isNaN(value)) {
                throw new Error("Invalid calendar input for (day) field: " + arguments[0]);
            }

            _normalizeDate(_day() - day);

            return _self;
        }
    };

    this.time = function (time) {
        function years() {
            return (data.year - 1970) * 365 + data.year / 4 + data.year / 400 - data.year / 100 - 477 - (isLeap() ? -1 : 0); //492 + 4 - 19 == 477
        }

        function months() {
            var s = 0;
            var m = isLeap() ? _lm : _sm;

            for (var i = 0; i < data.month; i++) {
                s += m[i];
            }

            return s;
        }

        if (arguments.length == 0) {
            return (years() + months() + data.date) * DATE + data.hour * HOUR + data.minute * MINUTE + data.second * SECOND + data.mills;
        } else {
            var value = parseInt(time);

            if (isNaN(value)) {
                throw new Error("Invalid calendar input for (time) field: " + time);
            }

            data = {year: 1970, month: 0, date: 0, hour: 0, minute: 0, second: 0, mills: 0};

            _normalizeMills(value);
        }
    };

    this.toString = function() {

    }

    this.time(new Date().getTime());
};

TimeZone = function (id, name, rules) {
    this.id = id;
    this.name = name;

    function toNumber(value) {
        if (value instanceof Date) {
            return value.getTime();
        } else if (isNaN(parseInt(value))) {
            return 0;
        } else {
            return value;
        }
    }

    function findRule(time) {
        var _time = toNumber(time);

        for (var rule in rules) {
            if (rule && rule.applyDate <= _time && (rule.cancelDate === undefined || rule.cancelDate > _time)) {
                return rule;
            }
        }
    }

    function inDaylightTime(time) {

    }

    function getRawOffset(time) {

    }

    function getDSTOffset(time) {

    }

    this.offset = function(time) {
        return inDaylightTime(time) ? getRawOffset(time) + getDSTOffset(time) : getRawOffset(time);
    };
};

Date.prototype.calendar = function() {
    if (this._calendar === undefined) {
        this._calendar = new Calendar();
    }

    if (this._time === undefined || this._time !== this.getTime()) {
        this._time = this.getTime();
        this._calendar.time(this._time)
    }

    return this._calendar;
}

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
    return 0;
};

/**
 * Converts a Date object to a string, according to universal time.
 *
 * @deprecated use the toUTCString() method instead
 */
Date.prototype.toGMTString = function() {
    var cal = this.calendar();

    return "{" + cal.year() + ", " + (cal.month() + 1) + ", " + (cal.date() + 1) + ", " + cal.hour() + ", " + cal.minute() + ", " + cal.second() + ", " + cal.mills() + "}";
};

/** Returns the date portion of a Date object as a string, using locale conventions */
Date.prototype.toLocaleDateString = function() {
    var cal = this.calendar();

    return "{" + cal.year() + ", " + (cal.month() + 1) + ", " + (cal.date() + 1) + ", " + cal.hour() + ", " + cal.minute() + ", " + cal.second() + ", " + cal.mills() + "}";
};

/** Returns the time portion of a Date object as a string, using locale conventions */
Date.prototype.toLocaleTimeString = function() {
    var cal = this.calendar();

    return "{" + cal.year() + ", " + (cal.month() + 1) + ", " + (cal.date() + 1) + ", " + cal.hour() + ", " + cal.minute() + ", " + cal.second() + ", " + cal.mills() + "}";
};

/** Converts the date portion of a Date object into a readable string */
Date.prototype.toDateString = function() {
    var cal = this.calendar();

    return "{" + cal.year() + ", " + (cal.month() + 1) + ", " + (cal.date() + 1) + ", " + cal.hour() + ", " + cal.minute() + ", " + cal.second() + ", " + cal.mills() + "}";
};

/** Converts a Date object to a string, using locale conventions */
Date.prototype.toLocaleString = function() {
    var cal = this.calendar();

    return "{" + cal.year() + ", " + (cal.month() + 1) + ", " + (cal.date() + 1) + ", " + cal.hour() + ", " + cal.minute() + ", " + cal.second() + ", " + cal.mills() + "}";
};

/** Converts the time portion of a Date object to a string */
Date.prototype.toTimeString = function() {
    var cal = this.calendar();

    return "{" + cal.year() + ", " + (cal.month() + 1) + ", " + (cal.date() + 1) + ", " + cal.hour() + ", " + cal.minute() + ", " + cal.second() + ", " + cal.mills() + "}";
};

/** Converts a Date object to a string, according to universal time */
Date.prototype.toUTCString = function() {
    var cal = this.calendar();

    return "{" + cal.year() + ", " + (cal.month() + 1) + ", " + (cal.date() + 1) + ", " + cal.hour() + ", " + cal.minute() + ", " + cal.second() + ", " + cal.mills() + "}";
};

/** Converts a Date object to a string */
Date.prototype.toString = function() {
    var cal = this.calendar();

    return "{" + cal.year() + ", " + (cal.month() + 1) + ", " + (cal.date() + 1) + ", " + cal.hour() + ", " + cal.minute() + ", " + cal.second() + ", " + cal.mills() + "}";
}

//Date.UTC = function(year, month, date, hours, seconds, mills) {
//
//};
//
//Date.parse = function(dateString) {
//
//};