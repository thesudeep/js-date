DateTime.Field.DaysOfWeek = function(calendar) {
    var self = this;

    this._val = DateTime.Field.DaysOfWeek.EPOCH;

    this.duration = function() {
        return DateTime.MILLIS_PER_DAY;
    };

    this.millis = function(value) {
        if (!DateTime.exists(value)) {
            return DateTime.Field.DaysOfWeek.dayToMillis(self._val - calendar.withFirstWeekDay());
        }

        self._val = DateTime.Field.DaysOfWeek.millisToDay(value);

        return self;
    };

    this.value = function(day) {
        if (!DateTime.exists(day)) {
            return self._val;
        }

        self._val = DateTime.Field.DaysOfWeek.validate(day);

        return self;
    };
};

/** Constant (1) representing Monday, the first day of the week (ISO) */
DateTime.Field.DaysOfWeek.MONDAY = 1;
/** Constant (2) representing Tuesday, the second day of the week (ISO) */
DateTime.Field.DaysOfWeek.TUESDAY = 2;
/** Constant (3) representing Wednesday, the third day of the week (ISO) */
DateTime.Field.DaysOfWeek.WEDNESDAY = 3;
/** Constant (4) representing Thursday, the fourth day of the week (ISO) */
DateTime.Field.DaysOfWeek.THURSDAY = 4;
/** Constant (5) representing Friday, the fifth day of the week (ISO) */
DateTime.Field.DaysOfWeek.FRIDAY = 5;
/** Constant (6) representing Saturday, the sixth day of the week (ISO) */
DateTime.Field.DaysOfWeek.SATURDAY = 6;
/** Constant (7) representing Sunday, the seventh day of the week (ISO) */
DateTime.Field.DaysOfWeek.SUNDAY = 7;

DateTime.Field.DaysOfWeek.EPOCH = DateTime.Field.DaysOfWeek.THURSDAY;

DateTime.Field.DaysOfWeek.MIN_DAY = DateTime.Field.DaysOfWeek.MONDAY;
DateTime.Field.DaysOfWeek.MAX_DAY = DateTime.Field.DaysOfWeek.SUNDAY;

DateTime.Field.DaysOfWeek.dayToMillis = function(day) {
    return DateTime.quotRem(day, DateTime.DAYS_PER_WEEK).rem * DateTime.MILLIS_PER_DAY;
};

DateTime.Field.DaysOfWeek.millisToDay = function(millis) {
    millis = DateTime.validateInt(millis);

    return DateTime.quotRem(DateTime.Field.DaysOfWeek.EPOCH - DateTime.Field.DaysOfWeek.MIN_DAY + DateTime.quotRem(millis, DateTime.MILLIS_PER_DAY).quot, DateTime.DAYS_PER_WEEK).rem + DateTime.Field.DaysOfWeek.MIN_DAY;
};

DateTime.Field.DaysOfWeek.validate = function(day) {
    day = DateTime.validateInt(day);

    DateTime.assertTrue(day >= DateTime.Field.DaysOfWeek.MIN_DAY && day <= DateTime.Field.DaysOfWeek.MAX_DAY,
            "Day is expected to be in range [" + DateTime.Field.DaysOfWeek.MIN_DAY + ".." + DateTime.Field.DaysOfWeek.MAX_DAY + "] but was: " + day);

    return day;
};
