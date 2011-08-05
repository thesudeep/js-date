Date.Field.Year = function(year) {
    var DAYS_0000_TO_1970 = 719527;

    var self = this;

    if (arguments.length === 0) {
        year = this.mills(new Date().getTime()).value();
    }

    this._val = year;

    function yearMills(year) {
        var leapYears = year / 4 - year / 100 + year / 400;

        if (self._val > 0 && Date.Field.Year.isLeap(year)) {
            leapYears--;
        }

        return (year * 365 + (leapYears - DAYS_0000_TO_1970)) * Date.Field.MILLS_PER_DAY;
    }

    this.mills = function(value) {
        if (arguments.length === 0) {
            return yearMills(self._val);
        }

        value = Date.Field.validateInt(year);

        var halfYearMills = Date.Field.Year.MILLS_PER_YEAR / 2;
        var halfValue = value / 2 + DAYS_0000_TO_1970 / 2;

        var year = halfValue / halfYearMills;
        var yearStart = yearMills(year);
        var diff = value - yearStart;

        if (diff < 0) {
            year--;
        } else if (diff >= (Date.Field.Year.isLeap(year) ? Date.Field.Year.MILLS_PER_LEAP_YEAR : Date.Field.Year.MILLS_PER_NORMAL_YEAR)) {
            year++
        }

        self._val = year;

        return self;
    };

    this.value = function(year) {
        if (arguments.length === 0) {
            return self._val;
        }

        self._val = Date.Field.Year.validate(year);

        return self;
    };
};

Date.Field.Year.EPOCH = 1970;
Date.Field.Year.MIN_YEAR = -292275054;
Date.Field.Year.MAX_YEAR = 292278993;
Date.Field.Year.MILLS_PER_YEAR = 365.2425 * Date.Field.MILLS_PER_DAY;;
Date.Field.Year.MILLS_PER_NORMAL_YEAR = 365 * Date.Field.MILLS_PER_DAY;
Date.Field.Year.MILLS_PER_LEAP_YEAR = Date.Field.Year.MILLS_PER_NORMAL_YEAR + Date.Field.MILLS_PER_DAY;

Date.Field.Year.validate = function(year) {
    year = Date.Field.validateInt(year);

    Date.Field.assertTrue(year >= Date.Field.Year.MIN_YEAR && year <= Date.Field.Year.MAX_YEAR,
            "Year expected to be in range [" + Date.Field.Year.MIN_YEAR + ".." + Date.Field.Year.MAX_YEAR + "] but was: " + year);

    return year;
};

Date.Field.Year.isLeap = function(year) {
    year = Date.Field.Year.validate(year);

    return ((year & 3) == 0) && ((year % 100) != 0 || (year % 400) == 0);
};