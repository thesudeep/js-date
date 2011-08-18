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
    var data = {};
    var withOffset, instant = arguments.length === 0 ? DateTime.currentTimeMillis() : DateTime.validateInt(time);

    var firstDay = timeZone.firstDay(instant);

    function _get(Field, args, fn) {
        var field = new Field().millis(instant);

        if (args.length === 0) {
            return field.value();
        }

        fn.call(self, args[0]);

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
        return _get(DateTime.Field.Year, arguments, function(value) {
            instant -= year.millis();
            year.value(value);
            instant += year.millis();
        });
    };

    this.month = function (month) {
        return _get(DateTime.Field.Month, arguments, function(value) {
            var years = DateTime.quotRem(value - DateTime.Field.Month.MIN_MONTH, DateTime.Field.Month.MAX_MONTH);

            if (years.quot !== 0) {
                self.year(years.quot += self.year.value());
            }

            instant -= month.millis();
            month.value(years.rem + DateTime.Field.Month.MIN_MONTH, years.quot);
            instant += month.millis();
        });
    };

    this.weekOfYear = function (week) {
        return _get("weekOfYear", arguments, function(value) {
            value = DateTime.Field.WeekOfYear.validate(value);

            instant -= data.weekOfYear.millis();
            data.weekOfYear.value(value);
            instant += data.weekOfYear.millis();

            adjust();
        });
    };

    this.weekOfMonth = function (week) {
        return _get("weekOfMonth", arguments, function(value) {
            value = DateTime.Field.WeekOfMonth.validate(value);

            instant -= data.weekOfMonth.millis();
            data.weekOfMonth.value(value);
            instant += data.weekOfMonth.millis();

            adjust();
        });
    };

    this.plusDate = function(date) {
        self.date(self.date() + DateTime.validateInt(date));

        return self;
    };

    this.date = function (date) {
        return _get("date", arguments, function(value) {
            instant += (value - DateTime.Field.Date.MIN_DATE) * DateTime.MILLS_PER_DAY - data.date.millis();

            adjust();
        });
    };

    this.day = function (day) {
        return _get("day", arguments, function(value) {
            value = DateTime.Field.Day.validate(value);

            instant -= data.day.millis();
            data.day.value(value);
            instant += data.day.millis();

            adjust();
        });
    };

    this.hour = function (hour) {
        return _get("hour", arguments, function(value) {
            instant += value * DateTime.MILLS_PER_HOUR - data.hour.millis();

            adjust();
        });
    };

    this.minute = function (minute) {
        return _get("minute", arguments, function(value) {
            instant += value * DateTime.MILLS_PER_MINUTE - data.minute.millis();

            adjust();
        });
    };

    this.second = function (second) {
        return _get("second", arguments, function(value) {
            instant += value * DateTime.MILLS_PER_SECOND - data.second.millis();

            adjust();
        });
    };

    this.millis = function (millis) {
        return _get("millis", arguments, function(value) {
            instant += value - data.millis.millis();

            adjust();
        });
    };

    this.clearTime = function() {
	    var time = DateTime.quotRem(instant, DateTime.MILLS_PER_DAY);

        instant -= time.rem;

        return self;
    };

    this.timeZone = function (tz) {
        if (!DateTime.exists(tz)) {
            return timeZone;
        }

        DateTime.assertTrue(timeZone instanceof DateTime.TimeZone, "TimeZone should be an instance of DateTime.TimeZone class");

        timeZone = tz;

        adjust();

        return self;
    };

    this.time = function (value) {
        if (arguments.length == 0) {
            return instant;
        } else {
            instant = DateTime.validateInt(value);
        }
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
