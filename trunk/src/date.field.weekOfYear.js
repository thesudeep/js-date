DateTime.Field.WeekOfYear = function(calendar) {
    var
            firstDay = 0,
            start = 0,
            self = this;

    this._val = 0;
    this._delta = 0;

    function adjustDelta() {
        var _start = calendar.year().millis();

        if (firstDay !== calendar.firstDay() || start !== _start) {
            firstDay = calendar.firstDay();
            start = _start;

            self._delta = DateTime.Field.Day.dayToMills(DateTime.Field.Day.millisToDay(start) - firstDay);
        }

        return self._delta;
    }

    this.millis = function(value) {
        if (arguments.length === 0) {
            return self._val * DateTime.MILLS_PER_WEEK - adjustDelta();
        }

        value = DateTime.validateInt(value);

        calendar.year().millis(value);

        self._val = DateTime.Field.WeekOfMonth.MIN_WEEK + DateTime.quotRem(DateTime.quotRem(adjustDelta() + value - start, DateTime.MILLS_PER_DAY).quot, DateTime.DAYS_PER_WEEK).quot;

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

        var max = calendar.year().isLeap() && self._delta === (DateTime.MILLS_PER_WEEK - DateTime.MILLS_PER_DAY)
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

    adjustDelta();
    this.millis(calendar.time());
};

DateTime.Field.WeekOfYear.MIN_WEEK = 1;
DateTime.Field.WeekOfYear.MAX_WEEK = 54;

DateTime.Field.WeekOfYear.FIRST_WEEK = DateTime.Field.WeekOfYear.MIN_WEEK;
DateTime.Field.WeekOfYear.LAST_WEEK = Number.MAX_VALUE;