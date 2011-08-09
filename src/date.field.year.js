Date.Field.Year = function(year) {
    var DAYS_0000_TO_1970 = 719527;
    var MILLS_0000_TO_1970 = DAYS_0000_TO_1970 * Date.Field.MILLS_PER_DAY;

    var self = this;

    function calendarYear(year) {
        return year <= 0 ? year - 1 : year;
    }

    function yearMills(year) {
        var leapYears = Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400);

        if (Date.Field.Year.isLeap(calendarYear(year))) {
            leapYears--;
        }

        return (year * 365 + (leapYears - DAYS_0000_TO_1970)) * Date.Field.MILLS_PER_DAY;
    }

    this.isLeap = function() {
        return Date.Field.Year.isLeap(calendarYear(self._val));
    };

    this.mills = function(value) {
        if (arguments.length === 0) {
            return yearMills(self._val);
        }

        value = Date.Util.validateInt(value);

        var halfYearMills = Date.Field.Year.MILLS_PER_YEAR / 2;
        var halfValue = value / 2 + MILLS_0000_TO_1970 / 2;

        var year = Math.floor(halfValue / halfYearMills);
        var yearStart = yearMills(year);
        var diff = value - yearStart;

        if (diff < 0) {
            year--;
        } else if (diff >= (Date.Field.Year.isLeap(calendarYear(year)) ? Date.Field.Year.MILLS_PER_LEAP_YEAR : Date.Field.Year.MILLS_PER_NORMAL_YEAR)) {
            year++
        }

        self._val = year;

        return self;
    };

    this.value = function(year) {
        if (arguments.length === 0) {
            return self._val <= 0 ? self._val - 1 : self._val;
        }

        year = Date.Field.Year.validate(year);

        if (year < 0) {
            year++;
        }

        self._val = year;

        return self;
    };

    if (arguments.length === 0) {
        this.mills(new Date().getTime());
    } else {
        this.value(year);
    }
};

Date.Field.Year.EPOCH = 1970;
Date.Field.Year.MIN_YEAR = -292275054;
Date.Field.Year.MAX_YEAR = 292278993;
Date.Field.Year.MILLS_PER_YEAR = 365.2425 * Date.Field.MILLS_PER_DAY;;
Date.Field.Year.MILLS_PER_NORMAL_YEAR = 365 * Date.Field.MILLS_PER_DAY;
Date.Field.Year.MILLS_PER_LEAP_YEAR = Date.Field.Year.MILLS_PER_NORMAL_YEAR + Date.Field.MILLS_PER_DAY;

Date.Field.Year.validate = function(year) {
    year = Date.Util.validateInt(year);

    Date.Util.assertTrue(year != 0, "Year 0 does not exist. Please note that according to implemented calendar 1 BC is followed by 1 AD, neither 0 AD nor 0 BC.");

    Date.Util.assertTrue(year >= Date.Field.Year.MIN_YEAR && year <= Date.Field.Year.MAX_YEAR,
            "Year is expected to be in range [" + Date.Field.Year.MIN_YEAR + ".." + Date.Field.Year.MAX_YEAR + "] but was: " + year);

    return year;
};

Date.Field.Year.isLeap = function(year) {
    year = Date.Field.Year.validate(year);

    if (year < 0) {
        year++;
    }

    return ((year & 3) == 0) && ((year % 100) != 0 || (year % 400) == 0);
};