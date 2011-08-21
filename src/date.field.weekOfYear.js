DateTime.Field.WeekOfYear = function(calendar) {
    var
            firstDay = 0,
            start = 0,
            self = this;

    this._val = 0;
    this._delta = 0;

    this.duration = function() {
        return DateTime.MILLIS_PER_WEEK;
    };

    function adjustDelta() {
        var _start = calendar.withYear().millis();

        if (firstDay !== calendar.withFirstWeekDay() || start !== _start) {
            firstDay = calendar.withFirstWeekDay();
            start = _start;

            self._delta = DateTime.Field.DaysOfWeek.dayToMillis(DateTime.Field.DaysOfWeek.millisToDay(start) - firstDay);
        }

        return self._delta;
    }

    this.millis = function(value) {
        if (arguments.length === 0) {
            return (self._val - DateTime.Field.WeekOfYear.MIN_WEEK) * DateTime.MILLIS_PER_WEEK - adjustDelta();
        }

        value = DateTime.validateInt(value);

        calendar.withYear().millis(value);

        self._val = DateTime.Field.WeekOfYear.MIN_WEEK + DateTime.quotRem(DateTime.quotRem(adjustDelta() + value - start, DateTime.MILLIS_PER_DAY).quot, DateTime.DAYS_PER_WEEK).quot;

        return self;
    };

    this.value = function(week) {
        if (arguments.length === 0) {
            return self._val;
        }

        if (week !== DateTime.Field.WeekOfYear.LAST_WEEK) {
            week = DateTime.validateInt(week);
        }

        adjustDelta();

        var max = calendar.withYear().isLeap() && self._delta === (DateTime.MILLIS_PER_WEEK - DateTime.MILLIS_PER_DAY)
                ? DateTime.Field.WeekOfYear.MAX_WEEK
                : DateTime.Field.WeekOfYear.MAX_WEEK - 1;

        if (week === DateTime.Field.WeekOfYear.LAST_WEEK) {
            week = max;
        }

        DateTime.assertTrue(week >= DateTime.Field.WeekOfYear.MIN_WEEK && week <= max,
                "Week of year is expected to be in range [" + DateTime.Field.WeekOfYear.MIN_WEEK + ".." + max + "] but was: " + week);

        self._val = week;

        return self;
    };
};

DateTime.Field.WeekOfYear.MIN_WEEK = 1;
DateTime.Field.WeekOfYear.MAX_WEEK = 54;

DateTime.Field.WeekOfYear.FIRST_WEEK = DateTime.Field.WeekOfYear.MIN_WEEK;
DateTime.Field.WeekOfYear.LAST_WEEK = Number.MAX_VALUE;