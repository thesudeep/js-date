DateTime.Field.Year = function(year) {
    var self = this;

    function calendarYear(year) {
        return year <= 0 ? year - 1 : year;
    }

    function yearMills(year) {
        var leapYears = Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400);

        if (DateTime.Field.Year.isLeap(calendarYear(year))) {
            leapYears--;
        }

        return (year * 365 + (leapYears - DateTime.Field.Year.DAYS_0000_TO_1970)) * DateTime.MILLS_PER_DAY;
    }

    this.isLeap = function() {
        return DateTime.Field.Year.isLeap(calendarYear(self._val));
    };

    this.millis = function(value) {
        if (arguments.length === 0) {
            return yearMills(self._val);
        }

        value = DateTime.validateInt(value);

        var halfYearMills = DateTime.Field.Year.MILLS_PER_YEAR / 2;
        var halfValue = value / 2 + DateTime.Field.Year.MILLS_0000_TO_1970 / 2;

        var year = Math.floor(halfValue / halfYearMills);
        var yearStart = yearMills(year);
        var diff = value - yearStart;

        if (diff < 0) {
            year--;
        } else if (diff >= (DateTime.Field.Year.isLeap(calendarYear(year)) ? DateTime.Field.Year.MILLS_PER_LEAP_YEAR : DateTime.Field.Year.MILLS_PER_NORMAL_YEAR)) {
            year++
        }

        self._val = year;

        return self;
    };

    this.value = function(year) {
        if (arguments.length === 0) {
            return self._val <= 0 ? self._val - 1 : self._val;
        }

        year = DateTime.Field.Year.validate(year);

        if (year < 0) {
            year++;
        }

        self._val = year;

        return self;
    };

    if (arguments.length === 0) {
        this.millis(DateTime.currentTimeMillis());
    } else {
        this.value(year);
    }
};

DateTime.Field.Year.EPOCH = 1970;
DateTime.Field.Year.MIN_YEAR = -292275054;
DateTime.Field.Year.MAX_YEAR = 292278993;
DateTime.Field.Year.MILLS_PER_YEAR = 365.2425 * DateTime.MILLS_PER_DAY;;
DateTime.Field.Year.MILLS_PER_NORMAL_YEAR = 365 * DateTime.MILLS_PER_DAY;
DateTime.Field.Year.MILLS_PER_LEAP_YEAR = DateTime.Field.Year.MILLS_PER_NORMAL_YEAR + DateTime.MILLS_PER_DAY;

DateTime.Field.Year.DAYS_0000_TO_1970 = 719527;
DateTime.Field.Year.MILLS_0000_TO_1970 = DateTime.Field.Year.DAYS_0000_TO_1970 * DateTime.MILLS_PER_DAY;

DateTime.Field.Year.validate = function(year) {
    year = DateTime.validateInt(year);

    DateTime.assertTrue(year != 0, "Year 0 does not exist. Please note that according to implemented calendar 1 BC is followed by 1 AD, neither 0 AD nor 0 BC.");

    DateTime.assertTrue(year >= DateTime.Field.Year.MIN_YEAR && year <= DateTime.Field.Year.MAX_YEAR,
            "Year is expected to be in range [" + DateTime.Field.Year.MIN_YEAR + ".." + DateTime.Field.Year.MAX_YEAR + "] but was: " + year);

    return year;
};

DateTime.Field.Year.isLeap = function(year) {
    year = DateTime.Field.Year.validate(year);

    if (year < 0) {
        year++;
    }

    return ((year & 3) == 0) && ((year % 100) != 0 || (year % 400) == 0);
};