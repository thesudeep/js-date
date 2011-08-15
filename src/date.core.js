DateTime = function() {
    var self = this;
    var calendar = new DateTime.Calendar();
    var utcCalendar = new DateTime.Calendar(0, Date.TimeZone.UTC);

    function utc() {
        utcCalendar.time(calendar);

        return utcCalendar;
    }

    if (arguments.length === 1) {
        try {
            calendar.time(Date.Util.validateInt(arguments[0]));
        } catch (e) {
            calendar.time(DateTime._Date.parse(arguments[0]).getTime());
        }
    } else if (arguments.length > 1) {
        calendar.year(arguments[0] <= 0 ? arguments[0] - 1 : arguments[0]);
        calendar.month(arguments.length >= 2 ? arguments[1] + DateTime.Field.Month.MIN_MONTH : DateTime.Field.Month.MIN_MONTH);
        calendar.date(arguments.length >= 3 ? arguments[2] : DateTime.Field.Date.MIN_DATE);
        calendar.hour(arguments.length >= 4 ? arguments[3] : DateTime.Field.Hour.MIN_HOUR);
        calendar.minute(arguments.length >= 5 ? arguments[4] : DateTime.Field.Minute.MIN_MINUTE);
        calendar.second(arguments.length >= 6 ? arguments[5] : DateTime.Field.Second.MIN_SECOND);
        calendar.mills(arguments.length >= 7 ? arguments[6] : DateTime.Field.Millisecond.MIN_MILLS);
    }

    this.calendar = function() {
        return new DateTime.Calendar(calendar.time());
    };

    /** Returns the year (four digits) */
    this.getFullYear = function () {
        return calendar.year();
    };

    /**
     * Returns the year (four digits)
     *
     * @deprecated use the getFullYear() method instead
     */
    this.getYear = function () {
        return self.getFullYear();
    };

    /** Returns the month (from 0-11) */
    this.getMonth = function () {
        return calendar.month() - DateTime.Field.Month.MIN_MONTH;
    };

    /** Returns the day of the month (from 1-31) */
    this.getDate = function () {
        return calendar.date();
    };

    /** Returns the day of the week (from 0-6) */
    this.getDay = function () {
        return calendar.day() % DateTime.Field.Day.MAX_DAY;
    };

    /** Returns the hour (from 0-23) */
    this.getHours = function () {
        return calendar.hour();
    };

    /** Returns the minutes (from 0-59) */
    this.getMinutes = function () {
        return calendar.minute();
    };

    /** Returns the seconds (from 0-59) */
    this.getSeconds = function () {
        return calendar.second();
    };

    /** Returns the milliseconds (from 0-999) */
    this.getMilliseconds = function () {
        return calendar.mills();
    };

    /** Returns the number of milliseconds since midnight Jan 1, 1970 */
    this.getTime = function () {
        return calendar.time();
    };

    /** Sets the year (four digits) */
    this.setFullYear = function (year, month, date) {
        calendar.year(year);
        month !== undefined && calendar.month(month + DateTime.Field.Month.MIN_MONTH);
        date !== undefined && calendar.date(date);
    };

    /**
     * Sets the year (four digits)
     *
     * @deprecated use the setFullYear() method instead
     */
    this.setYear = function (year) {
        self.setFullYear(year);
    };

    /** Sets the month (from 0-11) */
    this.setMonth = function (month, date) {
        calendar.month(month + DateTime.Field.Month.MIN_MONTH);
        date && calendar.date(date);
    };

    /** Sets the day of the month (from 1-31) */
    this.setDate = function (date) {
        calendar.date(date);
    };

    /** Sets the hour (from 0-23) */
    this.setHours = function (hour, min, sec, mills) {
        calendar.hour(hour);
        min !== undefined && calendar.minute(min);
        sec !== undefined && calendar.second(sec);
        mills !== undefined && calendar.mills(mills);
    };

    /** Set the minutes (from 0-59) */
    this.setMinutes = function (min, sec, mills) {
        calendar.minute(min);
        sec !== undefined && calendar.second(sec);
        mills !== undefined && calendar.mills(mills);
    };

    /** Sets the seconds (from 0-59) */
    this.setSeconds = function (sec, mills) {
        calendar.second(sec);
        mills !== undefined && calendar.mills(mills);
    };

    /** Sets the milliseconds (from 0-999) */
    this.setMilliseconds = function (mills) {
        calendar.mills(mills);
    };

    /** Returns the number of milliseconds since midnight Jan 1, 1970 */
    this.setTime = function (time) {
        calendar.time(time);
    };

    /** Returns the time difference between GMT and local time, in minutes */
    this.getTimezoneOffset = function () {
        return calendar.timeZone().offset();
    };

    /** Returns the day of the month, according to universal time (from 1-31) */
    this.getUTCDate = function() {
        return utc().date();
    };

    /** Returns the day of the week, according to universal time (from 0-6) */
    this.getUTCDay = function() {
        return utc().day() % DateTime.Field.Day.MAX_DAY;
    };

    /** Returns the year, according to universal time (four digits) */
    this.getUTCFullYear = function() {
        return utc().year();
    };

    /** Returns the hour, according to universal time (from 0-23) */
    this.getUTCHours = function() {
        return utc().hour();
    };

    /** Returns the milliseconds, according to universal time (from 0-999) */
    this.getUTCMilliseconds = function() {
        return utc().mills();
    };

    /** Returns the minutes, according to universal time (from 0-59) */
    this.getUTCMinutes = function() {
        return utc().minute();
    };

    /** Returns the month, according to universal time (from 0-11) */
    this.getUTCMonth = function() {
        return utc().month();
    };

    /** Returns the seconds, according to universal time (from 0-59) */
    this.getUTCSeconds = function() {
        return utc().second();
    };

    /** Sets the day of the month, according to universal time (from 1-31) */
    this.setUTCDate = function(date) {
        calendar.time(utc().date(date).time());
    };

    /** Sets the year, according to universal time (four digits) */
    this.setUTCFullYear = function(year, month, date) {
        var u = utcCalendar.time(calendar.time());

        u.year(year);
        month !== undefined && u.month(month);
        date !== undefined && u.date(date);

        calendar.time(u.time());
    };

    /** Sets the hour, according to universal time (from 0-23) */
    this.setUTCHours = function(hour, min, sec, ms) {
        var u = utcCalendar.time(calendar.time());

        u.hour(hour);
        min !== undefined && u.minute(min);
        sec !== undefined && u.second(sec);
        ms !== undefined && u.mills(ms);

        calendar.time(u.time());
    };

    /** Sets the milliseconds, according to universal time (from 0-999) */
    this.setUTCMilliseconds = function(ms) {
        var u = utcCalendar.time(calendar.time());

        u.mills(ms);

        calendar.time(u.time());
    };

    /** Set the minutes, according to universal time (from 0-59) */
    this.setUTCMinutes = function(min, sec, ms) {
        var u = utcCalendar.time(calendar.time());

        u.minute(min);
        sec !== undefined && u.second(sec);
        ms !== undefined && u.mills(ms);

        calendar.time(u.time());
    };

    /** Sets the month, according to universal time (from 0-11) */
    this.setUTCMonth = function(month, date) {
        var u = utcCalendar.time(calendar.time());

        u.month(month);
        date !== undefined && u.date(date);

        calendar.time(u.time());
    };

    /** Set the seconds, according to universal time (from 0-59) */
    this.setUTCSeconds = function(sec, ms) {
        var u = utcCalendar.time(calendar.time());

        u.second(sec);
        ms !== undefined && u.mills(ms);

        calendar.time(u.time());
    };

    /**
     *  <p> The valueOf() method returns the primitive value of a Date object. </p>
     *  <p> Note: The primitive value is returned as the number of millisecond since midnight January 1, 1970 (same as getTime())! </p>
     *  <p> Note: This method is usually called automatically by JavaScript behind the scenes, and not explicitly in code. </p>
     */
    this.valueOf = function() {
        return calendar.time();
    };

    /**
     *  <p> The valueOf() method returns the primitive value of a Date object. </p>
     *  <p> Note: The primitive value is returned as the number of millisecond since midnight January 1, 1970 (same as getTime())! </p>
     *  <p> Note: This method is usually called automatically by JavaScript behind the scenes, and not explicitly in code. </p>
     */
    this.equals = function(o) {
        return o instanceof DateTime && o.valueOf() === self.valueOf();
    };

    /**
     * Converts a Date object to a string, according to universal time.
     *
     * @deprecated use the toUTCString() method instead
     */
    this.toGMTString = function() {
        return self.toUTCString();
    };

    /** Returns the date portion of a Date object as a string, using locale conventions */
    this.toLocaleDateString = function() {
        return self.toString("yyyy-MM-dd");
    };

    /** Returns the time portion of a Date object as a string, using locale conventions */
    this.toLocaleTimeString = function() {
        return self.toString("HH:mm:ss");
    };

    /** Converts the date portion of a Date object into a readable string */
    this.toDateString = function() {
        return self.toString("yyyy-MM-dd");
    };

    /** Converts a Date object to a string, using locale conventions */
    this.toLocaleString = function() {
        return self.toString("yyyy-MM-ddTHH:mm:ss");
    };

    /** Converts the time portion of a Date object to a string */
    this.toTimeString = function() {
        return self.toString("HH:mm:ss");
    };

    /** Converts a Date object to a string, according to universal time */
    this.toUTCString = function() {
        return new DateTime.Formatter("yyyy-MM-ddTHH:mm:ss").format(utc());
    };

    /** Converts a Date object to a string */
    this.toString = function(pattern) {
        pattern = DateTime.Util.exists(pattern, "yyyy-MM-ddTHH:mm:ss Z");

        return new DateTime.Formatter(pattern).format(calendar);
    };

    for (var m in calendar) {
        if (typeof(calendar[m]) === "function" && this[m] === undefined) {
            this[m] = (function(methodName) {
                return function() {
                    calendar[methodName].apply(calendar, arguments);

                    return self;
                }
            })(m);
        }
    }
};

DateTime._init_ = function() {
    DateTime._Date = Date;

    return DateTime;
};

DateTime.currentTimeMillis = function() {
    return new DateTime._Date().getTime();
};

Date = DateTime._init_();
//DateTime.UTC = function(year, month, date, hours, seconds, mills) {
//
//};
//
//DateTime.parse = function(dateString) {
//
//};