DateTime.Field.Day = function(day, firstDay) {
    var self = this;

    firstDay = DateTime.Field.Day.validate(DateTime.exists(firstDay, DateTime.Field.Day.MIN_DAY));

    this._val = 0;

    this.millis = function(value) {
        if (!DateTime.exists(value)) {
            return DateTime.quotRem(self._val + DateTime.Field.Day.MIN_DAY - firstDay, DateTime.DAYS_PER_WEEK).rem * DateTime.MILLS_PER_DAY;
        }

        value = DateTime.validateInt(value);

        self._val = DateTime.quotRem(DateTime.Field.Day.THURSDAY - DateTime.Field.Day.MIN_DAY + DateTime.quotRem(value, DateTime.MILLS_PER_DAY).quot, DateTime.DAYS_PER_WEEK).rem;

        return self;
    };

    this.value = function(day) {
        if (!DateTime.exists(day)) {
            return self._val + DateTime.Field.Day.MIN_DAY;
        }

        self._val = DateTime.Field.Day.validate(day) - DateTime.Field.Day.MIN_DAY;

        return self;
    };

    if (DateTime.exists(day)) {
        this.value(day);
    } else {
        this.millis(DateTime.currentTimeMillis());
    }
};

/** Constant (1) representing Monday, the first day of the week (ISO) */
DateTime.Field.Day.MONDAY = 1;
/** Constant (2) representing Tuesday, the second day of the week (ISO) */
DateTime.Field.Day.TUESDAY = 2;
/** Constant (3) representing Wednesday, the third day of the week (ISO) */
DateTime.Field.Day.WEDNESDAY = 3;
/** Constant (4) representing Thursday, the fourth day of the week (ISO) */
DateTime.Field.Day.THURSDAY = 4;
/** Constant (5) representing Friday, the fifth day of the week (ISO) */
DateTime.Field.Day.FRIDAY = 5;
/** Constant (6) representing Saturday, the sixth day of the week (ISO) */
DateTime.Field.Day.SATURDAY = 6;
/** Constant (7) representing Sunday, the seventh day of the week (ISO) */
DateTime.Field.Day.SUNDAY = 7;

DateTime.Field.Day.MIN_DAY = DateTime.Field.Day.MONDAY;
DateTime.Field.Day.MAX_DAY = DateTime.Field.Day.SUNDAY;

DateTime.Field.Day.validate = function(day) {
    day = DateTime.validateInt(day);

    DateTime.assertTrue(day >= DateTime.Field.Day.MIN_DAY && day <= DateTime.Field.Day.MAX_DAY,
            "Day is expected to be in range [" + DateTime.Field.Day.MIN_DAY + ".." + DateTime.Field.Day.MAX_DAY + "] but was: " + day);

    return day;
};
