DateTime.Field.Month = function(calendar) {
    var self = this;

    this.duration = function() {
        return calendar.year().isLeap() ?
                DateTime.Field.Month.MILLS_BY_LEAP_MONTHS[self._val + 1] - DateTime.Field.Month.MILLS_BY_LEAP_MONTHS[self._val] :
                DateTime.Field.Month.MILLS_BY_NORMAL_MONTHS[self._val + 1] - DateTime.Field.Month.MILLS_BY_NORMAL_MONTHS[self._val];
    };

    this.millis = function(value) {
        var a = calendar.year().isLeap() ? DateTime.Field.Month.MILLS_BY_LEAP_MONTHS : DateTime.Field.Month.MILLS_BY_NORMAL_MONTHS;

        if (arguments.length === 0) {
            return a[self._val];
        }

        value = DateTime.validateInt(value);

        var yearStart = calendar.year().millis(value).millis();

        // Inspired by JodaTime.

        var i = value - yearStart;

        self._val =
                i < a[6]
                        ? (i < a[3] ? (i < a[2] ? (i < a[1] ? 0 : 1) : 2 ) : (i < a[5] ? (i < a[4] ? 3 : 4) : 5))
                        : (i < a[9] ? (i < a[8] ? (i < a[7] ? 6 : 7) : 8 ) : (i < a[11] ? (i < a[10] ? 9 : 10) : 11));

        return self;
    };

    this.value = function(month) {
        if (arguments.length === 0) {
            return self._val + DateTime.Field.Month.MIN_MONTH;
        }

        self._val = DateTime.Field.Month.validate(month) - DateTime.Field.Month.MIN_MONTH;

        return self;
    };

    this.millis(calendar.time());
};

/** Constant (1) representing January, the first month (ISO) */
DateTime.Field.Month.JANUARY = 1;
/** Constant (2) representing February, the second month (ISO) */
DateTime.Field.Month.FEBRUARY = 2;
/** Constant (3) representing March, the third month (ISO) */
DateTime.Field.Month.MARCH = 3;
/** Constant (4) representing April, the fourth month (ISO) */
DateTime.Field.Month.APRIL = 4;
/** Constant (5) representing May, the fifth month (ISO) */
DateTime.Field.Month.MAY = 5;
/** Constant (6) representing June, the sixth month (ISO) */
DateTime.Field.Month.JUNE = 6;
/** Constant (7) representing July, the seventh month (ISO) */
DateTime.Field.Month.JULY = 7;
/** Constant (8) representing August, the eighth month (ISO) */
DateTime.Field.Month.AUGUST = 8;
/** Constant (9) representing September, the nineth month (ISO) */
DateTime.Field.Month.SEPTEMBER = 9;
/** Constant (10) representing October, the tenth month (ISO) */
DateTime.Field.Month.OCTOBER = 10;
/** Constant (11) representing November, the eleventh month (ISO) */
DateTime.Field.Month.NOVEMBER = 11;
/** Constant (12) representing December, the twelfth month (ISO) */
DateTime.Field.Month.DECEMBER = 12;

DateTime.Field.Month.MIN_MONTH = DateTime.Field.Month.JANUARY;
DateTime.Field.Month.MAX_MONTH = DateTime.Field.Month.DECEMBER;

DateTime.Field.Month.MILLS_BY_NORMAL_MONTHS = [0, 2678400000, 5097600000, 7776000000, 10368000000, 13046400000, 15638400000, 18316800000, 20995200000, 23587200000, 26265600000, 28857600000, 31536000000];
DateTime.Field.Month.MILLS_BY_LEAP_MONTHS =   [0, 2678400000, 5184000000, 7862400000, 10454400000, 13132800000, 15724800000, 18403200000, 21081600000, 23673600000, 26352000000, 28944000000, 31622400000];


DateTime.Field.Month.validate = function(month) {
    month = DateTime.validateInt(month);

    DateTime.assertTrue(month >= DateTime.Field.Month.MIN_MONTH && month <= DateTime.Field.Month.MAX_MONTH,
            "Month is expected to be in range [" + DateTime.Field.Month.MIN_MONTH + ".." + DateTime.Field.Month.MAX_MONTH + "] but was: " + month);

    return month;
};
