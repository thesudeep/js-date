DateTime.Field.Year = function(calendar) {
    var self = this;

    this._ms = 0;
    this._val = DateTime.Field.Year.EPOCH;
    this._leap = false;

    function getLeap(year) {
        return (year & 3) === 0 && (year % 100 !== 0 || year % 400 === 0);
    }

    function getApproxMillis(year) {
        var leapYears = Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400);

        return (year * 365 + (leapYears - DateTime.Field.Year.DAYS_0000_TO_1970)) * DateTime.MILLIS_PER_DAY;
    }

    this.duration = function() {
        return self._leap ? DateTime.Field.Year.MILLIS_PER_LEAP_YEAR : DateTime.Field.Year.MILLIS_PER_NORMAL_YEAR;
    };

    this.isLeap = function() {
        return self._leap;
    };

    this.millis = function(value) {
        if (arguments.length === 0) {
            return self._ms;
        }

        value = DateTime.validateInt(value);

        var halfValue = value / 2;
        var halfDiff = halfValue - self._ms / 2;

        if (value === self._ms || halfDiff >= 0 && halfDiff < DateTime.Field.Year.HALF_MILLIS_PER_YEAR) {
            return self;
        }

        halfValue += DateTime.Field.Year.HALF_MILLIS_0000_TO_1970;

        var year = Math.floor(halfValue / DateTime.Field.Year.HALF_MILLIS_PER_YEAR);
        var leap = getLeap(year);

        var ms = getApproxMillis(year);
        var millisPerYear = DateTime.Field.Year.MILLIS_PER_NORMAL_YEAR;

        if (leap) {
            ms -= DateTime.MILLIS_PER_DAY;
            millisPerYear = DateTime.Field.Year.MILLIS_PER_LEAP_YEAR;
        }

        var diff = value - ms;

        if (diff < 0) {
            year--;
            ms -= millisPerYear;
            leap = getLeap(year);
        } else if (diff >= millisPerYear) {
            year++;
            ms += millisPerYear;
            leap = getLeap(year);
        }

        self._ms = ms;
        self._val = year;
        self._leap = leap;

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

        if (year === self._val) {
            return self;
        }

        var ms = getApproxMillis(year);

        self._leap = getLeap(year);

        if (self._leap) {
            ms -= DateTime.MILLIS_PER_DAY;
        }

        self._ms = ms;
        self._val = year;

        return self;
    };
};

DateTime.Field.Year.EPOCH = 1970;
DateTime.Field.Year.MIN_YEAR = -271821;
DateTime.Field.Year.MAX_YEAR = 275759;
DateTime.Field.Year.MILLIS_PER_YEAR = 365.2425 * DateTime.MILLIS_PER_DAY;
DateTime.Field.Year.MILLIS_PER_NORMAL_YEAR = 365 * DateTime.MILLIS_PER_DAY;
DateTime.Field.Year.MILLIS_PER_LEAP_YEAR = DateTime.Field.Year.MILLIS_PER_NORMAL_YEAR + DateTime.MILLIS_PER_DAY;

DateTime.Field.Year.DAYS_0000_TO_1970 = 719527;
DateTime.Field.Year.MILLIS_0000_TO_1970 = DateTime.Field.Year.DAYS_0000_TO_1970 * DateTime.MILLIS_PER_DAY;
DateTime.Field.Year.HALF_MILLIS_PER_YEAR = Math.floor(DateTime.Field.Year.MILLIS_PER_YEAR / 2);
DateTime.Field.Year.HALF_MILLIS_0000_TO_1970 = Math.floor(DateTime.Field.Year.MILLIS_0000_TO_1970 / 2);

DateTime.Field.Year.validate = function(year) {
    year = DateTime.validateInt(year);

    DateTime.assertTrue(year != 0, "Year 0 does not exist. Please note that according to implemented calendar 1 BC is followed by 1 AD, neither 0 AD nor 0 BC.");

    DateTime.assertTrue(year >= DateTime.Field.Year.MIN_YEAR && year <= DateTime.Field.Year.MAX_YEAR,
            "Year is expected to be in range [" + DateTime.Field.Year.MIN_YEAR + ".." + DateTime.Field.Year.MAX_YEAR + "] but was: " + year);

    return year;
};