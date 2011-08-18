DateTime.Field.Date = function(calendar) {
    var self = this;

    this.millis = function(value) {
        if (arguments.length === 0) {
            return self._val * DateTime.MILLS_PER_DAY;
        }

        value = DateTime.validateInt(value);

        var shift = calendar.year().millis(value).millis() + calendar.month().millis(value).millis();

        self._val = Math.floor((value - shift) / DateTime.MILLS_PER_DAY);

        return self;
    };

    this.value = function(date) {
        if (arguments.length === 0) {
            return self._val + 1;
        }

        self._val = DateTime.Field.Date.validate(date, calendar.month().duration()) - 1;

        return self;
    };

    this.millis(calendar.time());
};

DateTime.Field.Date.MIN_DATE = 1;
DateTime.Field.Date.MAX_DATE = 31;

DateTime.Field.Date.validate = function(date, duration) {
    date = DateTime.validateInt(date);

    var max = DateTime.exists(duration) ? Math.floor(duration / DateTime.MILLS_PER_DAY) : DateTime.Field.Date.MAX_DATE;

    DateTime.assertTrue(date >= DateTime.Field.Date.MIN_DATE && date <= max,
            "Date is expected to be in range [" + DateTime.Field.Date.MIN_DATE + ".." + max + "] but was: " + date);

    return date;
};
