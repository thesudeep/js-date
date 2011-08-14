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
Date.Calendar = function(time, timeZone) {
    timeZone = Date.Util.exists(timeZone, Date.TimeZone.UTC);

    function adjust() {
        withOffset = instant + timeZone.offset(instant);

        data.year.mills(withOffset);
        data.month.mills(withOffset);
        data.date.mills(withOffset);
        data.day.mills(withOffset);
        data.hour.mills(withOffset);
        data.minute.mills(withOffset);
        data.second.mills(withOffset);
        data.mills.mills(withOffset);

        data.weekOfYear.mills(withOffset - data.year.mills());
    }

    function _get(name, args, fn) {
        if (args.length == 0) {
            return data[name].value();
        } else {
            fn.call(this, args[0]);

            return self;
        }
    }

    var self = this;

    var withOffset, instant = arguments.length === 0 ? new Date().getTime() : Date.Util.validateInt(time);

    var data = {
        year: new Date.Field.Year(),
        month: new Date.Field.Month(),
        weekOfYear: new Date.Field.Week(),
        weekOfMonth: new Date.Field.WeekOfMonth(),
        date: new Date.Field.Date(),
        day: new Date.Field.Day(),
        hour: new Date.Field.Hour(),
        minute: new Date.Field.Minute(),
        second: new Date.Field.Second(),
        mills: new Date.Field.Millisecond()
    };

    data.month._year = data.year;
    data.date._month = data.month;

    adjust();

    /* -- Interface -- */

    this.year = function (year) {
        return _get("year", arguments, function(value) {
            instant -= data.year.mills();
            data.year.value(value);
            instant += data.year.mills();
        });
    };

    this.month = function (month) {
        return _get("month", arguments, function(value) {
            Date.Util.assertTrue(value !== 0, "Zero month does not exist");

            var years = Date.Util.quotRem(value, Date.Field.Month.MAX_MONTH);

            if (years.quot !== 0) {
                self.year(data.year.value() + years.quot);
            }

            instant -= data.month.mills();
            data.month.value(years.rem + 1, data.year.value());
            instant += data.month.mills();
        });
    };

    this.weekOfYear = function (week) {
        return _get("weekOfYear", arguments, function(value) {
            value = Date.Field.Week.validate(value);

            instant -= data.weekOfYear.mills();
            data.weekOfYear.value(value);
            instant += data.weekOfYear.mills();

            adjust();
        });
    };

    this.weekOfMonth = function (week) {
        return _get("weekOfYear", arguments, function(value) {
            value = Date.Field.WeekOfMonth.validate(value);

            instant -= data.weekOfMonth.mills();
            data.weekOfMonth.value(value);
            instant += data.weekOfMonth.mills();

            adjust();
        });
    };

    this.date = function (date) {
        return _get("date", arguments, function(value) {
            Date.Util.assertTrue(value !== 0, "Zero date does not exist");

            if (value > 0) {
                value--;
            }

            instant += value * Date.Field.MILLS_PER_DAY - data.date.mills();

            adjust();
        });
    };

    this.day = function (day) {
        return _get("day", arguments, function(value) {
            value = Date.Field.Day.validate(value);

            instant -= data.day.mills();
            data.day.value(value);
            instant += data.day.mills();

            adjust();
        });
    };

    this.hour = function (hour) {
        return _get("hour", arguments, function(value) {
            instant += value * Date.Field.MILLS_PER_HOUR - data.hour.mills();

            adjust();
        });
    };

    this.minute = function (minute) {
        return _get("minute", arguments, function(value) {
            instant += value * Date.Field.MILLS_PER_MINUTE - data.minute.mills();

            adjust();
        });
    };

    this.second = function (second) {
        return _get("second", arguments, function(value) {
            instant += value * Date.Field.MILLS_PER_SECOND - data.second.mills();

            adjust();
        });
    };

    this.mills = function (mills) {
        return _get("mills", arguments, function(value) {
            instant += value - data.mills.mills();

            adjust();
        });
    };

    this.timeZone = function (tz) {
        if (!Date.Util.exists(tz)) {
            return timeZone;
        }

        Date.Util.assertTrue(timeZone instanceof Date.TimeZone, "TimeZone should be an instance of Date.TimeZone class");

        timeZone = tz;

        adjust();

        return self;
    };

    this.time = function (value) {
        if (arguments.length == 0) {
            return instant;
        } else {
            value = Date.Util.validateInt(value);

            data.year.mills(value);
            data.month.mills(value);
            data.date.mills(value);
            data.hour.mills(value);
            data.minute.mills(value);
            data.second.mills(value);
            data.mills.mills(value);
        }
    };

    this.toString = function() {
        return "{" + instant + ": " + data.year.value() + "-" + data.month.value() + "-" + data.date.value() + "-" + data.hour.value() + "-" + data.minute.value() + "-" + data.second.value() + "-" + data.mills.value() + "}"
    };
};

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * era, e.g., AD or BC in the Julian calendar.
 */
