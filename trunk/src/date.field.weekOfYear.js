DateTime.Field.WeekOfYear = function(calendar) {
    var self = this;

    this._delta = 0;
    this._val = 0;

    this.millis = function(value) {
        if (arguments.length === 0) {
            return self._val * DateTime.MILLS_PER_WEEK - self._delta;
        }

        value = DateTime.validateInt(value);

        var start = calendar.year().millis(value).millis();
        var dayMillis = calendar.day().millis(start).millis();

        self._val = DateTime.quotRem(DateTime.quotRem(dayMillis + value - start, DateTime.MILLS_PER_DAY).quot, DateTime.DAYS_PER_WEEK).quot;
        self._delta = dayMillis;

        return self;
    };

    this.value = function(week) {
        if (arguments.length === 0) {
            return self._val;
        }

        self._val = DateTime.Field.WeekOfYear.validate(week);

        return self;
    };

    this.millis(calendar.time());
};

DateTime.Field.WeekOfYear.MIN_WEEK = 1;
DateTime.Field.WeekOfYear.MAX_WEEK = 54;

DateTime.Field.WeekOfYear.FIRST_WEEK = DateTime.Field.WeekOfYear.MIN_WEEK;
DateTime.Field.WeekOfYear.LAST_WEEK = Number.MAX_VALUE;


DateTime.Field.WeekOfYear.validate = function(week) {
    week = DateTime.validateInt(week);

    DateTime.assertTrue(week >= DateTime.Field.WeekOfMonth.MIN_WEEK && week <= DateTime.Field.WeekOfYear.MAX_WEEK,
            "Week of year is expected to be in range [" + DateTime.Field.WeekOfYear.MIN_WEEK + ".." + DateTime.Field.WeekOfYear.MAX_WEEK + "] but was: " + week);

    return week;
};
