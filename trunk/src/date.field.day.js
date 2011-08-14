Date.Field.Day = function(day, firstDay) {
    var self = this;

    firstDay = Date.Field.Day.validate(Date.Util.exists(firstDay, Date.Field.Day.MIN_DAY));

    this._val = 0;

    this.mills = function(value) {
        if (!Date.Util.exists(value)) {
            return Date.Util.quotRem(self._val + Date.Field.Day.MIN_DAY - firstDay, Date.Field.DAYS_PER_WEEK).rem * Date.Field.MILLS_PER_DAY;
        }

        value = Date.Util.validateInt(value);

        self._val = Date.Util.quotRem(Date.Field.Day.THURSDAY - Date.Field.Day.MIN_DAY + Date.Util.quotRem(value, Date.Field.MILLS_PER_DAY).quot, Date.Field.DAYS_PER_WEEK).rem;

        return self;
    };

    this.value = function(day) {
        if (!Date.Util.exists(day)) {
            return self._val + Date.Field.Day.MIN_DAY;
        }

        self._val = Date.Field.Day.validate(day) - Date.Field.Day.MIN_DAY;

        return self;
    };

    if (Date.Util.exists(day)) {
        this.value(day);
    } else {
        this.mills(new Date().getTime());
    }
};

/** Constant (1) representing Monday, the first day of the week (ISO) */
Date.Field.Day.MONDAY = 1;
/** Constant (2) representing Tuesday, the second day of the week (ISO) */
Date.Field.Day.TUESDAY = 2;
/** Constant (3) representing Wednesday, the third day of the week (ISO) */
Date.Field.Day.WEDNESDAY = 3;
/** Constant (4) representing Thursday, the fourth day of the week (ISO) */
Date.Field.Day.THURSDAY = 4;
/** Constant (5) representing Friday, the fifth day of the week (ISO) */
Date.Field.Day.FRIDAY = 5;
/** Constant (6) representing Saturday, the sixth day of the week (ISO) */
Date.Field.Day.SATURDAY = 6;
/** Constant (7) representing Sunday, the seventh day of the week (ISO) */
Date.Field.Day.SUNDAY = 7;

Date.Field.Day.MIN_DAY = Date.Field.Day.MONDAY;
Date.Field.Day.MAX_DAY = Date.Field.Day.SUNDAY;

Date.Field.Day.validate = function(day) {
    day = Date.Util.validateInt(day);

    Date.Util.assertTrue(day >= Date.Field.Day.MIN_DAY && day <= Date.Field.Day.MAX_DAY,
            "Day is expected to be in range [" + Date.Field.Day.MIN_DAY + ".." + Date.Field.Day.MAX_DAY + "] but was: " + day);

    return day;
};