Date.Calendar.ERA = 0;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * year.
 */
Date.Calendar.YEAR = 1;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * month. The first month of the year in the Gregorian and Julian calendars is
 * <code>JANUARY</code> which is 0.
 */
Date.Calendar.MONTH = 2;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * week number within the current year. The first week of the year has value 1.
 */
Date.Calendar.WEEK_OF_YEAR = 3;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * week number within the current month. The first week of the month has value 1.
 */
Date.Calendar.WEEK_OF_MONTH = 4;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * day of the month. This is a synonym for <code>DAY_OF_MONTH</code>.
 * The first day of the month has value 1.
 *
 * @see #DAY_OF_MONTH
 */
Date.Calendar.DATE = 5;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * day of the month. This is a synonym for <code>DATE</code>.
 * The first day of the month has value 1.
 *
 * @see #DATE
 */
Date.Calendar.DAY_OF_MONTH = 5;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the day
 * number within the current year.  The first day of the year has value 1.
 */
Date.Calendar.DAY_OF_YEAR = 6;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the day
 * of the week.
 */
Date.Calendar.DAY_OF_WEEK = 7;

/**
 * Field number for <code>get</code> and <code>set</code> indicating
 * whether the <code>HOUR</code> is before or after noon.
 * E.g., at 10:04:15.250 PM the <code>AM_PM</code> is <code>PM</code>.
 *
 * @see #HOUR
 */
Date.Calendar.AM_PM = 8;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * hour of the morning or afternoon. <code>HOUR</code> is used for the
 * 12-hour clock (0 - 11). Noon and midnight are represented by 0, not by 12.
 * E.g., at 10:04:15.250 PM the <code>HOUR</code> is 10.
 *
 * @see #AM_PM
 * @see #HOUR_OF_DAY
 */
Date.Calendar.HOUR = 9;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * hour of the day. <code>HOUR_OF_DAY</code> is used for the 24-hour clock.
 * E.g., at 10:04:15.250 PM the <code>HOUR_OF_DAY</code> is 22.
 *
 * @see #HOUR
 */
Date.Calendar.HOUR_OF_DAY = 10;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * minute within the hour.
 * E.g., at 10:04:15.250 PM the <code>MINUTE</code> is 4.
 */
Date.Calendar.MINUTE = 11;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * second within the minute.
 * E.g., at 10:04:15.250 PM the <code>SECOND</code> is 15.
 */
Date.Calendar.SECOND = 12;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * millisecond within the second.
 * E.g., at 10:04:15.250 PM the <code>MILLISECOND</code> is 250.
 */
Date.Calendar.MILLISECOND = 13;

/**
 * Field number for <code>get</code> and <code>set</code>
 * indicating the raw offset from GMT in milliseconds.
 * <p>
 * This field reflects the correct GMT offset value of the time
 * zone of this <code>Calendar</code> if the
 * <code>TimeZone</code> implementation subclass supports
 * historical GMT offset changes.
 */
Date.Calendar.ZONE_OFFSET = 14;

/**
 * Field number for <code>get</code> and <code>set</code> indicating the
 * daylight savings offset in milliseconds.
 * <p>
 * This field reflects the correct daylight saving offset value of
 * the time zone of this <code>Calendar</code>.
 */
Date.Calendar.DST_OFFSET = 15;
