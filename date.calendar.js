/**
 * The <code>Calendar</code> class is an class that provides methods
 * for converting between a specific instant in time and a set of calendar fields
 * such as <code>YEAR</code>, <code>MONTH</code>, <code>DAY_OF_MONTH</code>,
 * <code>HOUR</code>, and so on, and for manipulating the calendar fields, such
 * as getting the date of the next week. An instant in time can be represented by
 * a millisecond value that is an offset from the <code>Epoch</code>,
 * January 1, 1970 00:00:00.000 GMT (Gregorian).
 *
 * <p>The class also provides additional fields and methods (sugar) to operating
 * it easily.
 */
Calendar = function() {
    var SECOND = 1000;
    var MINUTE = 60 * SECOND;
    var HOUR = 60 * MINUTE;
    var DATE = 24 * HOUR;

    var attributes = initAttrs();
    var functions = initFuncs();

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

    function $$(field, value) {
        if (arguments.length == 0) {
            return attributes;
        } else if (arguments.length == 1) {
            return attributes[field];
        } else {
            value = functions[field].converter.call(_self, value);

            attributes[field] = value;

            functions[field].normalizer.call(_self, value);

            return _self;
        }
    }

    function initAttrs() {
        var a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        a[Calendar.ERA] = 1;
        a[Calendar.YEAR] = 1970;

        return a;
    }

    function initFuncs() {
        function assertTrue(condition, message) {
            if (!condition) {
                throw new Error(message);
            }
        }

        function convertEra(era) {
            era = convertInt(era);

            assertTrue(era === -1 || era === 1, "Era should have value -1 or 1");

            return era;
        }

        function convertAmPm(amPm) {
            amPm = convertInt(amPm);

            assertTrue(amPm == 0 || amPm == 1, "AM/PM should have value 0 or 1");

            return amPm;
        }

        function convertInt(i) {
            var j = parseInt(i);

            assertTrue(!isNaN(j), "Invalid number '" + i + "'.");

            return j;
        }

        function normalizeEra(i) {
            data.year += i;

            return i != 0;
        }

        function normalizeYear(i) {
            data.year += i;

            return i != 0;
        }


        var a = [];

        a[Calendar.ERA] = {converter: convertEra, normalizer: normalizeEra};
        a[Calendar.YEAR] = {converter: convertInt, normalizer: normalizeEra};
        a[Calendar.MONTH] = {converter: convertInt, normalizer: normalizeEra};

        a[Calendar.WEEK_OF_YEAR] = {converter: convertInt, normalizer: normalizeEra};
        a[Calendar.WEEK_OF_MONTH] = {converter: convertInt, normalizer: normalizeEra};
        a[Calendar.DATE] = {converter: convertInt, normalizer: normalizeEra};
        a[Calendar.DAY_OF_MONTH] = {converter: convertInt, normalizer: normalizeEra};
        a[Calendar.DAY_OF_YEAR] = {converter: convertInt, normalizer: normalizeEra};
        a[Calendar.DAY_OF_WEEK] = {converter: convertInt, normalizer: normalizeEra};
        a[Calendar.AM_PM] = {converter: convertAmPm, normalizer: normalizeEra};
        a[Calendar.HOUR] = {converter: convertInt, normalizer: normalizeEra};
        a[Calendar.HOUR_OF_DAY] = {converter: convertInt, normalizer: normalizeEra};
        a[Calendar.MINUTE] = {converter: convertInt, normalizer: normalizeEra};
        a[Calendar.SECOND] = {converter: convertInt, normalizer: normalizeEra};
        a[Calendar.MILLISECOND] = {converter: convertInt, normalizer: normalizeEra};
        a[Calendar.ZONE_OFFSET] = {converter: convertInt, normalizer: normalizeEra};
        a[Calendar.DST_OFFSET] = {converter: convertInt, normalizer: normalizeEra};

        return a;
    }

    function quotRem(value, modificator) {
        var rem = (modificator + (value % modificator)) % modificator;

        return {
            rem: rem,
            quot: Math.floor((value - rem) / modificator)
        };
    }

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
    this.field = function(field, value) {
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

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * era, e.g., AD or BC in the Julian calendar.
 */
Calendar.ERA = 0;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * year.
 */
Calendar.YEAR = 1;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * month. The first month of the year in the Gregorian and Julian calendars is
 * <code>JANUARY</code> which is 0.
 */
Calendar.MONTH = 2;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * week number within the current year. The first week of the year has value 1.
 */
Calendar.WEEK_OF_YEAR = 3;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * week number within the current month. The first week of the month has value 1.
 */
Calendar.WEEK_OF_MONTH = 4;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * day of the month. This is a synonym for <code>DAY_OF_MONTH</code>.
 * The first day of the month has value 1.
 *
 * @see #DAY_OF_MONTH
 */
Calendar.DATE = 5;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * day of the month. This is a synonym for <code>DATE</code>.
 * The first day of the month has value 1.
 *
 * @see #DATE
 */
Calendar.DAY_OF_MONTH = 5;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the day
 * number within the current year.  The first day of the year has value 1.
 */
Calendar.DAY_OF_YEAR = 6;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the day
 * of the week.
 */
Calendar.DAY_OF_WEEK = 7;

/**
 * Field number for <code>get</code> and <code>set</code> indicating
 * whether the <code>HOUR</code> is before or after noon.
 * E.g., at 10:04:15.250 PM the <code>AM_PM</code> is <code>PM</code>.
 *
 * @see #HOUR
 */
Calendar.AM_PM = 8;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * hour of the morning or afternoon. <code>HOUR</code> is used for the
 * 12-hour clock (0 - 11). Noon and midnight are represented by 0, not by 12.
 * E.g., at 10:04:15.250 PM the <code>HOUR</code> is 10.
 *
 * @see #AM_PM
 * @see #HOUR_OF_DAY
 */
Calendar.HOUR = 9;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * hour of the day. <code>HOUR_OF_DAY</code> is used for the 24-hour clock.
 * E.g., at 10:04:15.250 PM the <code>HOUR_OF_DAY</code> is 22.
 *
 * @see #HOUR
 */
Calendar.HOUR_OF_DAY = 10;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * minute within the hour.
 * E.g., at 10:04:15.250 PM the <code>MINUTE</code> is 4.
 */
Calendar.MINUTE = 11;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * second within the minute.
 * E.g., at 10:04:15.250 PM the <code>SECOND</code> is 15.
 */
Calendar.SECOND = 12;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * millisecond within the second.
 * E.g., at 10:04:15.250 PM the <code>MILLISECOND</code> is 250.
 */
Calendar.MILLISECOND = 13;

/**
 * Field number for <code>get</code> and <code>set</code>
 * indicating the raw offset from GMT in milliseconds.
 * <p>
 * This field reflects the correct GMT offset value of the time
 * zone of this <code>Calendar</code> if the
 * <code>TimeZone</code> implementation subclass supports
 * historical GMT offset changes.
 */
Calendar.ZONE_OFFSET = 14;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * daylight savings offset in milliseconds.
 * <p>
 * This field reflects the correct daylight saving offset value of
 * the time zone of this <code>Calendar</code>.
 */
Calendar.DST_OFFSET = 15;
