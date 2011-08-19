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
DateTime.Calendar = function(time, timeZone) {
    timeZone = DateTime.exists(timeZone, DateTime.TimeZone.DEFAULT);

    var self = this;
    var calendar;
    var instant = arguments.length === 0 ? DateTime.currentTimeMillis() : DateTime.validateInt(time);

    var firstDay = timeZone.firstDay(instant);

    var fields = {
        year: DateTime.Field.Year,
        month: DateTime.Field.Month,
        date: DateTime.Field.Date,

        hour: DateTime.Field.Hour,
        minute: DateTime.Field.Minute,
        second: DateTime.Field.Second,
        ms: DateTime.Field.Millisecond,

        day: DateTime.Field.Day,
        weekOfMonth: DateTime.Field.WeekOfMonth,
        weekOfYear: DateTime.Field.WeekOfYear
    };

    function BaseCalendar() {
        this.time = function() {
            return instant + timeZone.offset(instant);
        };

        this.firstDay = function() {
            return firstDay;
        };

        for (var name in fields) {
            this[name] = (function(name, Clazz) {
                return function() {
                    var obj = this["_" + name];

                    if (obj === undefined) {
                        obj = (this["_" + name] = new Clazz(this));
                    }

                    return obj;
                };
            })(name, fields[name]);
        }
    }

    function _get(fieldName, args, fn) {
        if (calendar === undefined) {
            calendar = new BaseCalendar();
        }

        var field = calendar[fieldName].call(calendar);

        if (args.length === 0) {
            return field.millis(calendar.time()).value();
        }

        instant -= field.millis();

        var result = arguments.length >= 3 ? fn.call(self, args[0]) : field.value(args[0]);

        if (result) {
            instant += result.millis();
        }

        return self;
    }

    /* -- Interface -- */

    this.firstDay = function(value) {
        if (arguments.length === 0) {
            return firstDay;
        }

        firstDay = DateTime.Field.Day.validate(value);

        return self;
    };

    this.year = function (year) {
        return _get("year", arguments);
    };

    this.month = function (month) {
        return _get("month", arguments, function(value) {
            var years = DateTime.quotRem(value - DateTime.Field.Month.MIN_MONTH, DateTime.Field.Month.MAX_MONTH);

            if (years.quot !== 0) {
                self.year(years.quot += calendar._year.value());
            }

            return calendar._month.value(years.rem + DateTime.Field.Month.MIN_MONTH);
        });
    };

    this.weekOfYear = function (week) {
        return _get("weekOfYear", arguments);
    };

    this.weekOfMonth = function (week) {
        return _get("weekOfMonth", arguments);
    };

    this.plusDate = function(date) {
        self.date(self.date() + DateTime.validateInt(date));

        return self;
    };

    this.date = function (date) {
        return _get("date", arguments, function(value) {
            instant += (value - DateTime.Field.Date.MIN_DATE) * DateTime.MILLS_PER_DAY;
        });
    };

    this.day = function (day) {
        return _get("day", arguments);
    };

    this.hour = function (hour) {
        return _get("hour", arguments, function(value) {
            instant += value * DateTime.MILLS_PER_HOUR;
        });
    };

    this.minute = function (minute) {
        return _get("minute", arguments, function(value) {
            instant += value * DateTime.MILLS_PER_MINUTE;
        });
    };

    this.second = function (second) {
        return _get("second", arguments, function(value) {
            instant += value * DateTime.MILLS_PER_SECOND;
        });
    };

    this.millis = function (millis) {
        return _get("ms", arguments, function(value) {
            instant += value;
        });
    };

    this.clearTime = function() {
	    var time = DateTime.quotRem(instant, DateTime.MILLS_PER_DAY);

        instant -= time.rem;

        return self;
    };

    this.timeZone = function (tz) {
        if (arguments.length === 0) {
            return timeZone;
        }

        DateTime.assertTrue(tz instanceof DateTime.TimeZone, "TimeZone should be an instance of DateTime.TimeZone class");

        timeZone = tz;

        return self;
    };

    this.time = function (value) {
        if (arguments.length == 0) {
            return instant;
        } else {
            instant = DateTime.validateInt(value);
        }

        return self;
    };

    this.toDate = function() {
        return new Date(self.time());
    };

    this.toString = function(pattern) {
        pattern = DateTime.exists(pattern, "yyyy-MM-ddTHH:mm:ss Z");

        return new DateTime.Formatter(pattern).format(self);
    };
};

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * era, e.g., AD or BC in the Julian calendar.
 */
