DateTime.Field.Minute = function(calendar) {
    var self = this;

    this._val = 0;
    this._ms = 0;

    this.millis = function(value) {
        if (arguments.length === 0) {
            return self._ms;
        }

        value = DateTime.validateInt(value);

        self._val = DateTime.quotRem(DateTime.quotRem(value, DateTime.MILLS_PER_HOUR).rem, DateTime.MILLS_PER_MINUTE).quot;
        self._ms = self._val * DateTime.MILLS_PER_MINUTE;

        return self;
    };

    this.value = function(minute) {
        if (arguments.length === 0) {
            return self._val;
        }

        if (self._val !== minute) {
            self._val = DateTime.Field.Minute.validate(minute);
            self._ms = self._val * DateTime.MILLS_PER_MINUTE;
        }

        return self;
    };
};

DateTime.Field.Minute.MIN_MINUTE = 0;
DateTime.Field.Minute.MAX_MINUTE = DateTime.MINUTES_PER_HOUR - 1;

DateTime.Field.Minute.validate = function(minute) {
    minute = DateTime.validateInt(minute);

    DateTime.assertTrue(minute >= DateTime.Field.Minute.MIN_MINUTE && minute <= DateTime.Field.Minute.MAX_MINUTE,
            "Minutes are expected to be in range [" + DateTime.Field.Minute.MIN_MINUTE + ".." + DateTime.Field.Minute.MAX_MINUTE + "] but was: " + minute);

    return minute;
};
