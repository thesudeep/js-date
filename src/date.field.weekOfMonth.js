DateTime.Field.WeekOfMonth = function(week, month, year, firstDay) {
    var self = this;

    firstDay = DateTime.Field.Day.validate(DateTime.Util.exists(firstDay, DateTime.Field.Day.MIN_DAY));

    this.mills = function(value, month, year) {
        if (arguments.length === 0) {
            return self._val * DateTime.Field.MILLS_PER_WEEK - self._day.mills();
        }

        value = DateTime.Util.validateInt(value);

        if (arguments === 3) {
            self._month.value(month, year);
        } else {
            self._month.mills(value);
        }

        var start = self._month.mills() + self._month._year.mills();

        self._day.mills(start);

        var delta = DateTime.Util.quotRem(self._day.value() - firstDay, DateTime.Field.MILLS_PER_DAY).rem;

        self._val = DateTime.Util.quotRem(delta + DateTime.Util.quotRem(value - start, DateTime.Field.MILLS_PER_DAY).quot, DateTime.Field.DAYS_PER_WEEK).quot;

        return self;
    };

    this.value = function(week, month, year) {
        switch (arguments.length) {
            case 0 :
                return self._val + DateTime.Field.WeekOfMonth.MIN_WEEK;
            case 3 :
                self._month.value(month, year);
                break;
            case 2 :
                self._month.value(month);
                break;

        }

        self._val = DateTime.Field.WeekOfMonth.validate(week, self._month.value(), self._month._year.value()) - DateTime.Field.WeekOfMonth.MIN_WEEK;

        return self;
    };

    switch (arguments.length) {
        case 3 :
            this._month = new DateTime.Field.Month(month, year);
            this._day = new DateTime.Field.Day().mills(this._month._year.mills() + this._month.mills());
            this.value(week, this._month.value());
            break;
        case 2 :
            this._month = new DateTime.Field.Month(month);
            this._day = new DateTime.Field.Day().mills(this._month._year.mills() + this._month.mills());
            this.value(week, this._month.value());
            break;
        case 1 :
            this._month = new DateTime.Field.Month();
            this._day = new DateTime.Field.Day().mills(this._month._year.mills() + this._month.mills());
            this.value(week);
            break;
        case 0 :
            this._month = new DateTime.Field.Month();
            this._day = new DateTime.Field.Day().mills(this._month._year.mills() + this._month.mills());
            this.mills(DateTime.currentTimeMillis());
            break;
    }
};

DateTime.Field.WeekOfMonth.MIN_WEEK = 1;
DateTime.Field.WeekOfMonth.MAX_WEEK = 6;

DateTime.Field.WeekOfMonth.FIRST_WEEK = DateTime.Field.WeekOfMonth.MIN_WEEK;
DateTime.Field.WeekOfMonth.SECOND_WEEK = DateTime.Field.WeekOfMonth.FIRST_WEEK + 1;
DateTime.Field.WeekOfMonth.THIRD_WEEK = DateTime.Field.WeekOfMonth.SECOND_WEEK + 1;
DateTime.Field.WeekOfMonth.FOURTH_WEEK = DateTime.Field.WeekOfMonth.THIRD_WEEK + 1;
DateTime.Field.WeekOfMonth.FIFTH_WEEK = DateTime.Field.WeekOfMonth.FOURTH_WEEK + 1;
DateTime.Field.WeekOfMonth.LAST_WEEK = Number.MAX_VALUE;

DateTime.Field.WeekOfMonth.validate = function(week, month, year, firstDay) {
    if (week !== DateTime.Field.WeekOfMonth.LAST_WEEK) {
        week = DateTime.Util.validateInt(week);
    }

    var m;
    firstDay = DateTime.Field.Day.validate(DateTime.Util.exists(firstDay, DateTime.Field.Day.MIN_DAY));

    switch (arguments.length) {
        case 3:
            m = new DateTime.Field.Month(month, year);
            break;
        case 2:
            m = new DateTime.Field.Month(month);
            break;
        default:
            m = new DateTime.Field.Month();
            break;
    }


    var day = new DateTime.Field.Day().mills(m.mills() + m._year.mills());
    var delta = DateTime.Util.quotRem(day.value() - firstDay, DateTime.Field.MILLS_PER_DAY).rem;

    var quotRem = DateTime.Util.quotRem(delta + DateTime.Util.quotRem(m.duration(), DateTime.Field.MILLS_PER_DAY).quot, DateTime.Field.DAYS_PER_WEEK);

    var max = quotRem.quot + (quotRem.rem !== 0 ? DateTime.Field.WeekOfMonth.MIN_WEEK : 0);

    if (week === DateTime.Field.WeekOfMonth.LAST_WEEK) {
        week = max;
    } else {
        DateTime.Util.assertTrue(week >= DateTime.Field.WeekOfMonth.MIN_WEEK && week <= max,
                "Week of month is expected to be in range [" + DateTime.Field.WeekOfMonth.MIN_WEEK + ".." + max + "] but was: " + week);
    }

    return week;
};
