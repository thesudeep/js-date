Date.Field.WeekOfMonth = function(week, month, year, firstDay) {
    var self = this;

    this.mills = function(value, month, year) {
        if (arguments.length === 0) {
            return self._val * Date.Field.MILLS_PER_WEEK;
        }

        value = Date.Util.validateInt(value);

        if (arguments === 3) {
            self._month.value(month, year);
        } else {
            self._month.mills(value);
        }

        var start = self._month.mills() + self._month._year.mills();

        self._day.mills(start);

        var delta = Date.Util.quotRem(self._day.value() - Date.Field.Day.FIRST_DAY, Date.Field.MILLS_PER_DAY).rem;

        self._val = Date.Util.quotRem(delta + Date.Util.quotRem(value - start, Date.Field.MILLS_PER_DAY).quot, Date.Field.DAYS_PER_WEEK).quot;

        return self;
    };

    this.value = function(week, month, year) {
        switch (arguments.length) {
            case 0 :
                return self._val + Date.Field.WeekOfMonth.MIN_WEEK;
            case 3 :
                self._month.value(month, year);
                break;
            case 2 :
                self._month.value(month);
                break;

        }

        self._val = Date.Field.WeekOfMonth.validate(week, self._month.value(), self._month._year.value()) - Date.Field.WeekOfMonth.MIN_WEEK;

        return self;
    };

    switch (arguments.length) {
        case 3 :
            this._month = new Date.Field.Month(month, year);
            this._day = new Date.Field.Day().mills(this._month._year.mills() + this._month.mills());
            this.value(week, this._month.value());
            break;
        case 2 :
            this._month = new Date.Field.Month(month);
            this._day = new Date.Field.Day().mills(this._month._year.mills() + this._month.mills());
            this.value(week, this._month.value());
            break;
        case 1 :
            this._month = new Date.Field.Month();
            this._day = new Date.Field.Day().mills(this._month._year.mills() + this._month.mills());
            this.value(week);
            break;
        case 0 :
            this._month = new Date.Field.Month();
            this._day = new Date.Field.Day().mills(this._month._year.mills() + this._month.mills());
            this.mills(new Date().getTime());
            break;
    }
};

Date.Field.WeekOfMonth.MIN_WEEK = 1;
Date.Field.WeekOfMonth.MAX_WEEK = 6;

Date.Field.WeekOfMonth.FIRST_WEEK = Date.Field.WeekOfMonth.MIN_WEEK;
Date.Field.WeekOfMonth.SECOND_WEEK = Date.Field.WeekOfMonth.FIRST_WEEK + 1;
Date.Field.WeekOfMonth.THIRD_WEEK = Date.Field.WeekOfMonth.SECOND_WEEK + 1;
Date.Field.WeekOfMonth.FOURTH_WEEK = Date.Field.WeekOfMonth.THIRD_WEEK + 1;
Date.Field.WeekOfMonth.FIFTH_WEEK = Date.Field.WeekOfMonth.FOURTH_WEEK + 1;
Date.Field.WeekOfMonth.LAST_WEEK = Number.MAX_VALUE;

Date.Field.WeekOfMonth.validate = function(week, month, year, firstDay) {
    if (week !== Date.Field.WeekOfMonth.LAST_WEEK) {
        week = Date.Util.validateInt(week);
    }

    var m;

    switch (arguments.length) {
        case 3:
            m = new Date.Field.Month(month, year);
            break;
        case 2:
            m = new Date.Field.Month(month);
            break;
        default:
            m = new Date.Field.Month();
            break;
    }


    var day = new Date.Field.Day().mills(m.mills() + m._year.mills());
    var delta = Date.Util.quotRem(day.value() - Date.Field.Day.FIRST_DAY, Date.Field.MILLS_PER_DAY).rem;

    var quotRem = Date.Util.quotRem(delta + Date.Util.quotRem(m.duration(), Date.Field.MILLS_PER_DAY).quot, Date.Field.DAYS_PER_WEEK);

    var max = quotRem.quot + (quotRem.rem !== 0 ? Date.Field.WeekOfMonth.MIN_WEEK : 0);

    if (week === Date.Field.WeekOfMonth.LAST_WEEK) {
        week = max;
    } else {
        Date.Util.assertTrue(week >= Date.Field.WeekOfMonth.MIN_WEEK && week <= max,
                "Week of month is expected to be in range [" + Date.Field.WeekOfMonth.MIN_WEEK + ".." + max + "] but was: " + week);
    }

    return week;
};
