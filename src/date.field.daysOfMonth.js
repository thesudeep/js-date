DateTime.Field.DaysOfMonth = function(calendar) {
    var self = this;

    this._val = 0;

    this.duration = function() {
        return DateTime.MILLIS_PER_DAY;
    };

    this.millis = function(value) {
        if (arguments.length === 0) {
            return self._val * DateTime.MILLIS_PER_DAY;
        }

        value = DateTime.validateInt(value);

        var shift = calendar.withYear().millis(value).millis() + calendar.withMonth().millis(value).millis();

        self._val = Math.floor((value - shift) / DateTime.MILLIS_PER_DAY);

        return self;
    };

    this.value = function(daysOfMonth) {
        if (arguments.length === 0) {
            return self._val + 1;
        }

        self._val = DateTime.Field.DaysOfMonth.validate(daysOfMonth, calendar.withMonth().duration()) - 1;

        return self;
    };
};

DateTime.Field.DaysOfMonth.MIN_DATE = 1;
DateTime.Field.DaysOfMonth.MAX_DATE = 31;

DateTime.Field.DaysOfMonth.validate = function(daysOfMonth, duration) {
    daysOfMonth = DateTime.validateInt(daysOfMonth);

    var max = DateTime.exists(duration) ? Math.floor(duration / DateTime.MILLIS_PER_DAY) : DateTime.Field.DaysOfMonth.MAX_DATE;

    DateTime.assertTrue(daysOfMonth >= DateTime.Field.DaysOfMonth.MIN_DATE && daysOfMonth <= max,
            "Date is expected to be in range [" + DateTime.Field.DaysOfMonth.MIN_DATE + ".." + max + "] but was: " + daysOfMonth);

    return daysOfMonth;
};
