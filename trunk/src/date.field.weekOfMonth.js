DateTime.Field.WeekOfMonth = function(calendar) {
    var
            firstDay = 0,
            start = 0,
            self = this;

    this._delta = 0;
    this._val = 0;

    this.duration = function() {
        return DateTime.MILLIS_PER_WEEK;
    };

    function adjustDelta() {
        var _start = calendar.year().millis() + calendar.month().millis();

        if (firstDay !== calendar.firstDay() || start !== _start) {
            firstDay = calendar.firstDay();
            start = _start;

            self._delta = DateTime.Field.Day.dayToMillis(DateTime.Field.Day.millisToDay(start) - firstDay);
        }

        return self._delta;
    }

    this.millis = function(value) {
        if (arguments.length === 0) {
            return (self._val - DateTime.Field.WeekOfMonth.MIN_WEEK) * DateTime.MILLIS_PER_WEEK - adjustDelta();
        }

        value = DateTime.validateInt(value);

        calendar.year().millis(value);
        calendar.month().millis(value);

        self._val = DateTime.Field.WeekOfMonth.MIN_WEEK + DateTime.quotRem(DateTime.quotRem(adjustDelta() + value - start, DateTime.MILLIS_PER_DAY).quot, DateTime.DAYS_PER_WEEK).quot;

        return self;
    };

    this.value = function(week) {
        if (arguments.length === 0) {
            return self._val;
        }

        if (week !== DateTime.Field.WeekOfMonth.LAST_WEEK) {
            week = DateTime.validateInt(week);
        }

        var max = DateTime.quotRem(calendar.month().duration() + adjustDelta(), DateTime.MILLIS_PER_WEEK);

        if (max.rem !== 0) {
            max.quot++;
        }

        if (week === DateTime.Field.WeekOfMonth.LAST_WEEK) {
            week = max.quot;
        }

        DateTime.assertTrue(week >= DateTime.Field.WeekOfMonth.MIN_WEEK && week <= max.quot,
                "Week of month is expected to be in range [" + DateTime.Field.WeekOfMonth.MIN_WEEK + ".." + max.quot + "] but was: " + week);

        self._val = week;

        return self;
    };
};

DateTime.Field.WeekOfMonth.MIN_WEEK = 1;
DateTime.Field.WeekOfMonth.MAX_WEEK = 6;

DateTime.Field.WeekOfMonth.FIRST_WEEK = DateTime.Field.WeekOfMonth.MIN_WEEK;
DateTime.Field.WeekOfMonth.SECOND_WEEK = DateTime.Field.WeekOfMonth.FIRST_WEEK + 1;
DateTime.Field.WeekOfMonth.THIRD_WEEK = DateTime.Field.WeekOfMonth.SECOND_WEEK + 1;
DateTime.Field.WeekOfMonth.FOURTH_WEEK = DateTime.Field.WeekOfMonth.THIRD_WEEK + 1;
DateTime.Field.WeekOfMonth.FIFTH_WEEK = DateTime.Field.WeekOfMonth.FOURTH_WEEK + 1;
DateTime.Field.WeekOfMonth.LAST_WEEK = Number.MAX_VALUE;