DateTime.Calendar.ERA = 0;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * year.
 */
DateTime.Calendar.YEAR = 1;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * month. The first month of the year in the Gregorian and Julian calendars is
 * <code>JANUARY</code> which is 0.
 */
DateTime.Calendar.MONTH = 2;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * week number within the current year. The first week of the year has value 1.
 */
DateTime.Calendar.WEEK_OF_YEAR = 3;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * week number within the current month. The first week of the month has value 1.
 */
DateTime.Calendar.WEEK_OF_MONTH = 4;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * day of the month. This is a synonym for <code>DAY_OF_MONTH</code>.
 * The first day of the month has value 1.
 *
 * @see #DAY_OF_MONTH
 */
DateTime.Calendar.DATE = 5;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * day of the month. This is a synonym for <code>DATE</code>.
 * The first day of the month has value 1.
 *
 * @see #DATE
 */
DateTime.Calendar.DAY_OF_MONTH = 5;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the day
 * number within the current year.  The first day of the year has value 1.
 */
DateTime.Calendar.DAY_OF_YEAR = 6;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the day
 * of the week.
 */
DateTime.Calendar.DAY_OF_WEEK = 7;

/**
 * Field number for <code>get</code> and <code>set</code> indicating
 * whether the <code>HOUR</code> is before or after noon.
 * E.g., at 10:04:15.250 PM the <code>AM_PM</code> is <code>PM</code>.
 *
 * @see #HOUR
 */
DateTime.Calendar.AM_PM = 8;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * hour of the morning or afternoon. <code>HOUR</code> is used for the
 * 12-hour clock (0 - 11). Noon and midnight are represented by 0, not by 12.
 * E.g., at 10:04:15.250 PM the <code>HOUR</code> is 10.
 *
 * @see #AM_PM
 * @see #HOUR_OF_DAY
 */
DateTime.Calendar.HOUR = 9;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * hour of the day. <code>HOUR_OF_DAY</code> is used for the 24-hour clock.
 * E.g., at 10:04:15.250 PM the <code>HOUR_OF_DAY</code> is 22.
 *
 * @see #HOUR
 */
DateTime.Calendar.HOUR_OF_DAY = 10;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * minute within the hour.
 * E.g., at 10:04:15.250 PM the <code>MINUTE</code> is 4.
 */
DateTime.Calendar.MINUTE = 11;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * second within the minute.
 * E.g., at 10:04:15.250 PM the <code>SECOND</code> is 15.
 */
DateTime.Calendar.SECOND = 12;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * millisecond within the second.
 * E.g., at 10:04:15.250 PM the <code>MILLISECOND</code> is 250.
 */
DateTime.Calendar.MILLISECOND = 13;

/**
 * Field number for <code>get</code> and <code>set</code>
 * indicating the raw offset from GMT in milliseconds.
 * <p>
 * This field reflects the correct GMT offset value of the time
 * zone of this <code>Calendar</code> if the
 * <code>TimeZone</code> implementation subclass supports
 * historical GMT offset changes.
 */
DateTime.Calendar.ZONE_OFFSET = 14;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * daylight savings offset in milliseconds.
 * <p>
 * This field reflects the correct daylight saving offset value of
 * the time zone of this <code>Calendar</code>.
 */
DateTime.Calendar.DST_OFFSET = 15;
